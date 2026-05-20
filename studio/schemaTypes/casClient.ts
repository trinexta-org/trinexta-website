import { defineField, defineType } from 'sanity'

const SECTEURS = [
  { title: 'Cabinet professionnel', value: 'cabinet' },
  { title: 'Commerce', value: 'commerce' },
  { title: 'Industrie', value: 'industrie' },
  { title: 'Service', value: 'service' },
  { title: 'Association', value: 'association' },
  { title: 'Santé', value: 'sante' },
]

export const casClient = defineType({
  name: 'casClient',
  title: 'Cas client',
  type: 'document',
  fields: [
    defineField({
      name: 'nomClient',
      title: 'Nom du client',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nomClient' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'secteur',
      title: 'Secteur',
      type: 'string',
      options: { list: SECTEURS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tailleEntreprise',
      title: 'Taille de l\'entreprise',
      type: 'string',
      description: 'Ex : 12 postes, PME 30 salariés',
    }),
    defineField({
      name: 'logo',
      title: 'Logo client',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'photoClient',
      title: 'Photo du dirigeant',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'resumeDefi',
      title: 'Résumé du défi (pour les cartes)',
      type: 'text',
      rows: 2,
      description: 'Une phrase courte affichée sur la liste des cas clients.',
    }),
    defineField({
      name: 'resumeResultat',
      title: 'Résumé du résultat (pour les cartes)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contexte',
      title: 'Contexte',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'defis',
      title: 'Défis identifiés',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'solution',
      title: 'Solution mise en place',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'resultats',
      title: 'Résultats chiffrés',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'kpi',
          fields: [
            defineField({ name: 'indicateur', title: 'Indicateur', type: 'string' }),
            defineField({ name: 'avant', title: 'Avant', type: 'string' }),
            defineField({ name: 'apres', title: 'Après', type: 'string' }),
          ],
          preview: {
            select: { title: 'indicateur', subtitle: 'apres' },
          },
        },
      ],
    }),
    defineField({
      name: 'citationClient',
      title: 'Citation du dirigeant',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'nomDirigeant',
      title: 'Nom du dirigeant',
      type: 'string',
    }),
    defineField({
      name: 'posteDirigeant',
      title: 'Poste du dirigeant',
      type: 'string',
    }),
    defineField({
      name: 'servicesUtilises',
      title: 'Services utilisés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
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
      title: 'nomClient',
      subtitle: 'secteur',
      media: 'logo',
    },
  },
})
