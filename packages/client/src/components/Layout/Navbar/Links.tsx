"use client";

import React from "react";
import Link from "next/link";
import { FaFire } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { usePathname } from "next/navigation";

interface NavBarLinksProps {}

interface Link {
  title: string;
  Icon?: IconType;
  action?: () => void;
}

const links: Link[] = [
  { title: "projects", Icon: FaFire },
  // { title: "metrics", icon: "/icons/flag.svg" },
  // { title: "about", icon: "/icons/newspaper.svg" },
];

export const NavbarLinks: React.FC<NavBarLinksProps> = () => {
  const pathname = usePathname();

  return (
    <nav className="inline-flex gap-1">
      {links.map(({ title }) => (
        <Link
          key={title}
          href={`/${title}`}
          className={`button button-link capitalize ${pathname === title && !pathname.includes("profile") && "bg-slate-200"}`}
        >
          {title}
          {/* <Icon className="w-4" /> */}
        </Link>
      ))}
    </nav>
  );
};
