import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HEADER_CTA } from "@/data/header-cta";

export function HeaderCta() {
  return (
    <Button asChild variant="secondary" size="sm" className="hidden lg:inline-flex font-bold">
      <Link href={HEADER_CTA.href}>{HEADER_CTA.label}</Link>
    </Button>
  );
}
