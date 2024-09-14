"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";

const HomeView: React.FC = () => {
  return (
    <main className="flex flex-col">
      <section className="w-full mx-auto">
        <div className="w-full max-w-screen-x">
          <div>
            <h1 className="text-4xl font-semibold">
              Understand how projects impact the ecosystem
            </h1>
            <p className="mb-6">
              Crafted with care and dedication, Impact Reef is a platform that
              values the impact of each project within the ecosystem with the
              voice of community.
            </p>
            <Link href={"/projects"}>Browse Projects</Link>
          </div>
          <Image src={""} alt="" />
        </div>
      </section>
      <section className="w-full mx-auto">
        <div className="w-full max-w-screen-x">
          <h1 className="text-4xl font-semibold">
            Impact reef is a space for project endorsements. We validate social
            graphs and connections to ensure authenticity and proof of
            personhood.
          </h1>
        </div>
      </section>
      <section className="w-full mx-auto">
        <div className="w-full max-w-screen-x">
          <h1 className="text-4xl font-semibold">About</h1>
          <p className="mb-6">
            Discover and explore the magic being built by fellow project
            builders while tracking the impact metrics.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomeView;
