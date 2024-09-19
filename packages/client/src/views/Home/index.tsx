"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomeView: React.FC = () => {
  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] bg-white px-6 py-8 sm:h-[calc(100vh-4rem)] sm:px-12 sm:py-16">
        <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-12">
          <div className="max-w-prose">
            <h1 className="mb-4 text-4xl font-bold sm:text-6xl">
              Understand how projects impact the ecosystem
            </h1>
            <p className="mb-8 font-light leading-7 sm:text-xl">
              Crafted with care and dedication, Impact Reef is a platform that
              values the impact of each project within the ecosystem with the
              voice of community.
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
            Impact reef is a space for project endorsements. We validate social
            graphs and connections to ensure authenticity and proof of
            personhood.
          </h1>
        </div>
      </section>
      <section className="bg-white px-6 py-12 sm:px-12 sm:py-20">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="max-w-prose">
            <h1 className="mb-4 text-3xl font-semibold sm:text-4xl">About</h1>
            <p className="max-w-prose font-light leading-7 sm:text-xl">
              Impact Reef, created by the Greenpill Dev Guild, is designed to
              empower communities and projects by offering a platform for
              long-term impact tracking. Launched in Q3 2024, we’re excited to
              gather more data points to help the community better understand
              and sustain their impact.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;
