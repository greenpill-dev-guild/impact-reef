import {assertExists} from "./utils/assertExists";

export const ALCHEMY_API_KEY = assertExists(process.env.ALCHEMY_API_KEY, "ALCHEMY_API_KEY")

export const PRIVATE_KEY = assertExists(process.env.PRIVATE_KEY, "PRIVATE_KEY")