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

declare interface CriteriaItem {
  id: string;
  updated_at: string;
}

declare interface Criteria extends EndorsementItem {
  description: string;
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

declare interface ProjectItem {
  id: string;
  title: string;
  avatar_image: string;
  category: ProjectCategory;
  transactions_count: number;
  attestation_counts: number;
  updated_at: string;
}

declare interface Project extends ProjectItem {
  description: string;
  banner_image: string;
  metrics: any[];
  endorsments: any[];
  socials: string[];
}

declare interface EvaluationItem {
  id: string;
  updated_at: string;
}

declare interface Evaluation extends EndorsementItem {
  description: string;
}

declare interface EndorsementItem {
  id: string;
  updated_at: string;
}

declare interface Endorsement extends EndorsementItem {
  description: string;
}
