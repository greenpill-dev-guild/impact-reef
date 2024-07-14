import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { ProjectAttestEndorsement } from "./Endorsement";
import { AttestFormValues, ProjectAttestMetric } from "./Metric";

interface ProjectAttestProps {
  metrics: ProjectMetricItem[];
  projectCreator: boolean;
  badgeholder: boolean;
  onSubmit: SubmitHandler<AttestFormValues>;
}

function generateSchema(projectCreator: boolean) {
  return projectCreator
    ? z.object({
        endorsement: z.string().min(100).max(1000).nullish(),
        metrics: z
          .array(
            z.object({
              metricUID: z.string(),
              metricName: z.string(),
              metricDescription: z.string(),
              value: z.number(),
              source: z.string(),
            })
          )
          .nonempty(),
      })
    : z.object({
        endorsement: z.string().min(100).max(1000),
        metrics: z
          .array(
            z.object({
              metricUID: z.string(),
              metricName: z.string(),
              metricDescription: z.string(),
              value: z.number(),
              source: z.string(),
            })
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
  const { register, handleSubmit, control } = useForm<AttestFormValues>({
    shouldUseNativeValidation: true,
    values: {
      endorsement: "",
      metrics: metrics.map((metric) => ({
        metricUID: metric.id,
        metricName: metric.name,
        metricDescription: metric.description,
        value: 0,
        source: "",
      })),
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
      className="pt-3 pb-6 overflow-scroll"
    >
      <header>
        <h2>
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
      <section>
        {projectCreator ? (
          <ProjectAttestMetric metrics={fields} register={register} />
        ) : (
          <ProjectAttestEndorsement {...register("endorsement")} />
        )}
      </section>
      <div className="w-full px-4 fixed bottom-0 left-0">
        <button className="w-full" disabled={true}>
          Submit
        </button>
      </div>
    </form>
  );
};
