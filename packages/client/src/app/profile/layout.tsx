import Image from "next/image";
import Link from "next/link";

interface Link {
  title: string;
  icon: string;
  action?: () => void;
}

const links: Link[] = [
  { title: "endorsements", icon: "/icons/fire.svg" },
  { title: "metrics", icon: "/icons/flag.svg" },
  { title: "criteria", icon: "/icons/newspaper.svg" },
  { title: "settings", icon: "/icons/flag.svg" },
];

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <aside>
        <nav>
          {links.map((link) => (
            <Link key={link.title} href={`/profile/${link.title}`}>
              <Image alt="profile navigation icon" src={link.icon} />
              {link.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main>{children}</main>
    </>
  );
}
