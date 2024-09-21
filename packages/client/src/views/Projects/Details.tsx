"use client";

import React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { ZERO_BYTES32 } from "@ethereum-attestation-service/eas-sdk";

import { useEndorsements } from "@/hooks/useEndorsements";

import { ProjectInfo } from "@/components/Project/Info";
import { ProjectAttest } from "@/components/Project/Attest";
import { ProjectMetrics } from "@/components/Project/Metrics";
import { ProjectOverview } from "@/components/Project/Overview";
import { ProjectAttestations } from "@/components/Project/Attestations";
import { ProjectEndorsements } from "@/components/Project/Endorsements";
import { AttestFormValues } from "@/components/Project/Attest/Metric";

export interface ProjectViewProps {
  user: User;
  project: Project;
  badgeholders: Map<string, string>;
}

const ProjectView: React.FC<ProjectViewProps> = ({ project, badgeholders }) => {
  const { address } = useAccount();
  const { createEndorsement, endorsementList } = useEndorsements(project.id);

  const projectCreator = !!address && address === project.creator;

  async function onSubmit(data: AttestFormValues) {
    await createEndorsement({
      projectUID: project.id,
      metricUID: ZERO_BYTES32,
      description: data.endorsement,
    });
  }

  return (
    <div className="drawer drawer-end">
      <input id="attest-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mx-auto flex w-full flex-col gap-4">
        <header
          id="project-header"
          className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 py-8"
        >
          <div className="flex w-full justify-between">
            <Link href="/projects" className="button-icon">
              <FaArrowLeft className="w-4" />
            </Link>
            <div className="flex gap-3">
              {address && (
                <label
                  htmlFor={false ? undefined : "attest-drawer"}
                  // onClick={projectCreator ? cancelClaim : cancelEndorse}
                  className="button button-primary drawer-button"
                >
                  Endorse
                </label>
              )}
            </div>
          </div>
          <ProjectOverview
            title={project.title}
            description={project.description}
            avatar_image={project.avatar_image}
            category={project.category}
            grant_track={project.grant_track}
            socials={project.socials}
          />
        </header>
        <div
          id="project-metrics"
          className="mx-auto flex w-full max-w-screen-xl gap-3 py-6"
        >
          <ProjectInfo
            funding={project.funding}
            contracts={project.contracts}
            repositories={project.repositories}
          />
          <ProjectMetrics metrics={project.metrics} />
          <ProjectAttestations
            endorsements={endorsementList}
            badgeholders={badgeholders}
          />
        </div>
        <ProjectEndorsements
          banner={project.banner_image}
          endorsements={endorsementList}
        />
        <footer className="mx-auto flex w-full max-w-screen-xl justify-between py-12">
          <Link href="/projects" className="button button-secondary w-48">
            Return to projects
            <FaArrowLeft className="w-3" />
          </Link>
          <button
            onClick={() => {
              window.scroll({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="button button-secondary w-48"
          >
            Back to top
            <FaArrowUp className="w-3" />
          </button>
        </footer>
      </div>
      <div className="drawer-side h-screen">
        <label
          htmlFor={false ? undefined : "attest-drawer"}
          // onClick={projectCreator ? startClaiming : startEndorsing}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="min-h-full bg-slate-50 text-base-content">
          <ProjectAttest
            onSubmit={onSubmit}
            metrics={project.metrics}
            badgeholder={false}
            projectCreator={projectCreator}
          />
        </aside>
      </div>
    </div>
  );
};

export default ProjectView;
