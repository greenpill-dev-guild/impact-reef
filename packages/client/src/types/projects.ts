import { type introspection_types } from "./oso-env";

export type GrantTrack =
  | "onchain-builders"
  | "op-stack"
  | "dev-tooling"
  | "governance";

export type ProjectCategory =
  | "cefi"
  | "cross-chain"
  | "defi"
  | "governance"
  | "nft"
  | "social"
  | "utility";

export type Contract = {
  id: string;
  contractAddress: string;
  deployerAddress: string;
  deploymentHash: string;
  chainId: number;
};

export interface ProjectGrant {
  title: string;
  date: string;
  funds_received: string;
  description: string;
  link?: string;
}

// TODO hacked with key:string until we have data fields narrowed down
export interface ProjectItem {
  id: string;
  title: string;
  avatar_image: string;
  category: ProjectCategory;
  updated_at: string;
  creator: string;
  [key: string]: any;
}

export interface Project extends ProjectItem {
  grant_track: GrantTrack;
  description: string;
  banner_image: string;
  metrics: ProjectMetric[];
  endorsements: Endorsement[];
  repositories: string[];
  contracts: Contract[];
  funding: ProjectGrant[];
  socials: string[];
}

export enum ProjectMetricSource {
  OSO = "Open Source Observer",
  EAS = "EAS",
}

export type Oso_CodeMetricsForProject = Partial<introspection_types['Oso_CodeMetricsByArtifactV0']['fields']> & {
  source: ProjectMetricSource.OSO;
  projectUID: string;
}

export type ProjectMetric = Oso_CodeMetricsForProject;

export interface CreateEndorsement {
  recipient?: string; // Contract for Project
  projectUID: string;
  metricUID?: string;
  description: string;
}

export interface EndorsementItem {
  id: string;
  created_at: string;
  attester: string; // Endorser
}

export interface Endorsement extends EndorsementItem, CreateEndorsement {}
