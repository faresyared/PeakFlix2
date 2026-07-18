import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authenticate, clearSession, getSession, seedAdmin } from '../utils/storage';

interface AuthValue { user: string | null; login: (u: string, p: string) => boolean; logout: () => void }
const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => { seedAdmin(); setUser(getSession()); }, []);
  const value = useMemo(() => ({
    user,
    login: (u: string, p: string) => { const ok = authenticate(u, p); if (ok) setUser(u); return ok; },
    logout: () => { clearSession(); setUser(null); }
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
