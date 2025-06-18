'use client';

import React from 'react';

interface BlurOverlayProps {
  isOpen: boolean;
}

export function BlurOverlay({ isOpen }: BlurOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 999, // Под navbar (который 1000)
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    />
  );
} 