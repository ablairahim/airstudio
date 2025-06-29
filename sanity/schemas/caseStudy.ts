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

    // Summary paragraph (required, shows under covers only)
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: 'Brief description shown under case study covers on the main page',
    }),

    // Cover for Work section (not shown in slug)
    defineField({
      name: 'cover',
      title: 'Cover Image (for Work section)',
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

    // Cover Video - takes priority over image if provided
    defineField({
      name: 'coverVideo',
      title: 'Cover Video (for Work section)',
      type: 'file',
      description: 'Video file (webm/mp4) - will be used instead of cover image if provided',
      options: {
        accept: '.mp4,.webm',
      },
    }),

    // Flexible content blocks - ALL DRAGGABLE!
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // LINK BLOCK - draggable
        {
          type: 'object',
          name: 'linkBlock',
          title: 'Link',
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
          preview: {
            select: {
              text: 'text',
              url: 'url',
            },
            prepare({ text, url }) {
              return {
                title: 'Link',
                subtitle: text ? `${text} → ${url}` : url,
                media: null,
              }
            },
          },
        },

        // FACTS BLOCK - draggable
        {
          type: 'object',
          name: 'factsBlock',
          title: 'Facts',
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
          preview: {
            select: {
              client: 'client',
              year: 'year',
              role: 'role',
            },
            prepare({ client, year, role }) {
              const facts = [client, year, role].filter(Boolean).join(' • ')
              return {
                title: 'Facts',
                subtitle: facts || 'No facts added',
                media: null,
              }
            },
          },
        },

        // LOOM EMBED BLOCK - draggable
        {
          type: 'object',
          name: 'loomBlock',
          title: 'Loom Video',
          fields: [
            {
              name: 'url',
              title: 'Loom Video URL',
              type: 'url',
              description: 'Loom video URL',
            },
          ],
          preview: {
            select: {
              url: 'url',
            },
            prepare({ url }) {
              return {
                title: 'Loom Video',
                subtitle: url,
                media: null,
              }
            },
          },
        },

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
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'heading',
              text: 'text',
            },
            prepare({ title, text }) {
              const plainText = text && text.length > 0 
                ? text[0].children?.map((child: any) => child.text).join('') || ''
                : ''
              return {
                title: title || 'Text Section',
                subtitle: plainText.slice(0, 100) + (plainText.length > 100 ? '...' : ''),
              }
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

        // Videos
        {
          type: 'object',
          name: 'videoBlock',
          title: 'Video (Autoplay)',
          fields: [
            {
              name: 'video',
              title: 'Video File',
              type: 'file',
              description: 'Upload a video file (webm/mp4) that will autoplay on loop',
              options: {
                accept: '.mp4,.webm,.mov',
              },
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Description for accessibility',
            },
            {
              name: 'poster',
              title: 'Poster Image (Optional)',
              type: 'image',
              description: 'Thumbnail image shown before video loads',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'poster',
            },
            prepare({ title, media }) {
              return {
                title: 'Video',
                subtitle: title || 'Autoplay video block',
                media: media || null,
              }
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