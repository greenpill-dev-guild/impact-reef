import {
  FaTelegramPlane,
  FaDiscord,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons/lib";

interface FooterProps {}

interface Link {
  title: string;
  Icon: IconType;
  link: string;
  action?: () => void;
}

const links: Link[] = [
  { title: "x", Icon: FaTwitter, link: "https://x.com/gp_dev_guild" },
  {
    title: "discord",
    Icon: FaDiscord,
    link: "https://discord.com/gp_dev_guild",
  },
  {
    title: "telegram",
    Icon: FaTelegramPlane,
    link: "https://t.me/gp_dev_guild",
  },
  {
    title: "github",
    Icon: FaGithub,
    link: "https://github.com/greenpill-dev-guild",
  },
];

export const Footer: React.FC<FooterProps> = async () => {
  return (
    <footer className="footer border-t border-slate-300 p-6">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col flex-nowrap items-center justify-between gap-4 sm:flex-row">
        <aside className="hidden items-center gap-3 sm:flex">
          <Image
            alt="Impact Garden Logo"
            src={"/icon.png"}
            className=""
            width={24}
            height={24}
          />
          <p>
            Impact Reef is built by <b>Greenpill Dev Guild</b>
          </p>
        </aside>
        <nav className="flex gap-3">
          {links.map(({ Icon, title, link }) => (
            <Link
              key={title}
              href={link}
              target="_blank"
              className={`grid place-items-center rounded-full bg-sky-700 p-1.5 text-white transition-colors duration-200 ease-in-out hover:bg-sky-800`}
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
