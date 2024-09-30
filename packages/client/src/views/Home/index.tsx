"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomeView: React.FC = () => {
  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] bg-white px-6 py-8 sm:h-[calc(100vh-4rem)] sm:px-12 sm:py-16">
        <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-12">
          <div className="max-w-prose">
            <h1 className="mb-4 text-4xl font-bold sm:text-6xl">
              Discover How Projects Impact The Ecosystem
            </h1>
            <p className="mb-8 font-light leading-7 sm:text-xl">
              Crafted with care and dedication, Impact Reef is a platform that
              values each project&apos;s impact through the voice of the
              community.
            </p>
            <Link href={"/projects"} className="button button-primary">
              Browse Projects
            </Link>
          </div>
          <Image
            src="/images/home-hero.png"
            alt="Home hero image"
            width={503}
            height={542}
          />
        </div>
      </section>
      <section className="bg-opacity-90 bg-[linear-gradient(45deg,_#fdffc1_0%,_#ade7f4_100%)] px-6 py-12 bg-blend-lighten sm:px-12 sm:py-44">
        <div className="mx-auto grid w-full max-w-screen-xl place-items-center text-center">
          <h1 className="max-w-6xl text-2xl font-semibold leading-9 sm:text-4xl sm:font-bold sm:leading-[3rem]">
            Impact Reef is a platform for project endorsements, making it easy
            for evaluators and community members to endorse a project&apos;s
            impact.
          </h1>
        </div>
      </section>
      <section className="bg-white px-6 py-12 sm:px-12 sm:py-20">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="max-w-prose">
            <h1 className="mb-4 text-3xl font-semibold sm:text-4xl">About</h1>
            <p className="max-w-prose font-light leading-7 sm:text-xl">
              Impact Reef, developed by the Greenpill Dev Guild, empowers
              communities and projects with a platform for long-term impact
              tracking. Launched in Q3 2024, it aims to provide valuable
              insights and streamline the process of capturing and understanding
              project impact, helping initiatives achieve greater clarity in
              their contributions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;
