import { useState, type FormEvent } from "react";
import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import { SKILL_NAMES } from "../data";
import type {
  SkillAvailability,
  SkillName,
  SkillRequestInput,
  SkillUrgency,
} from "../types";
import styles from "./SkillForm.module.css";

const URGENCY: SkillUrgency[] = ["low", "medium", "high"];
const AVAILABILITY: SkillAvailability[] = [
  "weekdays",
  "weekends",
  "evenings",
  "flexible",
];

export function SkillRequestForm({
  onSubmit,
}: {
  onSubmit: (input: SkillRequestInput) => void | Promise<void>;
}) {
  const [skillName, setSkillName] = useState<SkillName>("Languages");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<SkillUrgency>("medium");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] =
    useState<SkillAvailability>("flexible");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!description.trim()) {
      setError("Add a short description for your request.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSubmit({
        skillName,
        description: description.trim(),
        urgency,
        location: location.trim() || undefined,
        availability,
      });
      setDescription("");
      setLocation("");
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
      <h3 style={{ fontFamily: brand.typography.heading }}>Create request</h3>
      <p>Ask for practical help — clear, timed, and pressure-free.</p>
      {error ? <p className={styles.error}>{error}</p> : null}

      <label className={styles.field}>
        <span>Skill</span>
        <select
          value={skillName}
          onChange={(event) => setSkillName(event.target.value as SkillName)}
        >
          {SKILL_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What would support you right now?"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Urgency</span>
        <select
          value={urgency}
          onChange={(event) => setUrgency(event.target.value as SkillUrgency)}
        >
          {URGENCY.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Preferred availability</span>
        <select
          value={availability}
          onChange={(event) =>
            setAvailability(event.target.value as SkillAvailability)
          }
        >
          {AVAILABILITY.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Location (optional)</span>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="City or remote"
        />
      </label>

      <Button type="submit" disabled={saving}>
        {saving ? "Posting…" : "Post request"}
      </Button>
    </form>
  );
}
