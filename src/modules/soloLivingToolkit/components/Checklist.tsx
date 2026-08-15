import { useId } from "react";
import styles from "./Checklist.module.css";
import type { ChecklistItem } from "../data";

export type ChecklistProps = {
  title: string;
  description?: string;
  items: ChecklistItem[];
  onToggle: (id: string) => void;
};

export function Checklist({
  title,
  description,
  items,
  onToggle,
}: ChecklistProps) {
  const headingId = useId();
  const doneCount = items.filter((item) => item.done).length;
  const progress = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <section className={styles.checklist} aria-labelledby={headingId}>
      <header className={styles.header}>
        <div>
          <h3 id={headingId}>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
        <p className={styles.progressLabel} aria-live="polite">
          {doneCount}/{items.length}
        </p>
      </header>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={`${title} progress`}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <label className={`${styles.item} ${item.done ? styles.done : ""}`}>
              <input
                type="checkbox"
                checked={Boolean(item.done)}
                onChange={() => onToggle(item.id)}
              />
              <span className={styles.box} aria-hidden="true" />
              <span className={styles.label}>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
