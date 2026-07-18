import { useParams } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import { media } from '../data/media';
import type { MediaType } from '../types/media';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';

export function CategoryPage(){ const {type}=useParams(); const {ar}=useLocalizedMedia(); const items=media.filter(x=>x.type===type as MediaType); const labels:Record<string,[string,string]>={movie:['Movies','الأفلام'],series:['Series','المسلسلات'],anime:['Anime','الأنمي'],'turkish-series':['Turkish Series','المسلسلات التركية'],'turkish-drama':['Turkish Drama','الدراما التركية']}; return <div className="page-shell"><div className="page-banner"><span>EXPLORE</span><h1>{labels[type||'movie']?.[ar?1:0]}</h1></div><div className="catalog-grid">{items.map(x=><MediaCard key={x.id} item={x}/>)}</div></div> }
