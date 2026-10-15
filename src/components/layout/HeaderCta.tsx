"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getHeaderCta } from "@/data/header-cta";

export function HeaderCta() {
  const cta = getHeaderCta(usePathname());

  return (
    <Button asChild variant="secondary" size="sm" className="hidden lg:inline-flex font-bold">
      <Link href={cta.href}>{cta.label}</Link>
    </Button>
  );
}
