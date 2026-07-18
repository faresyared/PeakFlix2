import { motion } from 'framer-motion';
import { Info, Play, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { MediaItem } from '../types/media';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';

export function Hero({ item }: { item: MediaItem }) {
  const { t } = useTranslation(); const { title, description } = useLocalizedMedia();
  return <section className="hero" style={{backgroundImage:`linear-gradient(90deg, rgba(7,8,12,.98) 3%, rgba(7,8,12,.75) 45%, rgba(7,8,12,.16)), linear-gradient(0deg,#08090d 0%,transparent 38%), url(${item.backdrop})`}}>
    <motion.div className="hero-content" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
      <span className="eyebrow">CINEVAULT ORIGINAL</span>
      <h1>{title(item)}</h1>
      <div className="meta"><span><Star size={16} fill="currentColor"/> {item.rating}</span><span>{item.year}</span><span>{item.duration}</span><span className="quality">4K</span></div>
      <p>{description(item)}</p>
      <div className="hero-buttons"><Link className="primary-btn" to={`/watch/${item.id}`}><Play size={19} fill="currentColor"/>{t('play')}</Link><Link className="secondary-btn" to={`/title/${item.id}`}><Info size={19}/>{t('details')}</Link></div>
    </motion.div>
  </section>;
}
