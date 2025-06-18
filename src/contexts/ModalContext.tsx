'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  selectedCaseSlug: string | null;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  openCaseModal: (slug: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseSlug, setSelectedCaseSlug] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCaseSlug(null);
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  
  const openCaseModal = (slug: string) => {
    setSelectedCaseSlug(slug);
    setIsModalOpen(true);
  };

  return (
    <ModalContext.Provider value={{ 
      isModalOpen, 
      selectedCaseSlug,
      openModal, 
      closeModal, 
      toggleModal,
      openCaseModal 
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
} 