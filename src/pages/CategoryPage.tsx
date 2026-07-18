import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import type { MediaItem, MediaType } from '../types/media';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';
import { getCategory } from '../services/tmdb';

export function CategoryPage(){
 const {type}=useParams(); const {ar}=useLocalizedMedia();
 const category=(type||'movie') as MediaType;
 const [items,setItems]=useState<MediaItem[]>([]); const [page,setPage]=useState(1); const [totalPages,setTotalPages]=useState(1); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
 const labels:Record<string,[string,string]>={movie:['Movies','الأفلام'],series:['Series','المسلسلات'],anime:['Anime','الأنمي'],'turkish-series':['Turkish Series','المسلسلات التركية'],'turkish-drama':['Turkish Drama','الدراما التركية']};
 useEffect(()=>{setItems([]);setPage(1);setLoading(true);getCategory(category,1).then(r=>{setItems(r.items);setTotalPages(r.totalPages)}).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[category]);
 const more=()=>{const next=page+1;setLoading(true);getCategory(category,next).then(r=>{setItems(v=>[...v,...r.items]);setPage(next);setTotalPages(r.totalPages)}).catch(e=>setError(e.message)).finally(()=>setLoading(false))};
 return <div className="page-shell"><div className="page-banner"><span>EXPLORE TMDB</span><h1>{labels[category]?.[ar?1:0]}</h1></div>{error&&<div className="empty-state"><h2>{error}</h2></div>}<div className="catalog-grid">{items.map(x=><MediaCard key={x.id} item={x}/>)}</div>{loading&&<div className="load-status">Loading...</div>}{!loading&&page<totalPages&&<button className="load-more" onClick={more}>Load more</button>}</div>;
}
