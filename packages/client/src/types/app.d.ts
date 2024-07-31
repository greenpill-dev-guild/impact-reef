declare interface User {
  // fid?: number;
  // name?: string;
  // image?: string;
  badgeholder: boolean;
  metrics_admin: boolean;
  council_member: boolean;
  address: string;
}

declare enum Impact {
  LOW,
  MEDIUM,
  HIGH,
}

declare type GrantTrack =
  | "onchain-builders"
  | "op-stack"
  | "dev-tooling"
  | "governance";

declare type ProjectCategory =
  | "cefi"
  | "cross-chain"
  | "defi"
  | "governance"
  | "nft"
  | "social"
  | "utility";

declare interface CreateMetric {
  name: string;
  description: string;
  rationale: string;
  impact: Impact;
  category:
    | "developer-ecosystem"
    | "collective-governance"
    | "op-stack"
    | "end-user";
  term:
    | "discovery-journey"
    | "resilience"
    | "performance"
    | "user-experience"
    | "education"
    | "developer-support"
    | "developer-tooling"
    | "governance-participation"
    | "awareness"
    | "collaboration"
    | "understandability"
    | "adoption"
    | "security"
    | "governance-accesibility"
    | "capture-resistance"
    | "modularity"
    | "accountability";
  keyword: string;
}

declare interface Metric extends CreateMetric {
  id: string;
  createdAt: string;
}

declare interface ProjectGrant {
  title: string;
  date: string;
  funds_received: string;
  description: string;
  link?: string;
}

declare interface ProjectItem {
  id: string;
  title: string;
  avatar_image: string;
  category: ProjectCategory;
  updated_at: string;
  creator: string;
}

declare interface Project extends ProjectItem {
  grant_track: GrantTrack;
  description: string;
  banner_image: string;
  metrics: ProjectMetric[];
  endorsements: Endorsement[];
  repositories: string[];
  contracts: string[];
  funding: ProjectGrant[];
  socials: string[];
}

declare interface CreateProjectMetric {
  projectUID: string;
  metricUID: string;
  value: string;
  source: string;
  recipient?: string;
}

declare interface ProjectMetricItem extends CreateProjectMetric {
  id: string;
  created_at: string;
}

declare interface ProjectMetric extends ProjectMetricItem {
  description: string;
  name: string;
}

interface CreateEndorsement {
  recipient?: string; // Contract for Project
  projectUID: string;
  metricUID?: string;
  description: string;
}

declare interface EndorsementItem {
  id: string;
  created_at: string;
  attester: string; // Endorser
}

declare interface Endorsement extends EndorsementItem, CreateEndorsement {}
