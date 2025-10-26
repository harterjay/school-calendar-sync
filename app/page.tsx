'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Dashboard from './components/Dashboard';
import './page.css';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="App loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="App login-container">
        <div className="login-card">
          <h1>School Calendar Sync</h1>
          <p>Automate your school calendar management</p>
          <button
            className="google-login-btn"
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Dashboard onLogout={() => signOut()} />
    </div>
  );
}
