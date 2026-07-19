import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { MediaRow } from '../components/MediaRow';
import type { MediaItem } from '../types/media';
import { getHomeCatalog } from '../services/tmdb';

export function HomePage(){
 const {t}=useTranslation(); const navigate=useNavigate(); const [q,setQ]=useState('');
 const [data,setData]=useState<{hero:MediaItem;movies:MediaItem[];series:MediaItem[];anime:MediaItem[]}|null>(null);
 const [error,setError]=useState('');
 const currentLang = localStorage.getItem('peakflix-language') || 'en';

 useEffect(()=>{
   getHomeCatalog().then(setData).catch(e=>setError(e.message))
 },[currentLang]);

 const submit=(e:React.FormEvent)=>{e.preventDefault();if(q.trim())navigate(`/search?q=${encodeURIComponent(q)}`)};
 if(error)return <div className="page-shell"><div className="empty-state"><h2>{error}</h2></div></div>;
 if(!data)return <div className="page-shell"><div className="empty-state"><h2>Loading TMDB...</h2></div></div>;
 return <><Hero item={data.hero}/><section className="home-search"><form onSubmit={submit}><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t('search')}/><button>{t('browse')}</button></form></section><div className="content-shell"><MediaRow title={t('trendingMovies')} items={data.movies}/><MediaRow title={t('trendingSeries')} items={data.series}/><MediaRow title={t('trendingAnime')} items={data.anime}/></div></>;
}