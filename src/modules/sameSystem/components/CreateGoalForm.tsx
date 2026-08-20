import { useState, type FormEvent } from "react";
import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import { SAME_CATEGORIES, SAME_FREQUENCIES } from "../data";
import type {
  SameFrequency,
  SameGoalCategory,
  SameGoalInput,
} from "../types";
import styles from "./SameForms.module.css";

export function CreateGoalForm({
  onSubmit,
}: {
  onSubmit: (input: SameGoalInput) => void | Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<SameFrequency>("daily");
  const [category, setCategory] = useState<SameGoalCategory>("habits");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Add a title and short description.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        frequency,
        category,
      });
      setTitle("");
      setDescription("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void submit(event)}
      style={{
        gap: brand.spacing[12],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
      }}
    >
      <h3 style={{ fontFamily: brand.typography.heading }}>Create goal</h3>
      <p>Lightweight accountability — routines, habits, learning, fitness, or creative work.</p>
      {error ? <p className={styles.error}>{error}</p> : null}

      <label className={styles.field}>
        <span>Title</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Evening wind-down"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What does a kind version of this look like?"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Category</span>
        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as SameGoalCategory)
          }
        >
          {SAME_CATEGORIES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Frequency</span>
        <select
          value={frequency}
          onChange={(event) =>
            setFrequency(event.target.value as SameFrequency)
          }
        >
          {SAME_FREQUENCIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save goal"}
      </Button>
    </form>
  );
}
