import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getProjectDetails } from "@/actions/projects";

const ProjectDetailsView = dynamic(() => import("@/views/Projects/Details"));

interface Props {
  params: { uid: string };
}

const ProjectPage: NextPage<Props> = async ({ params: { uid } }) => {
  const project = await getProjectDetails(uid);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <ProjectDetailsView
      project={project}
      user={{
        address: "0x1234567890abcdef1234567890abcdef1234567890", // Placeholder
        badgeholder: true, // Placeholder
        council_member: true, // Placeholder
        metrics_admin: true, // Placeholder
      }}
    />
  );
};

export default ProjectPage;
