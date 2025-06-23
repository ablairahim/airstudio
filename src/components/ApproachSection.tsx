'use client';

import React, { useState, useEffect } from 'react';
import { designTokens } from '../lib/design-tokens';

export function ApproachSection() {
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
      id="approach"
      style={{
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: designTokens.colors.grey100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
          Approach
        </h2>
        
        {/* Grid of approach features - теперь может быть 3 или 4 колонки на больших экранах */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: isLargeScreen ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
            gap: designTokens.spacing.l,
            width: '100%',
            maxWidth: '1400px', // Ограничиваем максимальную ширину сетки
          }}
        >
          {[
            {
              title: 'Architecture mindset.',
              description: 'I design clear systems, connecting product logic, visuals & teams.'
            },
            {
              title: 'Multi-tool speed.',
              description: 'I rapidly learn & combine tools—saving teams time & resources.'
            },
            {
              title: 'Emotional aesthetics.',
              description: 'I craft designs that speak visually and emotionally.'
            },
            {
              title: 'Hidden connections.',
              description: 'I intuitively uncover insights, solving blocks with fresh solutions.'
            }
          ].map((item, index) => (
            <div 
              key={index}
              style={{
                padding: designTokens.spacing.xl,
                backgroundColor: designTokens.colors.white,
                borderRadius: designTokens.corners.l,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                width: '100%',
              }}
            >
              <h3 
                style={{
                  fontFamily: designTokens.textStyles.h3.fontFamily,
                  fontSize: designTokens.textStyles.h3.fontSize,
                  fontWeight: designTokens.textStyles.h3.fontWeight,
                  letterSpacing: designTokens.textStyles.h3.letterSpacing,
                  color: designTokens.colors.black,
                  marginBottom: designTokens.spacing.l,
                }}
              >
                {item.title}
              </h3>
              <p 
                style={{
                  fontFamily: designTokens.textStyles.body1.fontFamily,
                  fontSize: designTokens.textStyles.body1.fontSize,
                  fontWeight: designTokens.textStyles.body1.fontWeight,
                  letterSpacing: designTokens.textStyles.body1.letterSpacing,
                  color: designTokens.colors.grey800,
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 