import {
    Project as OpProject,
    ProjectContractsItem,
    ProjectGithubItem,
    ProjectGrantsAndFunding, SocialLinks
} from '@/__generated__/api/agora.schemas';


export const fetchMetadata = async (metadataUrl: string) => {
    const response = await fetch(metadataUrl);
    const data = await response.json();
    return data;
};

export const parseDataToProjectItem = async (
    data: any
): Promise<ProjectItem> => {
    const _data = JSON.parse(data);
    const metadata = await fetchMetadata(
        _data.filter((d: any) => d.name === "metadataUrl")[0].value.value!
    );

    return {
        id: _data.filter((d: any) => d.name === "projectRefUID")[0]["value"].value,
        title: _data.filter((d: any) => d.name === "name")[0].value.value!,
        category: _data.filter((d: any) => d.name === "category")[0].value.value!,
        avatar_image: metadata.projectAvatarUrl,
        creator: "", // Todo get creator
        updated_at: new Date().toISOString(),
    };
};

export const OpContractToContract = (
    opContract: ProjectContractsItem): Contract => {


    return {
        id: opContract.address ?? "N/A",
        contractAddress: opContract.address ?? "",
        deployerAddress: opContract.deployerAddress ?? "",
        deploymentHash: opContract.deploymentTxHash ?? "",
        chainId: Number(opContract.chainId) ?? 0
    }
}

export const OpGrantToGrant = (
    opGrantsAndFunding: ProjectGrantsAndFunding): ProjectGrant[] => {
    const {grants} = opGrantsAndFunding;

    if (!grants) return [];

    return grants.map(grant => {
        return {
            title: grant.grant ?? "N/A",
            date: grant.date ?? "N/A",
            funds_received: grant.amount ?? "N/A",
            description: grant.details ?? "N/A",
            link: grant.link
        }
    })
}

export const OpApplicationCategoryToGrantTrack = (opApplicationCategory: string | undefined): GrantTrack => {
    switch (opApplicationCategory) {
        case "OP_STACK_RESEARCH_AND_DEVELOPMENT":
            return "dev-tooling";
        case "OP_STACK_TOOLING":
            return "dev-tooling";
        case "ETHEREUM_CORE_CONTRIBUTIONS":
            return "onchain-builders";
        default:
            throw new Error(`Unknown application category: ${opApplicationCategory}`);
    }
}

export const OpSocialsToSocials = (
    opSocials: SocialLinks): string[] => {
    return Object.values(opSocials);
}

export const OpGithubToRepositories = (
    opGithub: ProjectGithubItem[]): string[] => {
    return opGithub.map((item) => typeof item === "string" ? item : Object.keys(item)[0]);
}

export const OpCategoryToCategory = (opCategory: string | undefined): ProjectCategory => {
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
        default:
            throw new Error(`Unknown category: ${opCategory}`);
    }
}

export const parseOpProjectToProjectItem = (
    opProject: OpProject): Partial<Project> => {

    const creator = opProject?.organization ? opProject.organization.name :
        opProject?.team ? opProject.team[0] : "N/A";

    const repositories = opProject.github ? OpGithubToRepositories(opProject.github) : ["N/A"];
    const contracts = opProject.contracts ? opProject.contracts.map(OpContractToContract) : ["N/A"];
    const funding = opProject.grantsAndFunding ? OpGrantToGrant(opProject.grantsAndFunding) : ["N/A"];
    const socials = opProject.socialLinks ? OpSocialsToSocials(opProject.socialLinks) : ["N/A"];

    return {
        id: opProject.id,
        title: opProject.name,
        avatar_image: opProject.profileAvatarUrl,
        category: OpCategoryToCategory(opProject.category),
        updated_at: new Date().toISOString(),
        creator,
        grant_track: OpApplicationCategoryToGrantTrack(opProject.applicationCategory),
        description: opProject.description,
        banner_image: opProject.projectCoverImageUrl,
        metrics: [],
        endorsements: [],
        repositories,
        contracts,
        funding,
        socials
    }
}

export const parseDataToProjectMetric = (
    id: string,
    recipient: string,
    timeCreated: number,
    data: any
): ProjectMetricItem => {
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
    data: any
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
