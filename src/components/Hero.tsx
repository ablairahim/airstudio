'use client'

import Image from 'next/image'
import { designTokens } from '@/lib/design-tokens'
import { useModal } from '@/contexts/ModalContext'
import { useState, useEffect } from 'react'
import { getResponsiveTextStyle } from '@/lib/responsive-text'

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
      style={{ 
        backgroundColor: designTokens.colors.lightGreen,
        padding: designTokens.spacing.m,
        paddingTop: `calc(60px + 80px)`, // navbar height + 80px
        paddingBottom: '80px',
        borderBottom: `1px solid rgba(0, 0, 0, 0.4)`,
      }}
    >
      {/* Text content aligned to left */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '32px', // 32px between text blocks
          width: isLargeScreen ? '60%' : '100%', // Полная ширина на мобилке
        }}
      >
        {/* Main text block */}
        <h2 
          style={{
            ...getResponsiveTextStyle('h2', !isLargeScreen),
            color: designTokens.colors.black,
            margin: 0,
          }}
        >
          Ablai Rakhimbekov is a digital designer, creative technologist, and product builder with 5 years of experience designing brand systems, scalable products, and technical implementations. Working with global teams across North America, I've collaborated with 10 funded startups, delivered 100+ projects, contributed to products that collectively raised $50M+, and earned 3 awards, including Gold recognition.
Currently available for select projects.
        </h2>

        {/* Third text block - Social links */}
        <div 
          style={{
            display: 'flex',
            gap: designTokens.spacing.s, // 12px between links
            flexWrap: 'wrap',
          }}
        >
          <a 
            href="https://www.behance.net/ablayrakhim"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: designTokens.textStyles.tagLink.fontFamily,
              fontSize: designTokens.textStyles.tagLink.fontSize,
              fontWeight: designTokens.textStyles.tagLink.fontWeight,
              letterSpacing: designTokens.textStyles.tagLink.letterSpacing,
              color: designTokens.colors.black,
              textDecoration: 'none',
            }}
          >
            Behance
          </a>
          <a 
            href="https://www.instagram.com/abl.ai.r/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: designTokens.textStyles.tagLink.fontFamily,
              fontSize: designTokens.textStyles.tagLink.fontSize,
              fontWeight: designTokens.textStyles.tagLink.fontWeight,
              letterSpacing: designTokens.textStyles.tagLink.letterSpacing,
              color: designTokens.colors.black,
              textDecoration: 'none',
            }}
          >
            Instagram
          </a>
          <a 
            href="https://www.linkedin.com/in/abl-ai-r/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: designTokens.textStyles.tagLink.fontFamily,
              fontSize: designTokens.textStyles.tagLink.fontSize,
              fontWeight: designTokens.textStyles.tagLink.fontWeight,
              letterSpacing: designTokens.textStyles.tagLink.letterSpacing,
              color: designTokens.colors.black,
              textDecoration: 'none',
            }}
          >
            Linkedin
          </a>
        </div>
      </div>
    </section>
  )
} 