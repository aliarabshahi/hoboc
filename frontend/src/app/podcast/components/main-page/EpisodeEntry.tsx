import Link from "next/link";
import { PodcastEpisode } from "../../lib/episodes";
import { EpisodePlayButton } from "../EpisodePlayButton";
import { Container } from "../Container";
import { formatJalaliDate, toPersianDigits } from "../../lib/date-utils";
import { HiMiniPause as PauseIcon, HiMiniPlay as PlayIcon } from "react-icons/hi2";

interface EpisodeEntryProps {
  episode: PodcastEpisode;
  index: number;
}

/** Single podcast episode entry with date, title, description, and playback controls */
export default function EpisodeEntry({ episode, index }: EpisodeEntryProps) {
  const jalaliDate = formatJalaliDate(episode.published_at);

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-6 sm:py-8"
    >
      <Container>
        <div className="flex flex-col items-start">
          {/* Jalali date above title */}
          <div className="font-mono text-sm text-slate-500">{jalaliDate}</div>

          {/* Title with Persian index prefix */}
          <div className="flex items-center gap-3 mt-1">
            <span className="font-bold text-slate-900 font-mono">
              {toPersianDigits(index.toString().padStart(2, "0"))}
            </span>
            <h2
              id={`episode-${episode.id}-title`}
              className="text-lg font-bold text-slate-900"
            >
              <Link href={`/podcast/${episode.id}`}>{episode.title}</Link>
            </h2>
          </div>

          {/* Episode description */}
          <p className="mt-2 text-base/7 text-slate-700">
            {episode.description}
          </p>

          {/* Playback + notes controls */}
          <div className="mt-4 flex items-center gap-4">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5" />
                  <span aria-hidden="true">پخش</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5" />
                  <span aria-hidden="true">پخش</span>
                </>
              }
            />
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/podcast/${episode.id}`}
              className="flex items-center text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`یادداشت‌های قسمت ${episode.title}`}
            >
              یادداشت‌ها
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
