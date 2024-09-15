import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getProjectDetails } from "@/actions/projects";
import {getOsoCodeMetricsByArtifact} from "@/actions/repos";

const ProjectDetailsView = dynamic(() => import("@/views/Projects/Details"));

interface Props {
  params: { uid: string };
}

// https://github.com/kroma-network/tachyon
const getArtifactNameAndNamespace = (url: string) => {
    const urlParts = url.split("/");
    const artifactName = urlParts[urlParts.length - 1];
    const artifactNamespace = urlParts[urlParts.length - 2];

    return {
        artifactName,
        artifactNamespace
    }
}

const ProjectPage: NextPage<Props> = async ({ params: { uid } }) => {
  const project = await getProjectDetails(uid);

  if (!project) {
    return <div>Project not found</div>;
  }

  const repoMetrics = project.repositories?.map((repo: string) => getArtifactNameAndNamespace(repo));

  const osoData = repoMetrics ? await getOsoCodeMetricsByArtifact(repoMetrics[0].artifactName, repoMetrics[0].artifactNamespace) : undefined;

  console.log("OSO data: ", osoData);

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
