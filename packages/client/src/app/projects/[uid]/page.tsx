"use client";
import {NextPage} from "next";
import {getProjectMetadata} from "@/actions/projects";
import {useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
// import dynamic from "next/dynamic";

const ProjectDetailPage: NextPage = () => {
    const searchParams = useSearchParams()

    const uid = searchParams.get('uid')

    const { isLoading, isError, data: metadata, error } = useQuery({
        queryKey: ['project-metadata', uid],
        queryFn: () => getProjectMetadata(uid),
        enabled: !!uid,
    })

    console.log(metadata);

    return <div>Project UID: {uid}</div>;
};

export default ProjectDetailPage;
