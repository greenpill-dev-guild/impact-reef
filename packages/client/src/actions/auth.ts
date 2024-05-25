"use server";

import { getCsrfToken } from "next-auth/react";

import { signIn, signOut, auth } from "@/modules/auth";
// import { cookies } from "next/headers";

export interface Credentials {
  message: string;
  signature: string;
  name: string;
  pfp: string;
  redirect: boolean;
}

export async function getNonce() {
  try {
    const nonce = await getCsrfToken();

    if (!nonce) throw new Error("Unable to generate nonce");

    return { nonce, message: "Nonce fetched" };
  } catch (error) {
    return { error, message: "Effor getting nonce" };
  }
}

export async function getUser() {
  const session = await auth();

  return session?.user;
}

export async function login(credentials: Credentials) {
  try {
    await signIn("credentials", credentials);

    return {
      message: "User succesfully logged in",
    };
  } catch (error) {
    return {
      message: "Error lpgging out user",
      error,
    };
  }
}

export async function logout() {
  try {
    await signOut();

    return {
      message: "User succesfully logged out",
    };
  } catch (error) {
    return {
      message: "Error lpgging out user",
      error,
    };
  }
}
