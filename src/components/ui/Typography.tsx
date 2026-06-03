import { cn } from "@/lib/utils"
import React, { ElementType, ReactNode } from "react"

type HeadingLevel = "h1" | "h2" | "h3" | "h4"

interface HeadingProps {
  children: ReactNode
  className?: string
  as?: HeadingLevel
  emphasis?: boolean
}

function formatHeadingText(children: ReactNode): ReactNode {
  if (!children) return children;

  // Si c'est une simple string
  if (typeof children === "string") {
    const words = children.trim().split(/\s+/);
    if (words.length <= 2) return children;

    const lastWordIndex = words.length - 1;
    return (
      <>
        {words.map((word, idx) => (
          <span key={idx}>
            {idx === lastWordIndex ? <em className="italic">{word}</em> : word}
            {idx < lastWordIndex ? " " : ""}
          </span>
        ))}
      </>
    );
  }

  // Si c'est un tableau d'éléments (ex: ReactNode[])
  if (Array.isArray(children)) {
    // Calculer le nombre approximatif de mots
    const textLength = children.reduce((acc: number, child: ReactNode) => {
      if (typeof child === "string") return acc + child.trim().split(/\s+/).length;
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: ReactNode }>;
        if (typeof element.props.children === "string") {
          return acc + element.props.children.trim().split(/\s+/).length;
        }
      }
      return acc;
    }, 0);

    if (textLength <= 2) return children;

    // Parcourir depuis la fin pour formater le dernier mot textuel trouvé
    let formatted = false;
    const newChildren = [...children].reverse().map((child: ReactNode, childIdx: number) => {
      const originalIndex = children.length - 1 - childIdx;

      if (formatted) {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement;
          return React.cloneElement(element, { key: element.key ?? `frag-child-${originalIndex}` });
        }
        return child;
      }

      if (typeof child === "string" && child.trim() !== "") {
        formatted = true;
        const words = child.trim().split(/\s+/);
        const lastWordIndex = words.length - 1;
        return (
          <React.Fragment key={`text-frag-${originalIndex}`}>
            {words.map((word: string, idx: number) => (
              <span key={idx}>
                {idx === lastWordIndex ? <em className="italic">{word}</em> : word}
                {idx < lastWordIndex ? " " : ""}
              </span>
            ))}
          </React.Fragment>
        );
      }

      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: ReactNode }>;
        if (typeof element.props.children === "string" && element.props.children.trim() !== "") {
          formatted = true;
          const words = element.props.children.trim().split(/\s+/);
          const lastWordIndex = words.length - 1;
          const newInnerChildren = (
            <React.Fragment>
              {words.map((word: string, idx: number) => (
                <span key={idx}>
                  {idx === lastWordIndex ? <em className="italic">{word}</em> : word}
                  {idx < lastWordIndex ? " " : ""}
                </span>
              ))}
            </React.Fragment>
          );
          return React.cloneElement(element, { key: element.key ?? `clone-child-${originalIndex}` }, newInnerChildren);
        }
      }

      if (React.isValidElement(child)) {
        const element = child as React.ReactElement;
        return React.cloneElement(element, { key: element.key ?? `child-${originalIndex}` });
      }

      return child;
    });

    return newChildren.reverse();
  }

  // Si c'est un seul élément React
  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<{ children?: ReactNode }>;
    if (typeof element.props.children === "string") {
      const formattedInner = formatHeadingText(element.props.children);
      return React.cloneElement(element, {}, formattedInner);
    }
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