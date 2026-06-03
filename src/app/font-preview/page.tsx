"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const weights = [
  { label: "Regular (400)", value: "font-normal", num: 400 },
  { label: "Medium (500)", value: "font-medium", num: 500 },
  { label: "SemiBold (600)", value: "font-semibold", num: 600 },
  { label: "Bold (700)", value: "font-bold", num: 700 },
  { label: "ExtraBold (800)", value: "font-extrabold", num: 800 },
  { label: "Black (900)", value: "font-black", num: 900 },
];

const trackings = [
  { label: "Normal", value: "tracking-normal" },
  { label: "Wide", value: "tracking-wide" },
  { label: "Wider", value: "tracking-wider" },
  { label: "Widest", value: "tracking-widest" },
];

export default function FontPreviewPage() {
  const [selectedWeight, setSelectedWeight] = useState("font-semibold");
  const [selectedTracking, setSelectedTracking] = useState("tracking-normal");
  const [isItalic, setIsItalic] = useState(false);
  const [customText, setCustomText] = useState("TRINEXTA : L'avenir de votre informatique");

  const italicClass = isItalic ? "italic" : "not-italic";

  return (
    <Section className="bg-background py-16">
      <Container className="space-y-12">
        <div className="border-b border-border pb-6">
          <Heading as="h1" className="text-primary mb-2">Aperçu Typographique</Heading>
          <Text variant="lead">
            Explorez le rendu de la police de titres <strong>Playfair Display</strong> avec différentes graisses et styles.
          </Text>
        </div>

        {/* Contrôles interactifs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-accent border border-border space-y-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-3">Graisse (Font Weight)</label>
              <div className="grid grid-cols-2 gap-2">
                {weights.map((w) => (
                  <Button
                    key={w.value}
                    variant={selectedWeight === w.value ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedWeight(w.value)}
                    className="w-full text-xs justify-center"
                  >
                    {w.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-3">Style</label>
              <div className="flex gap-2">
                <Button
                  variant={!isItalic ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setIsItalic(false)}
                  className="flex-1 justify-center"
                >
                  Normal
                </Button>
                <Button
                  variant={isItalic ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setIsItalic(true)}
                  className="flex-1 justify-center italic"
                >
                  Italique
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-3">Espacement (Tracking)</label>
              <div className="grid grid-cols-2 gap-2">
                {trackings.map((t) => (
                  <Button
                    key={t.value}
                    variant={selectedTracking === t.value ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTracking(t.value)}
                    className="w-full text-xs justify-center"
                  >
                    {t.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">Texte personnalisé</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </Card>

          {/* Zone de prévisualisation en direct */}
          <div className="md:col-span-2 space-y-8">
            <Card className="p-8 border border-border space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground bg-secondary px-2.5 py-1 rounded-full">
                Rendu dynamique : Playfair Display ({selectedWeight.replace("font-", "")} {isItalic ? "Italic" : "Normal"} {selectedTracking})
              </span>

              <div className="space-y-6 border-l-4 border-secondary pl-6">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Niveau H1 (Titre Hero)</span>
                  <div className={`text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1] font-serif ${selectedWeight} ${italicClass} ${selectedTracking}`}>
                    {customText}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Niveau H2 (Section)</span>
                  <div className={`text-3xl md:text-4xl text-primary font-serif ${selectedWeight} ${italicClass} ${selectedTracking}`}>
                    {customText}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Niveau H3 (Sous-titre)</span>
                  <div className={`text-xl md:text-2xl text-primary font-serif ${selectedWeight} ${italicClass} ${selectedTracking}`}>
                    {customText}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Niveau H4 (Petit titre)</span>
                  <div className={`text-lg text-primary font-serif ${selectedWeight} ${italicClass} ${selectedTracking}`}>
                    {customText}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Comparaison côte à côte */}
        <div className="space-y-6">
          <Heading as="h2" className="text-primary">Comparaison de polices</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-border space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="font-bold text-primary">Geist Sans (Actuelle)</span>
                <span className="text-xs text-muted-foreground">Sans-Serif</span>
              </div>
              <div className="space-y-4 font-sans">
                <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">
                  INFOGÉRANCE & SÉCURITÉ
                </h1>
                <p className="text-sm text-muted-foreground">
                  L'infogérance moderne par TRINEXTA assure la continuité de votre activité et la protection de vos données.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-border space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="font-bold text-primary">Playfair Display (Nouvelle)</span>
                <span className="text-xs text-muted-foreground">Serif</span>
              </div>
              <div className="space-y-4">
                <h1 className={`text-4xl text-primary tracking-tighter font-serif ${selectedWeight} ${italicClass}`}>
                  INFOGÉRANCE & SÉCURITÉ
                </h1>
                <p className="text-sm text-muted-foreground">
                  L'infogérance moderne par TRINEXTA assure la continuité de votre activité et la protection de vos données.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Exemple d'intégration en situation réelle */}
        <Card className="p-8 border border-border bg-primary text-white space-y-6">
          <span className="text-xs text-secondary uppercase font-bold tracking-widest">Section Hero type</span>
          <div className="max-w-3xl space-y-4">
            <h1 className={`text-4xl md:text-6xl text-white tracking-tighter leading-[1.1] font-serif ${selectedWeight} ${italicClass}`}>
              Votre partenaire informatique de confiance
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-sans">
              TRINEXTA conçoit, déploie et maintient vos infrastructures cloud et cybersécurité pour vous permettre de vous concentrer sur votre croissance.
            </p>
            <div className="pt-4 flex gap-4">
              <Button variant="secondary">Prendre RDV</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">Nos Offres</Button>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
