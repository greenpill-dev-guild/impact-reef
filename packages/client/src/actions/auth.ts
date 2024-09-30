"use server";

import { useAccount } from "wagmi";

export interface Credentials {
  message: string;
  signature: string;
  // name: string;
  // pfp: string;
  // redirect: boolean;
}

export async function getNonce() {
  try {
    // const nonce = await siweConfig.getNonce();
    return { message: "Nonce fetched" };
  } catch (error) {
    return { error, message: "Error getting nonce" };
  }
}

export async function getUser() {
  // TODO get user auth roles

  return {
    badgeholder: true,
    metrics_admin: true,
    council_member: true,
  };
}

export async function logout() {
  try {
    return {
      message: "User successfully logged out",
    };
  } catch (error) {
    return {
      message: "Error logging out user",
      error,
    };
  }
}
