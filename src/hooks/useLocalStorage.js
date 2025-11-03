import { useState, useEffect } from 'react';

function getStoredValue(key, initialValue) {
  try {
    const saved = window.localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  
    return initialValue instanceof Function ? initialValue() : initialValue;
  } catch (error) {
    console.error(`Erro ao ler localStorage (chave: "${key}"):`, error);
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  
  const [value, setValue] = useState(() => {
    return getStoredValue(key, initialValue);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erro ao salvar no localStorage (chave: "${key}"):`, error);
    }
  }, [key, value]);

  return [value, setValue];
}