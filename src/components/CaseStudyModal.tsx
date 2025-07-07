'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { CaseStudy, ContentBlock } from '../lib/sanity';
import { designTokens } from '../lib/design-tokens';
import { siteSettings } from '@/lib/design-system';

// Utility: build Sanity CDN URL with width & auto=format
const buildSanityImage = (url: string, width = 1600) => `${url}?w=${width}&auto=format`;

// Компонент для отображения cover media (видео или изображение)
function CoverMedia({ caseStudy }: { caseStudy: CaseStudy }) {
  // Видео имеет приоритет над изображением
  if (caseStudy.coverVideo?.asset?.url) {
    return (
      <div style={{
        marginBottom: '2rem', // 32px
        width: '100%',
        overflow: 'hidden',
        borderRadius: '16px',
      }}>
        <video
          src={caseStudy.coverVideo.asset.url}
          controls={!siteSettings.ENABLE_CONTENT_VIDEO_AUTOPLAY}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
          autoPlay={siteSettings.ENABLE_CONTENT_VIDEO_AUTOPLAY}
          muted
          loop={siteSettings.ENABLE_CONTENT_VIDEO_AUTOPLAY}
          playsInline
          preload={siteSettings.ENABLE_CONTENT_VIDEO_AUTOPLAY ? 'auto' : 'metadata'}
        />
      </div>
    );
  }
  
  // Fallback на изображение
  if (caseStudy.cover?.asset?.url) {
    return (
      <div style={{
        marginBottom: '2rem', // 32px
        overflow: 'hidden',
        borderRadius: '16px',
      }}>
        <Image
          src={buildSanityImage(caseStudy.cover.asset.url)}
          alt={caseStudy.cover.alt || caseStudy.title}
          width={1600}
          height={1000}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
    );
  }
  
  // Если нет cover media, не рендерим ничего
  return null;
}

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

// Функция для обработки markdown-стиля ссылок в тексте
function processMarkdownLinks(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Добавляем текст до ссылки
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Добавляем ссылку
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <Link
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.white,
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span>{linkText}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </Link>
    );

    lastIndex = linkRegex.lastIndex;
  }

  // Добавляем оставшийся текст
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
  onClose: () => void;
}

// Компонент для рендеринга метрик
function MetricsCallout({ metrics }: { metrics: Array<{ value: string; label: string }> }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.grey800,
      padding: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
      borderRadius: '16px',
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
              fontFamily: 'Poppins, sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '130%',
              letterSpacing: '-0.02em',
              color: designTokens.colors.white,
              marginBottom: designTokens.spacing.xs,
            }}>
              {metric.value}
            </div>
            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '130%',
              letterSpacing: '-0.02em',
              color: designTokens.colors.white,
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
      backgroundColor: designTokens.colors.grey800,
      padding: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
      borderRadius: '16px',
    }}>
      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '130%',
        letterSpacing: '-0.02em',
        color: designTokens.colors.white,
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
      backgroundColor: designTokens.colors.grey800,
      padding: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
      borderRadius: '16px',
      borderLeft: `4px solid ${designTokens.colors.white}`,
    }}>
      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '130%',
        letterSpacing: '-0.02em',
        color: designTokens.colors.white,
        margin: 0,
        marginBottom: author ? designTokens.spacing.s : 0,
        fontStyle: 'italic',
      }}>
        "{text}"
      </p>
      {author && (
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '20px',
          fontWeight: 400,
          lineHeight: '130%',
          letterSpacing: '-0.02em',
          color: designTokens.colors.white,
          opacity: 0.8,
          margin: 0,
        }}>
          — {author}{authorTitle ? `, ${authorTitle}` : ''}
        </p>
      )}
    </div>
  );
}

// Компонент для testimonial callout
function TestimonialCallout({ text, author, authorTitle }: { text: string; author?: string; authorTitle?: string }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.grey800,
       
      padding: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
      borderRadius: '16px',
    }}>
      <p style={{
        ...designTokens.textStyles.body1,
        margin: 0,
        marginBottom: author ? designTokens.spacing.s : 0,
      }}>
        {text}
      </p>
      {author && (
        <p style={{
          ...designTokens.textStyles.body1,
          opacity: 0.8,
          fontWeight: 600,
          fontSize: '0.875rem',
          margin: 0,
        }}>
          {author}{authorTitle ? `, ${authorTitle}` : ''}
        </p>
      )}
    </div>
  );
}

