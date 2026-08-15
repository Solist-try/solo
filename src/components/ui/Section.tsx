import type { ReactNode } from "react";
import { typography } from "../../styles/brand-tokens";
import styles from "./Section.module.css";

export type SectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
};

export function Section({
  title,
  description,
  children,
  className = "",
  action,
}: SectionProps) {
  return (
    <section className={`${styles.section} ${className}`.trim()}>
      <div className={styles.header}>
        <div>
          <h2 style={{ fontFamily: typography.fontHeading }}>{title}</h2>
          {description ? (
            <p style={{ fontFamily: typography.fontBody }}>{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
