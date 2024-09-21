import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Connect } from "@/components/Connect";

import { NavbarLinks } from "./Links";

interface NavBarProps {}

export const Navbar: React.FC<NavBarProps> = () => {
  return (
    <header className="navbar h-20 w-full justify-center border-b border-slate-300 px-6">
      <div className="flex w-full max-w-screen-xl flex-1 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 cursor-pointer">
          <Image
            alt="Optimism Sun Logo"
            src={"/images/sun-logo.png"}
            width={48}
            height={48}
            className="scale-90"
            priority
          />
          <Image
            alt="Impact Reef Text Logo"
            src={"/images/logo-text.png"}
            className="scale-90"
            width={164}
            height={48}
            priority
          />
        </Link>
        {/* <label
          htmlFor="search"
          className="input input-bordered flex flex-1 items-center rounded-full border border-slate-200 gap-2"
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
        <div className="hidden flex-1 items-center justify-end gap-2 sm:flex">
          <NavbarLinks />
          <div className="w-full basis-12">
            <Connect />
          </div>
        </div>
      </div>
    </header>
  );
};
