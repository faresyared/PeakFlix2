import { ExternalLink, Play, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { MediaItem } from '../types/media';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';
import { getDetails } from '../services/tmdb';

export function DetailsPage(){
 const {id}=useParams(); const {t}=useTranslation(); const {title,description,ar}=useLocalizedMedia(); const [item,setItem]=useState<MediaItem|null>(null); const [error,setError]=useState('');
 useEffect(()=>{if(id)getDetails(id).then(setItem).catch(e=>setError(e.message))},[id]);
 if(error)return <div className="page-shell"><div className="empty-state"><h2>{error}</h2></div></div>;
 if(!item)return <div className="page-shell"><div className="empty-state"><h2>Loading...</h2></div></div>;
 const genres=ar&&item.genreAr?.length?item.genreAr:item.genre;
 return <div className="detail-page"><div className="detail-backdrop" style={{backgroundImage:`linear-gradient(0deg,#08090d 0%,rgba(8,9,13,.35)),url(${item.backdrop})`}}/><div className="detail-panel"><img className="detail-poster" src={item.poster} alt={title(item)}/><div className="detail-copy"><span className="eyebrow">TMDB TITLE</span><h1>{title(item)}</h1><div className="meta"><span><Star size={16} fill="currentColor"/> {item.rating}</span><span>{item.year}</span>{item.duration&&<span>{item.duration}</span>}{item.episodes&&<span>{item.episodes} Episodes</span>}</div><p>{description(item)}</p><div className="chips">{genres.map(g=><span key={g}>{g}</span>)}</div>{item.providers?.length?<div className="provider-block"><h3>{ar?'متاح للمشاهدة على':'Available on'}</h3><div className="provider-list">{item.providers.map(p=><span className="provider-chip" key={p.id}>{p.logo&&<img src={p.logo} alt=""/>}{p.name}</span>)}</div></div>:null}<div className="hero-buttons">{item.video?<Link className="primary-btn" to={`/watch/${item.id}`}><Play fill="currentColor"/>{t('play')}</Link>:null}{item.providerLink&&<a className="secondary-btn" href={item.providerLink} target="_blank" rel="noreferrer"><ExternalLink size={18}/>{ar?'أماكن المشاهدة':'Where to watch'}</a>}{item.trailer&&<a className="secondary-btn" href={item.trailer} target="_blank" rel="noreferrer"><Play size={18}/>{ar?'الإعلان':'Trailer'}</a>}</div></div></div></div>;
}
