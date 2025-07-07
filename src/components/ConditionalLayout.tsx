'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ClientLayout } from './ClientLayout';
import { Footer } from './Footer';
import { ModalProvider } from '../contexts/ModalContext';
import { LoadingProvider } from '../contexts/LoadingContext';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');

  // For studio routes, render children without any wrapper
  if (isStudioRoute) {
    return <>{children}</>;
  }

  // For regular routes, wrap with LoadingProvider and other providers
  return (
    <LoadingProvider>
      <ModalProvider>
        {/* Always render ClientLayout with LoadingScreen first */}
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer />
      </ModalProvider>
    </LoadingProvider>
  );
} 