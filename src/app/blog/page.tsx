import Link from "next/link";
import { getArticles, type CategorieArticle } from "@/lib/sanity";

const LIBELLES_CATEGORIES: Record<CategorieArticle, string> = {
  cybersecurite: "Cybersécurité",
  infogerance: "Infogérance",
  cloud: "Cloud",
  productivite: "Productivité",
  actualites: "Actualités Trinexta",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-16">
      <header className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Blog
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          Articles publiés depuis Sanity
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600">
          Cette page est une Server Component Next.js. Elle appelle{" "}
          <code>getArticles()</code> dans <code>src/lib/sanity.ts</code>, puis
          affiche la liste sans embarquer la logique GROQ dans l&apos;UI.
        </p>
      </header>

      <section className="space-y-4">
        {articles.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600">
            Aucun article publie n&apos;a ete trouve dans Sanity pour le moment.
          </p>
        ) : (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li
                key={article.slug.current}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
                    {LIBELLES_CATEGORIES[article.categorie]}
                  </span>
                  <span>{article.datePublication}</span>
                  {article.auteur ? <span>Par {article.auteur}</span> : null}
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                    {article.titre}
                  </h2>
                  {article.extrait ? (
                    <p className="max-w-3xl text-base leading-7 text-zinc-600">
                      {article.extrait}
                    </p>
                  ) : null}
                  <Link
                    href={`/blog/${article.slug.current}`}
                    className="inline-flex text-sm font-medium text-zinc-950 underline underline-offset-4"
                  >
                    Lire l&apos;article
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
