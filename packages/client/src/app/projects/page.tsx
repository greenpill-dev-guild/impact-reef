import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getProjectBuilders, getProjects } from "@/actions/projects";

const ProjectsView = dynamic(() => import("@/views/Projects"));

const ProjectsPage: NextPage = async () => {
  const projects = await getProjects();
  const projectBuilders = await getProjectBuilders();

  console.log("Project Builders", projectBuilders);

  return <ProjectsView projects={projects} />;
};

export default ProjectsPage;
