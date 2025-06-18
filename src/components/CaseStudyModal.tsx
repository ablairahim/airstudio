'use client';

import React from 'react';
import Image from 'next/image';
import { CaseStudy, ContentBlock } from '../lib/sanity';
import { designTokens } from '../lib/design-tokens';
import { getTagColors, getTagTitle } from '../lib/tag-colors';

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
}

// Компонент для рендеринга метрик
function MetricsCallout({ metrics }: { metrics: Array<{ value: string; label: string }> }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.green,
      borderRadius: designTokens.corners.l,
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
      borderRadius: designTokens.corners.l,
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
      borderRadius: designTokens.corners.l,
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
      borderRadius: designTokens.corners.l,
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

// Компонент для текстовых секций
function TextSection({ heading, text }: { heading: string; text: string }) {
  return (
    <div style={{ marginBottom: designTokens.spacing.xl }}>
      <h3 style={{
        ...designTokens.textStyles.h3,
        color: designTokens.colors.black,
        marginBottom: designTokens.spacing.m,
      }}>
        {heading}
      </h3>
      <p style={{
        ...designTokens.textStyles.paragraph,
        color: designTokens.colors.grey800,
        margin: 0,
        lineHeight: '1.6',
      }}>
        {text}
      </p>
    </div>
  );
}

// Компонент для изображений
function ImageBlock({ image }: { image: { asset: { url: string }; alt?: string } }) {
  return (
    <div style={{
      marginBottom: designTokens.spacing.xl,
      borderRadius: designTokens.corners.l,
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

// Функция для рендеринга контент-блока
function renderContentBlock(block: ContentBlock, index: number) {
  switch (block._type) {
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
    default:
      return null;
  }
}

export function CaseStudyModal({ caseStudy }: CaseStudyModalProps) {
  return (
    <>
      {/* Теги */}
      <div style={{
        display: 'flex',
        gap: designTokens.spacing.s,
        marginBottom: designTokens.spacing.l,
        flexWrap: 'wrap',
      }}>
        {caseStudy.tags?.map((tag) => {
          const colors = getTagColors(tag);
          return (
            <span
              key={tag}
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                paddingInline: designTokens.spacing.s,
                paddingBlock: designTokens.spacing.xs,
                borderRadius: designTokens.corners.s,
                fontSize: '0.875rem',
                fontWeight: 500,
                fontFamily: designTokens.textStyles.body1.fontFamily,
              }}
            >
              {getTagTitle(tag)}
            </span>
          );
        })}
      </div>

      {/* Scrollable content */}
      <div 
        style={{
          height: 'calc(100% - 60px)', // Оставляем место для тегов
          overflowY: 'auto',
          paddingRight: designTokens.spacing.s,
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
        }}
      >
        <div 
          style={{
            fontFamily: designTokens.textStyles.body1.fontFamily,
            fontSize: designTokens.textStyles.body1.fontSize,
            fontWeight: designTokens.textStyles.body1.fontWeight,
            letterSpacing: designTokens.textStyles.body1.letterSpacing,
            color: designTokens.colors.grey800,
            lineHeight: '1.6',
          }}
        >
          <h2 style={{ 
            fontFamily: designTokens.textStyles.h2.fontFamily,
            fontSize: designTokens.textStyles.h2.fontSize,
            fontWeight: designTokens.textStyles.h2.fontWeight,
            color: designTokens.colors.black,
            marginBottom: designTokens.spacing.m,
            marginTop: 0,
          }}>
            {caseStudy.title}
          </h2>

          {caseStudy.summary && (
            <p style={{ marginBottom: designTokens.spacing.l }}>
              {caseStudy.summary}
            </p>
          )}

          {caseStudy.link && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: designTokens.spacing.s,
              marginBottom: designTokens.spacing.xl,
            }}>
              <a 
                href={caseStudy.link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: designTokens.textStyles.body1.fontFamily,
                  fontSize: designTokens.textStyles.body1.fontSize,
                  fontWeight: designTokens.textStyles.body1.fontWeight,
                  color: designTokens.colors.black,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: designTokens.spacing.s,
                }}
              >
                {caseStudy.link.text || 'View Project'}
                <span style={{ fontSize: '1.125rem' }}>→</span>
              </a>
            </div>
          )}

          {/* Client, Year, Role */}
          {caseStudy.facts && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: designTokens.spacing.l,
              marginBottom: designTokens.spacing.xl,
              paddingBottom: designTokens.spacing.l,
              borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
            }}>
              {caseStudy.facts.client && (
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
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {caseStudy.facts.client}
                  </p>
                </div>
              )}
              {caseStudy.facts.year && (
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
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {caseStudy.facts.year}
                  </p>
                </div>
              )}
              {caseStudy.facts.role && (
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
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {caseStudy.facts.role}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Loom video or placeholder */}
          <div 
            style={{
              aspectRatio: '16 / 9',
              backgroundColor: designTokens.colors.grey500,
              borderRadius: designTokens.corners.l,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: designTokens.spacing.xxl,
            }}
          >
            {caseStudy.loomEmbed ? (
              <iframe
                src={caseStudy.loomEmbed}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: designTokens.corners.l,
                }}
                allowFullScreen
              />
            ) : (
              <span style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: designTokens.colors.white,
                fontFamily: designTokens.textStyles.h1.fontFamily,
              }}>
                {caseStudy.title}
              </span>
            )}
          </div>

          {/* Рендерим весь контент из CMS */}
          {caseStudy.content && caseStudy.content.length > 0 && (
            <div>
              {caseStudy.content.map((block, index) => renderContentBlock(block, index))}
            </div>
          )}

          {/* Если контента нет */}
          {(!caseStudy.content || caseStudy.content.length === 0) && (
            <p style={{ marginBottom: designTokens.spacing.xxl, opacity: 0.7 }}>
              Контент для этого кейса еще не добавлен в CMS.
            </p>
          )}
        </div>
      </div>
    </>
  );
} 