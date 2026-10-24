/* global console, process, URL */
// Applique la réécriture du blog (dossier final B01 à B12) dans le dataset Sanity.
//
// Depuis le dossier studio/, avec un compte Sanity qui a les droits d'édition :
//   npx sanity login                      (une seule fois, si besoin)
//   npx sanity exec migrations/2026-10-24-blog-dossier-final/appliquer.mjs --with-user-token -- --dry-run
//   npx sanity exec migrations/2026-10-24-blog-dossier-final/appliquer.mjs --with-user-token
//
// Garanties :
// - datePublication, slug et auteur ne sont jamais modifiés (seuls les champs de `set` le sont) ;
// - chaque document n'est modifié que s'il n'a pas changé depuis la préparation (_rev attendu),
//   sinon il est ignoré et signalé (relancer avec --force pour passer outre) ;
// - « dépublier » recopie l'article en brouillon avant de retirer la version publiée :
//   le contenu reste récupérable dans le Studio ;
// - l'historique des documents reste consultable dans le Studio (Historique).

import {readFileSync} from 'node:fs'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})
const DRY = process.argv.includes('--dry-run')
const FORCE = process.argv.includes('--force')
const data = JSON.parse(readFileSync(new URL('./articles.json', import.meta.url), 'utf8'))

const CHAMPS_INTOUCHABLES = ['datePublication', 'slug', 'auteur']

async function verifier(id, expectedRev) {
  const doc = await client.getDocument(id)
  if (!doc) return {ok: false, raison: 'document introuvable'}
  if (doc._rev !== expectedRev && !FORCE)
    return {ok: false, raison: `modifié depuis la préparation (_rev ${doc._rev})`}
  const brouillon = await client.getDocument(`drafts.${id}`)
  if (brouillon && !FORCE)
    return {ok: false, raison: 'un brouillon existe dans le Studio : le publier ou le supprimer avant'}
  return {ok: true, doc}
}

const texteBloc = (b) => (b.children || []).map((c) => c.text).join('')

const tx = client.transaction()
const rapport = []

for (const r of data.reecritures) {
  for (const champ of CHAMPS_INTOUCHABLES)
    if (champ in r.set) throw new Error(`${r.fiche} : le champ ${champ} ne doit pas être modifié`)
  const v = await verifier(r._id, r.expectedRev)
  if (!v.ok) {
    rapport.push(`IGNORÉ  ${r.fiche} (${r._id}) : ${v.raison}`)
    continue
  }
  tx.patch(r._id, (p) => p.ifRevisionId(v.doc._rev).set(r.set))
  rapport.push(
    `RÉÉCRIT ${r.fiche} « ${r.set.titre} » (date conservée : ${v.doc.datePublication}, ${r.set.contenu.length} blocs)`,
  )
}

for (const c of data.corrections) {
  const v = await verifier(c._id, c.expectedRev)
  if (!v.ok) {
    rapport.push(`IGNORÉ  ${c.fiche} : ${v.raison}`)
    continue
  }
  let contenu = v.doc.contenu.filter(
    (b) => !(c.supprimerBlocsContenant || []).some((t) => texteBloc(b).includes(t)),
  )
  contenu = contenu.map((b) => {
    if (b._type !== 'block') return b
    const children = b.children.map((s) => {
      let text = s.text
      for (const [a, z] of c.remplacerTexte || []) text = text.split(a).join(z)
      return {...s, text}
    })
    const markDefs = (b.markDefs || []).map((m) =>
      c.liensRelatifs && typeof m.href === 'string' && m.href.startsWith(c.liensRelatifs)
        ? {...m, href: m.href.slice(c.liensRelatifs.length) || '/'}
        : m,
    )
    return {...b, children, markDefs}
  })
  tx.patch(c._id, (p) => p.ifRevisionId(v.doc._rev).set({contenu}))
  rapport.push(
    `CORRIGÉ ${c.fiche} (${v.doc.contenu.length - contenu.length} bloc(s) retiré(s), date conservée : ${v.doc.datePublication})`,
  )
}

for (const d of data.depublier) {
  const doc = await client.getDocument(d._id)
  if (!doc) {
    rapport.push(`DÉJÀ    dépublié ${d._id}`)
    continue
  }
  const {_rev, _updatedAt, _createdAt, ...reste} = doc
  tx.createIfNotExists({...reste, _id: `drafts.${d._id}`})
  tx.delete(d._id)
  rapport.push(`DÉPUBLIÉ « ${doc.titre} » : ${d.raison} (copie conservée en brouillon)`)
}

console.log(rapport.join('\n'))
if (DRY) {
  console.log('\n--dry-run : rien n’a été envoyé.')
} else {
  const res = await tx.commit({visibility: 'sync'})
  console.log(`\nTransaction ${res.transactionId} : ${res.results.length} opération(s) appliquée(s).`)
}
