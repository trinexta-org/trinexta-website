import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "next-sanity";
import { type CorpsArticle, type ImageArticle, urlForImage } from "@/lib/sanity";
import { generateSlug } from "@/lib/utils";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-9 text-white/80">{children}</p>
    ),
    h2: ({ children }) => {
      const text = children?.toString() || "";
      return (
        <h2 id={generateSlug(text)} className="pt-12 pb-4 text-3xl font-black uppercase tracking-tighter text-white">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = children?.toString() || "";
      return (
        <h3 id={generateSlug(text)} className="pt-8 pb-2 text-2xl font-bold tracking-tight text-white/90">
          {children}
        </h3>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-300 pl-4 text-white/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-6 list-disc space-y-2 text-base leading-8 text-white/70">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="ml-6 list-decimal space-y-2 text-base leading-8 text-white/70">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
          className="font-medium text-secondary underline underline-offset-4 hover:text-white"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: ImageArticle }) => {
  if (!value.asset?._ref) return null;

      return (
        <figure className="space-y-3">
          <Image
            src={urlForImage(value).width(1200).fit("max").auto("format").url()}
            alt={value.alt ?? "Illustration"}
            width={1200}
            height={675}
            className="w-full rounded-3xl object-cover"
          />
          {value.legende ? (
            <figcaption className="text-sm leading-6 text-zinc-500">
              {value.legende}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

type PortableTextArticleProps = {
  value: CorpsArticle[] | null;
};

export function PortableTextArticle({ value }: PortableTextArticleProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