// Общий стиль, совпадающий с абзацем в Hero
const heroTextStyle = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '130%',
  letterSpacing: '-0.02em',
  color: designTokens.colors.white,
} as const;

const heroHeadingStyle = {
  ...heroTextStyle,
  fontWeight: 600,
  textAlign: 'left',
} as const;

// Компонент для текстовых секций с rich text поддержкой
function TextSection({ heading, text }: { heading?: string; text?: any[] }) {
  const portableTextComponents = {
    marks: {
      link: ({ children, value }: any) => (
        <Link
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...designTokens.textStyles.body1,
            color: designTokens.colors.white,
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          {children}
        </Link>
      ),
    },
  };

  return (
    <div style={{
      marginBottom: designTokens.spacing.xl,
    }}>
      {heading && (
        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: '130%',
          letterSpacing: '-0.02em',
          color: designTokens.colors.white,
          marginTop: 0,
          marginBottom: designTokens.spacing.m,
        }}>
          {heading}
        </h2>
      )}
      {text && (
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '20px',
          fontWeight: 400,
          lineHeight: '130%',
          letterSpacing: '-0.02em',
          color: designTokens.colors.white,
        }}>
          <PortableText value={cleanBlockContent(text)} components={portableTextComponents} />
        </div>
      )}
    </div>
  );
}

// Компонент для параграфа без заголовка с размером шрифта 24px
function ParagraphBlock({ text }: { text?: any[] }) {
  if (!text) return null;

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => (
        <p style={{
          ...heroTextStyle,
          marginBottom: designTokens.spacing.m,
        }}>
          {children}
        </p>
      ),
      h1: ({ children }: any) => (
        <h2 style={{
          ...heroHeadingStyle,
          marginBottom: designTokens.spacing.m,
          marginTop: designTokens.spacing.l,
        }}>
          {children}
        </h2>
      ),
      h2: ({ children }: any) => (
        <h3 style={{
          ...heroHeadingStyle,
          marginBottom: designTokens.spacing.s,
          marginTop: designTokens.spacing.m,
        }}>
          {children}
        </h3>
      ),
      h3: ({ children }: any) => (
        <h4 style={{
          ...heroHeadingStyle,
          marginBottom: designTokens.spacing.s,
          marginTop: designTokens.spacing.m,
        }}>
          {children}
        </h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote style={{
          ...heroTextStyle,
          fontStyle: 'italic',
          borderLeft: `4px solid ${designTokens.colors.white}`,
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
          ...heroTextStyle,
          marginBottom: designTokens.spacing.m,
          paddingLeft: designTokens.spacing.l,
        }}>
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol style={{
          ...heroTextStyle,
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
          ...heroTextStyle,
          marginBottom: designTokens.spacing.xs,
        }}>
          {children}
        </li>
      ),
      number: ({ children }: any) => (
        <li style={{
          ...heroTextStyle,
          marginBottom: designTokens.spacing.xs,
        }}>
          {children}
        </li>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <Link
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...designTokens.textStyles.body1,
            color: designTokens.colors.white,
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          {children}
        </Link>
      ),
    },
  } as const;

  return (
    <div style={{ marginBottom: designTokens.spacing.xl }}>
      <PortableText 
        value={cleanBlockContent(text)}
        components={portableTextComponents}
      />
    </div>
  );
}

// Компонент для Link блока
function LinkBlock({ text, url }: { text: string; url: string }) {
  return (
    <InlineLink text={text} url={url} />
  );
}

// Компонент для группы ссылок, идущих подряд
function LinkGroup({ links }: { links: Array<{ text: string; url: string }> }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: designTokens.spacing.s,
      marginBottom: designTokens.spacing.xl,
    }}>
      {links.map((link, index) => (
        <LinkBlock key={index} text={link.text} url={link.url} />
      ))}
    </div>
  );
}

