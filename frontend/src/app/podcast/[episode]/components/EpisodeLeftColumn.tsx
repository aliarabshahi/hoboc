import Link from "next/link";
import { Container } from "../../components/Container";
import { AudioPlayer } from "../../components/player/AudioPlayer";
import { EpisodePlayButton } from "../../components/EpisodePlayButton";
import { PodcastEpisode } from "../../lib/episodes";
import { formatJalaliDate, toPersianDigits } from "../../lib/date-utils";
import {
  HiMiniPause as PauseIcon,
  HiMiniPlay as PlayIcon,
  HiArrowUturnRight as BackIcon,
} from "react-icons/hi2";

interface EpisodeLeftColumnProps {
  episode: PodcastEpisode;
  number: number;
}

/** Left column for an individual podcast episode: header, content, and audio player */
export default function EpisodeLeftColumn({
  episode,
  number,
}: EpisodeLeftColumnProps) {
  const jalaliDate = formatJalaliDate(episode.published_at);

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="py-8 lg:py-16">
          <Container>
            {/* Back link to all episodes */}
            <div className="mb-6">
              <Link
                href="/podcast"
                className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-800 transition-colors"
              >
                <BackIcon className="h-4 w-4" />
                <span>بازگشت به همه قسمتها</span>
              </Link>
            </div>

            {/* Episode header: play button, episode number, title, date, and description */}
            <header className="flex flex-col">
              <div className="flex items-start gap-6">
                <EpisodePlayButton
                  episode={episode}
                  className="group relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:ring-3 focus:ring-slate-700 focus:ring-offset-4 focus:outline-hidden"
                  playing={
                    <PauseIcon className="h-10 w-10 fill-white group-active:fill-white/80" />
                  }
                  paused={
                    <PlayIcon className="h-10 w-10 fill-white group-active:fill-white/80" />
                  }
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 font-mono">
                      {toPersianDigits(number.toString().padStart(2, "0"))}
                    </span>
                    <h1 className="mt-0 text-4xl font-bold text-slate-900">
                      {episode.title}
                    </h1>
                  </div>
                  <div className="order-first font-mono text-sm/7 text-slate-500">
                    {jalaliDate}
                  </div>
                  <p className="mt-3 text-lg/8 font-medium text-slate-700">
                    {episode.description}
                  </p>
                </div>
              </div>
            </header>

            <hr className="my-12 border-gray-200" />

            {/* Episode main content (HTML) */}
            <div
              className="prose mt-14 prose-slate [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm/7 [&>h2]:font-medium [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
          </Container>
        </div>
      </div>

      {/* Persistent audio player at bottom (LTR layout) */}
      <div
        className="sticky bottom-0 bg-white border-t border-slate-200 z-10"
        dir="ltr"
      >
        <AudioPlayer />
      </div>
    </>
  );
}
