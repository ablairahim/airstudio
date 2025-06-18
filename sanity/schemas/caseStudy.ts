import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    // Slug for URL
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Tags with predefined options and colors
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'UX/UI Design', value: 'ux-ui-design' },
              { title: 'Experiment', value: 'experiment' },
              { title: 'Motion Design', value: 'motion-design' },
              { title: 'Full Cycle', value: 'full-cycle' },
              { title: 'AI', value: 'ai' },
              { title: 'Product Systems', value: 'product-systems' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Summary paragraph
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),

    // Cover for Work section (not shown in slug)
    defineField({
      name: 'cover',
      title: 'Cover (for Work section)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),

    // Link with custom text
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Link Text',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    }),

    // Facts: Client, Year, Role
    defineField({
      name: 'facts',
      title: 'Facts',
      type: 'object',
      fields: [
        {
          name: 'client',
          title: 'Client',
          type: 'string',
        },
        {
          name: 'year',
          title: 'Year',
          type: 'string',
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
        },
      ],
    }),

    // Loom embed
    defineField({
      name: 'loomEmbed',
      title: 'Loom Embed',
      type: 'url',
      description: 'Loom video URL',
    }),

    // Flexible content blocks - ВСЕ INLINE!
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // METRICS CALLOUT - inline
        {
          type: 'object',
          name: 'metricsCallout',
          title: 'Metrics',
          fields: [
            {
              name: 'title',
              title: 'Title (for reference)',
              type: 'string',
            },
            {
              name: 'metrics',
              title: 'Metrics (max 3)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'value',
                      title: 'Value (e.g. +30%)',
                      type: 'string',
                    },
                    {
                      name: 'label',
                      title: 'Label (e.g. Retention)',
                      type: 'string',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'value',
                      subtitle: 'label',
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.max(3),
            },
          ],
          preview: {
            select: {
              title: 'title',
              metrics: 'metrics',
            },
            prepare({ title, metrics }) {
              return {
                title: title || 'Metrics',
                subtitle: metrics ? `${metrics.length} metrics` : 'No metrics',
                media: null,
              }
            },
          },
        },

        // PROMPT CALLOUT - inline
        {
          type: 'object',
          name: 'promptCallout',
          title: 'Prompt',
          fields: [
            {
              name: 'title',
              title: 'Title (for reference)',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Prompt Text',
              type: 'text',
              rows: 4,
            },
          ],
          preview: {
            select: {
              title: 'title',
              text: 'text',
            },
            prepare({ title, text }) {
              return {
                title: title || 'Prompt',
                subtitle: text,
                media: null,
              }
            },
          },
        },

        // QUOTE CALLOUT - inline
        {
          type: 'object',
          name: 'quoteCallout',
          title: 'Quote',
          fields: [
            {
              name: 'title',
              title: 'Title (for reference)',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Quote Text',
              type: 'text',
              rows: 4,
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
            {
              name: 'authorTitle',
              title: 'Author Title',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              text: 'text',
              author: 'author',
            },
            prepare({ title, text, author }) {
              return {
                title: title || 'Quote',
                subtitle: author ? `${text} - ${author}` : text,
                media: null,
              }
            },
          },
        },

        // TESTIMONIAL CALLOUT - inline
        {
          type: 'object',
          name: 'testimonialCallout',
          title: 'Testimonial',
          fields: [
            {
              name: 'title',
              title: 'Title (for reference)',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Testimonial Text',
              type: 'text',
              rows: 4,
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
            {
              name: 'authorTitle',
              title: 'Author Title',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              text: 'text',
              author: 'author',
            },
            prepare({ title, text, author }) {
              return {
                title: title || 'Testimonial',
                subtitle: author ? `${text} - ${author}` : text,
                media: null,
              }
            },
          },
        },

        // Text sections (H1 + paragraph)
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
            },
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'text',
            },
          },
        },

        // Images
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
              ],
            },
          ],
          preview: {
            select: {
              media: 'image',
              title: 'image.alt',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'cover',
    },
  },
}) 