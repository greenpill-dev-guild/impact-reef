"use client";

import Link from "next/link";
import Image from "next/image";

interface Link {
  title: string;
  icon: string;
  action?: () => void;
}

const links: Link[] = [
  { title: "endorsements", icon: "/icons/fire.svg" },
  // { title: "metrics", icon: "/icons/flag.svg" },
  // { title: "criteria", icon: "/icons/newspaper.svg" },
  { title: "settings", icon: "/icons/flag.svg" },
];

export const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full">
      <header className="px-4 py-6">
        <h2 className="">Your Reef</h2>
        <p className="">
          Enriches the community, promoting growth and resilience just like a
          vibrant coral reef.
        </p>
      </header>
      <div className="w-full flex">
        <aside className="basis-80">
          <nav className="px-2 flex flex-col gap-2 w-full">
            {links.map((link) => (
              <Link
                className="flex gap-1 px-3 py-2 rounded-lg hover:bg-zinc-300 bg-zinc-100 text-lg font-semibold"
                key={link.title}
                href={`/profile/${link.title === "settings" ? "" : link.title}`}
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
        <section className="flex-1">{children}</section>
      </div>
    </main>
  );
};
