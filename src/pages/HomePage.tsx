import { Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { MediaRow } from '../components/MediaRow';
import { useAuth } from '../context/AuthContext';
import { media } from '../data/media';
import { getProgress } from '../utils/storage';

export function HomePage(){
 const {t}=useTranslation(); const navigate=useNavigate(); const [q,setQ]=useState(''); const {user}=useAuth();
 const progressItems=user?getProgress(user):[]; const progressMap=Object.fromEntries(progressItems.map(p=>[p.mediaId,p.duration?Math.min(100,p.currentTime/p.duration*100):0]));
 const continueItems=media.filter(m=>progressMap[m.id]!==undefined);
 const submit=(e:React.FormEvent)=>{e.preventDefault();if(q.trim())navigate(`/search?q=${encodeURIComponent(q)}`)};
 return <><Hero item={media[0]}/><section className="home-search"><form onSubmit={submit}><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t('search')}/><button>{t('browse')}</button></form></section><div className="content-shell">{user&&<MediaRow title={t('continueWatching')} items={continueItems} progress={progressMap}/>}<MediaRow title={t('trendingMovies')} items={media.filter(x=>x.type==='movie'&&x.trending)}/><MediaRow title={t('trendingSeries')} items={media.filter(x=>['series','turkish-series','turkish-drama'].includes(x.type)&&x.trending)}/><MediaRow title={t('trendingAnime')} items={media.filter(x=>x.type==='anime'&&x.trending)}/></div></>;
}
