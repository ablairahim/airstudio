import Image from 'next/image'
import Link from 'next/link'
import { CaseStudy, urlFor } from '@/lib/sanity'
import { getTagColors, getTagTitle } from '@/lib/tag-colors'
import { designTokens } from '@/lib/design-tokens'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link 
      href={`/case/${caseStudy.slug.current}`}
      className="block group"
    >
      <div className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {caseStudy.tags.map((tag) => {
            const colors = getTagColors(tag)
            return (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  fontFamily: designTokens.textStyles.tag.fontFamily,
                  fontSize: designTokens.textStyles.tag.fontSize,
                  fontWeight: designTokens.textStyles.tag.fontWeight,
                  letterSpacing: designTokens.textStyles.tag.letterSpacing,
                }}
              >
                {getTagTitle(tag)}
              </span>
            )
          })}
        </div>

        {/* Cover Image */}
        {caseStudy.cover && (
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(caseStudy.cover).width(800).height(450).url()}
              alt={caseStudy.cover.alt || caseStudy.title}
              width={800}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Title */}
        <h3 
          className="group-hover:opacity-70 transition-opacity"
          style={{
            fontFamily: designTokens.textStyles.h3.fontFamily,
            fontSize: designTokens.textStyles.h3.fontSize,
            fontWeight: designTokens.textStyles.h3.fontWeight,
            letterSpacing: designTokens.textStyles.h3.letterSpacing,
            color: designTokens.colors.black,
          }}
        >
          {caseStudy.title}
        </h3>

        {/* Summary */}
        {caseStudy.summary && (
          <p 
            className="opacity-70"
            style={{
              fontFamily: designTokens.textStyles.body1.fontFamily,
              fontSize: designTokens.textStyles.body1.fontSize,
              fontWeight: designTokens.textStyles.body1.fontWeight,
              letterSpacing: designTokens.textStyles.body1.letterSpacing,
              color: designTokens.colors.black,
            }}
          >
            {caseStudy.summary}
          </p>
        )}

        {/* Metrics */}
        {caseStudy.facts && (
          <div 
            className="flex gap-4 opacity-70"
            style={{
              fontFamily: designTokens.textStyles.body1.fontFamily,
              fontSize: designTokens.textStyles.body1.fontSize,
              fontWeight: designTokens.textStyles.body1.fontWeight,
              letterSpacing: designTokens.textStyles.body1.letterSpacing,
              color: designTokens.colors.black,
            }}
          >
            {caseStudy.facts.client && <span>{caseStudy.facts.client}</span>}
            {caseStudy.facts.year && <span>{caseStudy.facts.year}</span>}
            {caseStudy.facts.role && <span>{caseStudy.facts.role}</span>}
          </div>
        )}
      </div>
    </Link>
  )
} 