// Компонент для Facts блока (старый формат - больше не используется)
function FactsBlock({ client, year, role }: { client?: string; year?: string; role?: string }) {
  return null; // Не рендерим отдельный Facts блок
}

// Компонент для ссылки под фактами
function InlineLink({ text, url }: { text: string; url: string }) {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...designTokens.textStyles.body1,
        color: designTokens.colors.white,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: designTokens.spacing.xs,
        border: `1px solid ${designTokens.colors.white}`,
        borderRadius: '4px',
        padding: '0 4px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <span>{text || url}</span>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </a>
  );
}

// Новый инлайн Facts компонент для сетки с ссылками
function InlineFactsBlock({ client, year, role, links }: { 
  client?: string; 
  year?: string; 
  role?: string;
  links?: Array<{ text: string; url: string }>;
}) {
  if (!client && !year && !role && (!links || links.length === 0)) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing.xs,
    }}>
      {client && (
        <div style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.white,
        }}>
          <span style={{ fontWeight: 500 }}>Client:</span> {client}
        </div>
      )}
      {year && (
        <div style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.white,
        }}>
          <span style={{ fontWeight: 500 }}>Year:</span> {year}
        </div>
      )}
      {role && (
        <div style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.white,
        }}>
          <span style={{ fontWeight: 500 }}>Role:</span> {role}
        </div>
      )}
      
      {/* Ссылки под фактами */}
      {links && links.length > 0 && (
        <div style={{ 
          marginTop: designTokens.spacing.s,
          display: 'flex',
          flexDirection: links.length === 2 ? 'row' : 'column',
          gap: designTokens.spacing.xs,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
          {links.map((link, index) => (
            <div key={index} style={{ flex: 'none' }}>
              <InlineLink text={link.text} url={link.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Новый компонент для текстовой секции в сетке
function TextSectionWithGrid({ 
  heading, 
  text, 
  showFacts = false, 
  factsData,
  linksData,
  isMobile = false
}: { 
  heading?: string; 
  text?: any[]; 
  showFacts?: boolean;
  factsData?: { client?: string; year?: string; role?: string };
  linksData?: Array<{ text: string; url: string }>;
  isMobile?: boolean;
}) {
  if (!text) return null;

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => {
        // Если children это строка, обрабатываем markdown ссылки
        if (typeof children === 'string') {
          return (
            <p style={{
              ...heroTextStyle,
              marginBottom: designTokens.spacing.m,
              textAlign: isMobile ? 'left' : 'justify',
            }}>
              {processMarkdownLinks(children)}
            </p>
          );
        }
        
        // Если children это массив, обрабатываем каждый элемент
        const processedChildren = React.Children.map(children, (child, index) => {
          if (typeof child === 'string') {
            return processMarkdownLinks(child);
          }
          return child;
        });

        return (
          <p style={{
            ...heroTextStyle,
            marginBottom: designTokens.spacing.m,
            textAlign: isMobile ? 'left' : 'justify',
          }}>
            {processedChildren}
          </p>
        );
      },
      h1: ({ children }: any) => (
        <h2 style={{
          ...heroHeadingStyle,
          marginBottom: designTokens.spacing.m,
          marginTop: designTokens.spacing.l,
        }}>
          {children}
        </h2>
      ),
      h2: ({ children }: any) => (
        <h3 style={{
          ...heroHeadingStyle,
          marginBottom: designTokens.spacing.s,
          marginTop: designTokens.spacing.m,
        }}>
          {children}
        </h3>
      ),
      h3: ({ children }: any) => (
        <h4 style={{
          ...heroHeadingStyle,
          marginBottom: designTokens.spacing.s,
          marginTop: designTokens.spacing.m,
        }}>
          {children}
        </h4>
      ),
    },
         list: {
       bullet: ({ children }: any) => (
         <ul style={{
           ...heroTextStyle,
           marginBottom: designTokens.spacing.m,
           paddingLeft: designTokens.spacing.l,
           textAlign: isMobile ? 'left' : 'justify',
         }}>
           {children}
         </ul>
       ),
       number: ({ children }: any) => (
         <ol style={{
           ...heroTextStyle,
           marginBottom: designTokens.spacing.m,
           paddingLeft: designTokens.spacing.l,
           textAlign: isMobile ? 'left' : 'justify',
         }}>
           {children}
         </ol>
       ),
     },
     listItem: {
       bullet: ({ children }: any) => {
         const processedChildren = React.Children.map(children, (child, index) => {
           if (typeof child === 'string') {
             return processMarkdownLinks(child);
           }
           return child;
         });

         return (
           <li style={{
             ...heroTextStyle,
             marginBottom: designTokens.spacing.xs,
             textAlign: isMobile ? 'left' : 'justify',
           }}>
             {processedChildren}
           </li>
         );
       },
       number: ({ children }: any) => {
         const processedChildren = React.Children.map(children, (child, index) => {
           if (typeof child === 'string') {
             return processMarkdownLinks(child);
           }
           return child;
         });

         return (
           <li style={{
             ...heroTextStyle,
             marginBottom: designTokens.spacing.xs,
             textAlign: isMobile ? 'left' : 'justify',
           }}>
             {processedChildren}
           </li>
         );
       },
     },
    marks: {
      strong: ({ children }: any) => (
        <strong style={{ fontWeight: 600 }}>{children}</strong>
      ),
      em: ({ children }: any) => (
        <em style={{ fontStyle: 'italic' }}>{children}</em>
      ),
    },
    link: ({ value, children }: any) => (
      <Link
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...designTokens.textStyles.body1,
          color: designTokens.colors.white,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          border: `1px solid ${designTokens.colors.white}`,
          borderRadius: '4px',
          padding: '0 4px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          verticalAlign: 'baseline',
          lineHeight: 'inherit',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <span>{children}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </Link>
    ),
  };

  // Мобильная вертикальная компоновка
  if (isMobile) {
    return (
      <div style={{
        marginBottom: designTokens.spacing.xl,
      }}>
        {/* Facts блок на мобилке */}
        {showFacts && factsData && (
          <div style={{ marginBottom: designTokens.spacing.l }}>
            <InlineFactsBlock 
              client={factsData.client} 
              year={factsData.year} 
              role={factsData.role}
              links={linksData}
            />
          </div>
        )}

        {/* Текстовый контент на мобилке */}
        <div>
          {heading && (
            <h2 style={{
              ...heroHeadingStyle,
              marginBottom: designTokens.spacing.m,
              marginTop: 0,
            }}>
              {heading}
            </h2>
          )}
          <div style={{
            ...heroTextStyle,
          }}>
            <PortableText 
              value={cleanBlockContent(text)} 
              components={portableTextComponents}
            />
          </div>
        </div>
      </div>
    );
  }

  // Десктопная grid компоновка
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.20fr 0.6fr 1.10fr 1.10fr', // Facts, пустая, текст, текст
      gap: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
    }}>
      {/* Колонка 1: Facts (только если showFacts = true) */}
      <div>
        {showFacts && factsData && (
          <InlineFactsBlock 
            client={factsData.client} 
            year={factsData.year} 
            role={factsData.role}
            links={linksData}
          />
        )}
      </div>

      {/* Колонка 2: Пустая */}
      <div></div>

      {/* Колонки 3-4: Текстовый контент */}
      <div style={{ gridColumn: '3 / 5' }}>
        {heading && (
          <h2 style={{
            ...heroHeadingStyle,
            marginBottom: designTokens.spacing.m,
            marginTop: 0,
          }}>
            {heading}
          </h2>
        )}
                 <div style={{
           ...heroTextStyle,
         }}>
           <PortableText 
             value={cleanBlockContent(text)} 
             components={portableTextComponents}
           />
         </div>
      </div>
    </div>
  );
}

// Новый компонент для параграфа в сетке (24px шрифт)
function ParagraphBlockWithGrid({ 
  text, 
  showFacts = false, 
  factsData,
  linksData,
  isMobile = false
}: { 
  text?: any[]; 
  showFacts?: boolean;
  factsData?: { client?: string; year?: string; role?: string };
  linksData?: Array<{ text: string; url: string }>;
  isMobile?: boolean;
}) {
  if (!text) return null;

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => {
        // Если children это строка, обрабатываем markdown ссылки
        if (typeof children === 'string') {
          return (
            <p style={{
              fontSize: '1.5rem',       // 24px
              lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
              fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
              fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
              letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
              color: designTokens.colors.white,
              marginBottom: designTokens.spacing.m,
              textAlign: isMobile ? 'left' : 'justify',
            }}>
              {processMarkdownLinks(children)}
            </p>
          );
        }
        
        // Если children это массив, обрабатываем каждый элемент
        const processedChildren = React.Children.map(children, (child, index) => {
          if (typeof child === 'string') {
            return processMarkdownLinks(child);
          }
          return child;
        });

        return (
          <p style={{
            fontSize: '1.5rem',       // 24px
            lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
            fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
            fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
            letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
            color: designTokens.colors.white,
            marginBottom: designTokens.spacing.m,
            textAlign: isMobile ? 'left' : 'justify',
          }}>
            {processedChildren}
          </p>
        );
      },
      h1: ({ children }: any) => (
        <h2 style={{
          ...designTokens.textStyles.modalCaseHeading,
          color: designTokens.colors.white,
          marginBottom: designTokens.spacing.m,
          marginTop: designTokens.spacing.l,
        }}>
          {children}
        </h2>
      ),
      h2: ({ children }: any) => (
        <h3 style={{
          ...designTokens.textStyles.modalCaseHeading,
          color: designTokens.colors.white,
          marginBottom: designTokens.spacing.s,
          marginTop: designTokens.spacing.m,
        }}>
          {children}
        </h3>
      ),
      h3: ({ children }: any) => (
        <h4 style={{
          ...designTokens.textStyles.modalCaseHeading,
          color: designTokens.colors.white,
          marginBottom: designTokens.spacing.s,
          marginTop: designTokens.spacing.m,
        }}>
          {children}
        </h4>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul style={{
          fontSize: '1.5rem',       // 24px
          lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
          fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
          fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
          letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
          color: designTokens.colors.white,
          marginBottom: designTokens.spacing.m,
          paddingLeft: designTokens.spacing.l,
          textAlign: isMobile ? 'left' : 'justify',
        }}>
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol style={{
          fontSize: '1.5rem',       // 24px
          lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
          fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
          fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
          letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
          color: designTokens.colors.white,
          marginBottom: designTokens.spacing.m,
          paddingLeft: designTokens.spacing.l,
          textAlign: isMobile ? 'left' : 'justify',
        }}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => {
        const processedChildren = React.Children.map(children, (child, index) => {
          if (typeof child === 'string') {
            return processMarkdownLinks(child);
          }
          return child;
        });

        return (
          <li style={{
            fontSize: '1.5rem',       // 24px
            lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
            fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
            fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
            letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
            color: designTokens.colors.white,
            marginBottom: designTokens.spacing.xs,
            textAlign: isMobile ? 'left' : 'justify',
          }}>
            {processedChildren}
          </li>
        );
      },
      number: ({ children }: any) => {
        const processedChildren = React.Children.map(children, (child, index) => {
          if (typeof child === 'string') {
            return processMarkdownLinks(child);
          }
          return child;
        });

        return (
          <li style={{
            fontSize: '1.5rem',       // 24px
            lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
            fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
            fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
            letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
            color: designTokens.colors.white,
            marginBottom: designTokens.spacing.xs,
            textAlign: isMobile ? 'left' : 'justify',
          }}>
            {processedChildren}
          </li>
        );
      },
    },
    marks: {
      strong: ({ children }: any) => (
        <strong style={{ fontWeight: 600 }}>{children}</strong>
      ),
      em: ({ children }: any) => (
        <em style={{ fontStyle: 'italic' }}>{children}</em>
      ),
    },
    link: ({ value, children }: any) => (
      <Link
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '1.5rem',       // 24px
          lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
          fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
          fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
          letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
          color: designTokens.colors.white,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          border: `1px solid ${designTokens.colors.white}`,
          borderRadius: '4px',
          padding: '0 4px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          verticalAlign: 'baseline',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <span>{children}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </Link>
    ),
  };

  // Мобильная вертикальная компоновка
  if (isMobile) {
    return (
      <div style={{
        marginBottom: designTokens.spacing.xl,
      }}>
        {/* Facts блок на мобилке */}
        {showFacts && factsData && (
          <div style={{ marginBottom: designTokens.spacing.l }}>
            <InlineFactsBlock 
              client={factsData.client} 
              year={factsData.year} 
              role={factsData.role}
              links={linksData}
            />
          </div>
        )}

        {/* Текстовый контент на мобилке */}
        <div style={{
          fontSize: '1.5rem',       // 24px
          lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
          fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
          fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
          letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
          color: designTokens.colors.white,
        }}>
          <PortableText 
            value={cleanBlockContent(text)} 
            components={portableTextComponents}
          />
        </div>
      </div>
    );
  }

  // Десктопная grid компоновка
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.20fr 0.6fr 1.10fr 1.10fr', // Facts, пустая, текст, текст
      gap: designTokens.spacing.l,
      marginBottom: designTokens.spacing.xl,
    }}>
      {/* Колонка 1: Facts (только если showFacts = true) */}
      <div>
        {showFacts && factsData && (
          <InlineFactsBlock 
            client={factsData.client} 
            year={factsData.year} 
            role={factsData.role}
            links={linksData}
          />
        )}
      </div>

      {/* Колонка 2: Пустая */}
      <div></div>

      {/* Колонки 3-4: Текстовый контент */}
      <div style={{ gridColumn: '3 / 5' }}>
        <div style={{
          fontSize: '1.5rem',       // 24px
          lineHeight: '1.11',       // 26.64px межстрочного для 24px шрифта
          fontFamily: designTokens.textStyles.modalCaseText.fontFamily,
          fontWeight: designTokens.textStyles.modalCaseText.fontWeight,
          letterSpacing: designTokens.textStyles.modalCaseText.letterSpacing,
          color: designTokens.colors.white,
        }}>
          <PortableText 
            value={cleanBlockContent(text)} 
            components={portableTextComponents}
          />
        </div>
      </div>
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
      borderRadius: '16px',
    }}>
      <Image
        src={buildSanityImage(image.asset.url)}
        alt={image.alt || 'Case study image'}
        width={1600}
        height={1000}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
}

