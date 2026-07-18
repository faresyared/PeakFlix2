import { ExternalLink, Play, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { media } from '../data/media';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';

export function DetailsPage(){
  const {id}=useParams();
  const item=media.find(x=>x.id===id);
  const {t}=useTranslation();
  const {title,description,ar}=useLocalizedMedia();
  if(!item)return null;
  const genres=ar&&item.genreAr?.length?item.genreAr:item.genre;
  return <div className="detail-page">
    <div className="detail-backdrop" style={{backgroundImage:`linear-gradient(0deg,#08090d 0%,rgba(8,9,13,.35)),url(${item.backdrop})`}}/>
    <div className="detail-panel">
      <img className="detail-poster" src={item.poster} alt={title(item)}/>
      <div className="detail-copy">
        <span className="eyebrow">TMDB TITLE</span>
        <h1>{title(item)}</h1>
        <div className="meta"><span><Star size={16} fill="currentColor"/> {item.rating}</span><span>{item.year||'—'}</span><span>{item.duration}</span>{item.status&&<span>{item.status}</span>}</div>
        <p>{description(item)}</p>
        <div className="chips">{genres.map(g=><span key={g}>{g}</span>)}</div>
        {item.providers?.length ? <div className="provider-block"><h3>{ar?'متوفر للمشاهدة على':'Available on'}</h3><div className="provider-list">{item.providers.map(provider=><span className="provider-chip" key={provider.id}>{provider.logo&&<img src={provider.logo} alt=""/>}{provider.name}</span>)}</div><a className="primary-btn" href={item.providerLink} target="_blank" rel="noreferrer"><ExternalLink/>{ar?'أماكن المشاهدة':'View watch options'}</a><small>{ar?'بيانات التوفر مقدمة من JustWatch عبر TMDB.':'Availability data provided by JustWatch through TMDB.'}</small></div> : item.video ? <Link className="primary-btn" to={`/watch/${item.id}`}><Play fill="currentColor"/>{t('play')}</Link> : item.trailer&&<a className="primary-btn" href={item.trailer} target="_blank" rel="noreferrer"><Play fill="currentColor"/>{ar?'شاهد الإعلان':'Watch trailer'}</a>}
      </div>
    </div>
  </div>
}
