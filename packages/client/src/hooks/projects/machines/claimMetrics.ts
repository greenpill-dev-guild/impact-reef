import { createMachine, fromPromise } from "xstate";

export const claimMetricsMachine = createMachine(
  {
    id: "project-metrics-claim",
    initial: "idle",
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
        entry: "notifyClaimSuccess",
      },
    },
  },
  {
    actors: {
      claimMetrics: fromPromise(() => {
        // Function to claim metrics
        return new Promise<void>((resolve, reject) => {
          // Simulate async operation
          setTimeout(() => {
            resolve(); // or reject(new Error('Claiming metrics failed'));
          }, 2000);
        });
      }),
    },
    actions: {
      handleClaimSuccess: (context, event) => {
        console.log("Metrics claimed successfully!");
      },
      handleClaimError: (context, event) => {
        console.error("Claiming metrics failed:", event);
      },
      notifyClaimSuccess: (context, event) => {
        console.log("User has successfully claimed metrics!");
      },
    },
  }
);
