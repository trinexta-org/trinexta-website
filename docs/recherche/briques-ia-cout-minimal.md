# Briques IA a cout de construction minimal

Recherche pour l'issue #264 (rattachee a #260). Etat des sources : aout 2026.
Toutes les valeurs ci-dessous viennent de sources primaires (doc officielle, page de tarifs
first-party, registre npm, code source). Chaque affirmation porte sa source.

Question : quelles briques deja existantes assembler pour livrer un assistant documentaire
ou un agent metier sur la stack du projet (Next.js 16 App Router, TypeScript strict,
PostgreSQL 17 + Prisma 7, VPS OVH, PM2 + Nginx), en minimisant le cout de **construction**.
Le cout d'execution par requete est negligeable a notre echelle et n'est pas le critere d'arbitrage.

Deux contraintes de conception imposees, respectees dans toute la recommandation :

1. **Un seul point d'appel IA dans le code.** Aucun composant, aucune route ne parle
   directement a un fournisseur. Tout passe par `src/lib/ai/`.
2. **Le texte source reste en base, l'index vectoriel est versionne par (modele, dimension).**
   Changer de fournisseur d'embeddings doit se faire par une reindexation locale, jamais en
   redemandant leurs documents aux clients.

---

## 1. Etat de l'art verifie

### 1.1 AI SDK de Vercel

