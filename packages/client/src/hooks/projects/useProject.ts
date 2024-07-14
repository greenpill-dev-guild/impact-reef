import { useMachine } from "@xstate/react";

import { useEthersSigner } from "../auth/useEthersSigner";

import { endorsementMachine } from "./machines/endorsement";
import { claimMetricsMachine } from "./machines/claimMetrics";

export const useProject = (projectUID: string) => {
  const signer = useEthersSigner()!;

  const [endorsementState, endorsementSend] = useMachine(endorsementMachine, {
    input: {
      projectUID,
      signer,
    },
  });
  const [claimMetricsState, claimMetricsSend] = useMachine(
    claimMetricsMachine,
    {
      input: {
        projectUID,
        signer,
      },
    }
  );

  const endorse = (endorsement: CreateEndorsement) =>
    endorsementSend({ type: "ENDORSE", endorsement });
  const startEndorsing = () => endorsementSend({ type: "START_ENDORSING" });
  const cancelEndorse = () => endorsementSend({ type: "CANCEL" });

  const claim = (metrics: CreateProjectMetric[]) =>
    claimMetricsSend({ type: "CLAIM", metrics });
  const startClaiming = () => claimMetricsSend({ type: "START_CLAIMING" });
  const cancelClaim = () => claimMetricsSend({ type: "CANCEL" });

  return {
    endorsementState,
    endorse,
    startEndorsing,
    cancelEndorse,
    claimMetricsState,
    claim,
    startClaiming,
    cancelClaim,
  };
};
