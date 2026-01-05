import { get } from "@/lib/httpMethods";
import Link from "next/link";

export default async function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params
  const account = await get(`get-account-details/${accountId}`);
  const platformUrl = process.env.NODE_ENV === 'development' ? `http://localhost:3001` : `https://${account.host}`;
  const dashboardUrl = process.env.NODE_ENV === 'development' ? `http://localhost:3003` : `https://${account.host.replace('.deepmobility.com', '.dashboard.deepmobility.com')}`;

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl">
        {account.name}
      </h1>
      <a href={platformUrl} target="_blank" className="flex text-sm items-center gap-2 text-black hover:underline">
        Plateforme
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>
      </a>
      <a href={dashboardUrl} target="_blank" className="flex text-sm items-center gap-2 text-black hover:underline">
        Dashboard
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>
      </a>

      <nav className="flex gap-4 mt-4 border-b pb-4">
        <Link 
          href={`/${account.id}`} 
          className="text-blue-500 hover:underline"
        >
          Détails du compte
        </Link>
        <Link 
          href={`/${account.id}/users`} 
          className="text-blue-500 hover:underline"
        >
          Utilisateurs
        </Link>
        <Link 
          href={`/${account.id}/teams`} 
          className="text-blue-500 hover:underline"
        >
          Équipes
        </Link>
        <Link 
          href={`/${account.id}/challenges`} 
          className="text-blue-500 hover:underline"
        >
          Défis solidaires
        </Link>
        <Link 
          href={`/${account.id}/settings`} 
          className="text-blue-500 hover:underline"
        >
          Paramètres
        </Link>
      </nav>

      <main className="mt-6">
        {children}
      </main>
    </div>
  );
} 