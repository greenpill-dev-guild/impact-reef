import { getCsrfToken } from "next-auth/react";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, and `getSession`
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      name: string;
      image: string;
      badgeholder: boolean;
      metrics_admin: boolean;
      council_member: boolean;
      addresses: string[];
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  // siweUri: "http://example.com/login",
  // domain: "example.com",
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Sign in with Farcaster",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
        // In a production app with a server, these should be fetched from
        // your Farcaster data indexer rather than have them accepted as part
        // of credentials.
        name: {
          label: "Name",
          type: "text",
          placeholder: "0x0",
        },
        pfp: {
          label: "Pfp",
          type: "text",
          placeholder: "0x0",
        },
      },
      authorize: async (credentials) => {
        try {
          const csrfToken = await getCsrfToken();

          // const verifyResponse = await appClient.verifySignInMessage({
          //   message: credentials?.message as string,
          //   signature: credentials?.signature as `0x${string}`,
          //   domain: "example.com",
          //   nonce: csrfToken,
          // });

          // const { success, fid } = verifyResponse;

          // if (!success) {
          //   return null;
          // }

          return {
            // id: fid.toString(),
            name: credentials?.name as string,
            image: credentials?.pfp as string,
            badgeholder: true,
            metrics_admin: true,
            council_member: true,
            addresses: [],
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
});
