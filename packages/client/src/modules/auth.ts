import { SiweMessage } from "siwe";
// import { getCsrfToken } from "next-auth/react";
// import { cookies } from "next/headers";
import { getCsrfToken } from "next-auth/react";
import NextAuth, { DefaultSession, AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { councilMembers, metricAdmins } from "@/constants";

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
      authorize: async (credentials, req) => {
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

          return {
            // id: fid.toString(),
            name: "",
            image: "",
            badgeholder: false,
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
