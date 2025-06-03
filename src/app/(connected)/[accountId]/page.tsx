import { get } from "@/lib/httpMethods";
import AccountDetailsPage from "./AccountDetailsPage";

export default async function AccountDetails({
  params,
}: {
  params: Promise<{ accountId: string }>
}) {
  const { accountId } = await params
  const account = await get(`get-account-details/${accountId}`);

  return <AccountDetailsPage account={account} />;
}