// Компонент для заблюренных изображений с tooltip
function BlurredImageBlock({ image, tooltipText }: { 
  image: { asset: { url: string }; alt?: string }; 
  tooltipText?: string 
}) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        marginBottom: designTokens.spacing.xl,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '16px',
      }}
      onMouseEnter={!isMobile ? () => setShowTooltip(true) : undefined}
      onMouseLeave={!isMobile ? () => setShowTooltip(false) : undefined}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      <Image
        src={buildSanityImage(image.asset.url)}
        alt={image.alt || 'Case study image (NDA protected)'}
        width={1600}
        height={1000}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
      
      {/* Tooltip */}
      <div style={{
        position: 'absolute',
        left: isMobile ? '50%' : mousePos.x + 10,
        top: isMobile ? '50%' : mousePos.y - 10,
        transform: isMobile ? 'translate(-50%, -50%)' : 'translateY(-100%)',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '12px',
        borderRadius: '12px',
        width: isMobile ? '300px' : '400px',
        fontSize: '0.875rem',     // 14px
        lineHeight: '1.286',      // 18px межстрочного для 14px шрифта
        fontFamily: designTokens.textStyles.body1.fontFamily,
        fontWeight: 500,
        zIndex: 10,
        pointerEvents: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        opacity: (isMobile || showTooltip) && tooltipText ? 1 : 0,
        visibility: (isMobile || showTooltip) && tooltipText ? 'visible' : 'hidden',
        transition: 'opacity 0.2s ease, visibility 0.2s ease',
        whiteSpace: 'normal',
      }}>
        {tooltipText || ''}
      </div>
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
      borderRadius: '16px',
    }}>
      <video
        src={video.asset.url}
        controls={!siteSettings.ENABLE_CONTENT_VIDEO_AUTOPLAY}
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
    case 'paragraphBlock':
      return <ParagraphBlock key={index} text={block.text} />;
    case 'imageBlock':
      return <ImageBlock key={index} image={block.image} />;
    case 'blurredImageBlock':
      return <BlurredImageBlock key={index} image={block.image} tooltipText={block.tooltipText} />;
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

