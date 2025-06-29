'use client';

import React from 'react';
import { Navbar } from './Navbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
} 