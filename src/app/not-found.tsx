import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section className="min-h-[70vh] flex items-center justify-center text-center">
      <div className="space-y-6">
        <p aria-hidden="true" className="text-primary text-9xl font-black">
          404
        </p>

        <div className="space-y-2">
          <Heading as="h1" className="text-primary">
            Page introuvable
          </Heading>
          <Text className="max-w-md mx-auto text-muted-foreground">
            Désolé, cette page n&apos;existe pas ou a été déplacée. Vérifiez
            l&apos;adresse ou retournez à l&apos;accueil pour poursuivre votre
            navigation.
          </Text>
        </div>

        <div className="pt-4">
          <Button asChild size="lg" variant="primary">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}