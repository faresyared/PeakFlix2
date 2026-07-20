import { motion } from 'framer-motion';
import { Info, Play, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { MediaItem } from '../types/media';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';

export function Hero({ item }: { item: MediaItem }) {
  const { t } = useTranslation();
  const { title, description } = useLocalizedMedia();

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.72) 38%, rgba(2,6,23,0.2) 100%), linear-gradient(180deg, rgba(8,9,13,0.15) 0%, rgba(8,9,13,0.75) 100%), url(${item.backdrop})`,
      }}
    >
      <motion.div className="hero-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>PEAKFLIX PREMIUM</span>
        </div>
        <h1>{title(item)}</h1>
        <div className="meta">
          <span><Star size={16} fill="currentColor" /> {item.rating}</span>
          <span>{item.year}</span>
          {item.duration ? <span>{item.duration}</span> : null}
          <span className="quality">4K</span>
        </div>
        <p>{description(item)}</p>
        <div className="hero-buttons">
          <Link className="primary-btn" to={`/watch/${item.id}`}>
            <Play size={19} fill="currentColor" />
            {t('play')}
          </Link>
          <Link className="secondary-btn" to={`/title/${item.id}`}>
            <Info size={19} />
            {t('details')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}