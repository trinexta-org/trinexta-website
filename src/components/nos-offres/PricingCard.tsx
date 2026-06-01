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
}

export function PricingCard({ name, price, target, description, features, isFeatured }: PricingCardProps) {
  return (
    <Card className={`flex flex-col h-full p-6 bg-white/[0.03] backdrop-blur-sm border transition-all duration-300 ${isFeatured ? 'border-secondary ring-2 ring-secondary/20' : 'border-white/10'}`}>
      
      <div className="min-h-[32px] flex items-center">
        {isFeatured && <Badge className="bg-secondary text-white border-none w-fit text-[11px] font-bold">Recommandé</Badge>}
      </div>
      
      <div className="min-h-[64px] flex items-center mb-2">
        <Heading as="h3" className="text-2xl font-bold text-white leading-tight">{name}</Heading>
      </div>
      
      <div className="min-h-[44px] flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-black text-white tracking-tight">{price}</span>
        {price === "79€" && <span className="text-white/50 text-sm font-medium"> / mois</span>}
      </div>
      
      <div className="min-h-[36px] flex items-center mb-3">
        <Text className="text-xs font-bold text-secondary uppercase tracking-wider">{target}</Text>
      </div>

      <div className="min-h-[76px] flex items-start mb-6">
        <p className="text-sm text-white/60 leading-relaxed text-balance">{description}</p>
      </div>
      
      <div className="w-full h-px bg-white/10 mb-6" />
      
      <ul className="flex-grow space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/80 leading-snug">
            <span className="text-secondary shrink-0 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link href="/contact" className="w-full mt-auto block">
        <Button 
          variant={isFeatured ? "primary" : "outline"} 
          className={`w-full font-bold transition-all py-3 ${
            isFeatured 
              ? "bg-secondary text-white hover:bg-secondary/90 border-none shadow-lg shadow-secondary/20" 
              : "border-white/30 text-white hover:bg-white/10 hover:border-white"
          }`}
        >
          {price === "Sur devis" || price.includes("TJM") ? "Demander un devis" : "Recevoir un devis"}
        </Button>
      </Link>
    </Card>
  )
}