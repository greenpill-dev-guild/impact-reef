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
  // const pathname = usePathname();
  // const currentPage = Number(params?.page) || 1;

  // const createPageURL = (pageNumber: number | string) => {
  //   // const newParams = new URLSearchParams(params);
  //   newParams.set("page", pageNumber.toString());
  //   return `${pathname}?${newParams.toString()}`;
  // };

  const projects = await getProjects();
  const projectBuilders = await getProjectBuilders();

  console.log("Project Builders", projectBuilders);

  return <ProjectsView projects={projects} />;
};

export default ProjectsPage;
