import { useEthersSigner } from "../auth/useEthersSigner";

export const useProject = (projectUID: string) => {
  const signer = useEthersSigner({ chainId: 11155111 })!;

  return {};
};
