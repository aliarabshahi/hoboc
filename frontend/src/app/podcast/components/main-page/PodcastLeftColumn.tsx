import { PodcastEpisode } from "../../lib/episodes";
import { AudioPlayer } from "../player/AudioPlayer";
import EpisodeList from "./EpisodeList";
import PodcastPagination from "./PodcastPagination";

interface PodcastLeftColumnProps {
  episodes: PodcastEpisode[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Left column of podcast page: episodes list, pagination, and audio player */
export default function PodcastLeftColumn({
  episodes,
  currentPage,
  totalPages,
  onPageChange,
}: PodcastLeftColumnProps) {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {/* Episodes list */}
        <EpisodeList episodes={episodes} />

        {/* Pagination controls (below episodes, above player) */}
        <PodcastPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
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
