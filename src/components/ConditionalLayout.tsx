'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ClientLayout } from './ClientLayout';
import { Footer } from './Footer';
import { ModalProvider } from '../contexts/ModalContext';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isStudioRoute = pathname?.startsWith('/studio');

  // For studio routes, render children without any wrapper
  if (isStudioRoute) {
    return <>{children}</>;
  }

  // For regular routes, always wrap with ModalProvider
  return (
    <ModalProvider>
      {!isClient ? (
        // During SSR/hydration, render minimal layout
        <>{children}</>
      ) : (
        // After hydration, render full layout
        <>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Footer />
        </>
      )}
    </ModalProvider>
  );
} 