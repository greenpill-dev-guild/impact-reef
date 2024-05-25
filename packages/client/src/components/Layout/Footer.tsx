import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {}

interface Link {
  title: string;
  icon: string;
  link: string;
  action?: () => void;
}

const links: Link[] = [
  { title: "x", icon: "/icons/x.svg", link: "https://x.com/gp_dev_guild" },
  {
    title: "discord",
    icon: "/icons/discord.svg",
    link: "https://discord.com/gp_dev_guild",
  },
  {
    title: "telegram",
    icon: "/icons/telegram.svg",
    link: "https://t.me/gp_dev_guild",
  },
  {
    title: "github",
    icon: "/icons/github.svg",
    link: "https://github.com/greenpill-dev-guild",
  },
];

export const Footer: React.FC<FooterProps> = async () => {
  return (
    <footer className="footer p-6 border-t border-gray-200">
      <div className="flex items-center justify-between gap-4 w-full max-w-screen-xl flex-nowrap mx-auto">
        <aside className="flex gap-3 items-center">
          <Image
            alt="Impact Garden Logo"
            src={"/icon.png"}
            className=""
            width={24}
            height={24}
          />
          <p>
            Impact Coral Reef is built by <b>Greenpill Dev Guild</b>
          </p>
        </aside>
        <nav className="flex gap-3">
          {links.map(({ icon, title }) => (
            <Link
              key={title}
              href={title}
              className={`p-1.5 grid place-items-center rounded-full bg-black text-white`}
            >
              <Image
                alt="Footer link"
                src={icon}
                unoptimized
                className="fill-white text-white"
                width={16}
                height={16}
              />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
