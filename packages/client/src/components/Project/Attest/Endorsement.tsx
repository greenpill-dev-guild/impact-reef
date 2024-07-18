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
    <div className="collapse collapse-arrow w-full py-8 px-12">
      <h3 className="flex items-center gap-1 mb-2">
        <Image
          src="/icons/chat-alt.svg"
          alt="Endorsment Chat SVG"
          unoptimized
          width={32}
          height={32}
        />{" "}
        Endorsement
      </h3>
      <p className="mb-4">
        This type of attestation is intended as a soft evaluation, ranging from
        any beneficial actions for the community to efforts spread over the
        years.
      </p>
      <textarea
        rows={10}
        className="mb-2 p-4 rounded-lg border border-gray-400"
        placeholder="when someone enter text, use this color"
        ref={ref}
        {...props}
      />
      <p className="text-sm">500 Characters Max</p>
    </div>
  );
});

ProjectAttestEndorsement.displayName = "Project Attest Endorsement";
