import { defineType, defineField } from 'sanity'

export const stickyScroll = defineType({
  name: 'stickyScroll',
  title: 'Défilement Dynamique (Images/Textes)',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Blocs de contenu',
      description: 'Ajoutez les paragraphes et les images qui apparaîtront au défilement.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Paire Texte/Image',
          fields: [
            defineField({
              name: 'texte',
              title: 'Paragraphe',
              type: 'text',
              validation: (rule) => rule.required().max(400),
              description: 'Le texte qui s\'affichera à côté de l\'image (gardez-le concis pour un bel effet).'
            }),
            defineField({
              name: 'image',
              title: 'Image associée',
              type: 'image',
              options: {
                hotspot: true, 
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Texte alternatif de l\'image (SEO)',
              type: 'string',
            })
          ],
          preview: {
            select: {
              title: 'texte',
              media: 'image',
            },
            prepare(selection) {
              const { title, media } = selection
              return {
                title: title ? `${title.substring(0, 30)}...` : 'Nouveau bloc',
                media: media,
              }
            }
          }
        }
      ]
    })
  ]
})