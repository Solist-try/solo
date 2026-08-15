import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { colors, heroGradient, typography } from "../../styles/brand-tokens";
import { SoftCurve } from "../ui";
import styles from "./AuthLayout.module.css";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className={styles.page} style={{ background: colors.mist }}>
      <div
        className={styles.hero}
        aria-hidden="true"
        style={{ background: heroGradient }}
      >
        <div className={styles.glow} />
        <SoftCurve variant="blob" tone="sage" className={styles.blob} />
      </div>

      <div className={styles.panel}>
        <Link
          to="/login"
          className={styles.brand}
          style={{ fontFamily: typography.fontHeading, color: colors.charcoal }}
        >
          Go Solo
        </Link>
        <h1 style={{ fontFamily: typography.fontHeading, color: colors.charcoal }}>
          {title}
        </h1>
        <p
          className={styles.subtitle}
          style={{ fontFamily: typography.fontBody }}
        >
          {subtitle}
        </p>
        {children}
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
}
