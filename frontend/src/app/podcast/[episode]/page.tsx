// app/podcast/[episode]/page.tsx
import { notFound } from "next/navigation";
import EpisodeLeftColumn from "./components/EpisodeLeftColumn";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { PodcastEpisode } from "../lib/episodes";

/** Fetch single episode data and its reverse-order number in the list */
async function fetchEpisodeAndNumber(id: string): Promise<{
  episode: PodcastEpisode;
  number: number;
}> {
  // Get all podcast episodes from API
  const { data: listData, error } = await getApiData("/podcast-episodes/");

  if (error || !listData) {
    notFound();
  }

  // Normalize audio file structure
  const episodes: PodcastEpisode[] = (listData as PodcastEpisode[]).map(
    (ep) => ({
      ...ep,
      audio: { ...ep.audio, src: ep.audio_file },
    })
  );

  const total = episodes.length;
  const indexInArray = episodes.findIndex((ep) => ep.id.toString() === id);

  if (indexInArray === -1) {
    notFound();
  }

  const episode = episodes[indexInArray];
  const number = total - indexInArray; // Reverse order number

  return { episode, number };
}

/** Generate metadata for the episode page */
export async function generateMetadata({
  params,
}: {
  params: { episode: string };
}) {
  const { episode } = await fetchEpisodeAndNumber(params.episode);
  return { title: episode.title };
}

/** Episode details page (left column layout) */
export default async function EpisodePage({
  params,
}: {
  params: { episode: string };
}) {
  const { episode, number } = await fetchEpisodeAndNumber(params.episode);
  return <EpisodeLeftColumn episode={episode} number={number} />;
}
