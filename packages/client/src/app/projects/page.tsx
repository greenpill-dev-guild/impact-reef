import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getProjectBuilders, getProjects } from "@/actions/projects";

const ProjectsView = dynamic(() => import("@/views/Projects"));

interface Props {
  params: {
    page?: string;
  };
}

const ProjectsPage: NextPage<Props> = async ({ params }) => {
  const projects = await getProjects();
  const projectBuilders = await getProjectBuilders();

  return <ProjectsView projects={projects} />;
};

export default ProjectsPage;
