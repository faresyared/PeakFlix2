import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useTranslation } from 'react-i18next';

export function Layout(){ const {t,i18n}=useTranslation(); const dir=i18n.resolvedLanguage==='ar'?'rtl':'ltr'; return <div dir={dir}><Navbar/><main><Outlet/></main><footer><strong>CINE<span>VAULT</span></strong><p>{t('allRights')}</p><small>© 2026 CineVault</small></footer></div> }
