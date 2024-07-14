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

  const badgeholdr = true;
  const projectCreator = !!user?.address && user?.address === project.creator;

  console.log("Project", project);

  async function onSubmit(
    data: AttestFormValues,
    event?: React.BaseSyntheticEvent
  ) {}

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
                htmlFor="attest-drawer"
                className="grid place-items-center drawer-button w-36 p-4 rounded-full bg-blue-950 text-neutral-50 font-semibold leading-snug"
              >
                {projectCreator ? "Claim Metric" : "Endorse"}
              </label>
            </div>
          </div>
          <div className="flex items-center gap-4 px-8 py-6 bg-zinc-50 shadow-md rounded-md">
            <Image
              className="aspect-square"
              alt="porject logo/avatar"
              src={project.avatar_image}
              width={120}
              height={120}
            />
            <div className="flex-1">
              <h1 className="font-semibold text-5xl">{project.title}</h1>
              <p>{project.description}</p>
            </div>
            <div className="basis-72 flex flex-col h-full justify-between items-end gap-6">
              <ul className="flex gap-2">
                {project.socials.map((link) => {
                  const social = determineSocialMedia(link);

                  return (
                    <li key={link} className="p-2 rounded-full bg-zinc-100">
                      <Link href={link}>
                        <Image
                          alt={`${social.label} icon`}
                          src={social.icon}
                          width={24}
                          height={24}
                          unoptimized
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div>
                <div className="flex gap-2 mb-2 justify-end">
                  <h4 className="bg-violet-200 rounded-sm px-2 py-1 text-xl font-bold tracking-wide">
                    {project.grant_track}
                  </h4>
                  <p className="bg-orange-300 rounded-sm px-2 py-1 text-lg font-light">
                    {project.category}
                  </p>
                </div>
                <p className="bg-zinc-200 rounded-sm px-2 py-1 text-sm">
                  Base information from OP retro round #4
                </p>
              </div>
            </div>
          </div>
        </header>
        <div
          id="project-metrics"
          className="flex w-full max-w-screen-xl mx-auto gap-3 py-6"
        >
          <aside className="basis-72 flex flex-col gap-2">
            <Collaspe title="Repository">
              <ul>
                {project.repositories.map((repo) => (
                  <li key={repo}>
                    <Link href={repo}>{repo}</Link>
                  </li>
                ))}
              </ul>
            </Collaspe>
            <Collaspe title="Contracts">
              <ul>
                {project.contracts.map((contract) => (
                  <li key={contract}>
                    <Link href={contract}>{contract}</Link>
                  </li>
                ))}
              </ul>
            </Collaspe>
            <Collaspe title="Funding">
              <ul className="flex flex-col gap-2">
                {project.funding.map((fund) => (
                  <li key={fund.title} className="flex flex-col gap-1">
                    <h5 className="text-xl font-semibold">{fund.title}</h5>
                    <div>
                      <p className="text-xs font-light">Date: {fund.date}</p>
                      <p className="text-xs font-light">
                        Funds received: {fund.funds_received}
                      </p>
                    </div>
                    <p className="text-sm">{fund.description}</p>
                    {fund.link && <Link href="link">{fund.link}</Link>}
                  </li>
                ))}
              </ul>
            </Collaspe>
          </aside>
          <section className="flex flex-col items-center flex-1 gap-8 bg-zinc-200 p-6 rounded-lg shadow-md">
            <div className="flex gap-2">
              <Image
                src="/icons/flag.svg"
                alt="flag icon to represent metrics"
                unoptimized
                width={32}
                height={32}
              />
              <h2 className="font-semibold text-3xl">Metrics</h2>
            </div>
            <ul className="grid grid-cols-2 grid-rows-auto gap-4 min-h-[794px]]">
              {metricList.map((metric) => (
                <li
                  key={metric.name}
                  className="w-72 card p-4 flex flex-col justify-between min-h-40 bg-white shadow-sm rounded-md"
                >
                  <h3 className="text-sm font-light line-clamp-2">
                    {metric.name}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-4xl font-bold">
                      {metric.value ? metric.value.toLocaleString() : "-"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <button
              disabled={project.metrics.length <= 6}
              onClick={handleShowAllMetrics}
              className="w-32 rounded-full bg-slate-400 text-center px-4 py-2 text-neutral-50 font-semibold leading-snug"
            >
              {showAllMetrics && project.metrics.length > 6
                ? "View Less"
                : "Show All"}
            </button>
          </section>
          <aside className="basis-72 flex flex-col gap-2">
            <Stat
              stats={[
                {
                  title: "total attestations",
                  value: 321,
                },
              ]}
            >
              {/* Todo Add Graph */}
            </Stat>
            <Stat
              stats={[
                {
                  title: "Unique Attesters",
                  value: 21,
                },
              ]}
            >
              <div className="flex flex-col mt-2">
                <Progress
                  max={111}
                  value={75}
                  color="#ef4444"
                  className="mb-2 progress-error"
                />
                <div className="flex gap-1 text-sm font-light items-center">
                  <span className="rounded-full bg-red-500 h-2 w-2" />
                  Badge holders {((75 / 111) * 100).toPrecision(2)}%
                </div>
                <div className="flex gap-1 text-sm font-light items-center">
                  <span className="rounded-full bg-gray-500 h-2 w-2" />
                  Others {((33 / 111) * 100).toPrecision(2)}%
                </div>
              </div>
            </Stat>
            <Stat
              stats={[
                {
                  title: "Number of metrics attested",
                  value: 12,
                },
                {
                  title: "Number of endorsements",
                  value: 12,
                },
                {
                  title: "Last attest at",
                  value: "4 days ago",
                },
              ]}
            />
          </aside>
        </div>
        <section
          id="project-endorsements"
          className="w-full min-h-screen max-w-screen-xl mx-auto flex flex-col items-center gap-12 py-12"
        >
          <Image
            src={project.banner_image}
            alt="project banner"
            className="w-full aspect-[16/6] rounded-md"
            width={1600}
            height={900}
          />
          <div className="flex gap-2">
            <Image
              src="/icons/chat-alt.svg"
              alt="flag icon to represent comparison"
              unoptimized
              width={32}
              height={32}
            />
            <h2 className="font-semibold text-3xl">Endorsements</h2>
          </div>
          <ul className="grid grid-cols-4 grid-rows-auto gap-4 w-full">
            {project.endorsements.map((endorsement) => (
              <li
                key={endorsement.id}
                className="p-3 bg-neutral-100 rounded-md shadow-sm flex flex-col justify-between gap-6"
              >
                <p className="">{endorsement.description}</p>
                <div>
                  <p className="line-clamp-1 font-semibold">
                    by {endorsement.attester}
                  </p>
                  <span>
                    {new Date(Date.parse(endorsement.updated_at)).getUTCDate()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
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
      <div className="drawer-side">
        <label
          htmlFor="attest-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="bg-base-200 text-base-content min-h-full w-[420px] p-4">
          <ProjectAttest
            onSubmit={onSubmit}
            metrics={project.metrics}
            badgeholder={badgeholdr}
            projectCreator={projectCreator}
          />
        </aside>
      </div>
    </main>
  );
};

export default ProjectView;
