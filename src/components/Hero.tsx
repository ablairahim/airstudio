'use client'

import Image from 'next/image'
import { designTokens } from '@/lib/design-tokens'
import { useModal } from '@/contexts/ModalContext'
import { useState, useEffect } from 'react'

export default function Hero() {
  const { toggleModal } = useModal();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  // Замените на вашу embed-ссылку Loom
  const loomEmbedUrl = "https://www.loom.com/embed/YOUR_VIDEO_ID";
  const showRealVideo = false;

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
      className="min-h-screen flex flex-col"
      style={{ 
        position: 'relative',
        backgroundColor: designTokens.colors.grey100,
        padding: '20px',
        paddingTop: 'calc(20vh + 60px + 20px)', // 20vh + navbar height + top padding
      }}
    >
      {/* Wide container for all content */}
      <div 
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: designTokens.spacing.l,
        }}
      >
        {/* Title */}
        <h1 
          style={{
            fontFamily: designTokens.textStyles.h1.fontFamily,
            fontSize: designTokens.textStyles.h1.fontSize,
            fontWeight: designTokens.textStyles.h1.fontWeight,
            letterSpacing: designTokens.textStyles.h1.letterSpacing,
            color: designTokens.colors.black,
            lineHeight: '1.1',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Designer & co-creator.
        </h1>
        
        {/* Subtitle */}
        <h2 
          style={{
            fontFamily: designTokens.textStyles.h2.fontFamily,
            fontSize: designTokens.textStyles.h2.fontSize,
            fontWeight: designTokens.textStyles.h2.fontWeight,
            letterSpacing: designTokens.textStyles.h2.letterSpacing,
            color: designTokens.colors.grey800,
            lineHeight: '1.3',
            textAlign: 'center',
            margin: 0,
            maxWidth: '800px', // Ограничиваем только текст
          }}
        >
          I create end-to-end product systems with clarity, 
          mixing human sense, AI, and a touch of vibecoding.
        </h2>

        {/* CTA Button */}
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
          }}
        >
          Let's talk
        </button>

        {/* Flexible Loom video placeholder */}
        <div 
          style={{
            width: '100%',
            maxWidth: '1000px', // Ограничиваем максимальную ширину видео
            aspectRatio: '16 / 9',
            backgroundColor: showRealVideo ? 'transparent' : designTokens.colors.grey500,
            borderRadius: designTokens.corners.l,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginTop: designTokens.spacing.xxl,
          }}
        >
          {showRealVideo ? (
            /* Real Loom video */
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
                    width: '120px',
                    height: '120px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    marginBottom: designTokens.spacing.l,
                    cursor: 'pointer',
                  }}
                >
                  {/* Play button triangle */}
                  <div 
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '30px solid white',
                      borderTop: '18px solid transparent',
                      borderBottom: '18px solid transparent',
                      marginLeft: '6px',
                    }}
                  />
                </div>
                <p 
                  style={{
                    fontFamily: designTokens.textStyles.body1.fontFamily,
                    fontSize: designTokens.textStyles.h3.fontSize,
                    fontWeight: designTokens.textStyles.body1.fontWeight,
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  Loom Video Placeholder
                </p>
              </div>

              {/* Decorative elements */}
              <div 
                style={{
                  position: 'absolute',
                  top: '30px',
                  right: '30px',
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '40px',
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
} 