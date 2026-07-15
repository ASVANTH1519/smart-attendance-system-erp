import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

function AppWrapper({ Component, pageProps }: AppProps){
  const router = useRouter();
  const auth = useAuth();
  // Simple route protection: redirect to /login for protected paths
  useEffect(()=>{
    const protect = ['/students','/rfid','/attendance','/reports','/settings'];
    const path = router.pathname;
    const needs = protect.some(p=> path === p || path.startsWith(p + '/') || path.startsWith(p));
    if(needs && !auth.loading && !auth.user){
      router.push('/login');
    }
  },[router.pathname, auth.loading, auth.user]);

  return <Component {...pageProps} />;
}

export default function App(props: AppProps){
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  }, []);
  return (
    <AuthProvider>
      <AppWrapper {...props} />
    </AuthProvider>
  );
}
