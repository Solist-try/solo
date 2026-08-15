import { useId } from "react";
import type { QuickTip } from "../data";
import styles from "./QuickTips.module.css";

export type QuickTipsProps = {
  tips: QuickTip[];
};

export function QuickTips({ tips }: QuickTipsProps) {
  const headingId = useId();

  return (
    <section className={styles.tips} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h3 id={headingId}>Quick tips</h3>
        <p>Small ideas you can use tonight without overhauling everything.</p>
      </header>

      <ul className={styles.grid}>
        {tips.map((tip, index) => (
          <li
            key={tip.id}
            className={styles.tip}
            data-tone={tip.tone}
            style={{ animationDelay: `${0.06 + index * 0.05}s` }}
          >
            <p className={styles.tone}>{tip.tone}</p>
            <h4>{tip.title}</h4>
            <p>{tip.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
