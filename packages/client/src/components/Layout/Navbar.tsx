"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavBarProps {}

const isAuthenticated = false;

interface Link {
  title: string;
  icon: string;
}

const links: Link[] = [
  { title: "projects", icon: "/icons/fire.svg" },
  { title: "metrics", icon: "/icons/flag.svg" },
  { title: "about", icon: "/icons/newspaper.svg" },
];
const profileLinks: Link[] = [{ title: "metrics", icon: "flag.svg" }];

export const Navbar: React.FC<NavBarProps> = (props) => {
  const pathname = usePathname();

  return (
    <header className="navbar justify-center py-6 border-b border-zinc-200">
      <div className="flex gap-4 w-full max-w-screen-xl">
        <Link href="/" className="flex gap-2">
          <Image
            alt="Impact Garden Logo"
            src={"/sun-logo.png"}
            className="aspect-square rounded-full"
            width={48}
            height={48}
          />
          <Image
            alt="Impact Garden Logo"
            src={"/logo.png"}
            className=""
            width={164}
            height={48}
          />
        </Link>
        <input className="flex-1 px-2 py-4 rounded-full border border-zinc-200"></input>
        <nav className="inline-flex gap-1">
          {links.map(({ icon, title }) => (
            <Link
                key={title}
              href={title}
              className={`capitalize inline-flex gap-2 w-32 p-4 justify-center items-center rounded-full text-zinc-800 font-semibold leading-snug ${pathname.includes(title) && "bg-neutral-100"}`}
            >
              {title}
              <Image
                alt="navbar link"
                src={icon}
                unoptimized
                width={24}
                height={24}
              />
            </Link>
          ))}
        </nav>
        {isAuthenticated ? (
          <div />
        ) : (
          <button className="grid place-items-center w-32 p-4 rounded-full bg-blue-950 text-neutral-50 font-semibold leading-snug">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
