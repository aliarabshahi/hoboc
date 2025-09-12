// app/podcast/components/main-page/EpisodeList.tsx
import { PodcastEpisode } from "../../lib/episodes";
import EpisodeEntry from "./EpisodeEntry";
import { Container } from "../Container";

interface EpisodeListProps {
  episodes: PodcastEpisode[];
  title?: string;
}

/** Renders a list of podcast episodes with optional title and empty state */
export default function EpisodeList({
  episodes,
  title = "قسمت‌ها",
}: EpisodeListProps) {
  const total = episodes.length;

  // Empty state → show message only
  if (episodes.length === 0) {
    return (
      <div className="pt-8 pb-6">
        <Container>
          <div className="text-center text-slate-500 py-8">
            قسمتی برای نمایش وجود ندارد
          </div>
        </Container>
      </div>
    );
  }

  // List episodes in reverse order (latest first)
  return (
    <div className="pt-8 pb-6">
      <Container>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {episodes.map((episode, i) => (
          <EpisodeEntry
            key={episode.id}
            episode={episode}
            index={total - i}
          />
        ))}
      </div>
    </div>
  );
}
