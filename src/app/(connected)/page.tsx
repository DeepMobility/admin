import { get } from '@/lib/httpMethods';
import HomePage from './HomePage';

export default async function Home() {
  const accounts = await get('get-all-accounts')

  return <HomePage accounts={accounts} />
}