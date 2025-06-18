'use client';

import React from 'react';
import { designTokens } from '../lib/design-tokens';

export function AboutSection() {
  return (
    <section 
      id="about"
      style={{
        minHeight: '100vh',
        padding: `${designTokens.spacing.xxxl} ${designTokens.spacing.xxxl}`,
        backgroundColor: designTokens.colors.dun,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
        <h2 
          style={{
            fontFamily: designTokens.textStyles.h1.fontFamily,
            fontSize: designTokens.textStyles.h1.fontSize,
            fontWeight: designTokens.textStyles.h1.fontWeight,
            letterSpacing: designTokens.textStyles.h1.letterSpacing,
            color: designTokens.colors.black,
            marginBottom: designTokens.spacing.xl,
          }}
        >
          About AirStudio
        </h2>
        
        <p 
          style={{
            fontFamily: designTokens.textStyles.paragraph.fontFamily,
            fontSize: designTokens.textStyles.paragraph.fontSize,
            fontWeight: designTokens.textStyles.paragraph.fontWeight,
            letterSpacing: designTokens.textStyles.paragraph.letterSpacing,
            color: designTokens.colors.grey800,
            marginBottom: designTokens.spacing.xxxl,
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: `0 auto ${designTokens.spacing.xxxl}`,
          }}
        >
          We are a creative studio passionate about crafting digital experiences that 
          matter. With years of expertise in design and development, we help businesses 
          tell their stories through thoughtful, user-centered solutions.
        </p>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: designTokens.spacing.xxl,
            marginBottom: designTokens.spacing.xxxl,
          }}
        >
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '25+', label: 'Happy Clients' },
            { number: '5+', label: 'Years Experience' },
            { number: '15+', label: 'Awards Won' },
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div 
                style={{
                  fontFamily: designTokens.textStyles.h1.fontFamily,
                  fontSize: '4rem',
                  fontWeight: designTokens.textStyles.h1.fontWeight,
                  letterSpacing: designTokens.textStyles.h1.letterSpacing,
                  color: designTokens.colors.black,
                  marginBottom: designTokens.spacing.s,
                  lineHeight: '1',
                }}
              >
                {stat.number}
              </div>
              <div 
                style={{
                  fontFamily: designTokens.textStyles.body1.fontFamily,
                  fontSize: designTokens.textStyles.body1.fontSize,
                  fontWeight: designTokens.textStyles.body1.fontWeight,
                  letterSpacing: designTokens.textStyles.body1.letterSpacing,
                  color: designTokens.colors.grey800,
                  opacity: 0.8,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: designTokens.spacing.l,
            flexWrap: 'wrap',
          }}
        >
          {['Design', 'Development', 'Strategy', 'Branding'].map((skill, index) => (
            <div 
              key={index}
              style={{
                fontFamily: designTokens.textStyles.tag.fontFamily,
                fontSize: designTokens.textStyles.tag.fontSize,
                fontWeight: designTokens.textStyles.tag.fontWeight,
                letterSpacing: designTokens.textStyles.tag.letterSpacing,
                backgroundColor: designTokens.colors.white,
                color: designTokens.colors.black,
                padding: `${designTokens.spacing.s} ${designTokens.spacing.l}`,
                borderRadius: designTokens.corners.s,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 