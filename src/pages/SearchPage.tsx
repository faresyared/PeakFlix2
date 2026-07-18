import { Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import { media } from '../data/media';

export function SearchPage(){ const {t}=useTranslation(); const [params,setParams]=useSearchParams(); const [q,setQ]=useState(params.get('q')||''); const term=(params.get('q')||'').toLowerCase(); const results=media.filter(x=>`${x.title} ${x.titleAr} ${x.genre.join(' ')}`.toLowerCase().includes(term)); return <div className="page-shell search-page"><form onSubmit={e=>{e.preventDefault();setParams({q})}}><Search/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder={t('search')}/></form>{results.length?<div className="catalog-grid">{results.map(x=><MediaCard key={x.id} item={x}/>)}</div>:<div className="empty-state"><Search size={48}/><h2>{t('noResults')}</h2></div>}</div> }
