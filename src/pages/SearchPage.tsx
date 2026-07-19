import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import type { MediaItem } from '../types/media';
import { searchTitles } from '../services/tmdb';

export function SearchPage(){
 const {t, i18n}=useTranslation(); const [params,setParams]=useSearchParams(); const initial=params.get('q')||''; const [q,setQ]=useState(initial);
 const [items,setItems]=useState<MediaItem[]>([]); const [page,setPage]=useState(1); const [totalPages,setTotalPages]=useState(1); const [loading,setLoading]=useState(false); const [error,setError]=useState('');
 const term=params.get('q')||'';
 const currentLang = i18n.resolvedLanguage || localStorage.getItem('peakflix-language') || 'en';

 useEffect(()=>{
   if(!term){setItems([]);return}
   setLoading(true);setError('');setPage(1);
   searchTitles(term,1).then(r=>{setItems(r.items);setTotalPages(r.totalPages)}).catch(e=>setError(e.message)).finally(()=>setLoading(false))
 },[term, currentLang]);

 const more=()=>{
   const next=page+1;setLoading(true);
   searchTitles(term,next).then(r=>{setItems(v=>[...v,...r.items]);setPage(next);setTotalPages(r.totalPages)}).catch(e=>setError(e.message)).finally(()=>setLoading(false))
 };

 return <div className="page-shell search-page"><form onSubmit={e=>{e.preventDefault();if(q.trim())setParams({q:q.trim()})}}><Search/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder={t('search')}/></form>{error&&<div className="empty-state"><h2>{error}</h2></div>}{items.length?<><div className="catalog-grid">{items.map(x=><MediaCard key={x.id} item={x}/>)}</div>{loading&&<div className="load-status">Loading...</div>}{!loading&&page<totalPages&&<button className="load-more" onClick={more}>Load more</button>}</>:term&&!loading&&!error?<div className="empty-state"><Search size={48}/><h2>{t('noResults')}</h2></div>:null}</div>;
}