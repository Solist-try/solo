import { useState, type FormEvent } from "react";
import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import type { SkillMatch, SkillSession, SkillSessionMode } from "../types";
import styles from "./SkillSessionScheduler.module.css";

export function SkillSessionScheduler({
  match,
  onSchedule,
  onCancel,
}: {
  match: SkillMatch | null;
  onSchedule: (session: Omit<SkillSession, "id" | "status">) => void;
  onCancel: () => void;
}) {
  const [mode, setMode] = useState<SkillSessionMode>("chat");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");

  if (!match) {
    return (
      <div
        className={styles.scheduler}
        style={{
          gap: brand.spacing[12],
          padding: brand.spacing[20],
          borderRadius: brand.radius.lg,
          background: brand.colors.mist,
          boxShadow: brand.shadows.soft,
        }}
      >
        <h3 style={{ fontFamily: brand.typography.heading }}>
          Session scheduler
        </h3>
        <p className={styles.empty}>
          Choose a match to schedule a virtual call or in-app chat session.
        </p>
      </div>
    );
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!when.trim()) return;
    onSchedule({
      matchId: match.id,
      mode,
      when: when.trim(),
      notes: notes.trim(),
    });
    setWhen("");
    setNotes("");
  };

  return (
    <form
      className={styles.scheduler}
      onSubmit={submit}
      style={{
        gap: brand.spacing[12],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
      }}
    >
      <h3 style={{ fontFamily: brand.typography.heading }}>
        Schedule: {match.offer.category}
      </h3>
      <p>
        {match.offer.ownerName} ↔ {match.request.ownerName}
      </p>

      <div className={styles.modes} role="group" aria-label="Session mode">
        <button
          type="button"
          className={`${styles.mode}${mode === "chat" ? ` ${styles.modeActive}` : ""}`}
          aria-pressed={mode === "chat"}
          onClick={() => setMode("chat")}
        >
          In-app chat
        </button>
        <button
          type="button"
          className={`${styles.mode}${mode === "virtual" ? ` ${styles.modeActive}` : ""}`}
          aria-pressed={mode === "virtual"}
          onClick={() => setMode("virtual")}
        >
          Virtual session
        </button>
      </div>

      <label className={styles.field}>
        <span>When</span>
        <input
          type="datetime-local"
          value={when}
          onChange={(event) => setWhen(event.target.value)}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Notes (optional)</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Keep it practical — one topic, clear time box."
        />
      </label>

      <p className={styles.reminder}>
        Boundaries: supportive and non-romantic. End on time. Report anything
        that feels off.
      </p>

      <div className={styles.actions}>
        <Button type="submit">Confirm session</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