export function CaseStudyModal({ caseStudy, onClose }: CaseStudyModalProps) {
  // Определяем мобилку
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Находим Facts блок для использования с первым TextSection или ParagraphBlock
  const factsBlock = caseStudy.content?.find(block => block._type === 'factsBlock');
  const factsData = factsBlock ? {
    client: (factsBlock as any).client,
    year: (factsBlock as any).year,
    role: (factsBlock as any).role,
  } : undefined;

  // Находим ВСЕ Link блоки для отображения под фактами
  const linkBlocks = caseStudy.content?.filter(block => block._type === 'linkBlock') || [];
  const linksData = linkBlocks.map(block => ({
    text: (block as any).text,
    url: (block as any).url,
  }));

  // Счетчик для TextSection и ParagraphBlock блоков
  let textBlockCount = 0;

  const renderContentBlockWithGrid = (block: ContentBlock, index: number) => {
    if (block._type === 'textSection') {
      textBlockCount++;
      const isFirstTextBlock = textBlockCount === 1;
      
      return (
        <TextSectionWithGrid
          key={index}
          heading={(block as any).heading}
          text={(block as any).text}
          showFacts={isFirstTextBlock && !!factsData}
          factsData={factsData}
          linksData={isFirstTextBlock ? linksData : undefined}
          isMobile={isMobile}
        />
      );
    } else if (block._type === 'paragraphBlock') {
      textBlockCount++;
      const isFirstTextBlock = textBlockCount === 1;
      
      return (
        <ParagraphBlockWithGrid
          key={index}
          text={(block as any).text}
          showFacts={isFirstTextBlock && !!factsData}
          factsData={factsData}
          linksData={isFirstTextBlock ? linksData : undefined}
          isMobile={isMobile}
        />
      );
    } else if (block._type === 'factsBlock') {
      // Не рендерим отдельный Facts блок, он уже встроен в первый TextSection или ParagraphBlock
      return null;
    } else if (block._type === 'linkBlock') {
      // Не рендерим отдельный Link блок, он уже встроен в первый TextSection или ParagraphBlock под фактами
      return null;
    } else {
      // Рендерим все остальные блоки как обычно
      return renderContentBlock(block, index);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(16, 16, 16, 0.8)', // #101010 с лёгкой прозрачностью
      backdropFilter: 'blur(14px) saturate(120%)',
      WebkitBackdropFilter: 'blur(14px) saturate(120%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      overflowY: 'auto',
      zIndex: 1000,
      padding: isMobile ? '16px' : '32px',
    }}>
      <div style={{
        backgroundColor: designTokens.colors.black,
        borderRadius: '24px',
        padding: isMobile ? '24px' : '48px',
        maxWidth: '1200px',
        width: '100%',
        position: 'relative',
        color: designTokens.colors.white,
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: designTokens.colors.white,
            zIndex: 2,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <h1 style={{ 
          fontFamily: 'var(--font-funnel-display), sans-serif',
          fontSize: '32px',
          fontWeight: 600,
          lineHeight: '130%',
          letterSpacing: '-0.02em',
          color: designTokens.colors.white,
          marginBottom: '2rem',
          marginTop: 0,
          textAlign: 'left',
        }}>
          {caseStudy.title}
        </h1>

        {/* Cover Video/Image */}
        <CoverMedia caseStudy={caseStudy} />

        {/* Рендерим весь контент из CMS с новой логикой */}
        {caseStudy.content && caseStudy.content.length > 0 && (
          <div>
            {caseStudy.content.map((block, index) => renderContentBlockWithGrid(block, index))}
          </div>
        )}

        {/* Если контента нет */}
        {(!caseStudy.content || caseStudy.content.length === 0) && (
          <p style={{ 
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '130%',
            letterSpacing: '-0.02em',
            color: designTokens.colors.white,
            opacity: 0.7,
            margin: 0,
          }}>
            No content available
          </p>
        )}

        {/* Mobile Close pill at the end */}
        {isMobile && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: designTokens.colors.white,
              color: designTokens.colors.black,
              border: 'none',
              borderRadius: '9999px',
              padding: '8px 16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Close
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
} 