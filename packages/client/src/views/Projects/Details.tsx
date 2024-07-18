"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { determineSocialMedia } from "@/utils/text";

import { useProject } from "@/hooks/projects/useProject";

import { Stat } from "@/components/Stat";
import { Collaspe } from "@/components/Collaspe";
import { Progress } from "@/components/Progress";
import { ProjectAttest } from "@/components/Project/Attest";
import { AttestFormValues } from "@/components/Project/Attest/Metric";
import ProjectEndorsements from "@/components/Project/Endorsements";
import { ProjectInfo } from "@/components/Project/Info";
import { ProjectMetrics } from "@/components/Project/Metrics";
import ProjectAttestations from "@/components/Project/Attestations";
import ProjectOverview from "@/components/Project/Overview";

export interface ProjectViewProps {
  user?: User;
  project: Project;
}

const ProjectView: React.FC<ProjectViewProps> = ({ project, user }) => {
  const { push } = useRouter();

  const {
    claimMetricsState,
    startClaiming,
    claim,
    cancelClaim,
    endorsementState,
    startEndorsing,
    endorse,
    cancelEndorse,
  } = useProject(project.id);

  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const metricList = showAllMetrics
    ? project.metrics
    : project.metrics.slice(0, 6);

  function handleShowAllMetrics() {
    setShowAllMetrics(!showAllMetrics);
  }

  const projectCreator = !!user?.address && user?.address === project.creator;

  console.log("Project", project);

  async function onSubmit(data: AttestFormValues) {
    if (projectCreator) {
      claim(
        data.metrics.map((metric) => ({ projectUID: project.id, ...metric }))
      );
    } else {
      endorse({
        projectUID: project.id,
        description: data.endorsement,
      });
    }
  }

  return (
    <main className="drawer drawer-end">
      <input id="attest-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full mx-auto flex flex-col gap-4">
        <header
          id="project-header"
          className="flex flex-col max-w-screen-xl mx-auto gap-4 py-8"
        >
          <div className="w-full flex justify-between">
            <Link
              href="/projects"
              className="bg-zinc-200 p-3 grid aspect-square place-items-center rounded-lg"
            >
              <Image
                alt="back button icon"
                src="/icons/back.svg"
                unoptimized
                width={28}
                height={28}
              />
            </Link>
            <div className="flex gap-3">
              <label
                htmlFor={
                  endorsementState.matches("endorsing") ||
                  claimMetricsState.matches("claiming")
                    ? undefined
                    : "attest-drawer"
                }
                onClick={projectCreator ? cancelClaim : cancelEndorse}
                className="grid place-items-center drawer-button w-36 p-4 rounded-full bg-blue-950 text-neutral-50 font-semibold leading-snug btn"
              >
                {projectCreator ? "Claim Metric" : "Endorse"}
              </label>
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
          className="flex w-full max-w-screen-xl mx-auto gap-3 py-6"
        >
          <ProjectInfo
            funding={project.funding}
            contracts={project.contracts}
            repositories={project.repositories}
          />
          <ProjectMetrics metrics={project.metrics} />
          <ProjectAttestations />
        </div>
        <ProjectEndorsements
          banner={project.banner_image}
          endorsements={project.endorsements}
        />
        <footer className="w-full flex justify-between max-w-screen-xl mx-auto py-12">
          <button
            onClick={() => {
              push("/projects");
            }}
            className="border-blue-950 text-blue-950 text-sm font-semibold border rounded-full px-4 py-2 flex gap-1 items-center"
          >
            Return to projects
            <Image
              alt="back icon for returing to view projects"
              src="/icons/back.svg"
              unoptimized
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={() => {
              window.scroll({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="w-40 border-blue-950 text-blue-950 text-sm font-semibold border rounded-full px-4 py-2 flex gap-1 items-center justify-center"
          >
            Back to top
            <Image
              alt="back icon for returing to view projects"
              src="/icons/arrow-up.svg"
              unoptimized
              width={16}
              height={16}
            />
          </button>
        </footer>
      </div>
      <div className="drawer-side h-screen">
        <label
          htmlFor={
            endorsementState.matches("endorsing") ||
            claimMetricsState.matches("claiming")
              ? undefined
              : "attest-drawer"
          }
          onClick={projectCreator ? startClaiming : startEndorsing}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="bg-base-200 text-base-content min-h-full">
          <ProjectAttest
            onSubmit={onSubmit}
            metrics={project.metrics}
            badgeholder={!!user?.badgeholder}
            projectCreator={!projectCreator}
          />
        </aside>
      </div>
    </main>
  );
};

export default ProjectView;
