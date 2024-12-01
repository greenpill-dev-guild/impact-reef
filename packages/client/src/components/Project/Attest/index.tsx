import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { ProjectAttestEndorsement } from "./Endorsement";
import { AttestFormValues, ProjectAttestMetric } from "./Metric";
import Image from "next/image";

interface ProjectAttestProps {
  metrics: ProjectMetric[];
  projectCreator: boolean;
  badgeholder: boolean;
  onSubmit: SubmitHandler<AttestFormValues>;
}

function generateSchema(projectCreator: boolean) {
  return projectCreator
    ? z.object({
        endorsement: z.string().nullish(),
        metrics: z
          .array(
            z
              .object({
                metricUID: z.string(),
                metricName: z.string().optional(),
                metricDescription: z.string().optional(),
                value: z.string(),
                source: z.string().url(),
              })
              .nullish(),
          )
          .nullish(),
      })
    : z.object({
        endorsement: z.string().min(100).max(250),
        metrics: z
          .array(
            z.object({
              metricUID: z.string(),
              metricName: z.string(),
              metricDescription: z.string(),
              value: z.number(),
              source: z.string(),
            }),
          )
          .nullish(),
      });
}

export const ProjectAttest: React.FC<ProjectAttestProps> = ({
  metrics,
  projectCreator,
  badgeholder,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<AttestFormValues>({
    values: {
      endorsement: "",
      metrics: [],
      // metrics.map((metric) => ({
      //   metricUID: metric.id,
      //   metricName: metric.name,
      //   metricDescription: metric.description,
      //   value: 0,
      //   source: "",
      // }))
    },
    resolver: zodResolver(generateSchema(projectCreator)),
  });

  const { fields } = useFieldArray({
    control: control,
    name: "metrics",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mb-16 flex h-full w-[540px] flex-col"
    >
      <header className="px-8 py-8">
        <h2 className="mb-2 flex items-center gap-1">
          <Image
            src="/icons/chat-alt.svg"
            alt="Endorsment Chat SVG"
            unoptimized
            width={40}
            height={40}
          />{" "}
          {projectCreator
            ? "Claim Metrics"
            : badgeholder
              ? "Evaluate"
              : "Endorse"}
        </h2>
        <p>
          {projectCreator
            ? "Be proud of your achievements and help the ecosystem understand the impact you’ve made by submitting an onchain attestation."
            : badgeholder
              ? "As an evaluator, it’s crucial to assist others and the ecosystem in understanding the impact of a project by submitting an onchain attestation, whether it be a data-driven metric or an endorsement."
              : "Support this project by submitting an onchain attestation as proof of your endorsement."}
        </p>
      </header>
      <section className="w-full flex-1 overflow-scroll bg-slate-100 px-8 py-8">
        {projectCreator ? (
          <ProjectAttestMetric metrics={fields} register={register} />
        ) : (
          <ProjectAttestEndorsement {...register("endorsement")} />
        )}
      </section>
      <footer className="fixed bottom-6 left-0 w-full px-8">
        <button
          className="button button-primary w-full"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
      </footer>
    </form>
  );
};
