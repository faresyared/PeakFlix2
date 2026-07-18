import { LockKeyhole, User } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage(){ const {t}=useTranslation(); const {login}=useAuth(); const navigate=useNavigate(); const [username,setUsername]=useState('admin'); const [password,setPassword]=useState('admin'); const [error,setError]=useState(''); const submit=(e:React.FormEvent)=>{e.preventDefault();if(login(username,password))navigate('/');else setError('Invalid username or password')}; return <div className="login-page"><form className="login-card" onSubmit={submit}><span className="eyebrow">CINEVAULT MEMBER</span><h1>{t('welcomeBack')}</h1><p>{t('demo')}</p><label><span>{t('username')}</span><div><User/><input value={username} onChange={e=>setUsername(e.target.value)}/></div></label><label><span>{t('password')}</span><div><LockKeyhole/><input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></div></label>{error&&<p className="error">{error}</p>}<button className="primary-btn">{t('signIn')}</button></form></div> }
