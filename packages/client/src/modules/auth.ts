import { SiweMessage } from "siwe";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { getCsrfToken } from "next-auth/react";

import { councilMembers, metricAdmins } from "@/constants";
import { neynarClient } from "./neynar";
import { getBadgeholder } from "@/actions/badgeholder";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Sign in with Ethereum",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      authorize: async (credentials) => {
        try {
          if (
            typeof credentials.message !== "string" ||
            typeof credentials.signature !== "string"
          ) {
            throw new AuthError("Invalid Credentials");
          }

          const siwe = new SiweMessage(credentials.message);

          // const nonce = await getCsrfToken();
          // cookies()
          //   .get("next-auth.csrf-token")
          //   ?.value.split("|")[0];

          // console.log("Server Nonce", nonce);

          const { data: fields } = await siwe.verify({
            signature: credentials.signature,
            // nonce,
          });

          const userMap = await neynarClient.fetchBulkUsersByEthereumAddress([
            fields.address,
          ]);

          const farcasterUser =
            userMap[fields.address] !== undefined
              ? userMap[fields.address][0]
              : undefined;

          const badgeholder = await getBadgeholder(fields.address);

          return {
            fid: farcasterUser?.fid,
            name: farcasterUser?.username,
            image: farcasterUser?.pfp_url,
            badgeholder,
            metrics_admin: metricAdmins.has(fields.address),
            council_member: councilMembers.get(fields.address),
            address: fields.address,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
});
