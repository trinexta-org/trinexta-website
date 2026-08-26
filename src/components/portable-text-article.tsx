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

type PortableTextArticleProps = {
  value: CorpsArticle[] | null;
};

export function PortableTextArticle({ value }: PortableTextArticleProps) {
  if (!value || value.length === 0) {
    return null;
  }

  const imageSideByKey = new Map<string, boolean>();
  let count = 0;
  for (const block of value) {
    const b = block as unknown as { _type?: string; _key?: string };
    if (b._type === "image" && b._key) {
      imageSideByKey.set(b._key, count % 2 === 0);
      count += 1;
    }
  }

  const portableTextComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-lg leading-relaxed text-foreground/80 mb-6 font-light">{children}</p>
      ),

      h2: ({ children, value }) => {
        const text = extractTextFromBlock(value);
        return (
          <h2
            id={generateSlug(text)}
            className="clear-both scroll-mt-32 pt-14 pb-4 text-3xl md:text-4xl font-black text-foreground border-b border-border mb-8 mt-4"
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
            className="clear-both scroll-mt-32 pt-8 pb-3 text-2xl md:text-3xl font-bold tracking-normal text-foreground mb-4"
          >
            {children}
          </h3>
        );
      },

      blockquote: ({ children }) => (
        <blockquote className="clear-both relative my-10 rounded-2xl border border-secondary/20 bg-surface-strong py-8 pl-12 pr-6 shadow-sm">
          <span className="absolute left-4 top-3 font-serif text-6xl leading-none text-secondary/30 select-none">
            &ldquo;
          </span>
          <p className="relative text-xl italic leading-relaxed text-primary">
            {children}
          </p>
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="ml-6 mb-8 list-disc space-y-3 text-lg text-foreground/80 marker:text-secondary-strong">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="ml-6 mb-8 list-decimal space-y-3 text-lg text-foreground/80 marker:text-secondary-strong">
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
            className="font-medium text-secondary-strong underline underline-offset-4 hover:text-primary transition-colors"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }: { value: ImageArticle & { _key?: string } }) => {
        if (!value.asset?._ref) return null;

        const isEven = value._key ? imageSideByKey.get(value._key) ?? true : true;

        return (
          <figure
            className={`my-8 md:my-4 md:w-[46%] ${
              isEven ? "md:float-left md:mr-8" : "md:float-right md:ml-8"
            }`}
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-md">
              <Image
                src={urlForImage(value).width(900).fit("max").auto("format").url()}
                alt={value.alt ?? "Illustration"}
                width={900}
                height={600}
                className="w-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
            {value.legende ? (
              <figcaption className="text-sm text-center italic leading-6 text-muted-foreground mt-3">
                {value.legende}
              </figcaption>
            ) : null}
          </figure>
        );
      },
    },
  };

  return (
    <div className="max-w-none">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}