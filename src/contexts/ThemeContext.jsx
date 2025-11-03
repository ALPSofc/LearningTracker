import React, { createContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ThemeContext = createContext(undefined);

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useLocalStorage('theme', getInitialTheme);

  useEffect(() => {
    console.log("🟡 Theme effect rodou — valor de theme:", theme);

    const root = window?.document?.documentElement;
    if (!root) {
      console.warn("⚠️ document.root não encontrado — talvez o código rodou antes do DOM estar pronto");
      return;
    }

    const oldTheme = theme === 'light' ? 'dark' : 'light';
    console.log("🔄 Aplicando tema:", theme, "| removendo tema antigo:", oldTheme);

    root.classList.remove(oldTheme);
    root.classList.add(theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}