import { NextPage } from "next";
import dynamic from "next/dynamic";

const ProjectDetailsView = dynamic(() => import("@/views/Projects/Details"));

const ProjectPage: NextPage = () => {
  const project: Project = {
    id: "",
    title: "",
    attestation_counts: 0,
    transactions_count: 0,
    avatar_image: "",
    banner_image: "",
    category: "cefi",
    description: "",
    endorsments: [],
    metrics: [],
    socials: [],
    updated_at: "",
  };

  return <ProjectDetailsView project={project} />;
};

export default ProjectPage;
