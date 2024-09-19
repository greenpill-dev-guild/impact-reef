import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getProject } from "@/actions/projects";
import { getBadgeholders } from "@/actions/badgeholders";

export const ProjectDetailsView = dynamic(
  () => import("@/views/Projects/Details"),
);

interface Props {
  params: { uid: string };
}

const ProjectPage: NextPage<Props> = async ({ params: { uid } }) => {
  const project = await getProject(uid);
  const badgeholders = await getBadgeholders();

  if (!project) {
    return null;
  }

  return (
    <ProjectDetailsView
      project={project}
      badgeholders={badgeholders}
      user={{
        address: "",
        badgeholder: false, // Placeholder
        council_member: false, // Placeholder
        metrics_admin: false, // Placeholder
      }}
    />
  );
};

export default ProjectPage;
