import { mentionsLegalesData } from "@/data/mentions-legales"
import { Heading, Text } from "@/components/ui/Typography"

export function MentionsContent() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-10">
        {mentionsLegalesData.sections.map((section, idx) => (
          <div key={idx} className="space-y-4 border-b border-white/5 pb-8 last:border-none last:pb-0">
            <Heading as="h2" className="text-xl md:text-2xl font-bold text-white tracking-tight">
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