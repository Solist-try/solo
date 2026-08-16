import { useState, type FormEvent } from "react";
import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import { SKILL_CATEGORIES } from "../data";
import type { SkillCategory, SkillRequestInput } from "../types";
import styles from "./SkillForm.module.css";

export function SkillRequestForm({
  onSubmit,
}: {
  onSubmit: (input: SkillRequestInput) => void;
}) {
  const [category, setCategory] = useState<SkillCategory>("Travel planning");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [availability, setAvailability] = useState("Flexible");
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !summary.trim()) {
      setError("Add a title and short summary for your request.");
      return;
    }
    setError(null);
    onSubmit({
      category,
      title: title.trim(),
      summary: summary.trim(),
      availability: availability.trim(),
    });
    setTitle("");
    setSummary("");
  };

  return (
    <form
      className={styles.form}
      onSubmit={submit}
      style={{
        gap: brand.spacing[12],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
      }}
    >
      <h3 style={{ fontFamily: brand.typography.heading }}>Request a skill</h3>
      <p>Ask for practical help — keep it clear, timed, and pressure-free.</p>
      {error ? <p className={styles.error}>{error}</p> : null}

      <label className={styles.field}>
        <span>Category</span>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as SkillCategory)}
        >
          {SKILL_CATEGORIES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Title</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. First-night safety map help"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Summary</span>
        <textarea
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          placeholder="What would support you right now?"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Availability</span>
        <input
          value={availability}
          onChange={(event) => setAvailability(event.target.value)}
          placeholder="Weekends, evenings…"
        />
      </label>

      <Button type="submit">Post request</Button>
    </form>
  );
}
