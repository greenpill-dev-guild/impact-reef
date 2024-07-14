import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getProject } from "@/actions/projects";
import { Web3Provider } from "@/hooks/auth/Provider";

const ProjectDetailsView = dynamic(() => import("@/views/Projects/Details"));

interface Params {
  uid: string;
}

const ProjectPage: NextPage<Params> = async ({ uid }) => {
  const project = await getProject(uid);

  return (
    <Web3Provider>
      <ProjectDetailsView project={project} />;
    </Web3Provider>
  );
};

export default ProjectPage;
