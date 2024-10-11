export const APP_NAME = "Impact Reef";
export const APP_DEFAULT_TITLE = "Impact Reef";
export const APP_TITLE_TEMPLATE = "%s - Impact Reef";
export const APP_DESCRIPTION =
  "Discover how projects impact the ecosystem. Crafted with care and dedication, Impact Reef is a platform that values each project's impact through the voice of the community.";
export const APP_URL = "https://impactreef.app";
export const APP_ICON = "/icon.png";
export const APP_IMAGE = "/images/social-image.png";

export const agoraRoundsAPI = "/api/agora/retrofunding/rounds/5";

export const EAS = {
  "10": {
    BADGEHOLDERS: {
      uid: "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b",
      schema: "string rpgfRound,address referredBy,string referredMethod",
    },
    ENDORSEMENTS: {
      uid: "0xcb467813564d28027668ef1fdb1036786e8672c8279e894d4f7c171277d6cbb9",
      schema: "bytes32 projectUID, bytes32 metricUID, string description",
    },
    EAS: {
      address: "0x4200000000000000000000000000000000000021",
    },
    OPTIMISM: {
      address: "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9", // Filter for attestations by OP
    },
  },
  "11155111": {
    METRICS: {
      uid: "0xdd56b1a5da612085133234cdd66bb28056e2eab9aa951c7fb0d90709f78f9436",
      schema:
        "string name, string description, string importance, string rationale, string keyword, string term, string category",
    },
    PROJECT_METRICS: {
      uid: "0x7bd6430d6ddf8ef8d70f3ca0175d3383af97fd93cac56c2db621f2054f23e0ae",
      schema:
        "bytes32 projectUID, bytes32 metricUID, string value, string source",
    },
    ENDORSEMENTS: {
      uid: "0xe0c66a037aaf73ed3df067aa1a0950b722e5d95a6a231b014f84969217b70add",
      schema: "bytes32 projectUID, bytes32 metricUID, string description",
    },
    EAS: {
      address: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
    },
  },
};

export const metricAdmins = new Map([["", true]]);
export const councilMembers = new Map([["", true]]);
