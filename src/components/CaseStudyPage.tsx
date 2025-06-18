'use client'

import Image from 'next/image'
import Link from 'next/link'
import { designTokens } from '../lib/design-tokens'

// Inline компоненты для коллаутов
function CaseStudyTag({ tag }: { tag: string }) {
  const tagColorMap: Record<string, string> = {
    'ux-ui-design': designTokens.colors.green,
    'experiment': designTokens.colors.dun,
    'motion-design': designTokens.colors.blue,
    'full-cycle': designTokens.colors.pink,
    'ai': designTokens.colors.lightGreen,
    'product-systems': designTokens.colors.beige,
  }

  const tagDisplayNames: Record<string, string> = {
    'ux-ui-design': 'UX/UI Design',
    'experiment': 'Experiment',
    'motion-design': 'Motion Design',
    'full-cycle': 'Full Cycle',
    'ai': 'AI',
    'product-systems': 'Product Systems',
  }

  const backgroundColor = tagColorMap[tag] || designTokens.colors.grey500
  const displayName = tagDisplayNames[tag] || tag
  
  return (
    <span 
      style={{
        ...designTokens.textStyles.tag,
        backgroundColor,
        color: designTokens.colors.black,
        paddingInline: designTokens.spacing.s,
        paddingBlock: designTokens.spacing.xs,
        borderRadius: designTokens.corners.s,
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {displayName}
    </span>
  )
}

function MetricsCallout({ metrics }: { metrics: Array<{ value: string; label: string }> }) {
  if (!metrics || metrics.length === 0) return null

  return (
    <div style={{
      backgroundColor: designTokens.colors.green,
      color: designTokens.colors.black,
      padding: designTokens.spacing.m,
      borderRadius: designTokens.corners.s,
      display: 'flex',
      flexDirection: metrics.length > 1 ? 'row' : 'column',
      gap: designTokens.spacing.m,
      alignItems: metrics.length > 1 ? 'stretch' : 'flex-start',
    }}>
      {metrics.map((metric, index) => (
        <div 
          key={index}
          style={{
            flex: metrics.length > 1 ? 1 : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: designTokens.spacing.s,
            alignItems: metrics.length > 1 ? 'center' : 'flex-start',
            textAlign: metrics.length > 1 ? 'center' : 'left',
          }}
        >
          <div style={{
            ...designTokens.textStyles.h1,
            color: designTokens.colors.black,
            lineHeight: '1',
            fontWeight: 600,
          }}>
            {metric.value}
          </div>
          <div style={{
            ...designTokens.textStyles.body1,
            color: designTokens.colors.black,
            lineHeight: '1.2',
          }}>
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function PromptCallout({ text, icon = '/svg/lightbulb.svg' }: { text: string; icon?: string }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.grey800,
      color: designTokens.colors.white,
      padding: designTokens.spacing.m,
      borderRadius: designTokens.corners.s,
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing.s,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: designTokens.spacing.s,
        marginBottom: designTokens.spacing.xs,
      }}>
        <Image
          src={icon}
          alt="Prompt"
          width={20}
          height={20}
          style={{ filter: 'invert(1)' }}
        />
        <span style={{
          ...designTokens.textStyles.body1,
          fontWeight: 600,
          color: designTokens.colors.white,
        }}>
          Prompt
        </span>
      </div>
      <p style={{
        ...designTokens.textStyles.prompt,
        color: designTokens.colors.white,
        lineHeight: '1.5',
        margin: 0,
      }}>
        {text}
      </p>
    </div>
  )
}

function QuoteCallout({ text, author, authorTitle }: { text: string; author?: string; authorTitle?: string }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.grey800,
      color: designTokens.colors.white,
      padding: designTokens.spacing.m,
      borderRadius: designTokens.corners.s,
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing.s,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: designTokens.spacing.s,
        marginBottom: designTokens.spacing.xs,
      }}>
        <Image
          src="/svg/quote.svg"
          alt="Quote"
          width={20}
          height={20}
          style={{ filter: 'invert(1)' }}
        />
        <span style={{
          ...designTokens.textStyles.body1,
          fontWeight: 600,
          color: designTokens.colors.white,
        }}>
          Quote
        </span>
      </div>
      <p style={{
        ...designTokens.textStyles.prompt,
        color: designTokens.colors.white,
        lineHeight: '1.5',
        margin: 0,
      }}>
        {text}
      </p>
      {(author || authorTitle) && (
        <div style={{
          marginTop: designTokens.spacing.xs,
          paddingTop: designTokens.spacing.s,
          borderTop: `1px solid ${designTokens.colors.grey500}`,
        }}>
          {author && (
            <p style={{
              ...designTokens.textStyles.body1,
              color: designTokens.colors.white,
              fontWeight: 600,
              margin: 0,
            }}>
              {author}
            </p>
          )}
          {authorTitle && (
            <p style={{
              ...designTokens.textStyles.prompt,
              color: designTokens.colors.grey500,
              margin: 0,
              marginTop: '2px',
            }}>
              {authorTitle}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function TestimonialCallout({ text, author, authorTitle }: { text: string; author?: string; authorTitle?: string }) {
  return (
    <div style={{
      backgroundColor: designTokens.colors.grey800,
      color: designTokens.colors.white,
      padding: designTokens.spacing.m,
      borderRadius: designTokens.corners.s,
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing.s,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: designTokens.spacing.s,
        marginBottom: designTokens.spacing.xs,
      }}>
        <Image
          src="/svg/user.svg"
          alt="Testimonial"
          width={20}
          height={20}
          style={{ filter: 'invert(1)' }}
        />
        <span style={{
          ...designTokens.textStyles.body1,
          fontWeight: 600,
          color: designTokens.colors.white,
        }}>
          Testimonial
        </span>
      </div>
      <p style={{
        ...designTokens.textStyles.prompt,
        color: designTokens.colors.white,
        lineHeight: '1.5',
        margin: 0,
      }}>
        {text}
      </p>
      {(author || authorTitle) && (
        <div style={{
          marginTop: designTokens.spacing.xs,
          paddingTop: designTokens.spacing.s,
          borderTop: `1px solid ${designTokens.colors.grey500}`,
        }}>
          {author && (
            <p style={{
              ...designTokens.textStyles.body1,
              color: designTokens.colors.white,
              fontWeight: 600,
              margin: 0,
            }}>
              {author}
            </p>
          )}
          {authorTitle && (
            <p style={{
              ...designTokens.textStyles.prompt,
              color: designTokens.colors.grey500,
              margin: 0,
              marginTop: '2px',
            }}>
              {authorTitle}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

interface CaseStudy {
  _id: string
  title: string
  summary?: string
  slug: { current: string }
  tags?: string[]
  link?: {
    text: string
    url: string
  }
  facts?: {
    client?: string
    year?: string
    role?: string
  }
  loomEmbed?: string
  content?: Array<{
    _type: string
    // Metrics callout
    metrics?: Array<{ value: string; label: string }>
    // Text callouts
    text?: string
    author?: string
    authorTitle?: string
    // Text section content
    heading?: string
    // Image content
    image?: {
      asset: { url: string }
      alt?: string
    }
  }>
}

interface CaseStudyPageProps {
  caseStudy: CaseStudy
}

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: designTokens.colors.white,
      paddingTop: 'calc(64px + ' + designTokens.spacing.xl + ')', // navbar height + spacing
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${designTokens.spacing.xxxl}`,
      }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: designTokens.spacing.xxxl }}>
          
          {/* Tags */}
          {caseStudy.tags && caseStudy.tags.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: designTokens.spacing.s,
              marginBottom: designTokens.spacing.l,
            }}>
              {caseStudy.tags.map((tag, index) => (
                <CaseStudyTag key={index} tag={tag} />
              ))}
            </div>
          )}

          {/* Title - H2 */}
          <h1 style={{
            ...designTokens.textStyles.h2,
            color: designTokens.colors.black,
            marginBottom: designTokens.spacing.l,
            lineHeight: '1.1',
          }}>
            {caseStudy.title}
          </h1>

          {/* Summary - Paragraph style */}
          {caseStudy.summary && (
            <p style={{
              ...designTokens.textStyles.paragraph,
              color: designTokens.colors.grey800,
              marginBottom: designTokens.spacing.xl,
              lineHeight: '1.4',
            }}>
              {caseStudy.summary}
            </p>
          )}

          {/* Link - Button style with arrow */}
          {caseStudy.link && (
            <Link 
              href={caseStudy.link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...designTokens.textStyles.button,
                backgroundColor: designTokens.colors.black,
                color: designTokens.colors.white,
                paddingInline: designTokens.spacing.l,
                paddingBlock: designTokens.spacing.s,
                borderRadius: designTokens.corners.s,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: designTokens.spacing.xs,
                transition: 'all 0.2s ease',
                marginBottom: designTokens.spacing.xl,
              }}
            >
              {caseStudy.link.text}
              <Image 
                src="/svg/arrow-right.svg" 
                alt="Arrow right" 
                width={16} 
                height={16}
                style={{ filter: 'invert(1)' }} // Make arrow white
              />
            </Link>
          )}

          {/* Facts */}
          {caseStudy.facts && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: designTokens.spacing.l,
              marginBottom: designTokens.spacing.xl,
              padding: designTokens.spacing.l,
              backgroundColor: designTokens.colors.grey100,
              borderRadius: designTokens.corners.s,
            }}>
              {caseStudy.facts.client && (
                <div>
                  <h3 style={{
                    ...designTokens.textStyles.body1,
                    color: designTokens.colors.grey800,
                    marginBottom: designTokens.spacing.xs,
                    fontWeight: 600,
                  }}>
                    Client
                  </h3>
                  <p style={{
                    ...designTokens.textStyles.body1,
                    color: designTokens.colors.black,
                  }}>
                    {caseStudy.facts.client}
                  </p>
                </div>
              )}
              {caseStudy.facts.year && (
                <div>
                  <h3 style={{
                    ...designTokens.textStyles.body1,
                    color: designTokens.colors.grey800,
                    marginBottom: designTokens.spacing.xs,
                    fontWeight: 600,
                  }}>
                    Year
                  </h3>
                  <p style={{
                    ...designTokens.textStyles.body1,
                    color: designTokens.colors.black,
                  }}>
                    {caseStudy.facts.year}
                  </p>
                </div>
              )}
              {caseStudy.facts.role && (
                <div>
                  <h3 style={{
                    ...designTokens.textStyles.body1,
                    color: designTokens.colors.grey800,
                    marginBottom: designTokens.spacing.xs,
                    fontWeight: 600,
                  }}>
                    Role
                  </h3>
                  <p style={{
                    ...designTokens.textStyles.body1,
                    color: designTokens.colors.black,
                  }}>
                    {caseStudy.facts.role}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Loom Embed */}
          {caseStudy.loomEmbed && (
            <div style={{
              aspectRatio: '16 / 9',
              marginBottom: designTokens.spacing.xxxl,
              borderRadius: designTokens.corners.l,
              overflow: 'hidden',
              backgroundColor: designTokens.colors.grey500,
            }}>
              <iframe
                src={caseStudy.loomEmbed}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                allowFullScreen
              />
            </div>
          )}
        </header>

        {/* Content Blocks */}
        {caseStudy.content && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: designTokens.spacing.xxxl,
          }}>
            {caseStudy.content.map((block, index) => {
              
              // Metrics callout
              if (block._type === 'metricsCallout' && block.metrics) {
                return <MetricsCallout key={index} metrics={block.metrics} />
              }

              // Prompt callout
              if (block._type === 'promptCallout' && block.text) {
                return <PromptCallout key={index} text={block.text} />
              }

              // Quote callout
              if (block._type === 'quoteCallout' && block.text) {
                return (
                  <QuoteCallout
                    key={index}
                    text={block.text}
                    author={block.author}
                    authorTitle={block.authorTitle}
                  />
                )
              }

              // Testimonial callout
              if (block._type === 'testimonialCallout' && block.text) {
                return (
                  <TestimonialCallout
                    key={index}
                    text={block.text}
                    author={block.author}
                    authorTitle={block.authorTitle}
                  />
                )
              }

              // Text section blocks
              if (block._type === 'textSection') {
                return (
                  <div key={index}>
                    {block.heading && (
                      <h2 style={{
                        ...designTokens.textStyles.h1,
                        color: designTokens.colors.black,
                        marginBottom: designTokens.spacing.l,
                        lineHeight: '1.1',
                      }}>
                        {block.heading}
                      </h2>
                    )}
                    {block.text && (
                      <p style={{
                        ...designTokens.textStyles.paragraph,
                        color: designTokens.colors.grey800,
                        lineHeight: '1.4',
                      }}>
                        {block.text}
                      </p>
                    )}
                  </div>
                )
              }

              // Image blocks
              if (block._type === 'imageBlock' && block.image) {
                return (
                  <div key={index} style={{
                    aspectRatio: '16 / 9',
                    borderRadius: designTokens.corners.l,
                    overflow: 'hidden',
                    backgroundColor: designTokens.colors.grey500,
                  }}>
                    <Image
                      src={block.image.asset.url}
                      alt={block.image.alt || ''}
                      width={1200}
                      height={675}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )
              }

              return null
            })}
          </div>
        )}
      </div>
    </div>
  )
} 