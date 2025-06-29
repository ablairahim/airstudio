'use client';

import React, { useEffect, useState } from 'react';
import { designTokens } from '../lib/design-tokens';
import { siteSettings } from '../lib/design-system';
import { client } from '../sanity/lib/client';
import { useModal } from '../contexts/ModalContext';

// Inline компонент для медиа (видео или изображение)
function CaseStudyMedia({ caseStudy, aspectRatio = '16 / 12' }: { 
  caseStudy: CaseStudyPreview; 
  aspectRatio?: string;
}) {
  // Видео имеет приоритет над изображением
  if (caseStudy.coverVideo?.asset?.url) {
    return (
      <video
        src={caseStudy.coverVideo.asset.url}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        autoPlay={siteSettings.ENABLE_COVER_VIDEO_AUTOPLAY}
        muted
        loop={siteSettings.ENABLE_COVER_VIDEO_AUTOPLAY}
        playsInline
        preload={siteSettings.ENABLE_COVER_VIDEO_AUTOPLAY ? 'auto' : 'metadata'}
      />
    );
  }
  
  // Fallback на изображение
  if (caseStudy.cover?.asset?.url) {
    return (
      <img
        src={caseStudy.cover.asset.url}
        alt={caseStudy.cover.alt || caseStudy.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    );
  }
  
  // Fallback на placeholder
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: designTokens.colors.grey500,
      color: designTokens.colors.white,
      ...designTokens.textStyles.body1,
    }}>
      No Cover Media
    </div>
  );
}

// Inline компонент для тегов
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
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {displayName}
    </span>
  )
}

interface CaseStudyPreview {
  _id: string
  title: string
  summary?: string
  slug: { current: string }
  tags?: string[]
  cover?: {
    asset: { url: string }
    alt?: string
  }
  coverVideo?: {
    asset: { url: string }
  }
  // Metrics from callouts for preview
  metrics?: Array<{ value: string; label: string }>
}

