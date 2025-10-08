import "./auth.reset.scss"; // <-- ważne: reset dla (auth)

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
