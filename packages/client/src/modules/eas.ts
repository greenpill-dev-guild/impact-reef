import { EAS as EAS_REGISTRY } from "@ethereum-attestation-service/eas-sdk";

import { EAS } from "@/constants";

export const eas = new EAS_REGISTRY(EAS["10"].EAS.address);