export function WorkSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { openCaseModal } = useModal();





  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const query = `
          *[_type == "caseStudy"] {
            _id,
            title,
            summary,
            slug,
            tags,
            cover {
              asset-> {
                url
              },
              alt
            },
            coverVideo {
              asset-> {
                url
              }
            },
            "metrics": content[_type == "metricsCallout"][0].metrics[0..2],
            _updatedAt
          }
        `;
        const data = await client.fetch(query);
        
        if (data.length > 0) {
          // Ищем кейс с нужным названием и помещаем его первым
          const targetKeywords = ["How I Decided", "Create Something", "Business Value", "Clear Roadmap"];
          const targetIndex = data.findIndex((caseStudy: any) => 
            caseStudy.title && targetKeywords.some(keyword => 
              caseStudy.title.toLowerCase().includes(keyword.toLowerCase())
            )
          );
          
          let sortedData = [...data];
          if (targetIndex > 0) {
            // Перемещаем найденный кейс в начало
            const targetCase = sortedData.splice(targetIndex, 1)[0];
            sortedData.unshift(targetCase);
          }
          
          setCaseStudies(sortedData);
        } else {
          const testCaseStudy = {
            _id: 'test-case',
            title: 'Test Case Study',
            summary: 'This is a test case study to verify the system works',
            slug: { current: 'test-case' },
            tags: ['ux-ui-design', 'experiment'],
            cover: undefined,
            metrics: [
              { value: '+30%', label: 'Retention' },
              { value: '2x', label: 'Engagement' }
            ]
          };
          setCaseStudies([testCaseStudy]);
        }
        
      } catch (error) {
        // Устанавливаем тестовые данные при ошибке
        const testCaseStudy = {
          _id: 'test-case-error',
          title: 'Test Case Study (Error)',
          summary: 'This is a test case study - error occurred while fetching from CMS',
          slug: { current: 'test-case-error' },
          tags: ['ux-ui-design'],
          cover: undefined,
          metrics: [
            { value: '+30%', label: 'Retention' }
          ]
        };
        setCaseStudies([testCaseStudy]);
      } finally {
        setLoading(false);
      }
    }

    fetchCaseStudies();
  }, []);

  const handleCaseStudyClick = (caseStudy: CaseStudyPreview) => {

    openCaseModal(caseStudy.slug.current);
  };

  if (loading) {
    return (
          <section 
      id="work"
      style={{
        minHeight: '100vh',
        paddingTop: designTokens.spacing.xxxl,     // 80px
        paddingBottom: designTokens.spacing.xxxl,  // 80px
        paddingLeft: designTokens.spacing.m,       // 20px
        paddingRight: designTokens.spacing.m,      // 20px
        backgroundColor: designTokens.colors.grey100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
        <div 
          style={{ 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: designTokens.spacing.l,
          }}
        >
                  <p style={{
          ...designTokens.textStyles.h3,
          color: designTokens.colors.grey500,
          textAlign: 'center',
        }}>
          Loading case studies...
        </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="work"
      style={{
        minHeight: '100vh',
        paddingTop: designTokens.spacing.xxxl,     // 80px
        paddingBottom: designTokens.spacing.xxxl,  // 80px
        paddingLeft: designTokens.spacing.m,       // 20px
        paddingRight: designTokens.spacing.m,      // 20px
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
          gap: designTokens.spacing.xxl,  // 40px between rows
        }}
      >
        {/* Case Studies Grid - First row: 2 large, then rows of 4 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.xxl }}>
          
          {/* First row - Loom placeholder + first CMS case study */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isLargeScreen ? '1fr 1fr' : '1fr',
            gap: designTokens.spacing.l,
          }}>
            {/* Loom Placeholder - not from CMS */}
            <div style={{
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
            }}>
              {/* Loom Video */}
              <div style={{
                position: 'relative',
                aspectRatio: '16 / 12',
                backgroundColor: designTokens.colors.grey500,
              }}>
                <iframe
                  src="https://www.loom.com/embed/0483bdca78c94ab7bdf92bff5f03d19c?sid=6091c807-9301-4ace-a196-af8e30bd4ae2"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allowFullScreen
                />
              </div>

                            {/* Loom Content */}
              <div style={{ paddingTop: designTokens.spacing.l }}>
                <h3 style={{
                  ...designTokens.textStyles.h3,
                  color: designTokens.colors.black,
                  marginBottom: designTokens.spacing.xs,
                  lineHeight: '1.2',
                }}>
                  Ablai Rakhimbekov is a fractional product designer, narrative architect, and early-stage "chaos tamer" with 4+ years launching digital systems.
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: designTokens.spacing.xs,
                  marginBottom: designTokens.spacing.xs,
                }}>
                  <CaseStudyTag tag="ux-ui-design" />
                </div>
              </div>
            </div>

            {/* First CMS case study */}
            {caseStudies.length > 0 && (
                             <div
                 onClick={() => handleCaseStudyClick(caseStudies[0])}
                 style={{
                   overflow: 'hidden',
                   cursor: 'pointer',
                   position: 'relative',
                 }}
              >
                {/* Cover Image */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '16 / 12',
                  backgroundColor: designTokens.colors.grey500,
                }}>
                  <CaseStudyMedia caseStudy={caseStudies[0]} />
                </div>

                {/* Content below image */}
                <div style={{ paddingTop: designTokens.spacing.l }}>
                  {/* Title */}
                  <h3 style={{
                    ...designTokens.textStyles.h3,
                    color: designTokens.colors.black,
                    marginBottom: designTokens.spacing.xs,
                    lineHeight: '1.2',
                  }}>
                    {caseStudies[0].title}
                  </h3>

                  {/* Summary under title */}
                  {caseStudies[0].summary && (
                    <p style={{
                      ...designTokens.textStyles.tag,
                      color: designTokens.colors.grey800,
                      lineHeight: '1.4',
                      margin: 0,
                      marginBottom: designTokens.spacing.xs,
                    }}>
                      {caseStudies[0].summary}
                    </p>
                  )}

                  {/* Tags under summary */}
                  {caseStudies[0].tags && Array.isArray(caseStudies[0].tags) && caseStudies[0].tags.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: designTokens.spacing.xs,
                    }}>
                      {caseStudies[0].tags.slice(0, 2).map((tag, tagIndex) => (
                        <CaseStudyTag key={tagIndex} tag={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Remaining rows - 4 case studies per row */}
          {caseStudies.length > 1 && (
            <>
              {Array.from({ length: Math.ceil((caseStudies.length - 1) / 4) }).map((_, rowIndex) => {
                const startIndex = 1 + rowIndex * 4;
                const endIndex = Math.min(startIndex + 4, caseStudies.length);
                const rowCases = caseStudies.slice(startIndex, endIndex);
                
                return (
                  <div key={`row-${rowIndex}`} style={{
                    display: 'grid',
                    gridTemplateColumns: isLargeScreen ? 'repeat(4, 1fr)' : '1fr',
                    gap: designTokens.spacing.l,
                  }}>
                    {rowCases.map((caseStudy) => (
                                          <div
                      key={caseStudy._id}
                      onClick={() => handleCaseStudyClick(caseStudy)}
                      style={{
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                      >
                        {/* Cover Image */}
                        <div style={{
                          position: 'relative',
                          aspectRatio: '16 / 12',
                          backgroundColor: designTokens.colors.grey500,
                        }}>
                                                    <CaseStudyMedia caseStudy={caseStudy} />
                        </div>

                                              {/* Content below image */}
                      <div style={{ paddingTop: designTokens.spacing.l }}>
                          {/* Title */}
                          <h3 style={{
                            ...designTokens.textStyles.h3,
                            color: designTokens.colors.black,
                            marginBottom: designTokens.spacing.xs,
                            lineHeight: '1.2',
                          }}>
                            {caseStudy.title}
                          </h3>

                          {/* Summary under title */}
                          {caseStudy.summary && (
                            <p style={{
                              ...designTokens.textStyles.tag,
                              color: designTokens.colors.grey800,
                              lineHeight: '1.4',
                              margin: 0,
                              marginBottom: designTokens.spacing.xs,
                            }}>
                              {caseStudy.summary}
                            </p>
                          )}

                          {/* Tags under summary */}
                          {caseStudy.tags && Array.isArray(caseStudy.tags) && caseStudy.tags.length > 0 && (
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: designTokens.spacing.xs,
                            }}>
                              {caseStudy.tags.slice(0, 2).map((tag, tagIndex) => (
                                <CaseStudyTag key={tagIndex} tag={tag} />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Fill empty slots in the last row if needed */}
                    {rowCases.length < 4 && Array.from({ length: 4 - rowCases.length }).map((_, emptyIndex) => (
                      <div key={`empty-${emptyIndex}`} style={{ visibility: 'hidden' }} />
                    ))}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Empty state */}
        {caseStudies.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: designTokens.spacing.xxxl,
          }}>
            <p style={{
              ...designTokens.textStyles.h3,
              color: designTokens.colors.grey500,
              marginBottom: designTokens.spacing.l,
            }}>
              No case studies found
            </p>
            <p style={{
              ...designTokens.textStyles.body1,
              color: designTokens.colors.grey800,
            }}>
              Add some case studies in the Sanity Studio to see them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 