import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "next-sanity";
import { type CorpsArticle, type ImageArticle, urlForImage } from "@/lib/sanity";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-8 text-zinc-700">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="pt-6 text-2xl font-semibold tracking-tight text-zinc-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-4 text-xl font-semibold tracking-tight text-zinc-950">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-300 pl-4 text-zinc-600 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-6 list-disc space-y-2 text-base leading-8 text-zinc-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="ml-6 list-decimal space-y-2 text-base leading-8 text-zinc-700">
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
          className="font-medium text-zinc-950 underline underline-offset-4"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const imageValue = value as ImageArticle;

      if (!imageValue.asset?._ref) {
        return null;
      }

      return (
        <figure className="space-y-3">
          <Image
            src={urlForImage(imageValue).width(1200).fit("max").auto("format").url()}
            alt={imageValue.alt ?? ""}
            width={1200}
            height={675}
            className="w-full rounded-3xl object-cover"
          />
          {imageValue.legende ? (
            <figcaption className="text-sm leading-6 text-zinc-500">
              {imageValue.legende}
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
