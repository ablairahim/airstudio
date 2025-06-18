'use client'

import Image from 'next/image'
import { designTokens } from '@/lib/design-tokens'
import { useModal } from '@/contexts/ModalContext'
import { useState, useEffect } from 'react'

export default function Hero() {
  const { toggleModal } = useModal();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  // Замените на вашу embed-ссылку Loom
  const loomEmbedUrl = "https://www.loom.com/embed/YOUR_VIDEO_ID"; // Замените YOUR_VIDEO_ID
  const showRealVideo = false; // Поставьте true когда получите embed-ссылку

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section 
      className="min-h-screen flex flex-col justify-center px-4"
      style={{ 
        position: 'relative',
        backgroundColor: designTokens.colors.grey100,
      }}
    >
      {/* AirStudio Logo - контейнер такой же высоты как navbar */}
      <div 
        style={{ 
          position: 'absolute',
          top: designTokens.spacing.l,
          left: designTokens.spacing.xxxl,
          zIndex: 1001,
          // Контейнер такой же высоты как navbar для идеального выравнивания
          height: `calc(${designTokens.spacing.l} * 2 + 29px)`, // padding + высота лого
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Image 
          src="/img/Logo_SVG-Black.svg" 
          alt="AirStudio Logo" 
          width={134} 
          height={29}
          priority
        />
      </div>

      {/* Main content container */}
      <div 
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: `0 ${designTokens.spacing.xxxl}`,
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '70vh',
            gap: designTokens.spacing.xxxl,
          }}
        >
          {/* Left side - Text content */}
          <div style={{ flex: 1 }}>
            <h1 
              style={{
                fontFamily: designTokens.textStyles.h1.fontFamily,
                fontSize: designTokens.textStyles.h1.fontSize,
                fontWeight: designTokens.textStyles.h1.fontWeight,
                letterSpacing: designTokens.textStyles.h1.letterSpacing,
                color: designTokens.colors.black,
                marginBottom: designTokens.spacing.l,
                lineHeight: '1.1',
              }}
            >
              Designer & co-creator.
            </h1>
            
            <h2 
              style={{
                fontFamily: designTokens.textStyles.h2.fontFamily,
                fontSize: designTokens.textStyles.h2.fontSize,
                fontWeight: designTokens.textStyles.h2.fontWeight,
                letterSpacing: designTokens.textStyles.h2.letterSpacing,
                color: designTokens.colors.grey800,
                marginBottom: designTokens.spacing.xl,
                lineHeight: '1.3',
              }}
            >
              I create end-to-end product systems with clarity, 
              mixing human sense, AI, and a touch of vibecoding.
            </h2>

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
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = designTokens.colors.grey800;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = designTokens.colors.black;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
              }}
            >
              Let's talk
            </button>
          </div>

          {/* Right side - Loom video placeholder - ширина navbar */}
          <div 
            style={{
              // Та же ширина что и navbar
              width: isLargeScreen 
                ? 'min(70vw, calc(100vw - 2 * ' + designTokens.spacing.xxxl + '))' 
                : 'calc(100vw - 2 * ' + designTokens.spacing.xxxl + ')',
              minWidth: '320px',
              maxWidth: isLargeScreen ? '800px' : '600px',
              aspectRatio: '16 / 9',
              backgroundColor: showRealVideo ? 'transparent' : designTokens.colors.grey500,
              borderRadius: designTokens.corners.l,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            {showRealVideo ? (
              /* Настоящее Loom видео */
              <iframe
                src={loomEmbedUrl}
                frameBorder="0"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: designTokens.corners.l,
                }}
              />
            ) : (
              /* Placeholder */
              <>
                {/* Video placeholder content */}
                <div 
                  style={{
                    textAlign: 'center',
                    color: designTokens.colors.white,
                  }}
                >
                  <div 
                    style={{
                      width: '120px', // Увеличено с 80px
                      height: '120px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      marginBottom: designTokens.spacing.l, // Увеличено с spacing.m
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {/* Play button triangle - увеличено */}
                    <div 
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: '30px solid white', // Увеличено с 20px
                        borderTop: '18px solid transparent', // Увеличено с 12px
                        borderBottom: '18px solid transparent',
                        marginLeft: '6px', // Увеличено с 4px
                      }}
                    />
                  </div>
                  <p 
                    style={{
                      fontFamily: designTokens.textStyles.body1.fontFamily,
                      fontSize: designTokens.textStyles.h3.fontSize, // Увеличен размер шрифта
                      fontWeight: designTokens.textStyles.body1.fontWeight,
                      opacity: 0.8,
                    }}
                  >
                    Loom Video Placeholder
                  </p>
                </div>

                {/* Decorative elements - увеличены */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    width: '80px', // Увеличено с 60px
                    height: '80px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '40px', // Увеличено с 30px
                    left: '40px',
                    width: '60px', // Увеличено с 40px
                    height: '60px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 