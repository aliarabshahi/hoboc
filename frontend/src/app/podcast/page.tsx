"use client";

import { useEffect, useState } from "react";
import PodcastLeftColumn from "./components/main-page/PodcastLeftColumn";
import { getApiData } from "../services/receive_data/apiServerFetch";
import { PodcastEpisode } from "./lib/episodes";
import { FaSpinner } from "react-icons/fa";

/** Podcast listing page with pagination and loading/error handling */
export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 24;

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const { data, error } = await getApiData("/podcast-episodes/");

        if (error) {
          setError(error);
          return;
        }

        if (!data || data.length === 0) {
          setError("پادکستی برای نمایش وجود ندارد!");
          return;
        }

        // Normalize audio property for UI
        const formattedEpisodes = (data as PodcastEpisode[]).map((ep) => ({
          ...ep,
          audio: {
            ...ep.audio,
            src: ep.audio_file,
          },
        }));

        setEpisodes(formattedEpisodes);
      } catch {
        setError("خطا در دریافت اطلاعات پادکست");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  // Loading state → spinner
  if (loading) {
    return (
      <div className="flex-1 flex flex-col lg:pr-20 pt-4 pb-10">
        <div className="flex justify-center pt-8">
          <FaSpinner className="animate-spin text-[#F477B8] text-4xl" />
        </div>
      </div>
    );
  }

  // Error state → message
  if (error) {
    return (
      <div className="w-full lg:w-3/5 flex flex-col">
        <div className="flex-1 overflow-y-auto flex items-center pr-10 py-8">
          <p className="text-center text-md text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Pagination setup
  const totalPages = Math.ceil(episodes.length / pageSize);
  const currentEpisodes = episodes.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  // Render podcast list with pagination controls
  return (
    <PodcastLeftColumn
      episodes={currentEpisodes}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
