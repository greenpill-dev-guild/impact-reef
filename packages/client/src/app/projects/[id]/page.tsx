import { NextPage } from "next";
import dynamic from "next/dynamic";

const ProjectDetailsView = dynamic(() => import("@/views/Projects/Details"));

const ProjectPage: NextPage = () => {
  // const searchParams = useSearchParams();

  // const uid = searchParams.get("uid");

  // const {
  //   isLoading,
  //   isError,
  //   data: metadata,
  //   error,
  // } = useQuery({
  //   queryKey: ["project-metadata", uid],
  //   queryFn: () => getProject(uid),
  //   enabled: !!uid,
  // });

  // console.log(metadata);
  const project: Project = {
    id: "",
    title: "",
    creator: "",
    attestation_counts: 0,
    transactions_count: 0,
    avatar_image: "",
    banner_image: "",
    category: "cefi",
    description: "",
    endorsements: [],
    contracts: [],
    funding: [],
    grant_track: "onchain-builders",
    repositories: [],
    metrics: [],
    socials: [],
    updated_at: "",
  };

  return <ProjectDetailsView project={project} />;
};

export default ProjectPage;
