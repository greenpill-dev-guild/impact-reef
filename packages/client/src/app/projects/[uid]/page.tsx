import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getProject } from "@/actions/projects";

const ProjectDetailsView = dynamic(() => import("@/views/Projects/Details"));

interface Params {
  uid: string;
}

const ProjectPage: NextPage<Params> = async ({ uid }) => {
  const project = await getProject(uid);

  return <ProjectDetailsView project={project} />;
};

export default ProjectPage;