La version courante du paquet `ai` est **7.0.58** ; la documentation affiche
« v7 (Latest) » et « AI SDK 7.x »
([ai-sdk.dev/docs/introduction](https://ai-sdk.dev/docs/introduction), version npm verifiee
via `npm view ai version`).

Paquets et versions relevees le meme jour :

| Paquet | Version |
|---|---|
| `ai` | 7.0.58 |
| `@ai-sdk/mistral` | 4.0.27 |
| `@ai-sdk/openai-compatible` | 3.0.28 |
| `@ai-sdk/react` | 4.0.61 |
| `@ai-sdk/provider` | 4.0.7 |

API reellement exposee (verifiee dans la doc, pas de memoire) :

- Generation : `generateText`, `streamText` depuis `ai`
  ([introduction](https://ai-sdk.dev/docs/introduction)).
- Outils : `tool({ description, inputSchema, execute })`. La doc precise les trois proprietes :
  « **`description`**: An optional description of the tool [...] **`inputSchema`**: A Zod schema
  or a JSON schema that defines the input required for the tool to run [...] **`execute`**:
  An optional async function ». Noter le nom **`inputSchema`** (et non `parameters`)
  ([ai-sdk.dev/docs/foundations/tools](https://ai-sdk.dev/docs/foundations/tools)).
- Sortie structuree : `generateObject`, et le reglage `output` sur `generateText` / `streamText`
  (« You can also use schemas for structured output generation with `generateText` and
  `streamText` using the `output` setting », meme page).
- Embeddings : `embed`, `embedMany`, plus l'aide `cosineSimilarity`, tous exportes par `ai`
  ([ai-sdk.dev/docs/ai-sdk-core/embeddings](https://ai-sdk.dev/docs/ai-sdk-core/embeddings)) :

  ```ts
  import { embedMany } from 'ai';

  const { embeddings } = await embedMany({
    model: 'openai/text-embedding-3-small',
    values: ['sunny day at the beach', 'rainy afternoon in the city'],
  });
  ```

Point decisif pour la contrainte (1) : l'AI SDK abstrait le fournisseur derriere une interface
unique, et `@ai-sdk/openai-compatible` permet de brancher n'importe quel endpoint compatible
OpenAI sans ecrire de client HTTP :

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const provider = createOpenAICompatible({
  name: 'providerName',
  apiKey: process.env.PROVIDER_API_KEY,
  baseURL: 'https://api.provider.com/v1',
  includeUsage: true,
});
```

Le meme provider expose `provider.embeddingModel('...')` pour les embeddings et supporte le
tool calling et les sorties structurees
([ai-sdk.dev/providers/openai-compatible-providers](https://ai-sdk.dev/providers/openai-compatible-providers)).

Le provider Mistral dedie couvre modeles de langage, embeddings, speech et transcription,
avec tool calling (« Some Mistral chat models support tool calls », option `parallelToolCalls`),
sorties structurees par JSON Schema, et fabrique `.embedding()` :
`mistral.embedding('mistral-embed')`, dimension par defaut **1024**
([ai-sdk.dev/providers/ai-sdk-providers/mistral](https://ai-sdk.dev/providers/ai-sdk-providers/mistral)).

### 1.2 Stockage vectoriel : pgvector sur le PostgreSQL existant

pgvector est en **0.8.6**, supporte « Postgres 13+ », donc PostgreSQL 17
([github.com/pgvector/pgvector](https://github.com/pgvector/pgvector)). Installation sur le VPS
par paquet systeme :

```sh
sudo apt install postgresql-17-pgvector
```

(la doc donne `postgresql-18-pgvector` avec la consigne « Replace `18` with your Postgres version »,
[README pgvector](https://raw.githubusercontent.com/pgvector/pgvector/master/README.md)).

Limites a connaitre, citees mot pour mot du README :

- HNSW et IVFFlat : « Supported types are: `vector` - up to 2,000 dimensions » et
  « `halfvec` - up to 4,000 dimensions ».
- Types maximaux hors index : vecteur jusqu'a 16 000 dimensions.
- Operateurs de distance : `<->` (L2), `<#>` (produit interne negatif), `<=>` (cosinus),
  `<+>` (L1), `<~>` (Hamming), `<%>` (Jaccard).
- Index cosinus :
  ```sql
  CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);
  ```

Consequence pratique : `mistral-embed` (1024 dim) et `bge-m3` (1024 dim) passent en `vector`
indexable directement. `qwen3-embedding-8b` (4096 dim natif) impose `halfvec` ou une reduction
de dimension. C'est exactement pourquoi l'index doit etre versionne par **(modele, dimension)**.

**Compatibilite Prisma 7.** Prisma ne connait pas le type `vector` : il faut le declarer en
`Unsupported` et passer par `$queryRaw` / `$executeRaw`. La doc officielle donne le motif
d'installation d'extension : creer une migration vide avec `--create-only`, y ecrire
`CREATE EXTENSION IF NOT EXISTS ...;`, puis deployer
([prisma.io/docs/orm/prisma-schema/postgresql-extensions](https://www.prisma.io/docs/orm/prisma-schema/postgresql-extensions)).
Le flag `postgresqlExtensions` n'apparait plus dans la liste des preview features de Prisma 7
(la liste courante est `views`, `relationJoins`, `nativeDistinct`, `typedSql`,
`strictUndefinedChecks`, `fullTextSearchPostgres`, `shardKeys`, `partialIndexes` -
[reference preview features](https://www.prisma.io/docs/orm/reference/preview-features/client-preview-features)) :
la voie migration SQL manuelle est desormais la seule.

**Risque identifie et non resolu** : l'issue
[prisma/prisma#28867](https://github.com/prisma/prisma/issues/28867) signale qu'a partir de
Prisma 7.1.0 une colonne `Unsupported("vector")` declenche une fausse detection de derive
(« Drift detected [...] Altered column `embedding` (type changed) ») alors que la colonne est
bien `vector(384)` en base. Regression par rapport a 6.16.3, ouverte depuis le 5 decembre 2025,
labellisee « unconfirmed / tracked ». Le projet est en Prisma 7.8.0 : a verifier par un spike
avant de s'engager.

**Parade retenue si le bug persiste** : ne pas mettre du tout la colonne vectorielle dans le
perimetre Prisma. Les tables d'index vivent dans un schema PostgreSQL dedie (`ai`) non liste
dans le `datasource`, gerees par migrations SQL brutes, et interrogees en `$queryRaw`.
Le texte source, lui, reste dans des tables Prisma normales du schema `public`. Cette
separation sert aussi la contrainte (2) : on peut supprimer et reconstruire tout le schema `ai`
sans jamais toucher aux documents des clients.

**Service dedie (Qdrant, Pinecone, pgvector manage, index Sanity).** Ecarte. Un service en
plus, c'est un secret en plus, un backup en plus, une latence reseau en plus et une
synchronisation a ecrire entre deux sources de verite. Postgres 17 est deja provisionne,
sauvegarde et supervise sur le VPS ; a notre volumetrie (quelques milliers a quelques dizaines
de milliers de chunks par client) une recherche HNSW dans Postgres est largement suffisante.
Le seul argument valable pour un service dedie serait un volume ou une charge que nous
n'avons pas. Note : Sanity expose bien des index d'embeddings, mais ils indexent le contenu
du CMS, pas les documents deposes par les clients ; hors sujet ici.

### 1.3 Ingestion et decoupage documentaire

Rien a ecrire soi-meme, tout existe en TypeScript. Versions npm relevees :

| Besoin | Paquet | Version |
|---|---|---|
| PDF texte | `unpdf` | 1.8.0 |
| PDF texte (alternative) | `pdf-parse` | 2.4.5 |
| Word `.docx` | `mammoth` | 1.12.1 |
| Bureautique generaliste (docx, xlsx, pptx, pdf) | `officeparser` | 7.5.1 |
| Mails `.eml` | `mailparser` | 3.9.15 |
| Decoupage | `@langchain/textsplitters` | 1.0.1 |
| Comptage de tokens | `js-tiktoken` | 1.0.21 |

`@langchain/textsplitters` est un paquet autonome : il apporte `RecursiveCharacterTextSplitter`
sans tirer tout `langchain` (1.5.5) ni `llamaindex` (0.12.1). C'est le bon niveau de dependance :
on veut un decoupeur, pas un framework d'orchestration qui imposerait sa propre couche d'appel
aux modeles et casserait la contrainte (1).

**PDF scannes.** L'extraction texte echoue sur un PDF image. Deux options :

- `Mistral OCR 4` : **4 $ / 1000 pages**, et `Document AI` a **5 $ / 1000 pages**
  ([mistral.ai/pricing/api](https://mistral.ai/pricing/api/)).
- **Docling** (LF AI & Data, ex-IBM Research Zurich, licence MIT) convertit PDF, DOCX, PPTX,
  XLSX, HTML, EPUB, images, EML/MSG, et se deploie en service via `docling-serve`
  ([github.com/docling-project/docling](https://github.com/docling-project/docling)).
  Excellent outil, mais Python : c'est un second runtime a installer et superviser sous PM2.
  A garder en reserve, pas en v1.

Recommandation v1 : extraction TypeScript pure, detection des PDF sans couche texte, et
bascule vers l'OCR Mistral a la demande. Le cout d'un lot de 1000 pages scannees reste sous
5 $, donc non structurant.

### 1.4 Fournisseurs de modeles heberges en Europe

Tarifs releves sur les pages de tarifs first-party en aout 2026. Attention aux devises :
Scaleway et OVHcloud publient en euros, Mistral en dollars.

**Scaleway Generative APIs** ([pricing model-as-a-service](https://www.scaleway.com/en/pricing/model-as-a-service/)),
prix par million de tokens, entree / sortie :

| Modele | Entree | Sortie |
|---|---|---|
| glm-5.2 | 1,80 € | 5,50 € |
| mistral-medium-3.5-128b | 1,50 € | 7,50 € |
| qwen3-235b-a22b-instruct-2507 | 0,75 € | 2,25 € |
| qwen3.5-397b-a17b | 0,60 € | 3,60 € |
| qwen3.6-35b-a3b | 0,25 € | 1,50 € |
| gemma-4-26b-a4b-it | 0,25 € | 0,50 € |
| gpt-oss-120b | 0,15 € | 0,60 € |
| mistral-small-3.2-24b-instruct-2506 | 0,15 € | 0,35 € |
| qwen3-embedding-8b (embeddings) | 0,10 € | gratuit |
| bge-multilingual-gemma2 (embeddings) | 0,10 € | gratuit |
| whisper-large-v3 | 0,003 € / minute audio | gratuit |

Palier gratuit : 1 million de tokens et 60 minutes de transcription offerts. Facturation au
pas de 1000 tokens. Remise de 50 % sur l'API Batch
([doc couts](https://www.scaleway.com/en/docs/generative-apis/reference-content/cost-estimator/)).
Endpoint compatible OpenAI, base `https://api.scaleway.ai/v1`, presente comme « drop-in
replacement » ([quickstart](https://www.scaleway.com/en/docs/generative-apis/quickstart/)).
Function calling et structured outputs sont documentes comme fonctionnalites de premier plan
([use-function-calling](https://www.scaleway.com/en/docs/generative-apis/how-to/use-function-calling/),
[use-structured-outputs](https://www.scaleway.com/en/docs/generative-apis/how-to/use-structured-outputs/)).
Hebergement en centres de donnees europeens
([generative-apis](https://www.scaleway.com/en/generative-apis/)).

**OVHcloud AI Endpoints** ([catalogue](https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/)),
prix par million de tokens, entree / sortie :

| Modele | Entree | Sortie | Tool calling |
|---|---|---|---|
| gpt-oss-20b | 0,04 € | 0,15 € | oui (+ reasoning) |
| gpt-oss-120b | 0,08 € | 0,40 € | oui (+ reasoning) |
| Qwen3.5-9B | 0,10 € | 0,15 € | oui |
| Qwen3.6-27B | 0,40 € | 2,70 € | oui, multimodal |
| Qwen3.5-397B-A17B | 0,60 € | 3,60 € | oui |
| Meta-Llama-3.3-70B-Instruct | 0,67 € | 0,67 € | oui |
| Qwen2.5-VL-72B-Instruct | 0,91 € | 0,91 € | multimodal |
| bge-m3 (embeddings) | 0,01 € | - | - |
| bge-multilingual-gemma2 (embeddings) | 0,01 € | - | - |
| Qwen3-Embedding-8B (embeddings) | 0,10 € | - | - |

API compatible OpenAI (« our LLM APIs are compatible with the OpenAI specifications »),
base `https://oai.endpoints.kepler.ai.cloud.ovh.net/v1`, authentification par cle d'API generee
depuis le panneau Public Cloud, 400 requetes/minute par projet et par modele, et la doc affirme
« we do not store user data »
([getting started](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-getting-started)).
A noter : les cles issues d'un projet en mode Discovery (sans moyen de paiement) ne peuvent pas
utiliser le service. Pas de palier gratuit.

**Mistral (API directe)** ([mistral.ai/pricing/api](https://mistral.ai/pricing/api/)),
prix par million de tokens en dollars :

| Modele | Entree | Sortie |
|---|---|---|
| Mistral Medium 3.5 | 1,5 $ | 7,5 $ |
| Mistral Large 3 | 0,5 $ | 1,5 $ |
| Mistral Small 4 | 0,15 $ | 0,6 $ |
| Magistral Medium (raisonnement) | 2 $ | 5 $ |
| Magistral Small (raisonnement) | 0,5 $ | 1,5 $ |
| Ministral 3 - 3B | 0,1 $ | 0,1 $ |
| Ministral 3 - 8B | 0,15 $ | 0,15 $ |
| Ministral 3 - 14B | 0,2 $ | 0,2 $ |
| Mistral Embed | 0,1 $ | - |
| Codestral Embed | 0,15 $ | - |
| OCR 4 | 4 $ / 1000 pages | - |
| Document AI | 5 $ / 1000 pages | - |

Remise de 90 % sur les tokens d'entree mis en cache, et 50 % sur le traitement par lots.

**Lecture de ces trois grilles.** Les ecarts de prix sont reels mais ne pesent rien a notre
echelle : indexer 10 000 pages, soit environ 5 millions de tokens, coute de l'ordre de 0,05 €
chez OVHcloud avec `bge-m3` et 0,50 € chez Scaleway ou Mistral. Le critere d'arbitrage est
ailleurs : maturite du tool calling, qualite en francais, et facilite de changer d'avis.
D'ou l'index versionne.

Argument commercial a ne pas negliger : OVHcloud et Scaleway sont des acteurs francais, ce qui
se plaide bien aupres de PME d'Ile-de-France sensibles a la localisation des donnees, cible
declaree du projet.

### 1.5 Solutions open source auto-hebergeables

| Piste | Verdict |
|---|---|
| Ollama / vLLM sur le VPS | Ecarte. Le VPS OVH heberge Next.js, PostgreSQL et PM2 sans GPU. Faire tourner un LLM utile en CPU sur cette machine degraderait le site en production pour un gain nul, puisque l'inference distante coute quelques euros. |
| Embeddings locaux CPU (`@huggingface/transformers` 4.2.0, `fastembed` 2.1.0, modele bge-m3) | Techniquement viable et gratuit : les embeddings sont beaucoup plus legers qu'une generation. Mais ils partagent la RAM et le CPU du process Next.js, et ajoutent un telechargement de modele au deploiement. A garder comme plan de repli hors ligne, pas comme defaut. |
| Docling / `docling-serve` (MIT) | Pertinent, mais second runtime Python. A introduire seulement si l'extraction TypeScript se revele insuffisante sur des documents reels. |
| RAGFlow, Dify, Open WebUI, Onyx | Ecartes. Ce sont des produits complets, pas des briques : ils apportent leur propre base, leur propre UI et leur propre orchestrateur. Les integrer signifie exploiter une seconde application en production et abandonner la contrainte (1), puisque les appels aux modeles se feraient depuis leur moteur et non depuis notre code. Le gain de temps apparent se paie en couplage. |
| `langchain` / `llamaindex` complets | Ecartes comme framework. On garde uniquement `@langchain/textsplitters`. |

---

## 2. Tableau brique / role / cout / effort

Le cout indique est le cout recurrent reel ; l'effort est l'effort d'integration dans ce projet,
en jours-homme.

| Brique | Role | Cout | Effort |
|---|---|---|---|
| `ai` 7.0.58 (AI SDK) | Couche unique d'appel : `generateText`, `streamText`, `generateObject`, `embed`, `embedMany`, `tool` | Gratuit, MIT | 0,5 j |
| `@ai-sdk/mistral` 4.0.27 | Provider Mistral (chat, embeddings, sorties structurees, tool calling) | Gratuit | 0,25 j |
| `@ai-sdk/openai-compatible` 3.0.28 | Provider generique pour Scaleway et OVHcloud AI Endpoints | Gratuit | 0,25 j |
| `@ai-sdk/react` 4.0.61 | Hook de chat cote client (streaming) | Gratuit | 0,5 j |
| PostgreSQL 17 + pgvector 0.8.6 | Stockage des vecteurs et recherche HNSW cosinus | Deja paye (VPS) | 1 j |
| Prisma 7.8 + `$queryRaw` | Acces au texte source et aux vecteurs | Deja en place | 0,5 j (+ 0,5 j de spike sur #28867) |
| Schema SQL `ai` + migrations manuelles | Index versionne par (modele, dimension), reconstructible | 0 | 0,5 j |
| `unpdf` 1.8.0 | Extraction PDF texte | Gratuit | 0,25 j |
| `mammoth` 1.12.1 | Extraction `.docx` | Gratuit | 0,25 j |
| `mailparser` 3.9.15 | Extraction `.eml` | Gratuit | 0,25 j |
| `@langchain/textsplitters` 1.0.1 | Decoupage recursif en chunks | Gratuit | 0,25 j |
| Embeddings distants (bge-m3 OVH 0,01 €/M, mistral-embed 0,1 $/M, qwen3-embedding-8b Scaleway 0,10 €/M) | Vectorisation des chunks | Environ 0,05 a 0,50 € pour 10 000 pages | inclus |
| Generation distante (Mistral Small 4 a 0,15/0,6 $, gpt-oss-120b OVH a 0,08/0,40 €, mistral-medium-3.5 Scaleway a 1,50/7,50 €) | Reponse et raisonnement | Quelques euros par mois a notre volume | inclus |
| Mistral OCR 4 (optionnel) | PDF scannes | 4 $ / 1000 pages | 0,5 j |
| Docling / `docling-serve` (optionnel) | Extraction avancee multiformat | Gratuit, MIT, mais runtime Python | 1,5 j |
| Ollama / vLLM auto-heberge | Inference locale | Gratuit en licence, mais GPU absent du VPS | ecarte |
| RAGFlow / Dify / Open WebUI | Produit RAG cle en main | Gratuit en licence, cout d'exploitation reel | ecarte |
| Qdrant / Pinecone / vectoriel manage | Index dedie | Abonnement en plus | ecarte |

---

## 3. Recommandation : stack minimale

### 3.1 Composition

- **Appel modeles** : `ai` 7.0.58, avec `@ai-sdk/mistral` et `@ai-sdk/openai-compatible`.
- **Fournisseur par defaut** : OVHcloud AI Endpoints pour les embeddings (`bge-m3`, 1024 dim,
  0,01 €/M, indexable en `vector` sans passer par `halfvec`), Mistral ou Scaleway pour la
  generation selon la qualite constatee en francais. Les trois sont interchangeables, c'est le
  point.
- **Stockage** : PostgreSQL 17 existant + pgvector 0.8.6, index HNSW cosinus.
- **Ingestion** : `unpdf`, `mammoth`, `mailparser`, decoupage par `@langchain/textsplitters`.
- **UI** : route App Router en streaming + `@ai-sdk/react`.

### 3.2 Point d'appel unique

Tout vit dans `src/lib/ai/`, en coherence avec l'organisation existante (`src/lib/db`,
`src/lib/audit-seo`, `src/lib/estimation`) :

```
src/lib/ai/
  index.ts        # seule surface publique : ask(), ingest(), reindex()
  providers.ts    # registre des providers, lecture des variables d'environnement
  models.ts       # alias metier -> (fournisseur, modele, dimension)
  embed.ts        # embedMany + ecriture dans l'index versionne
  retrieve.ts     # recherche pgvector en $queryRaw
  chunk.ts        # extraction + decoupage
```

Aucun composant, aucune route, aucun script n'importe `@ai-sdk/*` directement. Une regle ESLint
`no-restricted-imports` sur `@ai-sdk/*` et `ai` hors de `src/lib/ai/` rend la contrainte
verifiable automatiquement plutot que declarative. Changer de fournisseur devient une edition de
`models.ts` et d'une variable d'environnement.

### 3.3 Modele de donnees et versionnement de l'index

Schema `public`, gere par Prisma, jamais reconstruit :

- `Document` : metadonnees, client, fichier d'origine, hash.
- `DocumentChunk` : **le texte du chunk**, sa position, son document parent.

Schema `ai`, gere par migrations SQL brutes, entierement reconstructible :

- `chunk_embedding(chunk_id, index_version, embedding vector(1024))`, index HNSW cosinus,
  cle unique `(chunk_id, index_version)`.
- `embedding_index(version, provider, model, dimension, status, created_at)`.

Changer de modele d'embeddings, c'est inserer une ligne dans `embedding_index`, lancer la
reindexation depuis `DocumentChunk.text`, puis basculer la version active. Les deux index
coexistent pendant la bascule, aucun document client n'est redemande, et le rollback consiste a
repointer la version precedente. Le choix du schema separe repond aussi au risque
[prisma/prisma#28867](https://github.com/prisma/prisma/issues/28867) : le type `vector` ne
figure jamais dans `schema.prisma`, donc aucune fausse derive possible.

### 3.4 Chiffrage en jours de developpement

| Lot | Contenu | Jours |
|---|---|---|
| 1 | Couche `src/lib/ai/`, registre de providers, variables d'environnement, regle ESLint, test de fumee sur les trois fournisseurs | 1,0 |
| 2 | pgvector sur le VPS, schema `ai`, migrations SQL, index HNSW, spike de validation Prisma 7.8 | 1,5 |
| 3 | Ingestion : depot de fichier, extraction PDF/DOCX/EML, decoupage, `embedMany`, ecriture de l'index | 2,0 |
| 4 | Recherche et reponse : requete pgvector, construction du prompt, `streamText`, citations des sources | 1,5 |
| 5 | Interface : route App Router, composant de chat, etats de chargement et d'erreur | 1,5 |
| 6 | Reindexation versionnee : script CLI de reconstruction par (modele, dimension), bascule et rollback | 0,5 |
| 7 | Garde-fous : quotas par client, journalisation des appels et du cout, tests | 1,0 |
| **Total** | **Assistant documentaire fonctionnel** | **9,0 jours** |

Options chiffrees a part :

| Option | Jours |
|---|---|
| OCR des PDF scannes via Mistral OCR 4 | 0,5 |
| Agent metier : outils `tool()` branches sur Prisma et Sanity, sorties structurees | 2,0 |
| Extraction avancee via `docling-serve` (runtime Python sous PM2) | 1,5 |

Soit environ **deux semaines de developpement** pour la version documentaire seule, et
**trois semaines** avec l'agent metier outille.

### 3.5 Ce que coute l'execution

Pour fixer l'ordre de grandeur et confirmer que le sujet n'est pas la : indexer 10 000 pages
represente environ 5 millions de tokens, soit **0,05 €** avec `bge-m3` chez OVHcloud ou
**0,50 €** avec `mistral-embed`. Mille questions par mois avec un contexte de 4 000 tokens et
500 tokens de reponse coutent environ **0,6 €** avec `gpt-oss-120b` chez OVHcloud. La
reindexation complete lors d'un changement de fournisseur coute le prix d'une indexation, donc
moins d'un euro. Le budget est integralement dans les jours-homme.

---

## 4. Points a trancher avant de commencer

1. **Spike Prisma (0,5 j).** Reproduire l'issue #28867 sur Prisma 7.8.0. Si elle est corrigee,
   la separation en schema `ai` reste souhaitable mais devient un choix d'architecture plutot
   qu'un contournement.
2. **Fournisseur d'embeddings par defaut.** `bge-m3` (1024 dim, OVHcloud, 0,01 €/M) contre
   `mistral-embed` (1024 dim, 0,1 $/M). A departager sur un jeu de questions reelles en francais,
   pas sur le prix. Les deux tiennent sous la limite de 2000 dimensions de l'index HNSW.
3. **Traitement des PDF scannes.** Decider si l'OCR entre dans la v1 ou si l'on se contente de
   rejeter proprement les documents sans couche texte.
4. **Retention et effacement.** Le texte source reste en base par conception ; il faut donc une
   politique d'effacement par client, coherente avec le DPA deja publie sur le site.
