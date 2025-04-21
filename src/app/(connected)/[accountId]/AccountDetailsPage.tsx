import durationFormatter from "@/lib/durationFormatter";
import sessionQuestions from "@/lib/sessionQuestions";

export default function({ account }: { account: any }) {
  return (
    <div>
      <h1 className="font-bold text-xl">{account.name}</h1>

      <div className="flex flex-col gap-6 mt-8">
        <div>Nombre d'inscrits : {account.usersCount}</div>

        <div>Utilisateurs actifs : {account.activeUsersCount}</div>

        <div>Temps total visionné : {durationFormatter(account.totalTimeWatched)}</div>

        <div>
          Temps visionné sur les 30 derniers jours : {durationFormatter(account.lastMonthTimeWatched)}
        </div>

        <div className="flex flex-col gap-2">
          <div>Vidéos les plus vues :</div>
          {account.mostWatchedVideos.map((video: any) => (
            <div key={video.id}>
              - {video.name}: {video.watchedCount} sessions
            </div>
          ))}
        </div>

        <div>
          Heure moyenne de visonnage : {Math.round(account.averageHour)}H
        </div>

        <div className="flex flex-col gap-6">
          {account.ratings.map((rating: any) => (
            <div key={rating.question} className="flex flex-col gap-2">
              <div>Moyennes :</div>
              <div>
                {sessionQuestions.find(q => q.value === rating.question)?.beforeLabel} : {rating.averageBeforeRating?.toFixed(1)}
              </div>
              <div>
                {sessionQuestions.find(q => q.value === rating.question)?.afterLabel} : {rating.averageAfterRating?.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}