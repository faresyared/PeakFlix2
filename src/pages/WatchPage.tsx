import { ArrowLeft, Server, Film, Tv, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';
import { getDetails } from '../services/tmdb'; 

interface Episode {
  id: number;
  episode_number: number;
  name: string;
  still_path: string | null;
  overview: string;
  vote_average: number;
}

interface Season {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
}

export function WatchPage() {
  const { id } = useParams();
  const [item, setItem] = useState<any | null>(null);
  const [status, setStatus] = useState('جاري فحص خوادم البث الحية المقطعة...');
  const [activeServer, setActiveServer] = useState('superembed'); 
  
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [activeEpisode, setActiveEpisode] = useState<number>(1);
  const [seasonsList, setSeasonsList] = useState<Season[]>([]);
  const [episodesList, setEpisodesList] = useState<Episode[]>([]);

  const { title } = useLocalizedMedia();

  const isTv = String(id).includes('tv');
  const cleanId = String(id).replace('movie-', '').replace('tv-', '');

  // مفتاح API شغال ونشط حالياً كـ Fallback مضمون
  const BACKUP_KEY = 'c9053fa3b45501306385d30d31590448';

  // 1. جلب بيانات العنصر الأساسي بالدالة الرسمية للمشروع المضمونة عندك
  useEffect(() => {
    if (id) {
      getDetails(id)
        .then((data) => {
          if (data) {
            setItem(data);
            setStatus('');
            
            const rawData = data as any;
            if (isTv && rawData.seasons && Array.isArray(rawData.seasons)) {
              const realSeasons = rawData.seasons.filter((s: any) => s.season_number > 0);
              setSeasonsList(realSeasons);
              if (realSeasons.length > 0) {
                setActiveSeason(realSeasons[0].season_number);
              }
            } else if (isTv) {
              // إذا لم تتوفر المواسم بالدالة الأساسية، نجلبها بمفتاحنا المضمون
              fetch(`https://api.themoviedb.org/3/tv/${cleanId}?api_key=${BACKUP_KEY}&language=ar`)
                .then(res => res.json())
                .then(tvData => {
                  if (tvData && tvData.seasons) {
                    const realSeasons = tvData.seasons.filter((s: any) => s.season_number > 0);
                    setSeasonsList(realSeasons);
                    if (realSeasons.length > 0) {
                      setActiveSeason(realSeasons[0].season_number);
                    }
                  }
                }).catch(err => console.error(err));
            }
          }
        })
        .catch(e => {
          console.error(e);
          setStatus('فشل في جلب بيانات العمل من TMDB');
        });
    }
  }, [id]);

  // 2. جلب الحلقات بشكل مستقر ومباشر بمفتاح الـ API المضمون 100%
  useEffect(() => {
    if (isTv && id && activeSeason) {
      fetch(`https://api.themoviedb.org/3/tv/${cleanId}/season/${activeSeason}?api_key=${BACKUP_KEY}&language=en-US`)
        .then(res => res.json())
        .then(data => {
          if (data && data.episodes) {
            setEpisodesList(data.episodes);
          } else {
            setEpisodesList([]);
          }
        })
        .catch(err => {
          console.error("Error fetching episodes: ", err);
          setEpisodesList([]);
        });
    }
  }, [activeSeason, id]);

  if (!item && status.includes('جاري فحص')) {
    return <div className="page-shell"><div className="empty-state"><h2>Loading Player...</h2></div></div>;
  }

  const servers: { [key: string]: string } = {
    superembed: isTv 
      ? `https://multiembed.mov/?video_id=${cleanId}&tmdb=1&s=${activeSeason}&e=${activeEpisode}`
      : `https://multiembed.mov/?video_id=${cleanId}&tmdb=1`,
    
    autoembed: isTv
      ? `https://player.autoembed.cc/tv/${cleanId}/${activeSeason}/${activeEpisode}`
      : `https://player.autoembed.cc/movie/${cleanId}`,
    
    vidsrc_pro: isTv
      ? `https://vidsrc.pro/embed/tv/${cleanId}/${activeSeason}/${activeEpisode}`
      : `https://vidsrc.pro/embed/movie/${cleanId}`,
    
    vidsrc_cc: isTv
      ? `https://vidsrc.cc/v2/embed/tv/${cleanId}/${activeSeason}/${activeEpisode}`
      : `https://vidsrc.cc/v2/embed/movie/${cleanId}`
  };

  return (
    <div className="watch-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', direction: 'rtl' }}>
      <div className="watch-top" style={{ textAlign: 'right' }}>
        <Link to={`/title/${id}`}><ArrowLeft style={{ transform: 'rotate(180deg)' }} /></Link>
        <div>
          <small style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-start' }}>
            {isTv ? <Tv size={12} color="#ff6b00" /> : <Film size={12} color="#ff6b00" />}
            {isTv ? 'بث مباشر للمسلسلات بقوة PEAKFLIX' : 'بث مباشر للأفلام بقوة PEAKFLIX'}
          </small>
          <h1 style={{ textAlign: 'right' }}>{item ? title(item) : 'جاري التحميل...'} {isTv && <span style={{ color: '#ff6b00', fontSize: '16px' }}>(الموسم {activeSeason} - الحلقة {activeEpisode})</span>}</h1>
        </div>
      </div>

      {/* سيرفرات البث */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', background: '#12141c', padding: '10px', borderRadius: '6px', border: '1px solid #222', alignItems: 'center' }}>
        <span style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', marginLeft: '10px' }}>
          <Server size={16} color="#ff6b00" /> سيرفرات البث الحية:
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
              cursor: 'pointer'
            }}
          >
            سيرفر {idx + 1}
          </button>
        ))}
      </div>

      {/* الفريم الأساسي للفيديو */}
      <div className="player-frame" style={{ width: '100%', height: '70vh', background: '#000', position: 'relative', marginTop: '15px', borderRadius: '8px', overflow: 'hidden' }}>
        <iframe
          src={servers[activeServer]}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen *;"
          allowFullScreen={true}
          // @ts-ignore
          webkitallowfullscreen="true"
          // @ts-ignore
          mozallowfullscreen="true"
        />
      </div>

      {/* عرض الحلقات بالوصف والتصنيف والصور تحت الفريم */}
      {isTv && (
        <div style={{ marginTop: '30px' }}>
          
          {/* قسم اختيار السيزون */}
          {seasonsList.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#0b0c10', padding: '15px', borderRadius: '8px', border: '1px solid #1f222e', marginBottom: '20px' }}>
              <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>الموسم الحالي:</label>
              <select 
                value={activeSeason}
                onChange={(e) => {
                  setActiveSeason(Number(e.target.value));
                  setActiveEpisode(1);
                }}
                style={{
                  background: '#12141c',
                  color: '#fff',
                  border: '1px solid #ff6b00',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {seasonsList.map((s) => (
                  <option key={s.id} value={s.season_number}>
                    الموسم {s.season_number} ({s.episode_count} حلقة)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* قائمة الحلقات الطولية الاحترافية */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {episodesList.map((ep) => {
              const imageUrl = ep.still_path 
                ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                : 'https://via.placeholder.com/300x169/08090d/ffffff?text=PeakFlix';
                
              const isActive = activeEpisode === ep.episode_number;

              return (
                <div 
                  key={ep.id}
                  onClick={() => setActiveEpisode(ep.episode_number)}
                  style={{
                    display: 'flex',
                    background: isActive ? '#1c1f2b' : '#12141c',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isActive ? '2px solid #ff6b00' : '1px solid #222',
                    transition: 'transform 0.2s ease',
                    minHeight: '130px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  {/* صورة الحلقة */}
                  <div style={{ width: '240px', minWidth: '240px', position: 'relative', background: '#000' }}>
                    <img 
                      src={imageUrl} 
                      alt={ep.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.75)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                      حلقة {ep.episode_number}
                    </div>
                  </div>

                  {/* تفاصيل الحلقة */}
                  <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ color: isActive ? '#ff6b00' : '#fff', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                        {ep.name || `الحلقة ${ep.episode_number}`}
                      </h3>
                      
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#aaa', fontSize: '12px', background: '#222', padding: '2px 6px', borderRadius: '4px' }}>
                        <Star size={12} color="#ff6b00" fill="#ff6b00" />
                        {(ep.vote_average || 0).toFixed(1)} / 10
                      </span>
                    </div>

                    <p style={{ color: '#aaa', fontSize: '13px', margin: 0, lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {ep.overview || "No description available for this episode"}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {episodesList.length === 0 && (
              <p style={{ color: '#666', textAlign: 'center', marginTop: '20px' }}>جاري تحميل الحلقات الخاصة بهذا الموسم...</p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}