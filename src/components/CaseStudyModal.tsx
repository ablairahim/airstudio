'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { CaseStudy, ContentBlock } from '../lib/sanity';
import { designTokens } from '../lib/design-tokens';
import { siteSettings } from '@/lib/design-system';

// Utility function to clean block content from null marks
function cleanBlockContent(content: any[]): any[] {
  if (!Array.isArray(content)) return content;
  
  return content.map(block => {
    if (block._type === 'block' && block.children) {
      return {
        ...block,
        children: block.children.map((child: any) => {
          if (child._type === 'span' && child.marks) {
            return {
              ...child,
              marks: child.marks.filter((mark: any) => mark != null)
            };
          }
          return child;
        })
      };
    }
    return block;
  });
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
}

// Компонент для рендеринга метрик
function MetricsCallout({ metrics }: { metrics: Array<{ value: string; label: string }> }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.green,
      
      padding: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
    }}>
      <div style={{
        display: 'flex',
        gap: designTokens.spacing.l,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}>
        {metrics.map((metric, index) => (
          <div key={index} style={{
            textAlign: 'center',
            flex: '1 1 auto',
            minWidth: '120px',
          }}>
            <div style={{
              ...designTokens.textStyles.h2,
              color: designTokens.colors.black,
              marginBottom: designTokens.spacing.xs,
            }}>
              {metric.value}
            </div>
            <div style={{
              ...designTokens.textStyles.body1,
              color: designTokens.colors.black,
              opacity: 0.8,
            }}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Компонент для prompt callout
function PromptCallout({ text }: { text: string }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.grey100,
      
      padding: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
    }}>
      <p style={{
        ...designTokens.textStyles.prompt,
        color: designTokens.colors.black,
        margin: 0,
      }}>
        {text}
      </p>
    </div>
  );
}

// Компонент для quote callout
function QuoteCallout({ text, author, authorTitle }: { text: string; author?: string; authorTitle?: string }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.grey100,
      
      padding: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
      borderLeft: `4px solid ${designTokens.colors.black}`,
    }}>
      <p style={{
        ...designTokens.textStyles.body1,
        color: designTokens.colors.black,
        margin: 0,
        marginBottom: author ? designTokens.spacing.s : 0,
        fontStyle: 'italic',
      }}>
        "{text}"
      </p>
      {author && (
        <div style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.grey800,
          fontSize: '0.875rem',
        }}>
          — {author}{authorTitle ? `, ${authorTitle}` : ''}
        </div>
      )}
    </div>
  );
}

// Компонент для testimonial callout
function TestimonialCallout({ text, author, authorTitle }: { text: string; author?: string; authorTitle?: string }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.grey100,
      
      padding: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
    }}>
      <p style={{
        ...designTokens.textStyles.body1,
        color: designTokens.colors.black,
        margin: 0,
        marginBottom: author ? designTokens.spacing.s : 0,
      }}>
        {text}
      </p>
      {author && (
        <div style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.grey800,
          fontSize: '0.875rem',
          fontWeight: 600,
        }}>
          {author}{authorTitle ? `, ${authorTitle}` : ''}
        </div>
      )}
    </div>
  );
}

