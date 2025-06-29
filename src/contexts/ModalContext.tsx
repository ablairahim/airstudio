'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  selectedCaseSlug: string | null;
  modalContainerRef: React.RefObject<HTMLDivElement> | null;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  openCaseModal: (slug: string) => void;
  setModalContainerRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseSlug, setSelectedCaseSlug] = useState<string | null>(null);
  const [modalContainerRef, setModalContainerRefState] = useState<React.RefObject<HTMLDivElement> | null>(null);
  const [savedScrollY, setSavedScrollY] = useState(0);

  // Блокируем скролл body когда модал открыт
  useEffect(() => {
    if (isModalOpen) {
      // Сохраняем текущую позицию скролла
      const currentScrollY = window.scrollY;
      setSavedScrollY(currentScrollY);
      
      // Блокируем скролл body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Скроллим модальное окно в начало при открытии
      if (modalContainerRef?.current) {
        modalContainerRef.current.scrollTop = 0;
      }
    } else {
      // Восстанавливаем скролл при закрытии - НЕ скроллим наверх
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Восстанавливаем сохраненную позицию скролла
      window.scrollTo(0, savedScrollY);
    }
    
    return () => {
      // Очищаем стили при размонтировании
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isModalOpen, modalContainerRef, savedScrollY]);

  // Дополнительно сбрасываем скролл при смене кейса
  useEffect(() => {
    if (isModalOpen && modalContainerRef?.current) {
      // Небольшая задержка для того чтобы контент успел отрендериться
      setTimeout(() => {
        if (modalContainerRef?.current) {
          modalContainerRef.current.scrollTop = 0;
        }
      }, 100);
    }
  }, [selectedCaseSlug, isModalOpen, modalContainerRef]);

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
  
  const setModalContainerRef = (ref: React.RefObject<HTMLDivElement>) => {
    setModalContainerRefState(ref);
  };

  return (
    <ModalContext.Provider value={{ 
      isModalOpen, 
      selectedCaseSlug,
      modalContainerRef,
      openModal, 
      closeModal, 
      toggleModal,
      openCaseModal,
      setModalContainerRef
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