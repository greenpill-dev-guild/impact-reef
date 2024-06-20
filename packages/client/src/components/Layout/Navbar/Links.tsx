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
  { title: "metrics", icon: "/icons/flag.svg" },
  { title: "about", icon: "/icons/newspaper.svg" },
];

export const NavbarLinks: React.FC<NavBarLinksProps> = () => {
  const pathname = usePathname();

  return (
    <nav className="inline-flex gap-1">
      {links.map(({ icon, title }) => (
        <Link
          key={title}
          href={title}
          className={`capitalize inline-flex gap-2 w-32 p-4 justify-center items-center rounded-full text-zinc-800 font-semibold leading-snug ${pathname.includes(title) && !pathname.includes("profile") && "bg-neutral-100"}`}
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
  );
};
