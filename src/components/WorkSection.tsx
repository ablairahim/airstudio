'use client';

import React, { useEffect, useState } from 'react';
import { designTokens } from '../lib/design-tokens';
import { siteSettings } from '../lib/design-system';
import { client } from '../sanity/lib/client';
import { useModal } from '../contexts/ModalContext';
import { useLoading } from '../contexts/LoadingContext';

// Inline компонент для медиа (изображение по умолчанию, видео при hover или на мобилке при scroll)
function CaseStudyMedia({ caseStudy, aspectRatio = '16 / 12', isHovered, isVisible, isMobile, isIOS, canPlayVideo }: { 
  caseStudy: CaseStudyPreview; 
  aspectRatio?: string;
  isHovered?: boolean;
  isVisible?: boolean;
  isMobile?: boolean;
  isIOS?: boolean;
  canPlayVideo: boolean;
}) {
  // Показываем видео если:
  // - НЕ мобильное устройство (экономим трафик)
  // - На десктопе при hover
  // - На мобилке по запросу (tap) — пока скрываем
  const shouldShowVideo = canPlayVideo && caseStudy.coverVideo?.asset?.url && isHovered;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Статичное изображение */}
      {caseStudy.cover?.asset?.url && (
        <img
          src={caseStudy.cover.asset.url}
          alt={caseStudy.cover.alt || caseStudy.title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: shouldShowVideo ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
      
      {/* Видео */}
      {shouldShowVideo && (
        <video
          src={caseStudy.coverVideo.asset.url}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: 0,
            animation: 'fadeInVideo 0.3s ease-in-out forwards',
          }}
          autoPlay={true}
          muted
          loop={true}
          playsInline
          preload="metadata"
        />
      )}
      
      {/* Fallback на placeholder если нет медиа */}
      {!caseStudy.cover?.asset?.url && !caseStudy.coverVideo?.asset?.url && (
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
      )}
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
  order?: number
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

interface LoomVideo {
  _id: string;
  title: string;
  description?: string;
  loomUrl: string;
  embedUrl?: string;
  tags?: string[];
  order?: number;
  isActive?: boolean;
}

export function WorkSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyPreview[]>([]);
  const [loomVideos, setLoomVideos] = useState<LoomVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(true);
  const [hoveredCaseId, setHoveredCaseId] = useState<string | null>(null);
  const [visibleCaseIds, setVisibleCaseIds] = useState<Set<string>>(new Set());
  const { openCaseModal } = useModal();
  const { isFirstLoad, setFirstLoadComplete } = useLoading();

  // Добавляем CSS keyframes для анимации видео
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInVideo {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width > 768);
      setCanPlayVideo(width > 1024); // только десктоп
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Intersection Observer для мобилки
  useEffect(() => {
    if (isLargeScreen) return; // Только для мобилки

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const caseId = entry.target.getAttribute('data-case-id');
          if (caseId) {
            setVisibleCaseIds(prev => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(caseId);
              } else {
                newSet.delete(caseId);
              }
              return newSet;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // 50% видимости для запуска видео
      }
    );

    // Наблюдаем за всеми кейсами
    const caseElements = document.querySelectorAll('[data-case-id]');
    caseElements.forEach(element => observer.observe(element));

    return () => {
      caseElements.forEach(element => observer.unobserve(element));
    };
  }, [isLargeScreen, caseStudies]);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchCaseStudies() {
      try {
        const response = await fetch('/api/case-studies');
        const result = await response.json();
        const data = result.data;
        
        if (!isMounted) return; // Предотвращаем обновление состояния если компонент размонтирован
        
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
            order: 1,
            cover: undefined,
            metrics: [
              { value: '+30%', label: 'Retention' },
              { value: '2x', label: 'Engagement' }
            ]
          };
          setCaseStudies([testCaseStudy]);
        }
        
      } catch (error) {
        if (!isMounted) return;
        
        // Устанавливаем тестовые данные при ошибке
        const testCaseStudy = {
          _id: 'test-case-error',
          title: 'Test Case Study (Error)',
          summary: 'This is a test case study - error occurred while fetching from CMS',
          slug: { current: 'test-case-error' },
          tags: ['ux-ui-design'],
          order: 1,
          cover: undefined,
          metrics: [
            { value: '+30%', label: 'Retention' }
          ]
        };
        setCaseStudies([testCaseStudy]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCaseStudies();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCaseStudyClick = (caseStudy: CaseStudyPreview) => {
    openCaseModal(caseStudy.slug.current);
  };

  // Убираем LoadingScreen - он блокирует новый Hero блок
  useEffect(() => {
    if (isFirstLoad && !loading) {
      setFirstLoadComplete();
    }
  }, [isFirstLoad, loading, setFirstLoadComplete]);

  return (
    <section 
      id="work"
      style={{
        minHeight: '100vh',
        paddingTop: designTokens.spacing.xxxl,     // 80px
        paddingBottom: designTokens.spacing.xxxl,  // 80px
        paddingLeft: designTokens.spacing.m,       // 20px
        paddingRight: designTokens.spacing.m,      // 20px
        backgroundColor: designTokens.colors.grey50,
        borderBottom: `1px solid rgba(0, 0, 0, 0.4)`, // Дивайдер внизу секции
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
          gap: designTokens.spacing.xxxl,  // 80px между заголовком и сеткой
        }}
      >
        {/* Заголовок work. */}
        <h2 style={{
          fontFamily: 'var(--font-funnel-display), sans-serif',
          fontSize: '20px',
          fontWeight: 400,
          lineHeight: '110%',
                          letterSpacing: '-0.03em',
          color: designTokens.colors.black,
          margin: 0,
        }}>
          work.
        </h2>

        {/* Case Studies Grid - First row: 2 large, then rows of 4 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.xxl }}>
          
          {/* First row - 2 large case studies */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isLargeScreen ? '1fr 1fr' : '1fr',
            gap: designTokens.spacing.xl,
          }}>
            {/* First 2 case studies - large */}
            {caseStudies.slice(0, 2).map((caseStudy) => (
              <div
                key={caseStudy._id}
                data-case-id={caseStudy._id}
                onClick={() => handleCaseStudyClick(caseStudy)}
                onMouseEnter={() => setHoveredCaseId(caseStudy._id)}
                onMouseLeave={() => setHoveredCaseId(null)}
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
                  <CaseStudyMedia 
                    caseStudy={caseStudy} 
                    isHovered={hoveredCaseId === caseStudy._id}
                    isVisible={visibleCaseIds.has(caseStudy._id)}
                    isMobile={!isLargeScreen}
                    isIOS={isIOS}
                    canPlayVideo={canPlayVideo}
                  />
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
          </div>

          {/* Remaining rows - 4 case studies per row */}
          {caseStudies.length > 2 && (
            <>
              {Array.from({ length: Math.ceil((caseStudies.length - 2) / 4) }).map((_, rowIndex) => {
                const startIndex = 2 + rowIndex * 4;
                const endIndex = Math.min(startIndex + 4, caseStudies.length);
                const rowCases = caseStudies.slice(startIndex, endIndex);
                
                return (
                  <div key={`row-${rowIndex}`} style={{
                    display: 'grid',
                    gridTemplateColumns: isLargeScreen ? 'repeat(4, 1fr)' : '1fr',
                    gap: designTokens.spacing.xl,
                  }}>
                    {rowCases.map((caseStudy) => (
                                          <div
                      key={caseStudy._id}
                      data-case-id={caseStudy._id}
                      onClick={() => handleCaseStudyClick(caseStudy)}
                      onMouseEnter={() => setHoveredCaseId(caseStudy._id)}
                      onMouseLeave={() => setHoveredCaseId(null)}
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
                                                    <CaseStudyMedia 
                            caseStudy={caseStudy} 
                            isHovered={hoveredCaseId === caseStudy._id}
                            isVisible={visibleCaseIds.has(caseStudy._id)}
                            isMobile={!isLargeScreen}
                            isIOS={isIOS}
                            canPlayVideo={canPlayVideo}
                          />
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