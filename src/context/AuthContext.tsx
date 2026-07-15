import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type User = { id: string; name: string; role: string; username: string } | null;

type AuthContextValue = {
  user: User;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      // fetch user
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${t}` } }).then(r=>r.json()).then(d=>{
        if (d?.data) setUser(d.data);
        else { setToken(null); localStorage.removeItem('token'); }
        setLoading(false);
      }).catch(()=>{ setLoading(false); setToken(null); localStorage.removeItem('token'); });
    } else setLoading(false);
  },[]);

  async function login(username: string, password: string){
    try{
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const data = await res.json();
      if(res.ok && data?.data){
        const { token, user } = data.data;
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        return true;
      }
      return false;
    }catch(err){
      return false;
    }
  }

  function logout(){
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(){
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
