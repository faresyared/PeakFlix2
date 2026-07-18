import { Globe2, LogIn, LogOut, Menu, Search, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  ['/', 'home'], ['/category/movie', 'movies'], ['/category/series', 'series'], ['/category/turkish-drama', 'turkishDrama'],
  ['/category/anime', 'anime'], ['/category/turkish-series', 'turkishSeries']
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const changeLanguage = () => { const next = i18n.resolvedLanguage === 'ar' ? 'en' : 'ar'; i18n.changeLanguage(next); localStorage.setItem('peakflix-language', next); };
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`); };
  return <header className="navbar">
    <Link className="brand" to="/"><span className="brand-icon"><Sparkles size={18}/></span>PEAK<span>FLIX</span></Link>
    <nav className={open ? 'nav-links open' : 'nav-links'}>
      {links.map(([to, key]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{t(key)}</NavLink>)}
    </nav>
    <div className="nav-actions">
      <form className="mini-search" onSubmit={submit}><Search size={17}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={t('search')}/></form>
      <button className="icon-btn" onClick={changeLanguage}><Globe2 size={19}/><span>{i18n.resolvedLanguage === 'ar' ? 'EN' : 'ع'}</span></button>
      {user ? <button className="icon-btn" onClick={logout}><LogOut size={19}/><span>{user}</span></button> : <Link className="icon-btn" to="/login"><LogIn size={19}/><span>{t('login')}</span></Link>}
      <button className="mobile-menu" onClick={()=>setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}