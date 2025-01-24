import { get } from '@/lib/httpMethods';
import VideosPage from './VideosPage';

export default async function Videos() {
  const videos = await get('get-all-videos')

  return <VideosPage videos={videos} />
}