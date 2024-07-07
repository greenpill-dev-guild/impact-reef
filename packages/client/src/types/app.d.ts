declare enum Impact {
  LOW,
  MEDIUM,
  HIGH,
}

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

declare interface ProjectGrant {
  title: string;
  date: string;
  funds_received: number;
  description: string;
  link?: string;
}

declare interface ProjectItem {
  id: string;
  title: string;
  avatar_image: string;
  category: ProjectCategory;
  transactions_count: number;
  attestation_counts: number;
  updated_at: string;
  creator: string;
}

declare interface Project extends ProjectItem {
  grant_track: ProjectGrant;
  description: string;
  banner_image: string;
  metrics: ProjectMetric[];
  endorsements: Endorsement[];
  repositories: string[];
  contracts: string[];
  funding: ProjectGrant[];
  socials: string[];
}

declare interface ProjectMetricItem {
  id: string;
  title: string;
  value: number;
  updated_at: string;
}

declare interface ProjectMetric extends ProjectMetricItem {}

declare interface EndorsementItem {
  id: string;
  updated_at: string;
}

declare interface Endorsement extends EndorsementItem {
  description: string;
}
