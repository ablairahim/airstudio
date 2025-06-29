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
        {caseStudy.tags && Array.isArray(caseStudy.tags) && caseStudy.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => {
              const colors = getTagColors(tag)
              return (
                <span
                  key={tag}
                  className="text-sm font-medium"
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
        )}

        {/* Cover Image */}
        {caseStudy.cover && (
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(caseStudy.cover).width(800).height(450).url()}
              alt={caseStudy.cover.alt || caseStudy.title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h3 
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
      </div>
    </Link>
  )
} 