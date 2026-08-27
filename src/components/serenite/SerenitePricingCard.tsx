import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"

interface PricingCardProps {
  name: string
  price: string
  target: string
  description: string
  features: string[]
  isFeatured?: boolean
  slug?: string
}

export function SerenitePricingCard({ name, price, target, description, features, isFeatured, slug }: PricingCardProps) {
  return (
    <Card className={`flex flex-col h-full p-6 bg-surface-strong border transition-all duration-300 ${isFeatured ? 'border-secondary ring-2 ring-secondary/20' : 'border-primary/25'}`}>
      
      <div className="min-h-[32px] flex items-center">
        {isFeatured && <Badge className="bg-secondary text-primary border-none w-fit text-[11px] font-bold">Recommandé</Badge>}
      </div>
      
      <div className="min-h-[64px] flex items-center mb-2">
        <Heading as="h3" className="text-3xl font-bold text-primary leading-tight">{name}</Heading>
      </div>
      
      <div className="min-h-[44px] flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-black text-primary tracking-normal">{price}</span>
        {price === "79€" && <span className="text-muted-foreground text-base font-medium"> / mois</span>}
      </div>
      
      <div className="min-h-[36px] flex items-center mb-3">
        <Text className="text-sm font-bold text-secondary-strong uppercase tracking-wider">{target}</Text>
      </div>

      <div className="min-h-[76px] flex items-start mb-6">
        <p className="text-base text-primary/80 leading-relaxed text-balance">{description}</p>
      </div>
      
       <div className="w-full h-px bg-secondary/20 mb-6" />
      
      <ul className="flex-grow space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-base text-primary/80 leading-snug">
            <span className="text-secondary-strong shrink-0 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto flex flex-col gap-3">
        <Link href="/contact" className="w-full block">
          <Button 
            variant={isFeatured ? "primary" : "outline"} 
            className={`w-full font-bold transition-all py-3 ${
              isFeatured 
                ? "bg-secondary text-primary hover:bg-secondary/90 border-none shadow-lg shadow-secondary/20" 
                : "text-primary border-primary/30 hover:text-secondary-strong hover:border-secondary-strong"
            }`}
          >
            {price === "Sur devis" || price.includes("TJM") ? "Demander un devis" : "Recevoir un devis"}
          </Button>
        </Link>
        {slug && (
          <Link 
            href={`/nos-offres/${slug}`} 
            className="text-center text-xs text-primary/70 hover:text-secondary-strong font-medium transition-colors underline underline-offset-4"
          >
            Voir le détail de l&apos;offre
          </Link>
        )}
      </div>
    </Card>
  )
}