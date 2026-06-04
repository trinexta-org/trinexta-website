import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const dataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'default',
  title: 'trinexta-sanity',

  projectId: '93ztl6y7',
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Articles')
              .child(
                S.list()
                  .title('Articles')
                  .items([
                    S.documentTypeListItem('article').title('Tous les articles'),
                    S.divider(),
                    S.listItem()
                      .title('Articles publiés')
                      .child(
                        S.documentList()
                          .title('Publiés')
                          .filter('_type == "article" && datePublication <= now()')
                          .defaultOrdering([{ field: 'datePublication', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Articles à venir')
                      .child(
                        S.documentList()
                          .title('Programmation')
                          .filter('_type == "article" && datePublication > now()')
                          .defaultOrdering([{ field: 'datePublication', direction: 'asc' }])
                      ),
                  ])
              ),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'article'
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
