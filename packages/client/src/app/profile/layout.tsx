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
      <aside className="">
        <nav className="px-2 flex flex-col gap-2 w-full">
          {links.map((link) => (
            <Link
              className="flex gap-1 px-3 py-2 rounded-lg hover:bg-zinc-300 bg-zinc-100 text-lg font-semibold"
              key={link.title}
              href={`/profile/${link.title}`}
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
      <section>{children}</section>
    </>
  );
}
