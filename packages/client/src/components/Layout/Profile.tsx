"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

interface Link {
  title: string;
  icon: string;
  path: string;
  action?: () => void;
}

const links: Link[] = [
  {
    title: "endorsements",
    path: "/profile/endorsements",
    icon: "/icons/chat-alt.svg",
  },
  // { title: "metrics", icon: "/icons/flag.svg" },
  // { title: "criteria", icon: "/icons/newspaper.svg" },
  { title: "settings", path: "/profile", icon: "/icons/adjustments.svg" },
];

export const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-screen-xl px-8 py-12">
      <header className="mb-8">
        <h2 className="mb-2">My Reef</h2>
        <p className="text-lg font-light">
          Enriches the community, promoting growth and resilience just like a
          vibrant coral reef.
        </p>
      </header>
      <div className="flex w-full gap-6">
        <aside className="basis-80">
          <nav className="flex w-full flex-col">
            {links.map((link) => (
              <Link
                className={`flex gap-1 rounded-lg px-3 py-3 text-lg font-light capitalize leading-snug transition-colors duration-300 ease-in-out ${
                  pathname === link.path ? "bg-slate-100" : "hover:bg-slate-50"
                } `}
                key={link.title}
                href={link.path}
              >
                <Image
                  alt="profile navigation icon"
                  src={link.icon}
                  unoptimized
                  width={24}
                  height={24}
                />
                {link.title}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="flex flex-1 flex-col gap-4">
          <h2 className="text-3xl font-bold capitalize leading-7">
            {links.find((link) => pathname === link.path)?.title}
          </h2>
          {children}
        </section>
      </div>
    </div>
  );
};
