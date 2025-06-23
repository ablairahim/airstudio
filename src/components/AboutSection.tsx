'use client';

import React, { useState, useEffect } from 'react';
import { designTokens } from '../lib/design-tokens';

export function AboutSection() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

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
      id="about"
      style={{
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: designTokens.colors.grey100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Wide container */}
      <div 
        style={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: designTokens.spacing.l,
        }}
      >
        <h2 
          style={{
            fontFamily: designTokens.textStyles.h1.fontFamily,
            fontSize: designTokens.textStyles.h1.fontSize,
            fontWeight: designTokens.textStyles.h1.fontWeight,
            letterSpacing: designTokens.textStyles.h1.letterSpacing,
            color: designTokens.colors.black,
            textAlign: 'center',
            margin: 0,
          }}
        >
          About
        </h2>
        
        <p 
          style={{
            fontFamily: designTokens.textStyles.paragraph.fontFamily,
            fontSize: designTokens.textStyles.paragraph.fontSize,
            fontWeight: designTokens.textStyles.paragraph.fontWeight,
            letterSpacing: designTokens.textStyles.paragraph.letterSpacing,
            color: designTokens.colors.grey800,
            lineHeight: '1.6',
            textAlign: 'center',
            margin: 0,
            marginBottom: designTokens.spacing.l,
            maxWidth: '1000px', // Ограничиваем только текст
          }}
        >
          I create end-to-end product systems with clarity, mixing human sense, AI, and a touch of vibecoding. I create end-to-end product systems with clarity, mixing human sense, AI, and a touch of vibecoding. I create end-to-end product systems with clarity, mixing human sense, AI, and a touch of vibecoding. I create end-to-end product systems with clarity, mixing human sense, AI, and a touch of vibecoding. I create end-to-end product systems with clarity, mixing human sense, AI, and a touch of vibecoding.
        </p>

        {/* Large logo at the bottom */}
        <div
          style={{
            width: '200px',
            height: '200px',
            opacity: 0.1,
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            backgroundImage: 'url(/logo.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: 'scale(2)',
          }}
        />
      </div>
    </section>
  );
} 