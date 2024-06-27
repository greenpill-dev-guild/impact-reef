import Image from "next/image";
import { forwardRef } from "react";

interface ProjectAttestMetricProps {
  metrics: any[];
}
const ProjectAttestMetric = forwardRef<
  HTMLTextAreaElement,
  ProjectAttestMetricProps
>(({ metrics }, ref) => {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow w-full px-8 bg-gray-4s00"
    >
      <div className="collapse-title text-xl font-medium">
        <h3 className="mb-3 text-xl font-semibold">
          <Image src="/icons/chat.svg" alt="Endorsment Chat SVG" unoptimized />{" "}
          Endorsement
        </h3>
        <p className="">
          This type of attestation is intended as a soft evaluation, ranging
          from any beneficial actions for the community to efforts spread over
          the years.
        </p>
      </div>
      <div className="collapse-content">
        <ul className="flex flex-col gap-2">
          {metrics.map((metric) => (
            <li
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-200 px-2 py-3"
            >
              <div className="collapse-title text-xl font-medium">
                {metric.title}
              </div>
              <div className="collapse-content">
                <p className="text-gray-300">{metric.description}</p>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Date</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      This field must be a number format.
                    </span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Support Link</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      Please include a support link for your attest.
                    </span>
                  </div>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
