import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://hub.pinata.cloud/v1/',
    timeout: 10000,
});

enum UserDataBody {
    USER_DATA_TYPE_PFP = "pfp",
    USER_DATA_TYPE_USERNAME = "username",
    USER_DATA_TYPE_BIO = "bio",
    USER_DATA_TYPE_DISPLAY = "display",
}

type FarcasterProfileData = {
    pfp: string;
    username: string;
    bio: string;
    display: string;
}

function mapMessagesToUserData(messages: any[]) {

    let userData: Partial<FarcasterProfileData> = {};

    // Example message
    // {
    //     "data": {
    //     "type": "MESSAGE_TYPE_USER_DATA_ADD",
    //         "fid": 1212,
    //         "timestamp": 97874415,
    //         "network": "FARCASTER_NETWORK_MAINNET",
    //         "userDataBody": {
    //         "type": "USER_DATA_TYPE_USERNAME",
    //             "value": "alexpoon.eth"
    //     }
    // },
    //     "hash": "0xc7d3b368c52dd12704cd84d628507b348e75b7a3",
    //     "hashScheme": "HASH_SCHEME_BLAKE3",
    //     "signature": "yF46Nm0r7R187Ph4u8cI7oXWiwD2z1cmBrmhCwoOTeLTdwWAjTf4m5u2bpNnorl0PHMJxSC+IiyNVZ2TGXBDBQ==",
    //     "signatureScheme": "SIGNATURE_SCHEME_ED25519",
    //     "signer": "0x464a1925cee9c8c70d705c19580aff5e0f37c539586a561d64abad3d43e08803"
    // },

    for (const message of messages) {
        const {userDataBody} = message.data;
        if (userDataBody.type === "USER_DATA_TYPE_PFP") {
            userData[UserDataBody.USER_DATA_TYPE_PFP] = userDataBody.value;
        }
        if (userDataBody.type === "USER_DATA_TYPE_USERNAME") {
            userData[UserDataBody.USER_DATA_TYPE_USERNAME] = userDataBody.value;
        }
        if (userDataBody.type === "USER_DATA_TYPE_BIO") {
            userData[UserDataBody.USER_DATA_TYPE_BIO] = userDataBody.value;
        }
        if (userDataBody.type === "USER_DATA_TYPE_DISPLAY") {
            userData[UserDataBody.USER_DATA_TYPE_DISPLAY] = userDataBody.value;
        }
    }

    return userData;
}

export const getFarcasterUserDataById = async (fid: bigint) => {
    "use server";

    try {
        const response = await instance.get(`userDataByFid`, {params: {fid}});

        if (response.status !== 200) {
            throw new Error("Failed to fetch user data.");
        }

        const {messages} = response.data;

        if (messages.length === 0) {
            return null;
        }

        return mapMessagesToUserData(messages);

    } catch (error) {
        console.error(error);
    }
}