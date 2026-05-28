import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section className="min-h-[70vh] flex items-center justify-center text-center">
      <div className="space-y-6">
        <Heading as="h1" className="text-primary text-9xl font-black">
          404
        </Heading>
        
        <div className="space-y-2">
          <Heading as="h2" className="text-primary">
            Page introuvable
          </Heading>
          <Text className="max-w-md mx-auto text-muted-foreground">
            Désolé, la page que vous recherchez semble avoir été déplacée ou n&apos;existe pas.
          </Text>
        </div>

        <div className="pt-4" text-white>
          <Link href="/">
            <Button size="lg" variant="primary">Retour à l&apos;accueil</Button>
        </Link>
        </div>
      </div>
    </Section>
  );
}