'use client';

import Link from 'next/link'
import { designTokens } from '@/lib/design-tokens'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: designTokens.colors.black,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: designTokens.spacing.m,
      textAlign: 'center',
    }}>
      {/* 404 */}
      <h1 style={{
        fontFamily: 'var(--font-funnel-display), sans-serif',
        fontWeight: 400,
        fontSize: '8rem',
        letterSpacing: '-0.03em',
        lineHeight: '1.1',
        color: designTokens.colors.white,
        margin: 0,
        marginBottom: designTokens.spacing.l,
      }}>
        404
      </h1>

      {/* Message */}
      <h2 style={{
        fontFamily: 'var(--font-funnel-display), sans-serif',
        fontWeight: 400,
        fontSize: '2rem',
        letterSpacing: '-0.03em',
        lineHeight: '1.2',
        color: designTokens.colors.white,
        margin: 0,
        marginBottom: designTokens.spacing.s,
      }}>
        Page Not Found
      </h2>

      {/* Description */}
      <p style={{
        ...designTokens.textStyles.body1,
        color: designTokens.colors.grey500,
        maxWidth: '400px',
        marginBottom: designTokens.spacing.xl,
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <Link 
        href="/"
        style={{
          display: 'inline-block',
          padding: `${designTokens.spacing.m} ${designTokens.spacing.l}`,
          backgroundColor: designTokens.colors.white,
          color: designTokens.colors.black,
          textDecoration: 'none',
          borderRadius: '8px',
          fontFamily: 'var(--font-funnel-display), sans-serif',
          fontWeight: 500,
          fontSize: '18px',
          letterSpacing: '-0.01em',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = designTokens.colors.grey100
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = designTokens.colors.white
        }}
      >
        ← Back to Home
      </Link>

      {/* Contact suggestion */}
      <p style={{
        ...designTokens.textStyles.body1,
        color: designTokens.colors.grey500,
        marginTop: designTokens.spacing.xl,
        fontSize: '14px',
      }}>
        Looking for something specific?{' '}
        <a 
          href="mailto:hi@airstudio.work"
          style={{
            color: designTokens.colors.white,
            textDecoration: 'underline',
          }}
        >
          Get in touch
        </a>
      </p>
    </div>
  )
} 