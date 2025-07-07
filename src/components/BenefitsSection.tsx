'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { designTokens } from '../lib/design-tokens';
import { getResponsiveTextStyle } from '../lib/responsive-text';

interface Benefit {
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    title: 'System Architecture',
    description: 'I design scalable systems that connect business logic, user needs, and technical constraints into cohesive products.'
  },
  {
    title: 'Rapid Delivery',
    description: 'Ship production-ready designs in days, not weeks. Expert in 15+ tools for maximum efficiency.'
  },
  {
    title: 'Strategic Insights',
    description: 'Uncover non-obvious solutions by connecting patterns across industries and user behaviors.'
  },
  {
    title: 'Visual Impact',
    description: 'Create designs that drive engagement and conversion through research-backed visual decisions.'
  }
];

export function BenefitsSection() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
      setIsSmallScreen(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section 
      style={{
        padding: designTokens.spacing.m,          // 16px как у Hero со всех сторон
        paddingTop: '6.75rem',                    // 108px сверху (54px * 2)
        paddingBottom: '6.75rem',                 // 108px снизу (54px * 2)
        backgroundColor: designTokens.colors.grey100, // Серый фон как у work секции
        borderBottom: `1px solid rgba(0, 0, 0, 0.4)`, // 40% прозрачности
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div 
        style={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing.xxxl, // 80px между заголовком и сеткой
        }}
      >
        {/* Заголовок approach. */}
        <h2 
          style={{
            fontFamily: 'var(--font-funnel-display), sans-serif',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '110%',
                          letterSpacing: '-0.03em',
            color: designTokens.colors.black,
            margin: 0,
          }}
        >
          approach.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isSmallScreen ? '1fr' : (isLargeScreen ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'),
          gap: designTokens.spacing.huge, // 50px (+40% от xl)
        }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Icon */}
              <Image 
                src={`/img/${index + 1}.svg`}
                alt={`${benefit.title} icon`}
                width={72}
                height={28}
                style={{ marginBottom: designTokens.spacing.l }} // 24px до заголовка
              />
              
              {/* Title */}
              <h3 style={{
                ...getResponsiveTextStyle('h3', !isLargeScreen),
                fontWeight: 600, // Semibold для заголовков
                color: designTokens.colors.black,
                margin: 0,
                marginBottom: designTokens.spacing.s, // 12px до описания
              }}>
                {benefit.title}
              </h3>
              
              {/* Description */}
              <h3 style={{
                ...getResponsiveTextStyle('h3', !isLargeScreen),
                color: designTokens.colors.grey800,
                margin: 0,
              }}>
                {benefit.description}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 