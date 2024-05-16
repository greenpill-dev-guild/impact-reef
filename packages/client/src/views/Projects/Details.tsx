"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import { endorsments, metrics } from "@/utils/mockData";
import { Collaspe } from "@/components/Collaspe";
import { Stat } from "@/components/Stat";
import { Progress } from "@/components/Progress";

export interface ProjectDetailsProps {}

function determineSocialMedia(link: string) {
  if (link.includes("twitter.com") || link.includes("x.com"))
    return {
      icon: "/icons/x.svg",
      label: "X",
    };

  if (link.includes("warpcast.com"))
    return {
      icon: "/icons/farcaster.svg",
      label: "farcaster",
    };

  if (link.includes("mirror.xyz"))
    return {
      icon: "/icons/mirror.svg",
      label: "mirror",
    };

  if (link.includes("discord.com"))
    return {
      icon: "/icons/discord.svg",
      label: "discord",
    };

  if (link.includes("t.me"))
    return {
      icon: "/icons/telegram.svg",
      label: "telegram",
    };

  return {
    icon: "/icons/globe-alt.svg",
    label: "link",
  };
}

const projectSocialLinks = [
  "https://twitter.com/_wefa_",
  "https://t.me/afo_wefa",
  "https://warpcast.com/wefa",
  "https://why.wefa.app",
];

