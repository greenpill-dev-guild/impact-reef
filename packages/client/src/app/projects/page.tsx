import { NextPage } from "next";
import dynamic from "next/dynamic";

import { projects as mockProjects } from "@/utils/mockData";

const ProjectsView = dynamic(() => import("@/views/Projects"));

const ProjectsPage: NextPage = () => {
  // const projects: Project[] = [];

  return <ProjectsView projects={mockProjects} />;
};

export default ProjectsPage;
