import { defineField, defineType } from 'sanity'

export const membreEquipe = defineType({
  name: 'membreEquipe',
  title: 'Membre de l\'équipe',
  type: 'document',
  fields: [
    defineField({
      name: 'prenom',
      title: 'Prénom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'poste',
      title: 'Poste',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'biographie',
      title: 'Biographie courte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'specialites',
      title: 'Spécialités',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex : Cybersécurité, Microsoft 365, Infogérance',
    }),
    defineField({
      name: 'linkedin',
      title: 'URL LinkedIn',
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
      prenom: 'prenom',
      nom: 'nom',
      subtitle: 'poste',
      media: 'photo',
    },
    prepare({ prenom, nom, subtitle, media }) {
      return { title: `${prenom} ${nom}`, subtitle, media }
    },
  },
})
