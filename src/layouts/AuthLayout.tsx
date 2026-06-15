import bgAuth from '../assets/bg-auth.png';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bgAuth})`,
      }}
    >
      {children}
    </div>
  );
}