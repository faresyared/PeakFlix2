import type { MediaItem, MediaType } from '../types/media';

const API = 'https://api.themoviedb.org/3';
const IMG = 'https://image.tmdb.org/t/p';
const token = import.meta.env.VITE_TMDB_READ_TOKEN as string | undefined;

function authHeaders(): HeadersInit {
  if (!token) throw new Error('TMDB token is missing');
  return { Authorization: `Bearer ${token}`, accept: 'application/json' };
}

async function request(path: string, params: Record<string, string | number | boolean | undefined> = {}) {
  const url = new URL(`${API}${path}`);
  Object.entries(params).forEach(([key, value]) => value !== undefined && url.searchParams.set(key, String(value)));
  const response = await fetch(url, { headers: authHeaders() });
  if (!response.ok) throw new Error(`TMDB request failed (${response.status})`);
  return response.json();
}

function siteType(tmdbType: 'movie' | 'tv', raw: any, requested?: MediaType): MediaType {
  if (requested) return requested;
  if (tmdbType === 'movie') return raw.original_language === 'tr' ? 'turkish-drama' : 'movie';
  if ((raw.genre_ids || raw.genres?.map((g: any) => g.id) || []).includes(16)) return 'anime';
  if (raw.original_language === 'tr') return 'turkish-series';
  return 'series';
}

function mapBasic(raw: any, tmdbType: 'movie' | 'tv', requested?: MediaType): MediaItem {
  const date = raw.release_date || raw.first_air_date || '';
  return {
    id: `${tmdbType}-${raw.id}`,
    tmdbId: raw.id,
    tmdbType,
    type: siteType(tmdbType, raw, requested),
    title: raw.title || raw.name || 'Untitled',
    titleAr: raw.title || raw.name || 'بدون عنوان',
    description: raw.overview || 'No description available.',
    descriptionAr: raw.overview || 'لا يوجد وصف متاح.',
    year: Number(date.slice(0, 4)) || 0,
    rating: Math.round((raw.vote_average || 0) * 10) / 10,
    duration: '',
    genre: [],
    genreAr: [],
    poster: raw.poster_path ? `${IMG}/w500${raw.poster_path}` : '',
    backdrop: raw.backdrop_path ? `${IMG}/original${raw.backdrop_path}` : raw.poster_path ? `${IMG}/original${raw.poster_path}` : '',
    trailer: '',
    video: '',
    trending: true,
  };
}

export async function getHomeCatalog(): Promise<{ hero: MediaItem; movies: MediaItem[]; series: MediaItem[]; anime: MediaItem[] }> {
  const [movieData, tvData, animeData] = await Promise.all([
    request('/trending/movie/week', { language: 'en-US' }),
    request('/trending/tv/week', { language: 'en-US' }),
    request('/discover/tv', { language: 'en-US', with_genres: 16, sort_by: 'popularity.desc', page: 1 }),
  ]);
  const movies = movieData.results.filter((x: any) => x.poster_path).map((x: any) => mapBasic(x, 'movie'));
  const series = tvData.results.filter((x: any) => x.poster_path).map((x: any) => mapBasic(x, 'tv'));
  const anime = animeData.results.filter((x: any) => x.poster_path).map((x: any) => mapBasic(x, 'tv', 'anime'));
  const hero = await getDetails(movies[0].id);
  return { hero, movies, series, anime };
}

export async function getCategory(type: MediaType, page = 1): Promise<{ items: MediaItem[]; totalPages: number }> {
  let path = '/discover/movie';
  const params: Record<string, string | number | boolean> = { language: 'en-US', include_adult: false, sort_by: 'popularity.desc', page };
  let tmdbType: 'movie' | 'tv' = 'movie';
  if (type === 'series') { path = '/discover/tv'; tmdbType = 'tv'; params.without_genres = 16; }
  if (type === 'anime') { path = '/discover/tv'; tmdbType = 'tv'; params.with_genres = 16; }
  if (type === 'turkish-series') { path = '/discover/tv'; tmdbType = 'tv'; params.with_original_language = 'tr'; }
  if (type === 'turkish-drama') { path = '/discover/movie'; tmdbType = 'movie'; params.with_original_language = 'tr'; }
  const data = await request(path, params);
  return {
    items: data.results.filter((x: any) => x.poster_path).map((x: any) => mapBasic(x, tmdbType, type)),
    totalPages: Math.min(data.total_pages || 1, 500),
  };
}

export async function searchTitles(query: string, page = 1): Promise<{ items: MediaItem[]; totalPages: number }> {
  const data = await request('/search/multi', { query, language: 'en-US', include_adult: false, page });
  const results = data.results.filter((x: any) => (x.media_type === 'movie' || x.media_type === 'tv') && x.poster_path);
  return {
    items: results.map((x: any) => mapBasic(x, x.media_type)),
    totalPages: Math.min(data.total_pages || 1, 500),
  };
}

export async function getDetails(id: string): Promise<MediaItem> {
  const [tmdbType, rawId] = id.split('-') as ['movie' | 'tv', string];
  const [en, ar] = await Promise.all([
    request(`/${tmdbType}/${rawId}`, { language: 'en-US', append_to_response: 'watch/providers,videos' }),
    request(`/${tmdbType}/${rawId}`, { language: 'ar' }),
  ]);
  const region = en['watch/providers']?.results?.JO || en['watch/providers']?.results?.US;
  const providerKinds = ['flatrate', 'free', 'ads', 'rent', 'buy'];
  const providers = [...new Map(providerKinds.flatMap(k => region?.[k] || []).map((p: any) => [p.provider_id, { id: p.provider_id, name: p.provider_name, logo: p.logo_path ? `${IMG}/w92${p.logo_path}` : '' }])).values()] as any[];
  const trailer = en.videos?.results?.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) || en.videos?.results?.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');
  const runtime = tmdbType === 'movie' ? en.runtime : en.episode_run_time?.[0];
  const date = en.release_date || en.first_air_date || '';
  return {
    id: `${tmdbType}-${en.id}`,
    tmdbId: en.id,
    tmdbType,
    type: siteType(tmdbType, en),
    title: en.title || en.name,
    titleAr: ar.title || ar.name || en.title || en.name,
    description: en.overview || 'No description available.',
    descriptionAr: ar.overview || en.overview || 'لا يوجد وصف متاح.',
    year: Number(date.slice(0, 4)) || 0,
    rating: Math.round((en.vote_average || 0) * 10) / 10,
    duration: runtime ? `${Math.floor(runtime / 60)}h ${String(runtime % 60).padStart(2, '0')}m` : en.number_of_seasons ? `${en.number_of_seasons} Seasons` : '',
    genre: (en.genres || []).map((g: any) => g.name),
    genreAr: (ar.genres || []).map((g: any) => g.name),
    poster: en.poster_path ? `${IMG}/w500${en.poster_path}` : '',
    backdrop: en.backdrop_path ? `${IMG}/original${en.backdrop_path}` : '',
    trailer: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '',
    video: '',
    episodes: en.number_of_episodes,
    seasons: en.number_of_seasons,
    providers,
    providerLink: region?.link || `https://www.themoviedb.org/${tmdbType}/${en.id}/watch`,
    homepage: en.homepage || '',
    status: en.status || '',
  };
}
