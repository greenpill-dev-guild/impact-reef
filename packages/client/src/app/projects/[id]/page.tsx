import { NextPage } from "next";
import dynamic from "next/dynamic";

const ProjectDetailsView = dynamic(() => import("@/views/Projects/Details"));

const ProjectPage: NextPage = () => <ProjectDetailsView />;

export default ProjectPage;