// Компонент для текстовых секций с rich text поддержкой
function TextSection({ heading, text }: { heading?: string; text?: any[] }) {
  if (!text) return null;

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => (
        <p style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.grey800,
          marginBottom: designTokens.spacing.m,
          lineHeight: '1.4',
        }}>
          {children}
        </p>
      ),
      h1: ({ children }: any) => (
        <h2 style={{
          ...designTokens.textStyles.h2,
          color: designTokens.colors.black,
          marginBottom: designTokens.spacing.m,
          marginTop: designTokens.spacing.l,
          lineHeight: '1.1',
        }}>
          {children}
        </h2>
      ),
      h2: ({ children }: any) => (
        <h3 style={{
          ...designTokens.textStyles.h3,
          color: designTokens.colors.black,
          marginBottom: designTokens.spacing.s,
          marginTop: designTokens.spacing.m,
          lineHeight: '1.1',
        }}>
          {children}
        </h3>
      ),
      h3: ({ children }: any) => (
        <h4 style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.black,
          fontWeight: 600,
          marginBottom: designTokens.spacing.s,
          marginTop: designTokens.spacing.m,
          lineHeight: '1.2',
        }}>
          {children}
        </h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.grey800,
          fontStyle: 'italic',
          borderLeft: `4px solid ${designTokens.colors.grey500}`,
          paddingLeft: designTokens.spacing.m,
          marginLeft: 0,
          marginBottom: designTokens.spacing.m,
        }}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.grey800,
          marginBottom: designTokens.spacing.m,
          paddingLeft: designTokens.spacing.l,
        }}>
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.grey800,
          marginBottom: designTokens.spacing.m,
          paddingLeft: designTokens.spacing.l,
        }}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li style={{
          marginBottom: designTokens.spacing.xs,
          lineHeight: '1.4',
        }}>
          {children}
        </li>
      ),
      number: ({ children }: any) => (
        <li style={{
          marginBottom: designTokens.spacing.xs,
          lineHeight: '1.4',
        }}>
          {children}
        </li>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong style={{ fontWeight: 600 }}>{children}</strong>
      ),
      em: ({ children }: any) => (
        <em style={{ fontStyle: 'italic' }}>{children}</em>
      ),
      code: ({ children }: any) => (
        <code style={{
          backgroundColor: designTokens.colors.grey100,
          padding: '2px 4px',
          borderRadius: '3px',
          fontFamily: 'monospace',
          fontSize: '0.9em',
        }}>
          {children}
        </code>
      ),
      link: ({ children, value }: any) => (
        <Link
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: designTokens.colors.black,
            textDecoration: 'underline',
          }}
        >
          {children}
        </Link>
      ),
    },
    unknownType: ({ value }: any) => {

      return null;
    },
  }

  const cleanedText = cleanBlockContent(text);

  return (
    <div style={{ marginBottom: designTokens.spacing.xl }}>
      {heading && (
        <h3 style={{
          ...designTokens.textStyles.h3,
          color: designTokens.colors.black,
          marginBottom: designTokens.spacing.m,
        }}>
          {heading}
        </h3>
      )}
      <PortableText 
        value={cleanedText}
        components={portableTextComponents}
      />
    </div>
  );
}

// Компонент для Link блока
function LinkBlock({ text, url }: { text: string; url: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: designTokens.spacing.s,
      marginBottom: designTokens.spacing.xl,
    }}>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.black,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: designTokens.spacing.s,
        }}
      >
        {text || url}
        <span style={{ fontSize: '1.125rem' }}>→</span>
      </a>
    </div>
  );
}

// Компонент для Facts блока
function FactsBlock({ client, year, role }: { client?: string; year?: string; role?: string }) {
  if (!client && !year && !role) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
      paddingBottom: designTokens.spacing.l,
      borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
    }}>
      {client && (
        <div>
          <h4 style={{ 
            fontFamily: designTokens.textStyles.body1.fontFamily,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: designTokens.colors.grey500,
            marginBottom: designTokens.spacing.xs,
            marginTop: 0,
          }}>
            Client
          </h4>
          <p style={{ 
            ...designTokens.textStyles.body1,
            color: designTokens.colors.grey800,
            margin: 0,
            fontWeight: 500,
          }}>
            {client}
          </p>
        </div>
      )}
      {year && (
        <div>
          <h4 style={{ 
            fontFamily: designTokens.textStyles.body1.fontFamily,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: designTokens.colors.grey500,
            marginBottom: designTokens.spacing.xs,
            marginTop: 0,
          }}>
            Year
          </h4>
          <p style={{ 
            ...designTokens.textStyles.body1,
            color: designTokens.colors.grey800,
            margin: 0,
            fontWeight: 500,
          }}>
            {year}
          </p>
        </div>
      )}
      {role && (
        <div>
          <h4 style={{ 
            fontFamily: designTokens.textStyles.body1.fontFamily,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: designTokens.colors.grey500,
            marginBottom: designTokens.spacing.xs,
            marginTop: 0,
          }}>
            Role
          </h4>
          <p style={{ 
            ...designTokens.textStyles.body1,
            color: designTokens.colors.grey800,
            margin: 0,
            fontWeight: 500,
          }}>
            {role}
          </p>
        </div>
      )}
    </div>
  );
}

