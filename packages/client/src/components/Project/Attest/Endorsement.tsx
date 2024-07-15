import Image from "next/image";
import { forwardRef, InputHTMLAttributes } from "react";

interface ProjectAttestEndorsementProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  // register: any;
}

export const ProjectAttestEndorsement = forwardRef<
  HTMLTextAreaElement,
  ProjectAttestEndorsementProps
>(({ ...props }, ref) => {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow w-full px-8 bg-gray-300"
    >
      <h3 className="mb-3 text-xl font-semibold">
        <Image
          src="/icons/chat.svg"
          alt="Endorsment Chat SVG"
          unoptimized
          width={48}
          height={48}
        />{" "}
        Endorsement
      </h3>
      <p className="">
        This type of attestation is intended as a soft evaluation, ranging from
        any beneficial actions for the community to efforts spread over the
        years.
      </p>
      <textarea
        className="mb-2"
        placeholder="when someone enter text, use this color"
        ref={ref}
        {...props}
      />
      <p className="text-sm">500 Characters Max</p>
    </div>
  );
});

ProjectAttestEndorsement.displayName = "Project Attest Endorsement";
