"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavBarLinksProps {}

interface Link {
  title: string;
  icon: string;
  action?: () => void;
}

const links: Link[] = [
  { title: "projects", icon: "/icons/fire.svg" },
  // { title: "metrics", icon: "/icons/flag.svg" },
  // { title: "about", icon: "/icons/newspaper.svg" },
];

export const NavbarLinks: React.FC<NavBarLinksProps> = () => {
  const pathname = usePathname();

  return (
    <nav className="inline-flex gap-1">
      {links.map(({ icon, title }) => (
        <Link
          key={title}
          href={`/${title}`}
          className={`button button-link capitalize ${pathname === title && !pathname.includes("profile") && "bg-slate-200"}`}
        >
          {title}
          <Image
            alt="navbar link"
            src={icon}
            unoptimized
            width={20}
            height={20}
          />
        </Link>
      ))}
    </nav>
  );
};
