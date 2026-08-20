import { useState, type FormEvent } from "react";
import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import { SKILL_NAMES } from "../data";
import type {
  SkillAvailability,
  SkillName,
  SkillOfferInput,
} from "../types";
import styles from "./SkillForm.module.css";

const AVAILABILITY: SkillAvailability[] = [
  "weekdays",
  "weekends",
  "evenings",
  "flexible",
];

export function SkillOfferForm({
  onSubmit,
}: {
  onSubmit: (input: SkillOfferInput) => void | Promise<void>;
}) {
  const [skillName, setSkillName] = useState<SkillName>("Cooking");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] =
    useState<SkillAvailability>("evenings");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!description.trim() || !location.trim()) {
      setError("Add a description and location to offer a skill.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSubmit({
        skillName,
        description: description.trim(),
        availability,
        location: location.trim(),
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
      <h3 style={{ fontFamily: brand.typography.heading }}>Create offer</h3>
      <p>Share a skill the community can learn from — warm, practical, optional.</p>
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
          placeholder="What can you gently walk someone through?"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Availability</span>
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
        <span>Location</span>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="City or remote"
          required
        />
      </label>

      <Button type="submit" disabled={saving}>
        {saving ? "Posting…" : "Post offer"}
      </Button>
    </form>
  );
}
