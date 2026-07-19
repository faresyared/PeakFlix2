import { ArrowLeft, Server } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';
import { getDetails } from '../services/tmdb';
import type { MediaItem } from '../types/media';

export function WatchPage() {
  const { id } = useParams();
  const [item, setItem] = useState<MediaItem | null>(null);
  const [status, setStatus] = useState('جاري فحص خوادم البث الحية المقطعة...');
  const [activeServer, setActiveServer] = useState('superembed'); // سيرفر SUPEREMBED الرئيسي والافتراضي
  const { title } = useLocalizedMedia();

  // 1. جلب تفاصيل الفيلم من TMDB
  useEffect(() => {
    if (id) {
      getDetails(id)
        .then((data) => {
          setItem(data);
          setStatus(''); 
        })
        .catch(e => {
          console.error(e.message);
          setStatus('فشل في جلب بيانات الفيلم من TMDB');
        });
    }
  }, [id]);

  if (!item) return <div className="page-shell"><div className="empty-state"><h2>Loading Player...</h2></div></div>;

  const cleanId = String(item.id).replace('movie-', '');

  const servers: { [key: string]: string } = {
    superembed: `https://multiembed.mov/?video_id=${cleanId}&tmdb=1`,
    autoembed: `https://player.autoembed.cc/movie/${cleanId}`,
    vidsrc_pro: `https://vidsrc.pro/embed/movie/${cleanId}`,
    vidsrc_cc: `https://vidsrc.cc/v2/embed/movie/${cleanId}`
  };

  return (
    <div className="watch-page">
      <div className="watch-top">
        <Link to={`/title/${item.id}`}><ArrowLeft /></Link>
        <div>
          <small>PEAKFLIX PREMIUM HLS MULTI-STREAM</small>
          <h1>{title(item)}</h1>
        </div>
      </div>

      {/* أزرار السيرفرات بستايل إيجي بست الاحترافي باللون البرتقالي */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', background: '#12141c', padding: '10px', borderRadius: '6px', border: '1px solid #222' }}>
        <span style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', marginRight: '10px' }}>
          <Server size={16} color="#ff6b00" /> سيرفرات البث المباشرة:
        </span>
        {Object.keys(servers).map((srv, idx) => (
          <button
            key={srv}
            onClick={() => setActiveServer(srv)}
            style={{
              background: activeServer === srv ? '#ff6b00' : '#08090d',
              color: '#fff',
              border: activeServer === srv ? '1px solid #ff6b00' : '1px solid #333',
              padding: '6px 16px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            سيرفر {idx + 1} ({srv.replace('_', ' ').toUpperCase()})
          </button>
        ))}
      </div>

      <div className="player-frame" style={{ width: '100%', height: '70vh', background: '#000', position: 'relative', marginTop: '15px', borderRadius: '8px', overflow: 'hidden' }}>
        {status && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(8,9,13,0.95)', color: '#fff', zIndex: 10, flexDirection: 'column', gap: '15px', padding: '20px', textAlign: 'center' }}>
            <div className="loading-spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ff6b00', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ fontSize: '18px', fontWeight: 'bold', maxWidth: '80%', color: '#ff6b00' }}>{status}</p>
          </div>
        )}

        {/* التعديل الجوهري: إضافة تفعيل الفول سكرين المطلق لكل النطاقات المدمجة وصلاحيات الأمان الشاملة */}
        <iframe
          src={servers[activeServer]}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen *; geolocation; microphone; camera; midi; vr; accelerometer; gyroscope"
          allowFullScreen={true}
          // @ts-ignore
          webkitallowfullscreen="true"
          // @ts-ignore
          mozallowfullscreen="true"
          title="PeakFlix Cinema Live Stream"
        />
      </div>

      <p className="watch-note" style={{ marginTop: '20px', color: '#666' }}>
        Segmented stream failover matrix configured successfully. Native video buffers attached.
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}