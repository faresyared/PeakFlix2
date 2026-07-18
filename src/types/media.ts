export type MediaType = 'movie' | 'series' | 'anime' | 'turkish-series' | 'turkish-drama';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  year: number;
  rating: number;
  duration: string;
  genre: string[];
  poster: string;
  backdrop: string;
  trailer: string;
  video: string;
  trending?: boolean;
  episodes?: number;
}

export interface WatchProgress {
  mediaId: string;
  currentTime: number;
  duration: number;
  updatedAt: number;
}
