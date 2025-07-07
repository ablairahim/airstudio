'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
  onComplete?: () => void;
}

export function ImagePreloader({ images, onComplete }: ImagePreloaderProps) {
  useEffect(() => {
    if (images.length === 0) {
      onComplete?.();
      return;
    }

    let loadedCount = 0;
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          resolve(src);
        };
        img.onerror = () => {
          loadedCount++;
          resolve(src); // Считаем как загруженное даже при ошибке
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      onComplete?.();
    });
  }, [images, onComplete]);

  return null; // Компонент не рендерит ничего
} 