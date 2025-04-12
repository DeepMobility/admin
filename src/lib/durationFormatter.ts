export default function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60)
  const hours = Math.floor(minutes / 60)
  const diffMinutes = minutes - hours * 60

  return `${hours} heures et ${diffMinutes} minutes`
}