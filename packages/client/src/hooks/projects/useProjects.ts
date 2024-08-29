import {useState, useEffect} from "react";
import {getRetroFundingRoundProjects} from "@/__generated__/api/agora";
import {
    Project as AgoraProject,
    ProjectContractsItem,
    ProjectGithubItem,
    ProjectGrantsAndFundingGrantsItem, ProjectGrantsAndFundingRevenueItem, ProjectGrantsAndFundingVentureFundingItem
} from '@/__generated__/api/agora.schemas';

interface UseProjectsResult {
    projects: Project[];
    currentPage: number;
    totalProjects: number;
    totalPages: number;
    nextPage: () => void;
    previousPage: () => void;
    setPage: (page: number) => void;
}

const mapAgoraProjectToProject = (project: AgoraProject): Project => {
    return {
        id: project.id || "N.A",
        title: project.name || "N.A",
        grant_track: project.category as GrantTrack, // TODO: validator grant track values
        description: project.description || "N.A",
        banner_image: project.projectCoverImageUrl || "",
        endorsements: [],
        updated_at: new Date().toISOString(),
        avatar_image: project.projectCoverImageUrl || "", // TODO: add placeholder image
        category: project?.category || "Category N/A",
        creator: project?.organization?.name || "Organization N/A",
        metrics: [],
        repositories: project.github?.map((repo: ProjectGithubItem) => typeof repo === "string" ? repo : []).flat() || [],
        contracts: project.contracts?.map((contract: ProjectContractsItem) => ({
            id: contract?.address || "N.A",
            contractAddress: contract.address || "N.A",
            deployerAddress: contract.deployerAddress || "N.A",
            deploymentHash: contract.deploymentTxHash || "N.A",
            chainId: Number(contract.chainId) || 0,
        })) || [],
        funding: project.grantsAndFunding?.grants?.map((grant: ProjectGrantsAndFundingGrantsItem) => ({
            title: grant.grant || "N.A",
            date: grant.date || "N.A",
            funds_received: grant.amount || "N.A",
            description: grant.grant || "N.A",
            link: grant.link || "N.A",
        })) || [],
        socials: project?.socialLinks ? Object.values(project.socialLinks).filter((value) => !!value) : [],
    }
}

export const useProjects = (
    initialPageSize: number = 10
): UseProjectsResult => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProjects, setTotalProjects] = useState(0);

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getRetroFundingRoundProjects(5)

            console.log("Projects: ", projects);
            if (projects.status === 200) {
                // TODO : fix typing that get messed up by custom-fetch
                const parsedProjects = projects?.data?.data?.map(mapAgoraProjectToProject) || [];
                setProjects(parsedProjects);
            }

        }

        fetchProjects();
    }, [currentPage]);

    // TODO: use `meta` field from API response:
    // has_next:false
    // next_offset: 17
    // total_returned: 17
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const setPage = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(totalProjects / initialPageSize);

    return {
        projects,
        currentPage,
        totalProjects,
        totalPages,
        nextPage,
        previousPage,
        setPage,
    };
};
