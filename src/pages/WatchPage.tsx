import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { media } from '../data/media';
import { useAuth } from '../context/AuthContext';
import { getProgress, saveProgress } from '../utils/storage';
import { useLocalizedMedia } from '../hooks/useLocalizedMedia';

export function WatchPage(){ const {id}=useParams(); const item=media.find(x=>x.id===id); const videoRef=useRef<HTMLVideoElement>(null); const {user}=useAuth(); const {title}=useLocalizedMedia();
 useEffect(()=>{ const video=videoRef.current;if(!video||!item)return; if(user){const saved=getProgress(user).find(x=>x.mediaId===item.id);if(saved)video.currentTime=saved.currentTime;} const save=()=>{if(user&&video.duration)saveProgress(user,{mediaId:item.id,currentTime:video.currentTime,duration:video.duration,updatedAt:Date.now()})}; video.addEventListener('timeupdate',save); return()=>video.removeEventListener('timeupdate',save)},[item,user]);
 if(!item)return null; return <div className="watch-page"><div className="watch-top"><Link to={`/title/${item.id}`}><ArrowLeft/></Link><div><small>NOW PLAYING</small><h1>{title(item)}</h1></div></div><div className="player-frame"><video ref={videoRef} controls autoPlay poster={item.backdrop} src={item.video}/></div><p className="watch-note">{user?'Your watch position is saved automatically.':'Sign in to save your watch position.'}</p></div> }
