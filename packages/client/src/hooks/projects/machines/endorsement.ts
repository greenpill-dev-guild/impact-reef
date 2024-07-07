import { createMachine, fromPromise } from "xstate";

export const endorsementMachine = createMachine(
  {
    id: "project-endorsement",
    initial: "idle",
    states: {
      idle: {
        on: {
          ENDORSE: "endorse",
        },
      },
      endorse: {
        on: {
          START_ENDORSING: "endorsing",
          CANCEL: "idle",
        },
      },
      endorsing: {
        invoke: {
          src: "makeEndorsement",
          onDone: {
            target: "endorsed",
            actions: "handleSuccess",
          },
          onError: {
            target: "endorse",
            actions: "handleError",
          },
        },
      },
      endorsed: {
        type: "final",
        entry: "notifyEndorsementSuccess",
      },
    },
  },
  {
    actors: {
      makeEndorsement: fromPromise(() => {
        // Function to make the endorsement attestation
        return new Promise<void>((resolve, reject) => {
          // Simulate async operation
          setTimeout(() => {
            resolve(); // or reject(new Error('Endorsement failed'));
          }, 2000);
        });
      }),
    },
    actions: {
      handleSuccess: (context, event) => {
        console.log("Endorsement successful!");
      },
      handleError: (context, event) => {
        console.error("Endorsement failed:", event);
      },
      notifyEndorsementSuccess: (context, event) => {
        console.log("User has been successfully endorsed!");
      },
    },
  }
);
