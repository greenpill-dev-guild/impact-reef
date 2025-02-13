import { NextPage } from "next";
import dynamic from "next/dynamic";

const ProjectsView = dynamic(() => import("@/views/Projects"));

const ProjectsPage: NextPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 4;

  return (
    <ProjectsView query={query} page={currentPage} totalPages={totalPages} />
  );
};

export default ProjectsPage;
