import { useId, useState, type FormEvent } from "react";
import { Button } from "../../../components/ui";
import { moodOptions, type Mood } from "../data";
import styles from "./EmotionalCheckIn.module.css";

export type CheckInEntry = {
  id: string;
  mood: Mood;
  note: string;
  time: string;
};

export type EmotionalCheckInProps = {
  entries: CheckInEntry[];
  onSubmit: (entry: Omit<CheckInEntry, "id" | "time">) => void;
};

export function EmotionalCheckIn({ entries, onSubmit }: EmotionalCheckInProps) {
  const headingId = useId();
  const [mood, setMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!mood) return;
    onSubmit({ mood, note: note.trim() });
    setMood(null);
    setNote("");
  };

  return (
    <section className={styles.checkIn} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h3 id={headingId}>Emotional check-in</h3>
        <p>No fixing required — just notice how you are landing today.</p>
      </header>

      <form className={styles.form} onSubmit={submit}>
        <div
          className={styles.moods}
          role="group"
          aria-label="How are you feeling?"
        >
          {moodOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.mood} ${mood === option.id ? styles.moodActive : ""}`}
              aria-pressed={mood === option.id}
              onClick={() => setMood(option.id)}
            >
              <strong>{option.label}</strong>
              <span>{option.hint}</span>
            </button>
          ))}
        </div>

        <label className={styles.note}>
          <span>Optional note</span>
          <textarea
            rows={3}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="What does this feeling need — rest, company, water, quiet?"
          />
        </label>

        <Button type="submit" variant="soft" disabled={!mood}>
          Save check-in
        </Button>
      </form>

      {entries.length > 0 ? (
        <ul className={styles.history} aria-label="Recent check-ins">
          {entries.map((entry) => {
            const meta = moodOptions.find((option) => option.id === entry.mood);
            return (
              <li key={entry.id} className={styles.entry}>
                <div className={styles.entryTop}>
                  <strong>{meta?.label ?? entry.mood}</strong>
                  <span>{entry.time}</span>
                </div>
                {entry.note ? <p>{entry.note}</p> : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.empty}>Your recent check-ins will appear here.</p>
      )}
    </section>
  );
}
