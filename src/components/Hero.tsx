'use client'

import Image from 'next/image'
import { designTokens } from '@/lib/design-tokens'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { useLoading } from '../contexts/LoadingContext'

export default function Hero() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const isMobile = !isLargeScreen;
  const [currentTime, setCurrentTime] = useState('--:--');
  const [cardWidth, setCardWidth] = useState(240);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollButtonRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const { isFirstLoad } = useLoading();
  
  // PNG изображения для карточек (7 штук)
  const mediaFiles = [
    "2-1.png",
    "judo_work.mp4",
    "3.png",
    "4.png",
    "qoll.png",
    "sveti.png",
    "HFF.png",
  ];

  const colors = [
    designTokens.colors.pink,
    designTokens.colors.blue,
    designTokens.colors.beige,
    designTokens.colors.dun,
    designTokens.colors.pink,
    designTokens.colors.blue,
    designTokens.colors.beige,
  ];

  const animatingCards = mediaFiles.map((file, idx) => ({
    id: idx + 1,
    color: colors[idx % colors.length],
    content: file,
    type: file.endsWith('.mp4') ? 'video' : 'image',
  }));

  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth > 768;
      setIsLargeScreen(isLarge);
      
      if (isLarge) {
        // Для больших экранов - стандартная ширина
        setCardWidth(240);
      } else {
        // Для мобилки - высчитываем ширину для 2 карточек
        const leftPadding = 16; // designTokens.spacing.m
        const gap = 16;
        const availableWidth = window.innerWidth - leftPadding;
        const calculatedWidth = (availableWidth - gap) / 2;
        setCardWidth(Math.floor(calculatedWidth));
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Обновление времени Алматы
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const almatyTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Almaty"}));
        const timeString = almatyTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        setCurrentTime(timeString);
      } catch (error) {
        // Fallback если timezone не поддерживается
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const almatyTime = new Date(utcTime + (6 * 3600000)); // UTC+6
        const timeString = almatyTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        setCurrentTime(timeString);
      }
    };

    // Запускаем только на клиенте
    if (typeof window !== 'undefined') {
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  // GSAP анимации с SplitType для заголовка и описания
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Запускаем анимацию только после завершения загрузки
    if (isFirstLoad) return;

    // Небольшая задержка для полной инициализации DOM
    const timer = setTimeout(() => {
      if (!titleRef.current || !descriptionRef.current) return;

      // Разбиваем заголовок на слова
      const titleSplit = new SplitType(titleRef.current, { types: 'words' });
      
      // Разбиваем описание на слова
      const descriptionSplit = new SplitType(descriptionRef.current, { types: 'words' });
      
      // Скрываем все слова заголовка и описания
      gsap.set(titleSplit.words, { y: 30, opacity: 0 });
      gsap.set(descriptionSplit.words, { y: 30, opacity: 0 });
      
      // Делаем контейнеры видимыми (они изначально скрыты в стилях)
      gsap.set(titleRef.current, { opacity: 1 });
      gsap.set(descriptionRef.current, { opacity: 1 });
      
      // Создаем timeline - запускаем с задержкой после загрузки
      const tl = gsap.timeline({ delay: 0.2 });

      // Анимируем заголовок
      tl.to(titleSplit.words, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Анимируем описание с задержкой
      tl.to(descriptionSplit.words, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
      }, "-=0.4"); // Начинаем раньше завершения заголовка

      return () => {
        titleSplit.revert();
        descriptionSplit.revert();
      };
    }, 200); // Уменьшаем задержку

    return () => clearTimeout(timer);
  }, [isFirstLoad]);

  // GSAP анимация карточек
  useEffect(() => {
    // Запускаем только на клиенте
    if (typeof window === 'undefined') return;
    
    // Небольшая задержка для инициализации DOM
    const timer = setTimeout(() => {
      const validCards = cardsRef.current.filter(card => card !== null);
      if (validCards.length !== animatingCards.length) return;

      const gap = 16; // Расстояние между карточками
      const moveDistance = cardWidth + gap; // Расстояние движения

      // Инициализация - сбрасываем любые трансформации
      validCards.forEach((card, index) => {
        gsap.set(card, {
          x: 0, // Сбрасываем x трансформацию
          opacity: 1,
        });
      });

      // Переменная для отслеживания текущей первой карточки
      let currentFirstIndex = 0;
      
      // Создание основного timeline для анимации
      const tl = gsap.timeline({ repeat: -1 });
      
      // Анимация бегущей строки
      tl.to(validCards, {
        x: `-=${moveDistance}`, // Все карточки двигаются влево
        duration: 1,
        ease: "power2.out",
      })
      .call(() => {
        // В конце движения делаем текущую первую карточку невидимой
        const currentFirstCard = validCards[currentFirstIndex % validCards.length];
        gsap.set(currentFirstCard, {
          opacity: 0, // Первая карточка становится невидимой мгновенно
        });
      })
      .to(validCards, {
        duration: 1, // Пауза 1 секунда
      })
      .call(() => {
        // Берем текущую первую карточку
        const firstCard = validCards[currentFirstIndex % validCards.length];
        
        // Сдвигаем все остальные карточки на одну позицию влево
        validCards.forEach((card, index) => {
          if (card !== firstCard) {
            const currentLeft = parseFloat(getComputedStyle(card).left);
            const newLeft = currentLeft - moveDistance; // Сдвигаем влево
            gsap.set(card, {
              left: `${newLeft}px`,
              x: 0, // Сбрасываем трансформацию
            });
          }
        });
        
        // Перемещаем исчезнувшую карточку в конец очереди
        const newLeft = cardWidth + gap + (validCards.length - 1) * moveDistance;
        gsap.set(firstCard, {
          left: `${newLeft}px`,
          x: 0, // Сбрасываем трансформацию
          opacity: 1, // Возвращаем видимость
        });
        
        // Переходим к следующей карточке как к новой первой
        currentFirstIndex++;
      });

      timelineRef.current = tl;
    }, 200);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [animatingCards.length, cardWidth]);

  // Freeze hero videos only on mobile screens (<=768px)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobileScreen = window.innerWidth <= 768;
    if (!isMobileScreen) return;

    videoRefs.current.forEach((video) => {
      if (!video) return;

      const freeze = () => {
        try {
          const mid = (video.duration || 0) / 2;
          if (!isNaN(mid) && mid > 0) {
            video.currentTime = mid;
          }
        } catch {
          /* ignore */
        } finally {
          video.pause();
        }
      };

      if (video.readyState >= 1) {
        freeze();
      } else {
        video.addEventListener('loadedmetadata', freeze, { once: true });
      }
    });
  }, []);

  // Анимация кнопки Scroll
  useEffect(() => {
    // Запускаем только на клиенте
    if (typeof window === 'undefined' || !scrollButtonRef.current) return;
    
    // Создаем плавную анимацию вверх-вниз
    const scrollAnimation = gsap.to(scrollButtonRef.current, {
      y: -20, // Двигаем на 20px вверх
      duration: 2, // 2 секунды
      ease: "power2.inOut", // Gentle easing
      yoyo: true, // Возвращаем обратно
      repeat: -1, // Бесконечно повторяем
    });

    return () => {
      scrollAnimation.kill();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero"
      style={{ 
        backgroundColor: designTokens.colors.black,
        paddingLeft: designTokens.spacing.m,
        paddingRight: 0, // Убираем правый паддинг
        paddingTop: designTokens.spacing.m, // Минимальный верхний паддинг
        paddingBottom: designTokens.spacing.xl, // Нижний паддинг в два раза больше (xl = 2.25rem)
        minHeight: 'calc(100vh - 60px)', // Вычитаем высоту навбара
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Прижимаем контент к нижней границе
        gap: designTokens.spacing.xxl, // 40px
      }}
    >
      {/* Заголовок "Design That Breathes" */}
      <h1 
        ref={titleRef}
        style={{
          fontFamily: 'var(--font-funnel-display), sans-serif',
          fontWeight: 400,
          fontSize: isLargeScreen ? '4.5rem' : '3.25rem', // 72px / 52px (40px + 30%)
          letterSpacing: '-0.03em',
          lineHeight: '1.1', // 110%
          color: designTokens.colors.white,
          margin: 0,
          textTransform: 'capitalize',
          opacity: 0, // Скрываем до анимации
        }}
      >
        Design That Breathes
      </h1>

      {/* Контейнер для карточек */}
      <div style={{
        position: 'relative',
        height: '300px',
        overflow: 'hidden',
        width: '100%',
      }}>
        {/* Первая карточка (статичная) */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${cardWidth}px`,
          height: '280px',
          backgroundColor: designTokens.colors.white,
          borderRadius: '20px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 10,
        }}>
          {/* Аватарка */}
          <div style={{
            width: isLargeScreen ? '100px' : '60px',
            height: isLargeScreen ? '100px' : '60px',
            borderRadius: '16px',
            backgroundColor: designTokens.colors.grey100,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/img/ablai.png"
              alt="Ablai Rakhimbekov"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
          </div>

          {/* Текст */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flex: 1,
          }}>
            <p style={{
              fontFamily: 'var(--font-funnel-display), sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '110%',
              letterSpacing: '-0.03em',
              color: designTokens.colors.black,
              margin: 0,
            }}>
              Currently available for select projects.
            </p>
            
            <p style={{
              fontFamily: 'var(--font-funnel-display), sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '110%',
              letterSpacing: '-0.03em',
              color: designTokens.colors.grey500,
              margin: 0,
            }}>
              Almaty {currentTime}
            </p>
          </div>
        </div>

        {/* Анимирующиеся карточки */}
        {animatingCards.map((card, index) => {
          const gap = 16;
          const initialX = cardWidth + gap + (index * (cardWidth + gap));
          
          return (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: `${initialX}px`, // Начальная позиция справа
                width: `${cardWidth}px`, // Наследуем ширину первой карточки
                height: '280px', // Наследуем высоту первой карточки
                backgroundColor: card.color,
                borderRadius: '20px',
                border: '1px solid #101010',
                zIndex: 5,
                overflow: 'hidden', // Для видео контента
              }}
            >
              {/* Видео или изображение */}
              {card.type === 'video' && isLargeScreen ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                  }}
                  src={`/img/Hero_Videos/${card.content}`}
                />
              ) : (
                <img
                  src={`/img/Hero_Videos/${card.type === 'video' ? card.content.replace('.mp4', '.png') : card.content}`}
                  alt="Content"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Описание и Scroll */}
      <div style={{
        display: 'flex',
        flexDirection: isLargeScreen ? 'row' : 'column',
        gap: isLargeScreen ? '1.125rem' : designTokens.spacing.xl, // Десктоп: 18px, Мобилка: 36px
        alignItems: isLargeScreen ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        {/* Описание */}
        <div style={{
          flex: isLargeScreen ? '0 0 50%' : '1',
          maxWidth: isLargeScreen ? '50%' : '100%',
        }}>
          <p 
            ref={descriptionRef}
            style={{
              fontFamily: 'var(--font-funnel-display), sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '110%',
              letterSpacing: '-0.03em',
              color: designTokens.colors.white,
              margin: 0,
              opacity: 0, // Скрываем до анимации
            }}
          >
            Ablai Rakhimbekov is a digital designer, creative technologist, and product builder with <span style={{ whiteSpace: isLargeScreen ? 'nowrap' : 'normal' }}>5 years</span> of experience designing brand systems, scalable products, and technical implementations. Working with global teams across North America, I've collaborated with <span style={{ whiteSpace: isLargeScreen ? 'nowrap' : 'normal' }}>10 funded</span> startups, delivered 100+ projects, contributed to products that collectively raised $50M+, and earned 3 awards, including Gold recognition.
          </p>
        </div>

        {/* Scroll indicator */}
        <div 
          ref={scrollButtonRef}
          style={{
            color: designTokens.colors.white,
            fontFamily: 'var(--font-funnel-display), sans-serif',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '110%',
            letterSpacing: '-0.03em',
            opacity: 1, // Убираем прозрачность - делаем полностью белым
            paddingRight: '24px', // Правый паддинг 24px
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
          Scroll
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L8 14M8 14L3 9M8 14L13 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
} 