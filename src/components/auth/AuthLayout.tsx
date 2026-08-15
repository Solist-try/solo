import type { ReactNode } from "react";
import { Link } from "react-router-dom";
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
    <div className={styles.page}>
      <div className={styles.hero} aria-hidden="true">
        <div className={styles.glow} />
        <SoftCurve variant="blob" tone="gold" className={styles.blob} />
      </div>

      <div className={styles.panel}>
        <Link to="/login" className={styles.brand}>
          Go Solo
        </Link>
        <h1>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {children}
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
}
