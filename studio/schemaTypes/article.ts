import { defineField, defineType } from 'sanity'
import { CATEGORIES_BLOG } from '../../src/data/categories'

const CATEGORIES = CATEGORIES_BLOG.map((c) => ({ title: c.label, value: c.id }))

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titre' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: { list: CATEGORIES, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'datePublication',
      title: 'Date de publication',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'auteur',
      title: 'Auteur',
      type: 'string',
    }),
    defineField({
      name: 'tempsLecture',
      title: 'Temps de lecture (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'imageUne',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'extrait',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      description: 'Affiché sur la liste des articles et dans les meta descriptions.',
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
            defineField({ name: 'legende', title: 'Légende', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitre',
      title: 'Titre SEO',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
  ],
  orderings: [
    {
      title: 'Date (plus récent)',
      name: 'dateDesc',
      by: [{ field: 'datePublication', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'datePublication',
      media: 'imageUne',
    },
  },
})
