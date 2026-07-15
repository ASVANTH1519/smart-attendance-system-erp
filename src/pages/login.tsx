import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function LoginPage(){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const auth = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setError('');
    const ok = await auth.login(username,password);
    if(ok) router.push('/');
    else setError('Invalid credentials');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 frosted rounded-xxl-24 shadow-card-1">
        <h2 className="text-2xl font-semibold mb-4">Sign in to PACR NEXUS</h2>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <label className="block mb-3">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Username</div>
          <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full rounded-lg p-3 bg-[var(--panel)] border-none" />
        </label>
        <label className="block mb-4">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Password</div>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-lg p-3 bg-[var(--panel)] border-none" />
        </label>
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-[var(--primary-500)] text-white rounded-lg">Sign in</button>
          <button type="button" className="text-sm text-[var(--text-secondary)]" onClick={()=>{setUsername('admin'); setPassword('admin123');}}>Use demo admin</button>
        </div>
      </form>
    </div>
  );
}
