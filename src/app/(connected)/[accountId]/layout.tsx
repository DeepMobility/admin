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

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl">{account.name}</h1>

      <nav className="flex gap-4 mt-4 border-b pb-4">
        <Link 
          href={`/${account.id}`} 
          className="text-blue-500 hover:underline"
        >
          Détails du compte
        </Link>
        <Link 
          href={`/${account.id}/challenges`} 
          className="text-blue-500 hover:underline"
        >
          Défis solidaires
        </Link>
      </nav>

      <main className="mt-6">
        {children}
      </main>
    </div>
  );
} 