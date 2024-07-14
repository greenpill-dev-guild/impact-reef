import { useMachine } from "@xstate/react";

import { endorsementMachine } from "./machines/endorsement";
import { claimMetricsMachine } from "./machines/claimMetrics";

export const useProject = (id: string) => {
  const [endorsementState, endorsementSend] = useMachine(endorsementMachine, {
    input: {
      id,
    },
  });
  const [claimMetricsState, claimMetricsSend] = useMachine(
    claimMetricsMachine,
    {
      input: {
        id,
      },
    }
  );

  const endorse = (endorsement: CreateEndorsement) =>
    endorsementSend({ type: "ENDORSE", endorsement });
  const startEndorsing = () => endorsementSend({ type: "START_ENDORSING" });
  const cancelEndorse = () => endorsementSend({ type: "CANCEL" });

  const claim = (metric: CreateProjectMetric) =>
    claimMetricsSend({ type: "CLAIM", metric });
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
