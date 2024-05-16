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

type Category = "";

declare interface ProjectItem {
  title: string;
  avatar_image: string;
  banner_image: string;
  category: Category;
  transactions_count: number;
  attestation_counts: number;
  updated_at: Date;
}

declare interface Project extends ProjectItem {
  description: string;
  metrics: any[];
  endorsments: any[];
  socials: string[];
}
