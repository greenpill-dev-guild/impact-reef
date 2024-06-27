import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getProjectsOwners } from "@/actions/projects";
import { getFarcasterUserDataById } from "@/actions/farcaster";

import { projects as mockProjects } from "@/utils/mockData";

const ProjectsView = dynamic(() => import("@/views/Projects"));

const ProjectsPage: NextPage = async () => {
  // const owners = await getProjectsOwners();

  // if (!owners) {
  //   return <div />;
  // }

  // Example projectOwnerWithData
  //   {
  //     farcasterID: 9749n,
  //     userData: {
  //       username: 'kbw',
  //       pfp: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/72767754-731a-4443-9ba3-4c162b958f00/original',
  //       display: 'Kyle',
  //       bio: 'Co-Founder @Gitcoin | Working on @GitcoinPassport'
  //     }
  //   },
  // const projectOwnerWithFarcasterData = await Promise.all(
  // owners.map(async (owner) => {
  //   const farcasterData = await getFarcasterUserDataById(owner);

  //   return {
  //     farcasterID: owner,
  //     userData: farcasterData,
  //   };
  // })
  // );

  // console.log(projectOwnerWithFarcasterData);

  return <ProjectsView projects={mockProjects} />;
};

export default ProjectsPage;
