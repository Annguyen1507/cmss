import bgAuth from "../assets/bg-auth.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bgAuth})`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
