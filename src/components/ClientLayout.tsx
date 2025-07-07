'use client';

import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { LoadingScreen } from './LoadingScreen';
import { useLoading } from '../contexts/LoadingContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { isFirstLoad, setFirstLoadComplete } = useLoading();

  // Добавляем класс hydrated к body при монтировании компонента
  useEffect(() => {
    document.body.classList.add('hydrated');
  }, []);

  return (
    <>
      {/* LoadingScreen всегда рендерится первым, если isFirstLoad = true */}
      {isFirstLoad && (
        <LoadingScreen 
          onComplete={() => setFirstLoadComplete()} 
          duration={2000}
        />
      )}
      
      {/* Контент скрываем до завершения загрузки */}
      <div className={`loading-container ${!isFirstLoad ? 'loaded' : ''}`}>
        <Navbar />
        <main>
          {children}
        </main>
      </div>
    </>
  );
} 