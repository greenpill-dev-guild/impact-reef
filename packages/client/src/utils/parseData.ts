import {
  Project as OpProject,
  ProjectContractsItem,
  ProjectGithubItem,
  ProjectGrantsAndFunding,
  SocialLinks,
} from "@/__generated__/api/agora.schemas";

export const opContractToContract = (
  opContract: ProjectContractsItem,
): Contract => {
  return {
    id: opContract.address ?? "Untitled",
    contractAddress: opContract.address ?? "",
    deployerAddress: opContract.deployerAddress ?? "",
    deploymentHash: opContract.deploymentTxHash ?? "",
    chainId: Number(opContract.chainId) ?? 0,
  };
};

export const opGrantToGrant = (
  opGrantsAndFunding: ProjectGrantsAndFunding,
): ProjectGrant[] => {
  const { grants } = opGrantsAndFunding;

  if (!grants) return [];

  return grants.map((grant) => {
    return {
      title: grant.grant ?? "Untitled",
      date: grant.date ?? "",
      funds_received: grant.amount ?? "",
      description: grant.details ?? "",
      link: grant.link,
    };
  });
};

export const opApplicationCategoryToGrantTrack = (
  opApplicationCategory: string | undefined | null,
): GrantTrack => {
  if (!opApplicationCategory) return "onchain-builders";

  switch (opApplicationCategory) {
    case "OP_STACK_RESEARCH_AND_DEVELOPMENT":
      return "dev-tooling";
    case "OP_STACK_TOOLING":
      return "dev-tooling";
    case "ETHEREUM_CORE_CONTRIBUTIONS":
      return "onchain-builders";
    case "CeFi":
      return "onchain-builders";
    default:
      return "onchain-builders";
    // throw new Error(`Unknown application category: ${opApplicationCategory}`);
  }
};

export const opSocialsToSocials = (opSocials: SocialLinks): string[] => {
  return Object.values(opSocials)
    .flatMap((social) => social)
    .filter(Boolean);
};

export const opGithubToRepositories = (
  opGithub: ProjectGithubItem[],
): string[] => {
  return opGithub.map((item) =>
    typeof item === "string" ? item : Object.values(item)[0].toString(),
  );
};

export const opCategoryToCategory = (
  opCategory: string | undefined,
): ProjectCategory => {
  switch (opCategory) {
    case "Utility":
      return "utility";
    case "Social":
      return "social";
    case "NFT":
      return "nft";
    case "Governance":
      return "governance";
    case "DeFi":
      return "defi";
    case "CeFi":
      return "cefi";
    case "Cross Chain":
      return "cross-chain";
    default:
      return "utility";
    // throw new Error(`Unknown category: ${opCategory}`);
  }
};

export const parseOpProjectToProjectItem = (opProject: OpProject): Project => {
  const creator = opProject?.organization
    ? opProject.organization.name
    : opProject?.team
      ? opProject.team[0]
      : "N/A";

  // ToDo: Fetch address of creator

  const repositories = opProject.github
    ? opGithubToRepositories(opProject.github)
    : [];
  const contracts = opProject.contracts
    ? opProject.contracts.map(opContractToContract)
    : [];
  const funding = opProject.grantsAndFunding
    ? opGrantToGrant(opProject.grantsAndFunding)
    : [];
  const socials = opProject.socialLinks
    ? opSocialsToSocials(opProject.socialLinks)
    : [];

  return {
    id: opProject.id!,
    title: opProject.name!,
    avatar_image: opProject.profileAvatarUrl!,
    category: opCategoryToCategory(opProject.category),
    updated_at: new Date().toISOString(),
    creator: creator!,
    grant_track: opApplicationCategoryToGrantTrack(
      opProject.applicationCategory,
    ),
    description: opProject.description!,
    banner_image: opProject.projectCoverImageUrl!,
    metrics: [],
    endorsements: [],
    repositories,
    contracts,
    funding,
    socials,
  };
};

export const parseDataToProjectMetric = (
  id: string,
  recipient: string,
  timeCreated: number,
  data: any,
): any => {
  const _data = JSON.parse(data);

  return {
    id,
    metricUID: _data.filter((d: any) => d.name === "metricUID")[0].value.value!,
    projectUID: _data.filter((d: any) => d.name === "projectUID")[0].value
      .value!,
    source: _data.filter((d: any) => d.name === "source")[0].value.value!,
    value: _data.filter((d: any) => d.name === "value")[0].value.value!,
    recipient,
    created_at: new Date(timeCreated * 1000).toUTCString(),
  };
};

export const parseDataToEndorsementItem = (
  id: string,
  attester: string,
  timeCreated: number,
  data: any,
): Endorsement => {
  const _data = JSON.parse(data);

  return {
    id,
    metricUID: _data.filter((d: any) => d.name === "metricUID")[0].value.value!,
    projectUID: _data.filter((d: any) => d.name === "projectUID")[0].value
      .value!,
    attester,
    description: _data.filter((d: any) => d.name === "description")[0].value
      .value!,
    created_at: new Date(timeCreated * 1000).toLocaleString(),
  };
};
