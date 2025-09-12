export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface BlogTopic {
  id: number;
  title: string;
  catchy_title: string;
  slug: string;
  description: string;
  image: string;
  logo_file: string;
  is_published: boolean;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogWriter {
  id: number;
  user: string;
  name: string;
  bio: string;
  profile_picture: string;
}

export interface BlogPost {
  id: number;
  topic: string | BlogTopic;
  topic_slug: string | BlogTopic;
  writer: BlogWriter | null;
  tags: BlogTag[];
  title: string;
  slug: string;
  description: string;
  pdf_file: string | null;
  video_file: string | null;
  video_url: string | null;
  thumbnail: string | null;
  cover_image: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}