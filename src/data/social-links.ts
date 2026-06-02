import type { ComponentType, SVGProps } from "react"
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon"
import { InstagramIcon } from "@/components/ui/icons/InstagramIcon"
import { TiktokIcon } from "@/components/ui/icons/TiktokIcon"
import { FacebookIcon } from "@/components/ui/icons/FacebookIcon"

export type SocialLink = {
  name: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/trinexta/", Icon: LinkedinIcon },
  { name: "Instagram", href: "https://www.instagram.com/trinexta/", Icon: InstagramIcon },
  { name: "TikTok", href: "https://www.tiktok.com/@trinexta", Icon: TiktokIcon },
  { name: "Facebook", href: "https://www.facebook.com/trinexta/", Icon: FacebookIcon },
]
