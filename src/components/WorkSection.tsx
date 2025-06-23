'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { designTokens } from '../lib/design-tokens';
import { client } from '../sanity/lib/client';
import { createClient } from 'next-sanity';
import { useModal } from '../contexts/ModalContext';

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
  // Metrics from callouts for preview
  metrics?: Array<{ value: string; label: string }>
}

export function WorkSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { openCaseModal } = useModal();

  console.log('🎯 WorkSection render - loading:', loading, 'caseStudies:', caseStudies.length);

  // Специальный клиент для разработки (может получать неопубликованный контент)
  const devClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2025-06-17',
    useCdn: false, // Отключаем CDN для получения свежих данных
    perspective: 'previewDrafts', // Получаем черновики
  });

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
        console.log('🔍 Starting to fetch case studies...');
        console.log('🔍 Client config:', { 
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET 
        });
        
        // Сначала простой запрос для проверки подключения
        console.log('🔍 Testing basic connection...');
        const testQuery = `*[_type == "caseStudy"][0..2] { _id, title, _updatedAt }`;
        console.log('🔍 Test query:', testQuery);
        
        const testData = await client.fetch(testQuery);
        console.log('✅ Test query result:', testData);
        
        // Если обычный клиент не находит данные, пробуем devClient для черновиков
        if (!testData || testData.length === 0) {
          console.log('🔍 No published data, trying to fetch drafts...');
          const draftTestData = await devClient.fetch(testQuery);
          console.log('✅ Draft test query result:', draftTestData);
          
          if (draftTestData && draftTestData.length > 0) {
            console.log('✅ Found drafts! Using devClient for full query...');
            
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
                "metrics": content[_type == "metricsCallout"][0].metrics[0..2],
                _updatedAt
              }
            `;
            
            console.log('🔍 Executing draft query:', query);
            const data = await devClient.fetch(query);
            console.log('✅ Fetched draft case studies:', data);
            console.log('📊 Number of draft case studies:', data.length);
            
            if (data.length > 0) {
              console.log('✅ Using draft CMS data');
              setCaseStudies(data);
              return; // Выходим из функции, данные найдены
            }
          }
        }
        
        if (testData && testData.length > 0) {
          console.log('✅ Connection works! Fetching full data...');
          
          // Теперь полный запрос (включая неопубликованные для разработки)
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
              "metrics": content[_type == "metricsCallout"][0].metrics[0..2],
              _updatedAt
            }
          `;
          
          console.log('🔍 Executing full query:', query);
          const data = await client.fetch(query);
          console.log('✅ Fetched case studies:', data);
          console.log('📊 Number of case studies:', data.length);
          
          if (data.length === 0) {
            console.log('⚠️ No case studies found in CMS, using test data');
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
          } else {
            console.log('✅ Using CMS data');
            setCaseStudies(data);
          }
        } else {
          console.log('⚠️ No data from test query, using fallback');
          const testCaseStudy = {
            _id: 'test-case',
            title: 'Test Case Study (No CMS Data)',
            summary: 'This is a test case study - no data found in CMS',
            slug: { current: 'test-case' },
            tags: ['ux-ui-design'],
            cover: undefined,
            metrics: [
              { value: '+30%', label: 'Retention' }
            ]
          };
          setCaseStudies([testCaseStudy]);
        }
        
      } catch (error) {
        console.error('❌ Error fetching case studies:', error);
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
    console.log('🎯 Case study clicked:', caseStudy.slug.current);
    openCaseModal(caseStudy.slug.current);
  };

  if (loading) {
    return (
      <section 
        id="work"
        style={{
          minHeight: '100vh',
          padding: '20px',
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
          <h2 
            style={{
              ...designTokens.textStyles.h1,
              color: designTokens.colors.black,
              textAlign: 'center',
              margin: 0,
            }}
          >
            Works
          </h2>
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
        padding: '20px',
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
          alignItems: 'center',
          gap: designTokens.spacing.l,
        }}
      >
        <h2 
          style={{
            ...designTokens.textStyles.h1,
            color: designTokens.colors.black,
            textAlign: 'center',
            margin: 0,
          }}
        >
          Works
        </h2>

        {/* Grid of case studies - теперь может быть 2-3 колонки */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: isLargeScreen ? 'repeat(auto-fit, minmax(400px, 1fr))' : '1fr',
            gap: designTokens.spacing.l,
            width: '100%',
            maxWidth: '1400px',
          }}
        >
          {caseStudies.map((caseStudy) => (
            <div
              key={caseStudy._id}
              onClick={() => handleCaseStudyClick(caseStudy)}
              style={{
                backgroundColor: designTokens.colors.white,
                borderRadius: designTokens.corners.l,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                width: '100%',
              }}
            >
              {/* Cover Image - flexible aspect ratio */}
              <div style={{
                position: 'relative',
                aspectRatio: '16 / 9',
                backgroundColor: designTokens.colors.grey500,
              }}>
                {/* Tags positioned over cover in top-left */}
                {caseStudy.tags && caseStudy.tags.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: designTokens.spacing.m,
                    left: designTokens.spacing.m,
                    zIndex: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: designTokens.spacing.xs,
                  }}>
                    {caseStudy.tags.slice(0, 2).map((tag, index) => (
                      <CaseStudyTag key={index} tag={tag} />
                    ))}
                  </div>
                )}
                
                {/* Cover image */}
                {caseStudy.cover ? (
                  <Image
                    src={caseStudy.cover.asset.url}
                    alt={caseStudy.cover.alt || caseStudy.title}
                    width={800}
                    height={450}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
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
                    No Cover Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{
                padding: designTokens.spacing.l,
              }}>
                {/* Title - H3 style */}
                <h3 style={{
                  ...designTokens.textStyles.h3,
                  color: designTokens.colors.black,
                  marginBottom: designTokens.spacing.l,
                  lineHeight: '1.2',
                }}>
                  {caseStudy.title}
                </h3>

                {/* Summary - Body1 style */}
                {caseStudy.summary && (
                  <p style={{
                    ...designTokens.textStyles.body1,
                    color: designTokens.colors.grey800,
                    marginBottom: designTokens.spacing.l,
                    lineHeight: '1.4',
                  }}>
                    {caseStudy.summary}
                  </p>
                )}

                {/* Metrics - displayed in a row, Body1 style */}
                {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                  <div style={{
                    display: 'flex',
                    gap: designTokens.spacing.l,
                    flexWrap: 'wrap',
                  }}>
                    {caseStudy.metrics.map((metric, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: designTokens.spacing.xs,
                      }}>
                        <span style={{
                          ...designTokens.textStyles.body1,
                          color: designTokens.colors.black,
                          fontWeight: 600,
                        }}>
                          {metric.value}
                        </span>
                        <span style={{
                          ...designTokens.textStyles.body1,
                          color: designTokens.colors.grey800,
                        }}>
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
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