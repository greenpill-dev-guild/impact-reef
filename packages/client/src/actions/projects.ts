"use server";

import {
  getRetroFundingRoundProjects,
  getRetroFundingRoundProjectsResponse,
  getRetroFundingRoundProjectById,
  getRetroFundingRoundProjectByIdResponse,
} from "@/__generated__/api/agora";
import {
  Project as OpProject,
  PageMetadata,
} from "@/__generated__/api/agora.schemas";

import { parseOpProjectToProjectItem } from "@/utils/parseData";

import { getProjectEndorsements } from "./endorsements";
import { getOsoCodeMetricsByArtifact } from "./repos";

const getArtifactNameAndNamespace = (url: string) => {
  const urlParts = url.split("/");
  const artifactName = urlParts[urlParts.length - 1];
  const artifactNamespace = urlParts[urlParts.length - 2];

  return {
    artifactName,
    artifactNamespace,
  };
};

export type ProjectsResponse = {
  metadata?: PageMetadata;
  data?: OpProject[];
};

export type ProjectResponse = {
  data?: OpProject;
};

export const getProjects = async (
  query?: string,
  page?: number,
): Promise<Project[]> => {
  const projects = await getRetroFundingRoundProjects(5, {
    limit: 25,
    offset: page ? (page - 1) * 25 : 0,
    category: "all",
  }).then((results: getRetroFundingRoundProjectsResponse) => {
    const res: ProjectsResponse = results.data;
    return res.data;
  });

  return (
    projects?.map((project) => parseOpProjectToProjectItem(project)) ?? []
    // ?.filter((project) => project.name?.includes(query ?? ""))
  );
};

export const getProject = async (
  projectId: string,
): Promise<Project | undefined> => {
  const opProject = await getRetroFundingRoundProjectById(5, projectId).then(
    (results: getRetroFundingRoundProjectByIdResponse) => {
      return results.data;
    },
  );

  if (!opProject) return undefined;

  const project = parseOpProjectToProjectItem(opProject);
  const repos = project.repositories?.map((repo: string) =>
    getArtifactNameAndNamespace(repo),
  );

  const endorsements = await getProjectEndorsements(projectId);
  const metrics = await getOsoCodeMetricsByArtifact(
    projectId,
    repos[0]?.artifactName,
    repos[0]?.artifactNamespace,
  );

  return {
    ...project,
    endorsements,
    metrics,
  };
};
