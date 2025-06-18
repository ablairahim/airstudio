'use client';

import React from 'react';
import { designTokens } from '../lib/design-tokens';

export function ApproachSection() {
  return (
    <section 
      id="approach"
      style={{
        minHeight: '100vh',
        padding: `${designTokens.spacing.xxxl} ${designTokens.spacing.xxxl}`,
        backgroundColor: designTokens.colors.grey100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
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
          Our Approach
        </h2>
        
        <p 
          style={{
            fontFamily: designTokens.textStyles.paragraph.fontFamily,
            fontSize: designTokens.textStyles.paragraph.fontSize,
            fontWeight: designTokens.textStyles.paragraph.fontWeight,
            letterSpacing: designTokens.textStyles.paragraph.letterSpacing,
            color: designTokens.colors.grey800,
            marginBottom: designTokens.spacing.xxl,
            lineHeight: '1.6',
          }}
        >
          We believe in thoughtful design that serves both users and business goals. 
          Our approach combines strategic thinking with creative execution to deliver 
          exceptional digital experiences.
        </p>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: designTokens.spacing.xl,
            marginTop: designTokens.spacing.xxxl,
          }}
        >
          {[
            {
              title: 'Research',
              description: 'Deep understanding of your users and market'
            },
            {
              title: 'Strategy',
              description: 'Clear roadmap aligned with business objectives'
            },
            {
              title: 'Design',
              description: 'Beautiful, functional solutions that work'
            }
          ].map((item, index) => (
            <div 
              key={index}
              style={{
                padding: designTokens.spacing.xl,
                backgroundColor: designTokens.colors.white,
                borderRadius: designTokens.corners.l,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3 
                style={{
                  fontFamily: designTokens.textStyles.h3.fontFamily,
                  fontSize: designTokens.textStyles.h3.fontSize,
                  fontWeight: designTokens.textStyles.h3.fontWeight,
                  letterSpacing: designTokens.textStyles.h3.letterSpacing,
                  color: designTokens.colors.black,
                  marginBottom: designTokens.spacing.m,
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