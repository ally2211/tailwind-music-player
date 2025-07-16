import React, { useState } from 'react';
import useDarkMode from '../hooks/useDarkMode';

export default function Footer() {
  const year = new Date().getFullYear();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useState(prefersDark);

  // Apply class to <html> tag
  React.useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div
      className="text-center p-8"
      style={{
        
        maxWidth: '100%', // Ensures it doesn't overflow on small screens
      }}
    >
      &copy; {year} Atlas School
    
      <button
        onClick={() => setIsDark(!isDark)}
        className="px-4 py-2 bg-yellowAccent font-semibold rounded hover:opacity-80 transition"
      >
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
