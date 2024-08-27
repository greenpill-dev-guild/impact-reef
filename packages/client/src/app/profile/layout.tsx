import { ProfileLayout as Layout } from "@/components/Layout/Profile";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
