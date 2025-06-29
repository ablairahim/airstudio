'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { designTokens } from '../lib/design-tokens';
import { useModal } from '../contexts/ModalContext';

import { useCaseStudies, useCaseStudy } from '../hooks/useCaseStudies';
import { CaseStudyModal } from './CaseStudyModal';

export function Navbar() {
  const { isModalOpen, selectedCaseSlug, toggleModal, setModalContainerRef } = useModal();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  // Ref for the bottom modal container
  const modalContainerRef = useRef<HTMLDivElement>(null);
  
  // Загружаем список кейсов для fallback
  const { caseStudies } = useCaseStudies();
  
  // Загружаем выбранный кейс по slug
  const { caseStudy: selectedCaseStudy, loading, error } = useCaseStudy(selectedCaseSlug);
  
  // Создаем тестовый кейс с полным контентом
  const testCaseStudy = {
    _id: 'test-case',
    _type: 'caseStudy' as const,
    slug: { current: 'test-case' },
    tags: ['ux-ui-design', 'experiment', 'ai'],
    title: 'Test Case Study',
    summary: 'This is a comprehensive test case study to verify all content types render correctly.',
    cover: undefined,
    link: {
      text: 'View Live Project',
      url: 'https://example.com'
    },
    facts: {
      client: 'Test Client',
      year: '2024',
      role: 'Lead Designer'
    },
    loomEmbed: undefined,
    content: [
      {
        _type: 'metricsCallout' as const,
        title: 'Key Results',
        metrics: [
          { value: '+30%', label: 'User Retention' },
          { value: '2x', label: 'Engagement' },
          { value: '50%', label: 'Task Completion' }
        ]
      },
      {
        _type: 'textSection' as const,
        heading: 'Project Overview',
        text: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'This project aimed to redesign the user experience for a complex dashboard application. Through user research and iterative design, we created a more intuitive and efficient interface.'
              }
            ]
          }
        ]
      },
      {
        _type: 'promptCallout' as const,
        title: 'Design Challenge',
        text: 'How might we simplify complex data visualization while maintaining the depth of information users need to make informed decisions?'
      },
      {
        _type: 'quoteCallout' as const,
        title: 'User Feedback',
        text: 'The new interface is so much cleaner and easier to use. I can find what I need in half the time.',
        author: 'Sarah Johnson',
        authorTitle: 'Product Manager'
      },
      {
        _type: 'testimonialCallout' as const,
        title: 'Client Testimonial',
        text: 'The team delivered exceptional results that exceeded our expectations. The new design has significantly improved our user satisfaction scores.',
        author: 'Mike Chen',
        authorTitle: 'CEO, Test Company'
      }
    ]
  };
  
  // Fallback на тестовый кейс если нет выбранного или данных
  const displayCaseStudy = selectedCaseStudy || (selectedCaseSlug === 'test-case' ? testCaseStudy : caseStudies[0] || testCaseStudy);

  // Устанавливаем ref в контекст
  useEffect(() => {
    setModalContainerRef(modalContainerRef);
  }, [setModalContainerRef]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);



  // Обработчик клавиши Escape для закрытия модала
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isModalOpen, toggleModal]);

  return (
    <>
      {/* Centered Navbar with logo inside */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '60px', // Фиксированная высота
          padding: designTokens.spacing.m,
          backgroundColor: designTokens.colors.grey100,
          borderBottom: `1px solid rgba(0, 0, 0, 0.4)`,
          boxShadow: 'none', // Явно убираем любые тени
          display: 'flex',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {!isModalOpen ? (
            // Обычное состояние - логотип слева, ссылки и кнопка справа
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                opacity: isModalOpen ? 0 : 1,
              }}
            >
              {/* AirStudio Logo - left side */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                flex: '0 0 auto',
              }}>
                <Image 
                  src="/img/Logo_SVG-Black.svg" 
                  alt="AirStudio Logo" 
                  width={97} 
                  height={21}
                  priority
                />
              </div>

              {/* Navigation links and button - right side */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: designTokens.spacing.l,
              }}>
                {/* Navigation links */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: designTokens.spacing.s,
                }}>
                  {['Work'].map((label, index) => (
                    <a
                      key={label}
                      href={`#${label.toLowerCase()}`}
                      style={{
                        fontFamily: designTokens.textStyles.tagLink.fontFamily,
                        fontWeight: designTokens.textStyles.tagLink.fontWeight,
                        fontSize: designTokens.textStyles.tagLink.fontSize,
                        letterSpacing: designTokens.textStyles.tagLink.letterSpacing,
                        color: designTokens.colors.black,
                        paddingInline: designTokens.spacing.l,
                        paddingBlock: designTokens.spacing.s,
                        textDecoration: 'none',
                        borderRadius: '0',
                        whiteSpace: 'nowrap',
                        flex: '0 0 auto',
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>

                <button
                  onClick={toggleModal}
                  style={{
                    fontFamily: designTokens.textStyles.button.fontFamily,
                    fontWeight: designTokens.textStyles.button.fontWeight,
                    fontSize: designTokens.textStyles.button.fontSize,
                    letterSpacing: designTokens.textStyles.button.letterSpacing,
                    backgroundColor: designTokens.colors.black,
                    color: designTokens.colors.white,
                    borderRadius: '0',
                    border: 'none',
                    cursor: 'pointer',

                    whiteSpace: 'nowrap',
                    flex: '0 0 auto',
                  }}
                >
                  Let's talk
                </button>
              </div>
            </div>
          ) : (
            // Slug состояние - логотип слева, заголовок и крестик справа
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                opacity: isModalOpen ? 1 : 0,
              }}
            >
              {/* AirStudio Logo - left side */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                flex: '0 0 auto',
              }}>
                <Image 
                  src="/img/Logo_SVG-Black.svg" 
                  alt="AirStudio Logo" 
                  width={97} 
                  height={21}
                  priority
                />
              </div>

              {/* Title and close button - right side */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: designTokens.spacing.l,
              }}>
                <h3 
                  style={{
                    fontFamily: designTokens.textStyles.h3.fontFamily,
                    fontSize: designTokens.textStyles.h3.fontSize,
                    fontWeight: designTokens.textStyles.h3.fontWeight,
                    letterSpacing: designTokens.textStyles.h3.letterSpacing,
                    color: designTokens.colors.black,
                    margin: 0,
                  }}
                >
                  Case Study
                </h3>
                
                <button
                  onClick={toggleModal}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '18px', color: designTokens.colors.black }}>×</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Затемнение фона */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачное затемнение
          zIndex: 998, // Ниже модала, но выше контента
          opacity: isModalOpen ? 1 : 0,
          visibility: isModalOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out',
          pointerEvents: isModalOpen ? 'auto' : 'none',
        }}
        onClick={isModalOpen ? toggleModal : undefined}
      />

      {/* Отдельная модалка - появляется снизу вверх */}
      <div
        onClick={isModalOpen ? toggleModal : undefined}
        style={{
          position: 'fixed',
          top: '60px', // Вплотную под навбаром (высота навбара)
          right: 0, // Вплотную к правому краю
          bottom: 0,
          width: isLargeScreen ? '55%' : '100%', // Полная ширина на мобилке
          zIndex: 999, // Выше черного оверлея
          pointerEvents: isModalOpen ? 'auto' : 'none',
          transform: isModalOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease-out',
          opacity: isModalOpen ? 1 : 0,
        }}
      >
          <div
            ref={modalContainerRef}
            data-modal-container
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: designTokens.colors.white,
              padding: `${designTokens.spacing.l} ${designTokens.spacing.l} 0`, // Верхний и боковые паддинги
              width: '100%',
              height: '100%',
              overflow: 'auto', // Включаем скролл
              overflowX: 'hidden', // Скрываем горизонтальный скролл
              WebkitOverflowScrolling: 'touch', // Улучшаем скролл на iOS
            }}
          >
            {/* Динамический контент из CMS */}
            {loading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50%',
                color: designTokens.colors.grey500,
              }}>
                Loading...
              </div>
            ) : error ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50%',
                color: designTokens.colors.grey500,
              }}>
                Ошибка загрузки данных
              </div>
            ) : displayCaseStudy ? (
              <CaseStudyModal caseStudy={displayCaseStudy} />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50%',
                color: designTokens.colors.grey500,
                textAlign: 'center',
              }}>
                <div>
                  <p>Пока нет кейсов</p>
                  <p>Добавьте новый кейс в <a href="/studio" style={{ color: designTokens.colors.black }}>Sanity Studio</a></p>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
} 