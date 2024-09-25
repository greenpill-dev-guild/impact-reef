import { type introspection_types } from "./oso-env";

declare interface User {
  fid?: number;
  name?: string;
  image?: string;
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
