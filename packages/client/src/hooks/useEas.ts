import {
  EAS as EAS_REGISTRY,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";

import { EAS } from "@/constants";
import { useEthersSigner } from "@/hooks/auth/useEthersSigner";

const easSigner = (signer: TransactionSigner) => {
  const eas = new EAS_REGISTRY(EAS["11155111"].EAS.address);

  return eas.connect(signer);
};

export const useEas = () => {
  const ethersSigner = useEthersSigner({ chainId: 11155111 })!;

  const eas = easSigner(ethersSigner);

  return { eas };
};
