"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useProjects } from "@/hooks/projects/useProjects";

import { List } from "@/components/List";
import { Filters } from "@/components/Filter";

export interface ProjectsViewProps {
  projects: ProjectItem[];
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  const { push } = useRouter();
  const {} = useProjects(20);

  return (
    <main className="flex flex-col gap-4 min-h-screen">
      <header className="w-full mx-auto max-w-screen-xl">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <p className="mb-6">
          Discover and explore the magic being built by fellow project builders
          while tracking the impact metrics.
        </p>
        <Filters
          filters={[
            {
              title: "Onchain Builders",
              count: 25,
              active: true,
              onFilterChange: () => {},
            },
            {
              title: "OP Stack",
              count: 0,
              active: true,
              onFilterChange: () => {},
            },
            {
              title: "Governance",
              count: 0,
              active: false,
              onFilterChange: () => {},
            },
            {
              title: "Dev Tooling",
              count: 25,
              active: false,
              onFilterChange: () => {},
            },
          ]}
          sorts={[
            {
              label: "Name: A-Z",
              value: "name",
            },
            {
              label: "Most Attested",
              value: "attested",
            },
            {
              label: "Most Transacted",
              value: "transacted",
            },
            {
              label: "Latest - Oldest",
              value: "latest",
            },
          ]}
          activeSort="name"
          refreshing={false}
          onRefresh={() => {}}
          onSortChange={() => {}}
        />
      </header>
      <div className="flex gap-4 w-full mx-auto max-w-screen-xl ">
        <section className="flex-1">
          <List
            columns={[
              { title: "project", size: 4 },
              { title: "category", size: 2 },
              { title: "transaction counts", size: 3 },
              { title: "attestation counts", size: 3 },
              { title: "last updated", size: 2 },
            ]}
            items={projects}
            onItemClick={(id) => {
              console.log("Project", id);
              push(`/projects/${id}`);
            }}
          />
        </section>
        <aside className="basis-72">
          <div className="rounded-xl p-6 w-full h-[460px] bg-no-repeat bg-cover bg-clip-padding bg-right-top bg-[url('/images/img-project-side.jpg')]">
            <h3 className="text-2xl font-semibold mb-6">
              Observe the impact of projects on the ecosystem
            </h3>
            <p className="text-base font-light">
              Guided by proposed metrics from Impact evaluators. Project
              builders, evaluators, and community members are actively shaping
              these metrics by attesting to the outcomes on-chain
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ProjectsView;
