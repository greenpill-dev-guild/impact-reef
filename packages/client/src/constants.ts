export const APP_NAME = "Impact Reef";
export const APP_DEFAULT_TITLE = "Impact Reef";
export const APP_TITLE_TEMPLATE = "%s - Impact Reef";
export const APP_DESCRIPTION = "";
export const APP_URL = "https://impactreef.app";
export const APP_ICON = "https://impactreef.app/images/logo.png";

export const EAS = {
  "10": {
    BADGEHOLDERS: {
      uid: "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b",
      schema: "string rpgfRound,address referredBy,string referredMethod",
    },
    PROJECT_OWNERS: {
      uid: "0x7ae9f4adabd9214049df72f58eceffc48c4a69e920882f5b06a6c69a3157e5bd",
      schema: "uint256 farcasterID,string issuer",
    },
    PROJECT_APPLICATIONS: {
      uid: "0x88b62595c76fbcd261710d0930b5f1cc2e56758e155dea537f82bf0baadd9a32",
      schema:
        "uint32 round,bytes32 projectRefUID,uint256 farcasterID,bytes32 metadataSnapshotRefUID",
    },
    PROJECT_METADATA: {
      uid: "0x9a384502b07bb8dfe65a784d0abee1dc22ff541024a9965d78ef7934dda7b6ca",
      schema:
        "bytes32 projectRefUID,uint256 farcasterID,string name,string category,bytes32 parentProjectRefUID,uint8 metadataType,string metadataUrl",
    },
    EAS: {
      address: "0x4200000000000000000000000000000000000021",
    },
    OPTIMISM: {
      address: "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9", // Filter for attestations by OP
    },
  },
  "11155420": {
    METRICS: {
      uid: "0x7bd6430d6ddf8ef8d70f3ca0175d3383af97fd93cac56c2db621f2054f23e0ae",
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
      address: "0x4200000000000000000000000000000000000021",
    },
  },
};

export const metricAdmins = new Map([["", true]]);
export const councilMembers = new Map([["", true]]);
