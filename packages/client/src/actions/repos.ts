import { osoClient } from "@/modules/urql";
import { osoGraphQL } from "@/modules/graphql";
import { introspection_types } from "@/types/oso-env";

export enum ProjectMetricSource {
  OSO = "Open Source Observer",
  EAS = "EAS",
}

export type Oso_CodeMetricsForProject = Partial<
  introspection_types["Oso_CodeMetricsByArtifactV0"]["fields"]
> & {
  source: ProjectMetricSource.OSO;
  projectUID: string;
};

export const getOsoCodeMetricsByArtifact = async (
  projectUID: string,
  artifactName?: string | null,
  artifactNamespace?: string | null,
): Promise<ProjectMetric[]> => {
  if (!artifactName) return [];
  if (!artifactNamespace) return [];

  const QUERY = osoGraphQL(/* GraphQL */ `
    query Oso_codeMetricsByArtifactV0(
      $where: Oso_CodeMetricsByArtifactV0BoolExp
    ) {
      oso_codeMetricsByArtifactV0(where: $where) {
        activeDeveloperCount6Months
        artifactId
        artifactName
        artifactNamespace
        closedIssueCount6Months
        commitCount6Months
        contributorCount
        contributorCount6Months
        eventSource
        firstCommitDate
        forkCount
        fulltimeDeveloperAverage6Months
        lastCommitDate
        mergedPullRequestCount6Months
        newContributorCount6Months
        openedIssueCount6Months
        openedPullRequestCount6Months
        starCount
      }
    }
  `);

  const { data, error } = await osoClient
    .query(QUERY, {
      where: {
        artifactName: {
          _ilike: artifactName,
        },
        artifactNamespace: {
          _ilike: artifactNamespace,
        },
      },
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.warn("No data found");

  if (!data?.oso_codeMetricsByArtifactV0) return [];

  return (
    data?.oso_codeMetricsByArtifactV0?.map((osoMetrics) => {
      return {
        source: ProjectMetricSource.OSO,
        projectUID,
        ...osoMetrics,
      };
    }) ?? []
  );
};
