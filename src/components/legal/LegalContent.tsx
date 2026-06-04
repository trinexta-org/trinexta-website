import { Heading, Text } from "@/components/ui/Typography"
import type { LegalData } from "@/data/mentions-legales"

interface LegalContentProps {
  data: LegalData
}

export function LegalContent({ data }: LegalContentProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Heading as="h1" className="text-4xl md:text-5xl font-extrabold text-white mb-12">
        {data.hero.title}
      </Heading>
      <div className="space-y-10">
        {data.sections.map((section, idx) => (
          <div key={idx} className="space-y-4 border-b border-white/5 pb-8 last:border-none last:pb-0">
            <Heading as="h2" className="text-xl md:text-2xl font-bold text-white tracking-normal">
              {section.title}
            </Heading>
            <div className="space-y-3">
              {section.paragraphs.map((paragraph, pIdx) => (
                <Text key={pIdx} className="text-sm md:text-base text-white/70 leading-relaxed">
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}