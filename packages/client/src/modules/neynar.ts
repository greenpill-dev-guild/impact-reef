"use server";

import { NeynarAPIClient } from "@neynar/nodejs-sdk";

export const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
