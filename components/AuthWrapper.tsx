'use client';

import { useState, useEffect } from 'react';
import PasswordGate from './PasswordGate';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const auth = sessionStorage.getItem('cyber_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-cyber-black flex items-center justify-center">
        <div className="text-cyber-red font-mono">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={handleAuthSuccess} />;
  }

  return <>{children}</>;
}

