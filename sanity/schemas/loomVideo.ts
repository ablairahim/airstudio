import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'loomVideo',
  title: 'Loom Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'loomUrl',
      title: 'Loom URL',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      }),
      description: 'Full Loom video URL (e.g., https://www.loom.com/share/...)',
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'Loom embed URL (e.g., https://www.loom.com/embed/...)',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'UX/UI Design', value: 'ux-ui-design' },
            { title: 'Product Design', value: 'product-design' },
            { title: 'Branding', value: 'branding' },
            { title: 'Web Development', value: 'web-development' },
            { title: 'Mobile App', value: 'mobile-app' },
            { title: 'Prototype', value: 'prototype' },
            { title: 'Research', value: 'research' },
            { title: 'Strategy', value: 'strategy' },
            { title: 'Presentation', value: 'presentation' },
            { title: 'Process', value: 'process' },
          ]
        }
      }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the grid',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this video on the website',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title,
        subtitle: description,
      }
    },
  },
  
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
  ],
}) 