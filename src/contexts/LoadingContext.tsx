'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isFirstLoad: boolean;
  setFirstLoadComplete: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  // Всегда начинаем с показа загрузочного экрана при каждом обновлении
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const setFirstLoadComplete = () => {
    setIsFirstLoad(false);
  };

  return (
    <LoadingContext.Provider value={{ isFirstLoad, setFirstLoadComplete }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 