import { cn } from "@/lib/utils"
import React, { ElementType, ReactNode } from "react"

type HeadingLevel = "h1" | "h2" | "h3" | "h4"

interface HeadingProps {
  children: ReactNode
  className?: string
  as?: HeadingLevel
  emphasis?: boolean
}

function parseEmphasis(text: string): ReactNode {
  if (!text.includes("*")) return text;
  const parts = text.split(/\*([^*]+)\*/);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? <em key={idx} className="italic">{part}</em> : part
      )}
    </>
  );
}

function formatHeadingText(children: ReactNode): ReactNode {
  if (!children) return children;

  if (typeof children === "string") {
    return parseEmphasis(children);
  }

  if (Array.isArray(children)) {
    return children.map((child: ReactNode, idx: number) => {
      if (typeof child === "string") {
        return <React.Fragment key={idx}>{parseEmphasis(child)}</React.Fragment>;
      }
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: ReactNode }>;
        return React.cloneElement(
          element,
          { key: element.key ?? idx },
          formatHeadingText(element.props.children)
        );
      }
      return child;
    });
  }

  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<{ children?: ReactNode }>;
    return React.cloneElement(element, {}, formatHeadingText(element.props.children));
  }

  return children;
}

export function Heading({ children, className, as: Component = "h2", emphasis = true }: HeadingProps) {
  const styles: Record<HeadingLevel, string> = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-normal leading-[1.1]",
    h2: "text-3xl md:text-4xl font-bold text-primary tracking-normal",
    h3: "text-xl md:text-2xl font-bold text-primary tracking-normal",
    h4: "text-lg font-bold text-primary tracking-normal",
  }

  const Tag = Component as ElementType
  return <Tag className={cn(styles[Component], className)}>{emphasis ? formatHeadingText(children) : children}</Tag>
}

type TextVariant = "body" | "lead" | "small"

interface TextProps {
  children: ReactNode
  className?: string
  variant?: TextVariant
}

export function Text({ children, className, variant = "body" }: TextProps) {
  const styles: Record<TextVariant, string> = {
    body: "text-base text-muted-foreground leading-relaxed",
    lead: "text-lg md:text-xl text-muted-foreground font-medium",
    small: "text-sm text-muted-foreground",
  }
  return <p className={cn(styles[variant], className)}>{children}</p>
}
