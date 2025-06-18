'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { BlurOverlay } from './BlurOverlay';
import { useModal } from '../contexts/ModalContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { isModalOpen } = useModal();

  return (
    <>
      <BlurOverlay isOpen={isModalOpen} />
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
} 