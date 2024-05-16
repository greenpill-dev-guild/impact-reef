import { NextPage } from "next";
import dynamic from "next/dynamic";

const ProjectsView = dynamic(() => import("@/views/Projects"));

const ProjectsPage: NextPage = () => <ProjectsView />;

export default ProjectsPage;
