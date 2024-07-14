import toast from "react-hot-toast";
import { JsonRpcSigner } from "ethers";
import { setup, fromPromise } from "xstate";

import { claimProjectMetrics } from "@/actions/metrics";

interface Context {
  projectUID: string;
  signer?: JsonRpcSigner;
}

export const claimMetricsMachine = setup({
  types: {} as {
    input: Context;
    context: Context;
    events:
      | { type: "CLAIM"; metrics: CreateProjectMetric[] }
      | { type: "START_CLAIMING" }
      | { type: "CANCEL" };
  },
  actions: {
    handleClaimSuccess: (_) => {
      toast.success("Metrics claimed successfully!", {});
    },
    handleClaimError: (_) => {
      toast.error("Claiming metrics failed:");
    },
  },
  actors: {
    claimMetrics: fromPromise<
      string[],
      { metrics: CreateProjectMetric[]; signer?: JsonRpcSigner }
    >(async ({ input: { metrics, signer } }) => {
      toast.loading("Creating Metric...");
      // Function to claim metrics
      const uids = await claimProjectMetrics(metrics, signer);

      return uids;
    }),
  },
}).createMachine({
  id: "project-metrics-claim",
  initial: "idle",
  context: ({ input: { signer, projectUID } }) => ({
    signer,
    projectUID,
  }),
  states: {
    idle: {
      on: {
        CLAIM: "claim",
      },
    },
    claim: {
      on: {
        START_CLAIMING: "claiming",
        CANCEL: "idle",
      },
    },
    claiming: {
      invoke: {
        src: "claimMetrics",
        input: ({ context, event }) => ({
          metrics: event.type === "CLAIM" ? event.metrics : [],
          signer: context.signer,
        }),
        onDone: {
          target: "claimed",
          actions: "handleClaimSuccess",
        },
        onError: {
          target: "claim",
          actions: "handleClaimError",
        },
      },
    },
    claimed: {
      type: "final",
    },
  },
});
