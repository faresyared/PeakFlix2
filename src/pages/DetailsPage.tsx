import { Play, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { media } from '../data/media';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';

export function DetailsPage(){ const {id}=useParams(); const item=media.find(x=>x.id===id); const {t}=useTranslation(); const {title,description}=useLocalizedMedia(); if(!item)return null; return <div className="detail-page"><div className="detail-backdrop" style={{backgroundImage:`linear-gradient(0deg,#08090d 0%,rgba(8,9,13,.35)),url(${item.backdrop})`}}/><div className="detail-panel"><img className="detail-poster" src={item.poster} alt={title(item)}/><div className="detail-copy"><span className="eyebrow">FEATURED TITLE</span><h1>{title(item)}</h1><div className="meta"><span><Star size={16} fill="currentColor"/> {item.rating}</span><span>{item.year}</span><span>{item.duration}</span><span className="quality">4K UHD</span></div><p>{description(item)}</p><div className="chips">{item.genre.map(g=><span key={g}>{g}</span>)}</div><Link className="primary-btn" to={`/watch/${item.id}`}><Play fill="currentColor"/>{t('play')}</Link></div></div></div> }