const ProjectDetails: React.FC<ProjectDetailsProps> = ({}) => {
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const metricList = showAllMetrics ? metrics : metrics.slice(0, 6);

  function handleShowAllMetrics() {
    setShowAllMetrics(!showAllMetrics);
  }

  return (
    <main id="project-details" className="flex flex-col gap-4 w-full mx-auto">
      <header className="flex flex-col max-w-screen-xl mx-auto gap-4 py-8">
        <div className="w-full flex justify-between">
          <Link
            href="/projects"
            className="bg-zinc-300 p-1 grid aspect-square place-items-center rounded-md"
          >
            <Image
              alt="back button icon"
              src="/icons/back.svg"
              unoptimized
              width={32}
              height={32}
            />
          </Link>
          <button className="grid place-items-center w-36 p-4 rounded-full bg-blue-950 text-neutral-50 font-semibold leading-snug">
            Attest Impact
          </button>
        </div>
        <div className="flex items-center gap-4 px-8 py-6 bg-zinc-50 shadow-md rounded-md">
          <Image
            className="aspect-square"
            alt="porject logo/avatar"
            src="/images/project-icon.png"
            width={120}
            height={120}
          />
          <div className="flex-1">
            <h1 className="font-semibold text-5xl">Protocol Guild</h1>
            <p>
              As a rollup, Optimism leverages Ethereum for settlement & security
              assurances. It also uses several core infrastructure components
              (client implementations, specifications, test suites, etc)
              developed and maintained by Protocol Guild contributors over the
              years. Optimism..
            </p>
          </div>
          <div className="basis-72 flex flex-col h-full justify-between items-end gap-6">
            <ul className="flex gap-2">
              {projectSocialLinks.map((link) => {
                const social = determineSocialMedia(link);

                return (
                  <li key={link} className="p-2 rounded-full bg-zinc-100">
                    <Link href={link}>
                      <Image
                        alt={`${social.label} icon`}
                        src={social.icon}
                        width={24}
                        height={24}
                        unoptimized
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div>
              <div className="flex gap-2 mb-2 justify-end">
                <h4 className="bg-violet-200 rounded-sm px-2 py-1 text-xl font-bold tracking-wide">
                  Onchain Builders
                </h4>
                <p className="bg-orange-300 rounded-sm px-2 py-1 text-lg font-light">
                  Utiliy
                </p>
              </div>
              <p className="bg-zinc-200 rounded-sm px-2 py-1 text-sm">
                Base information from OP retro round #4
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex w-full max-w-screen-xl mx-auto gap-3 py-6">
        <aside className="basis-72 flex flex-col gap-2">
          <Collaspe title="Repository">
            <ul>
              <li>
                <Link href="link">link</Link>
              </li>
              <li>
                <Link href="link">link</Link>
              </li>
            </ul>
          </Collaspe>
          <Collaspe title="Contracts">
            <ul>
              <li>
                <Link href="link">link</Link>
              </li>
              <li>
                <Link href="link">link</Link>
              </li>
            </ul>
          </Collaspe>
          <Collaspe title="Funding">
            <ul className="flex flex-col gap-2">
              <li className="flex flex-col gap-1">
                <h5 className="text-xl font-semibold">Optimism Grants</h5>
                <div>
                  <p className="text-xs font-light">
                    Date: {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-xs font-light">Funds received: 50K OP</p>
                </div>
                <p className="text-sm">
                  description goes here, i think its about 280 characters
                </p>
                <Link href="link">link</Link>
              </li>
              <li>
                <h5 className="text-xl font-semibold">Venture funding</h5>
                <div>
                  <p className="text-xs font-light">
                    Date: {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-xs font-light">Funds received: 40K USD</p>
                </div>
                <p className="text-sm">
                  description goes here, i think its about 280 characters
                </p>
                <Link href="link">link</Link>{" "}
              </li>
            </ul>
          </Collaspe>
        </aside>
        <section className="flex flex-col items-center flex-1 gap-8 bg-zinc-200 p-6 rounded-lg shadow-md">
          <div className="flex gap-2">
            <Image
              src="/icons/flag.svg"
              alt="flag icon to represent metrics"
              unoptimized
              width={32}
              height={32}
            />
            <h2 className="font-semibold text-3xl">Metrics</h2>
          </div>
          <ul className="grid grid-cols-2 grid-rows-auto gap-4 min-h-[794px]]">
            {metricList.map((metric) => (
              <li
                key={metric.title}
                className="w-72 card p-4 flex flex-col justify-between min-h-40 bg-white shadow-sm rounded-md"
              >
                <h3 className="text-sm font-light line-clamp-2">
                  {metric.title}
                </h3>
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-bold">
                    {metric.value ? metric.value.toLocaleString() : "-"}
                  </span>
                  <button className="flex gap-1 items-center text-xs">
                    <Image
                      alt="plus icon for adding attestation"
                      src="/icons/plus.svg"
                      unoptimized
                      width={24}
                      height={24}
                    />
                    Add an attestation
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            disabled={metrics.length <= 6}
            onClick={handleShowAllMetrics}
            className="w-32 rounded-full bg-slate-400 text-center px-4 py-2 text-neutral-50 font-semibold leading-snug"
          >
            {showAllMetrics && metrics.length > 6 ? "View Less" : "Show All"}
          </button>
        </section>
        <aside className="basis-72 flex flex-col gap-2">
          <Stat
            stats={[
              {
                title: "total attestations",
                value: 321,
              },
            ]}
          >
            {/* Todo Add Graph */}
          </Stat>
          <Stat
            stats={[
              {
                title: "Unique Attesters",
                value: 21,
              },
            ]}
          >
            <div className="flex flex-col mt-2">
              <Progress
                max={111}
                value={75}
                color="#ef4444"
                className="mb-2 progress-error"
              />
              <div className="flex gap-1 text-sm font-light items-center">
                <span className="rounded-full bg-red-500 h-2 w-2" />
                Badge holders {((75 / 111) * 100).toPrecision(2)}%
              </div>
              <div className="flex gap-1 text-sm font-light items-center">
                <span className="rounded-full bg-gray-500 h-2 w-2" />
                Others {((33 / 111) * 100).toPrecision(2)}%
              </div>
            </div>
          </Stat>
          <Stat
            stats={[
              {
                title: "Number of metrics attested",
                value: 12,
              },
              {
                title: "Number of endorsements",
                value: 12,
              },
              {
                title: "Last attest at",
                value: "4 days ago",
              },
            ]}
          />
        </aside>
      </div>
      <section className="min-h-screen w-full flex flex-col items-center bg-gray-50 py-6">
        <div className="flex gap-2">
          <Image
            src="/icons/puzzle.svg"
            alt="flag icon to represent comparison"
            unoptimized
            width={32}
            height={32}
          />
          <h2 className="font-semibold text-3xl">Compare With Others</h2>
        </div>
        <div>
          <div>
            <span></span>
            <ul></ul>
          </div>
        </div>
      </section>
      <section className="w-full min-h-screen max-w-screen-xl mx-auto flex flex-col items-center gap-12 py-6">
        <Image
          src="/images/project-banner.jpg"
          alt="project banner"
          className="w-full aspect-[16/6] rounded-md"
          width={1600}
          height={900}
        />
        <div className="flex gap-2">
          <Image
            src="/icons/chat-alt.svg"
            alt="flag icon to represent comparison"
            unoptimized
            width={32}
            height={32}
          />
          <h2 className="font-semibold text-3xl">Endorsements</h2>
        </div>
        <ul className="grid grid-cols-4 grid-rows-auto gap-4 w-full">
          {endorsments.map((endorsement) => (
            <li className="p-3 bg-neutral-100 rounded-md shadow-sm flex flex-col justify-between gap-6">
              <p className="">{endorsement.message}</p>
              <div>
                <p className="line-clamp-1 font-semibold">
                  by {endorsement.author}
                </p>
                <span>
                  {new Date(Date.parse(endorsement.date)).getUTCDate()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="w-full flex justify-between max-w-screen-xl mx-auto py-12">
        <button className="border-blue-950 text-blue-950 text-sm font-semibold border rounded-full px-4 py-2 flex gap-1 items-center">
          Return to projects
          <Image
            alt="back icon for returing to view projects"
            src="/icons/back.svg"
            unoptimized
            width={24}
            height={24}
          />
        </button>
        <button className="w-40 border-blue-950 text-blue-950 text-sm font-semibold border rounded-full px-4 py-2 flex gap-1 items-center justify-center">
          Back to top
          <Image
            alt="back icon for returing to view projects"
            src="/icons/arrow-up.svg"
            unoptimized
            width={16}
            height={16}
          />
        </button>
      </footer>
    </main>
  );
};

export default ProjectDetails;
