import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { type CorpsArticle, type ImageArticle, urlForImage } from "@/lib/sanity";
import { generateSlug } from "@/lib/utils";

const extractTextFromBlock = (block: PortableTextBlock | undefined): string => {
  if (!block || !block.children) return "";

  if (Array.isArray(block.children)) {
    return block.children
      .map((child) => ('text' in child && typeof child.text === 'string' ? child.text : ''))
      .join("");
  }

  return "";
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed text-slate-300 mb-6 font-light">{children}</p>
    ),
    
    h2: ({ children, value }) => {
      const text = extractTextFromBlock(value);
      return (
        <h2 
          id={generateSlug(text)} 
          className="scroll-mt-32 pt-14 pb-4 text-3xl md:text-4xl font-black tracking-tight text-white border-b border-white/10 mb-8 mt-4"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text = extractTextFromBlock(value);
      return (
        <h3 
          id={generateSlug(text)} 
          className="scroll-mt-32 pt-8 pb-3 text-2xl md:text-3xl font-bold tracking-normal text-white/90 mb-4"
        >
          {children}
        </h3>
      );
    },
    
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-secondary bg-secondary/10 py-5 pl-6 pr-4 my-10 rounded-r-xl text-xl italic text-slate-300 shadow-inner">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-6 mb-8 list-disc space-y-3 text-lg text-slate-300 marker:text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="ml-6 mb-8 list-decimal space-y-3 text-lg text-slate-300 marker:text-secondary">
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
          className="font-medium text-secondary underline underline-offset-4 hover:text-white transition-colors"
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
        <figure className="my-14">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
            <Image
              src={urlForImage(value).width(1200).fit("max").auto("format").url()}
              alt={value.alt ?? "Illustration"}
              width={1200}
              height={675}
              className="w-full object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
          {value.legende ? (
            <figcaption className="text-sm text-center italic leading-6 text-slate-400 mt-4">
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
    <div className="max-w-none">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}