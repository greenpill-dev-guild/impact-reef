"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useProjects } from "@/hooks/projects/useProjects";

import { List } from "@/components/List";
import { Filters } from "@/components/Filter";
import { getProjects } from "@/actions/projects";

const ProjectsView: React.FC = () => {
  const { push } = useRouter();
  const {} = useProjects(20);
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
    };
    fetchProjects();
  }, []);

  return (
    <main className="flex flex-row gap-4 min-h-screen p-12">
      <div className="flex flex-col gap-4 w-full mx-auto">
        <section className="w-full mx-auto max-w-screen-xl gap-4">
          <h1 className="text-4xl font-semibold">Projects</h1>
          <p className="mb-6">
            Discover and explore the magic being built by fellow project
            builders while tracking the impact metrics.
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
          <div>
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
          </div>
        </section>
      </div>
      <aside className="basis-60">
        <div className="rounded-xl p-6 w-full h-[460px] bg-no-repeat bg-cover bg-clip-padding bg-right-top bg-[url('/images/img-project-side.jpg')]">
          <h3 className="text-2xl font-semibold mb-6">
            Observe the impact of projects on the ecosystem
          </h3>
          <p className="text-base font-light">
            Guided by proposed metrics from Impact evaluators. Project builders,
            evaluators, and community members are actively shaping these metrics
            by attesting to the outcomes on-chain
          </p>
        </div>
      </aside>
    </main>
  );
};

export default ProjectsView;
