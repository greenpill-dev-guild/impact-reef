export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <aside>
        <nav></nav>
      </aside>
      <main>{children}</main>
    </>
  );
}
