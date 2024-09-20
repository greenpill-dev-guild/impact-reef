import React from "react";

import { Pagination } from "@/components/Pagination";
import { ProjectList } from "@/components/Project/List";
// import { Filters } from "@/components/Filter";

interface ProjectViewProps {
  query: string;
  page: number;
  totalPages: number;
}

const ProjectsView: React.FC<ProjectViewProps> = ({
  query,
  page,
  totalPages,
}) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl py-12">
      <h1 className="mb-1 text-4xl font-semibold">Projects</h1>
      <p className="mb-6 text-lg font-light">
        Discover and explore the magic being built by fellow project builders
        while tracking the impact metrics.
      </p>
      <div className="flex w-full flex-row gap-4">
        <section className="flex-1">
          <ProjectList
            query={query}
            page={page}
            columns={[
              { title: "name", size: 4 },
              { title: "category", size: 2 },
              // { title: "transaction counts", size: 3 },
              // { title: "attestation counts", size: 3 },
              // { title: "last updated", size: 2 },
            ]}
          />
          <Pagination totalPages={totalPages} />
        </section>
        <aside className="w-72">
          <div className="h-[460px] w-full rounded-xl bg-[url('/images/img-project-side.jpg')] bg-cover bg-clip-padding bg-right-top bg-no-repeat p-6">
            <h3 className="mb-1 text-2xl font-semibold capitalize">
              Observe the impact of projects on the ecosystem
            </h3>
            <p className="text-base font-light">
              Guided by metrics from Impact Evaluators. Project builders,
              evaluators, and community members are actively shaping these
              metrics to provide a comprehensive view of the project&apos;s
              impact.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectsView;
