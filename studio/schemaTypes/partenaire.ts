import { defineField, defineType } from 'sanity'

const TYPES = [
  { title: 'Partenaire technologique', value: 'editeur' },
  { title: 'Label officiel', value: 'label' },
  { title: 'Certification', value: 'certification' },
]

export const partenaire = defineType({
  name: 'partenaire',
  title: 'Partenaire / Label',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: TYPES, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'isCircle',
      title: 'Affichage en cercle',
      type: 'boolean',
      description: 'Cochez si le logo doit avoir un fond circulaire (ex: OVH, Bitdefender, Sophos).',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2,
      description: 'Affiché sur la page Certifications & partenaires.',
    }),
    defineField({
      name: 'urlOfficiel',
      title: 'URL officiel',
      type: 'url',
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'type',
      media: 'logo',
    },
  },
})