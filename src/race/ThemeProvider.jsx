import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Icons } from './icons';

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  if (typeof document === 'undefined') return 'dark';
  const fromDom = document.documentElement.getAttribute('data-theme');
  if (fromDom === 'light' || fromDom === 'dark') return fromDom;
  try {
    const saved = localStorage.getItem('aks-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* localStorage unavailable */
  }
  return 'dark';
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem('aks-theme', theme);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#08090c' : '#f4f2ed');
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isDark: theme === 'dark' }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}

export function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={`theme-toggle${compact ? ' theme-toggle--compact' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
        <span className="theme-toggle__icon theme-toggle__icon--sun">
          <Icons.Sun size={13} />
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">
          <Icons.Moon size={13} />
        </span>
      </span>
      {!compact && <span className="theme-toggle__label">{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>}
    </button>
  );
}
