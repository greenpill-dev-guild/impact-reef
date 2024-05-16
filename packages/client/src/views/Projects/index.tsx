import React from "react";

import { Filters } from "@/components/Filter";

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  return (
    <main className="flex gap-4">
      <aside className="basis-96">
        <div>
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Click me to show/hide content
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
      </aside>
      <section className="flex-1">
        <div>
          <h2 className="font-semibold">Projects</h2>
          <p>
            Discover and explore the magic being built by fellow project
            builders while tracking the impact metrics.
          </p>
        </div>
        <Filters
          filters={[]}
          sorts={[]}
          refreshing={false}
          onRefresh={() => {}}
          onSortChange={() => {}}
        />
      </section>
      <aside className="basis-96">
        <div>
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Click me to show/hide content
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Projects;
