import { defineField, defineType } from 'sanity'

export const temoignage = defineType({
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom complet',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'poste',
      title: 'Poste / Fonction',
      type: 'string',
    }),
    defineField({
      name: 'entreprise',
      title: 'Entreprise',
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
      name: 'texte',
      title: 'Témoignage',
      type: 'text',
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note (sur 5)',
      type: 'number',
      options: {
        list: [
          { title: '5 étoiles', value: 5 },
          { title: '4 étoiles', value: 4 },
          { title: '3 étoiles', value: 3 },
        ],
        layout: 'radio',
      },
      initialValue: 5,
    }),
    defineField({
      name: 'serviceAssocie',
      title: 'Service associé',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Optionnel - lie ce témoignage à un service spécifique.',
    }),
    defineField({
      name: 'enAvant',
      title: 'Mettre en avant',
      type: 'boolean',
      description: 'Afficher sur la page d\'accueil.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'entreprise',
      media: 'photo',
    },
  },
})
