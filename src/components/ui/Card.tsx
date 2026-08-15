import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardVariant = "elevated" | "soft" | "outline" | "interactive";
export type CardPadding = "sm" | "md" | "lg";

export type CardProps = HTMLAttributes<HTMLElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
  as?: "article" | "div" | "section" | "li";
  children: ReactNode;
};

export function Card({
  variant = "elevated",
  padding = "md",
  as: Tag = "article",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={[
        styles.card,
        styles[variant],
        styles[`pad-${padding}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}

export type CardHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function CardHeader({
  eyebrow,
  title,
  description,
  action,
}: CardHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerText}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h3 className={styles.title}>{title}</h3>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${styles.body} ${className}`.trim()}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <footer className={`${styles.footer} ${className}`.trim()}>{children}</footer>
  );
}
