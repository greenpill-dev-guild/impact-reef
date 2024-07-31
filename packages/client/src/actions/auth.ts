"use server";

import {siweConfig} from "@/config/siwe";

export interface Credentials {
    message: string;
    signature: string;
    // name: string;
    // pfp: string;
    // redirect: boolean;
}

export async function getNonce() {
    try {
        const nonce = await siweConfig.getNonce();
        return {nonce, message: "Nonce fetched"};
    } catch (error) {
        return {error, message: "Error getting nonce"};
    }
}

export async function getUser() {
    const signedInUser = await siweConfig.getSession();

    // TODO get user auth roles

    return {
        ...signedInUser,
        badgeholder: true,
        metrics_admin: true,
        council_member: true
    }
}

export async function logout() {
    try {
        await siweConfig.signOut();

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
