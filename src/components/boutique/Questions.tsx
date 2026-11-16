import { JsonLd } from "@/components/seo/JsonLd"
import { faqJsonLd } from "@/lib/boutique/seo"

/** Questions fréquentes repliables, avec leur FAQPage. */
export function Questions({ titre, questions }: { titre: string; questions: readonly { question: string; reponse: string }[] }) {
  if (!questions.length) return null
  return (
    <div className="flex flex-col gap-4">
      <JsonLd data={faqJsonLd(questions)} />
      <h2 className="text-2xl font-black text-primary">{titre}</h2>
      <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-white">
        {questions.map((q) => (
          <details key={q.question} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-bold text-primary marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {q.question}
                <span aria-hidden="true" className="text-secondary-strong transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{q.reponse}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
