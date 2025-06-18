'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { designTokens } from '../lib/design-tokens';
import { useModal } from '../contexts/ModalContext';
import { gsap } from 'gsap';
import { useCaseStudies, useCaseStudy } from '../hooks/useCaseStudies';
import { CaseStudyModal } from './CaseStudyModal';

export function Navbar() {
  const { isModalOpen, selectedCaseSlug, toggleModal } = useModal();
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
        text: 'This project aimed to redesign the user experience for a complex dashboard application. Through user research and iterative design, we created a more intuitive and efficient interface.'
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // GSAP animation for sliding modal
  useEffect(() => {
    if (!modalContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (isModalOpen) {
        // Устанавливаем начальную позицию и анимируем появление
        gsap.fromTo(
          modalContainerRef.current,
          { 
            yPercent: 100, 
            opacity: 0 
          },
          { 
            yPercent: 0, 
            opacity: 1, 
            duration: 0.6, 
            ease: 'power2.out' 
          }
        );
      } else {
        // Анимируем исчезновение
        gsap.to(modalContainerRef.current, {
          yPercent: 100,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        });
      }
    });

    return () => ctx.revert();
  }, [isModalOpen]);

  // Устанавливаем начальную позицию при монтировании
  useEffect(() => {
    if (modalContainerRef.current) {
      gsap.set(modalContainerRef.current, { yPercent: 100, opacity: 0 });
    }
  }, []);

  return (
    <>
      {/* Основной Navbar - остается неизменным по форме */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          padding: `${designTokens.spacing.l} ${designTokens.spacing.xxxl}`,
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            // Форма навбара НЕ меняется
            backgroundColor: `rgba(191, 201, 202, 0.75)`,
            borderRadius: designTokens.corners.l,
            padding: designTokens.spacing.l,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: isLargeScreen 
              ? 'min(70vw, calc(100vw - 2 * ' + designTokens.spacing.xxxl + '))' 
              : 'calc(100vw - 2 * ' + designTokens.spacing.xxxl + ')',
            minWidth: '320px',
            maxWidth: isLargeScreen ? '800px' : '600px',
            height: 'auto', // Всегда auto
            transition: 'all 0.3s ease',
          }}
        >
          {!isModalOpen ? (
            // Обычное состояние - ссылки и кнопка
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                opacity: isModalOpen ? 0 : 1,
                transform: isModalOpen ? 'translateY(-20px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Navigation links */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flex: 1,
                marginRight: designTokens.spacing.l,
              }}>
                {['Approach', 'Work', 'About'].map((label, index) => (
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
                      borderRadius: designTokens.corners.s,
                      whiteSpace: 'nowrap',
                      flex: '0 0 auto',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = designTokens.colors.grey100;
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
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
                  paddingInline: designTokens.spacing.l,
                  paddingBlock: designTokens.spacing.s,
                  borderRadius: designTokens.corners.s,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  whiteSpace: 'nowrap',
                  flex: '0 0 auto',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = designTokens.colors.grey800;
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = designTokens.colors.black;
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                }}
              >
                Let's talk
              </button>
            </div>
          ) : (
            // Slug состояние - только заголовок и крестик в том же навбаре
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                opacity: isModalOpen ? 1 : 0,
                transform: isModalOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease',
                transitionDelay: isModalOpen ? '0.2s' : '0s',
              }}
            >
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
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <span style={{ fontSize: '18px', color: designTokens.colors.black }}>×</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Отдельная модалка - появляется снизу под навбаром */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: `calc(${designTokens.spacing.l} * 2 + 60px)`, // Под навбаром
            left: 0,
            right: 0,
            bottom: 0,
            padding: `0 ${designTokens.spacing.xxxl}`,
            display: 'flex',
            justifyContent: 'flex-end', // Выравнивание как у навбара
            zIndex: 999, // Ниже навбара
            pointerEvents: isModalOpen ? 'auto' : 'none',
          }}
        >
          <div
            ref={modalContainerRef}
            style={{
              backgroundColor: designTokens.colors.white,
              // Нижние углы 0, верхние скруглены для стыковки с навбаром
              borderRadius: `${designTokens.corners.l} ${designTokens.corners.l} 0 0`,
              padding: designTokens.spacing.l,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderBottom: 'none',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              // Та же ширина что и навбар
              width: isLargeScreen 
                ? 'min(70vw, calc(100vw - 2 * ' + designTokens.spacing.xxxl + '))' 
                : 'calc(100vw - 2 * ' + designTokens.spacing.xxxl + ')',
              minWidth: '320px',
              maxWidth: isLargeScreen ? '800px' : '600px',
              height: 'calc(100vh - ' + designTokens.spacing.l + ' * 2 - 80px)', // До низа экрана
              overflow: 'hidden',
              // GSAP управляет анимацией - не нужны CSS transforms
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
      )}
    </>
  );
} 