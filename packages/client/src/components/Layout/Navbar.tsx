"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavBarProps {}

const isAuthenticated = true;

const links = ["home", "garden"];
const profileLinks = ["metrics"];

export const Navbar: React.FC<NavBarProps> = (props) => {
  return (
    <header className="navbar bg-slate-700">
      <Link href="/" className="">
        <Image
          alt="Impact Garden Logo"
          src={"/logo.png"}
          className="aspect-square rounded-full"
          width={40}
          height={40}
        />
      </Link>
      <div>
        <nav></nav>
        {isAuthenticated ? <div /> : <button></button>}
      </div>
    </header>
  );
};
