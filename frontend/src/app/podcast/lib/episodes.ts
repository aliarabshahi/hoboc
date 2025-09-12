import { parse as parseFeed } from 'rss-to-json'
import { array, number, object, parse, string } from 'valibot'

export interface PodcastEpisode {
  id: number
  title: string
  slug: string
  description: string
  content: string,
  audio: {
    src: string
    type: string
  }
  audio_file: string // <— added absolute Django URL
  published_at: string
  is_published: boolean
}


export type Episode = PodcastEpisode
