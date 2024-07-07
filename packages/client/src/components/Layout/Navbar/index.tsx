import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Connect } from "@/components/Connect";

import { NavbarLinks } from "./Links";

interface NavBarProps {}

export const Navbar: React.FC<NavBarProps> = () => {
  return (
    <header className="navbar justify-center py-6 border-b border-zinc-200">
      <div className="flex gap-4 w-full justify-between max-w-screen-xl flex-nowrap">
        <Link href="/" className="flex gap-2 shrink-0">
          <Image
            alt="impact reef sun logo"
            src={"/images/sun-logo.png"}
            className="aspect-square rounded-full"
            width={48}
            height={48}
            priority
          />
          <Image
            alt="impact reef text logo"
            src={"/images/logo-text.png"}
            className=""
            width={164}
            height={48}
            priority
          />
        </Link>
        {/* <label
          htmlFor="search"
          className="input input-bordered flex flex-1 items-center rounded-full border border-zinc-200 gap-2"
        >
          <Image
            alt="search icon"
            src="/icons/search.svg"
            unoptimized
            width={24}
            height={24}
          />
          <input
            id="search"
            type="text"
            className="grow"
            placeholder="Search projects, metrics, criteria..."
          />
        </label> */}
        <div className="flex gap-2 items-center">
          <NavbarLinks />
          <Connect />
        </div>
      </div>
    </header>
  );
};
