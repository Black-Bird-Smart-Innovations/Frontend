/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  // Belt-and-suspenders: also toggle className for Safari compatibility
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('bb-theme') || 'light';
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('bb-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      // Apply immediately (don't wait for React re-render)
      applyTheme(next);
      localStorage.setItem('bb-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
