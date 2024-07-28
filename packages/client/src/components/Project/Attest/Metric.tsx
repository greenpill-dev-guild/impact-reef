import Image from "next/image";
import { forwardRef } from "react";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

export interface AttestFormValues {
  endorsement: string;
  metrics: {
    metricUID: string;
    metricName: string;
    metricDescription: string;
    value: number;
    source: string;
  }[];
}

interface ProjectAttestMetricProps {
  register: UseFormRegister<AttestFormValues>;
  metrics: FieldArrayWithId<AttestFormValues, "metrics", "metricUID">[];
}

export const ProjectAttestMetric = forwardRef<
  HTMLTextAreaElement,
  ProjectAttestMetricProps
>(({ register, metrics }) => {
  return (
    <div className="collapse collapse-arrow w-full h-full px-8 bg-gray-4s00">
      <input type="checkbox" />
      <div className="collapse-title">
        <h3 className="flex items-center gap-1 mb-2">
          <Image
            src="/icons/flag.svg"
            alt="Metric Claim SVG"
            width={32}
            height={32}
            unoptimized
          />{" "}
          Metric
        </h3>
        <p className="mb-4">
          There are <b>{metrics.length}</b> metrics available for onchain
          builders to attest to their projects. Each metric-based attestation
          must include a link for verification purposes.
        </p>
      </div>
      <ul className="collapse-content flex flex-col gap-2">
        {metrics.map((metric, index) => (
          <li
            key={metric.metricUID}
            className="collapse collapse-arrow border border-slate-500 px-2 py-3"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              {metric.metricName}
            </div>
            <div className="collapse-content">
              <p className="text-gray-300">{metric.metricDescription}</p>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">Data</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register(`metrics.${index}.value`)}
                />
                <div className="label">
                  <span className="label-text-alt text-light text-base">
                    This field must be a number format.
                  </span>
                </div>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Support Link
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register(`metrics.${index}.source`)}
                />
                <div className="label">
                  <span className="label-text-alt text-light text-base">
                    Please include a support link for your attest.
                  </span>
                </div>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

ProjectAttestMetric.displayName = "Project Attest Metric";