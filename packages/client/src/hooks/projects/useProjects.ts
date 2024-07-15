import { useState, useEffect } from "react";

interface UseProjectsResult {
  projects: Project[];
  currentPage: number;
  totalProjects: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
  setPage: (page: number) => void;
}

export const useProjects = (
  initialPageSize: number = 10
): UseProjectsResult => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    // fetchProjects(currentPage, initialPageSize);
  }, [currentPage]);

  // const fetchProjects = async (page: number, size: number) => {
  //   const response = await fetch(`/api/projects?page=${page}&size=${size}`);
  //   const data = await response.json();
  //   setProjects(data.projects);
  //   setTotalProjects(data.total);
  // };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProjects / initialPageSize);

  return {
    projects,
    currentPage,
    totalProjects,
    totalPages,
    nextPage,
    previousPage,
    setPage,
  };
};