// Компонент для Loom блока
function LoomBlock({ url }: { url: string }) {
  return (
    <div 
      style={{
        aspectRatio: '16 / 9',
        backgroundColor: designTokens.colors.grey500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: designTokens.spacing.xxl,
      }}
    >
      <iframe
        src={url}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allowFullScreen
      />
    </div>
  );
}

// Компонент для изображений
function ImageBlock({ image }: { image: { asset: { url: string }; alt?: string } }) {
  return (
    <div style={{
      marginBottom: designTokens.spacing.xl,
      overflow: 'hidden',
    }}>
      <Image
        src={image.asset.url}
        alt={image.alt || 'Case study image'}
        width={800}
        height={600}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
}

// Компонент для видео
function VideoBlock({ video, alt, poster }: { 
  video?: { asset: { url: string } }; 
  alt?: string; 
  poster?: { asset: { url: string }; alt?: string } 
}) {
  // Проверяем, что видео и его asset существуют
  if (!video || !video.asset || !video.asset.url) {
    return null;
  }

  return (
    <div style={{
      marginBottom: designTokens.spacing.xl,
      width: '100%',
      overflow: 'hidden',
      backgroundColor: designTokens.colors.grey500,
    }}>
      <video
        src={video.asset.url}
        poster={poster?.asset?.url}
        autoPlay={siteSettings.ENABLE_CONTENT_VIDEO_AUTOPLAY}
        muted
        loop={siteSettings.ENABLE_CONTENT_VIDEO_AUTOPLAY}
        playsInline
        preload={siteSettings.ENABLE_CONTENT_VIDEO_AUTOPLAY ? 'auto' : 'metadata'}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
        aria-label={alt || 'Case study video'}
      />
    </div>
  );
}

// Функция для рендеринга контент-блока
function renderContentBlock(block: ContentBlock, index: number) {
  switch (block._type) {
    case 'linkBlock':
      return <LinkBlock key={index} text={block.text} url={block.url} />;
    case 'factsBlock':
      return <FactsBlock key={index} client={block.client} year={block.year} role={block.role} />;
    case 'loomBlock':
      return <LoomBlock key={index} url={block.url} />;
    case 'metricsCallout':
      return <MetricsCallout key={index} metrics={block.metrics} />;
    case 'promptCallout':
      return <PromptCallout key={index} text={block.text} />;
    case 'quoteCallout':
      return <QuoteCallout key={index} text={block.text} author={block.author} authorTitle={block.authorTitle} />;
    case 'testimonialCallout':
      return <TestimonialCallout key={index} text={block.text} author={block.author} authorTitle={block.authorTitle} />;
    case 'textSection':
      return <TextSection key={index} heading={block.heading} text={block.text} />;
    case 'imageBlock':
      return <ImageBlock key={index} image={block.image} />;
    case 'videoBlock':
      // Проверяем, что у videoBlock есть video данные
      if (!block.video) {
        return null;
      }
      return <VideoBlock key={index} video={block.video} alt={block.alt} poster={block.poster} />;
    default:
      return null;
  }
}

export function CaseStudyModal({ caseStudy }: CaseStudyModalProps) {
  return (
    <div 
      style={{
        fontFamily: designTokens.textStyles.body1.fontFamily,
        fontSize: designTokens.textStyles.body1.fontSize,
        fontWeight: designTokens.textStyles.body1.fontWeight,
        letterSpacing: designTokens.textStyles.body1.letterSpacing,
        lineHeight: designTokens.textStyles.body1.lineHeight,
        color: designTokens.colors.grey800,
      }}
    >
      <h1 style={{ 
        ...designTokens.textStyles.h1,
        color: designTokens.colors.black,
        marginBottom: designTokens.spacing.m,
        marginTop: 0,
      }}>
        {caseStudy.title}
      </h1>

      {/* Рендерим весь контент из CMS */}
      {caseStudy.content && caseStudy.content.length > 0 && (
        <div>
          {caseStudy.content.map((block, index) => renderContentBlock(block, index))}
        </div>
      )}

      {/* Если контента нет */}
      {(!caseStudy.content || caseStudy.content.length === 0) && (
        <p style={{ 
          ...designTokens.textStyles.body1,
          color: designTokens.colors.grey800,
          opacity: 0.7,
          margin: 0,
        }}>
          No content available
        </p>
      )}
    </div>
  );
} 