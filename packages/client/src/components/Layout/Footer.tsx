import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons/lib";
import { FaTwitter, FaGithub, FaHatWizard } from "react-icons/fa";

interface FooterProps {}

interface Link {
  title: string;
  Icon: IconType;
  link: string;
  action?: () => void;
}

const links: Link[] = [
  { title: "x", Icon: FaTwitter, link: "https://x.com/ImpactReef" },
  {
    title: "farcaster",
    Icon: FaHatWizard,
    link: "https://warpcast.com/~/channel/impact-reef",
  },
  {
    title: "github",
    Icon: FaGithub,
    link: "https://github.com/greenpill-dev-guild/impact-reef",
  },
];

export const Footer: React.FC<FooterProps> = async () => {
  return (
    <footer className="footer border-t border-slate-300 py-6">
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
              className={`link-icon`}
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
