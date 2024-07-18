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
              metricName: z.string().optional(),
              metricDescription: z.string().optional(),
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
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<AttestFormValues>({
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
    resolver: zodResolver(generateSchema(!projectCreator)),
  });

  const { fields } = useFieldArray({
    control: control,
    name: "metrics",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[680px] relative h-full mb-16 flex flex-col"
    >
      <header className="py-8 px-12">
        <h2 className="mb-2">
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
      <section className="bg-slate-200 w-full overflow-scroll flex-1">
        {projectCreator ? (
          <ProjectAttestMetric metrics={fields} register={register} />
        ) : (
          <ProjectAttestEndorsement {...register("endorsement")} />
        )}
      </section>
      <footer className="w-full fixed bottom-6 left-0 px-8">
        <button
          className="w-full btn rounded-3xl"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
      </footer>
    </form>
  );
};
