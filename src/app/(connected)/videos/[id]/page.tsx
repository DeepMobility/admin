import { get } from "@/lib/httpMethods";
import EditVideoPage from "./EditVideoPage";

export default async function({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const video = await get(`get-video-details/${id}`)

  return <EditVideoPage video={video}/>
}