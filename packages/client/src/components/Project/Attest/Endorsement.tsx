import Image from "next/image";
import { forwardRef } from "react";

interface ProjectAttestEndorsementProps {
  register: any;
}

export const ProjectAttestEndorsement = forwardRef<
  HTMLTextAreaElement,
  ProjectAttestEndorsementProps
>(({ register }, ref) => {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow w-full px-8 bg-gray-300"
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
        <textarea
          className="mb-2"
          placeholder="when someone enter text, use this color"
          ref={ref}
          {...register}
        />
        <p className="text-sm">500 Characters Max</p>
      </div>
    </div>
  );
});
