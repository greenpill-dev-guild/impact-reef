import toast from "react-hot-toast";
import { JsonRpcSigner } from "ethers";
import { setup, fromPromise } from "xstate";

import { makeEndorsement } from "@/actions/endorsements";

interface Context {
  projectUID: string;
  signer: JsonRpcSigner;
}

export const endorsementMachine = setup({
  types: {} as {
    input: Context;
    context: Context;
    events:
      | { type: "ENDORSE"; endorsement: CreateEndorsement }
      | { type: "START_ENDORSING" }
      | { type: "CANCEL" }
      | { type: `xstate.done.actor.endorser`; output: string }
      | { type: `xstate.error.actor.endorser`; error: unknown };
  },
  actions: {
    handleSuccess: ({ event }) => {
      const id =
        event.type === "xstate.done.actor.endorser" ? event.output : "";

      toast.success(
        `Endorsement succesful, view it here https://optimism-sepolia.easscan.org/onchain/attestation/view/${id}`
      );
    },
    handleError: () => {
      toast.error("Endorsement failed:");
    },
  },
  actors: {
    makeEndorsement: fromPromise<
      string,
      { endorsement: CreateEndorsement; signer?: JsonRpcSigner }
    >(async ({ input: { endorsement, signer } }) => {
      // Function to make the endorsement attestation
      const uid = await makeEndorsement(endorsement, signer);

      return uid;
    }),
  },
}).createMachine({
  id: "project-endorsement",
  initial: "idle",
  context: ({
    input: { signer, projectUID },
  }: {
    input: { signer: JsonRpcSigner; projectUID: string };
  }) =>
    ({
      signer,
      projectUID,
    }) as Context,
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
        id: "endorser",
        src: "makeEndorsement",
        input: ({ context, event }) => ({
          endorsement:
            event.type === "ENDORSE"
              ? event.endorsement
              : {
                  metricUID: "",
                  projectUID: "",
                  description: "",
                  recipient: "",
                },
          signer: context.signer,
        }),
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
    },
  },
});
