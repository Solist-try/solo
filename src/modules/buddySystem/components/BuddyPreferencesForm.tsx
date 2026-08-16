import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import {
  BUDDY_AVAILABILITY,
  BUDDY_GOALS,
  BUDDY_INTERESTS,
} from "../data";
import type {
  BuddyAvailability,
  BuddyConnectionMode,
  BuddyGoal,
  BuddyInterest,
  BuddyPreferences,
} from "../types";
import styles from "./BuddyPreferencesForm.module.css";

function toggleValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function BuddyPreferencesForm({
  value,
  onChange,
  onFindMatches,
}: {
  value: BuddyPreferences;
  onChange: (next: BuddyPreferences) => void;
  onFindMatches: () => void;
}) {
  const setGoals = (goal: BuddyGoal) =>
    onChange({ ...value, goals: toggleValue(value.goals, goal) });
  const setInterests = (interest: BuddyInterest) =>
    onChange({ ...value, interests: toggleValue(value.interests, interest) });
  const setAvailability = (slot: BuddyAvailability) =>
    onChange({
      ...value,
      availability: toggleValue(value.availability, slot),
    });
  const setMode = (connectionMode: BuddyConnectionMode) =>
    onChange({ ...value, connectionMode });

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onFindMatches();
      }}
      style={{
        gap: brand.spacing[20],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
      }}
    >
      <div className={styles.section}>
        <h3 style={{ fontFamily: brand.typography.heading }}>Your solo goals</h3>
        <p>Choose what you’d like gentle company for — you set the pace.</p>
        <div className={styles.chips} role="group" aria-label="Buddy goals">
          {BUDDY_GOALS.map((goal) => {
            const active = value.goals.includes(goal);
            return (
              <button
                key={goal}
                type="button"
                className={`${styles.chip}${active ? ` ${styles.chipActive}` : ""}`}
                aria-pressed={active}
                onClick={() => setGoals(goal)}
              >
                {goal}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={{ fontFamily: brand.typography.heading }}>Interests</h3>
        <p>We’ll quietly weigh these when suggesting compatible buddies.</p>
        <div className={styles.chips} role="group" aria-label="Buddy interests">
          {BUDDY_INTERESTS.map((interest) => {
            const active = value.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                className={`${styles.chip}${active ? ` ${styles.chipActive}` : ""}`}
                aria-pressed={active}
                onClick={() => setInterests(interest)}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={{ fontFamily: brand.typography.heading }}>Availability</h3>
        <div className={styles.chips} role="group" aria-label="Availability">
          {BUDDY_AVAILABILITY.map((slot) => {
            const active = value.availability.includes(slot);
            return (
              <button
                key={slot}
                type="button"
                className={`${styles.chip}${active ? ` ${styles.chipActive}` : ""}`}
                aria-pressed={active}
                onClick={() => setAvailability(slot)}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={{ fontFamily: brand.typography.heading }}>Connection style</h3>
        <div className={styles.modes}>
          <button
            type="button"
            className={`${styles.modeCard}${
              value.connectionMode === "light" ? ` ${styles.modeActive}` : ""
            }`}
            aria-pressed={value.connectionMode === "light"}
            onClick={() => setMode("light")}
          >
            <strong>Light connection</strong>
            <span>Occasional check-ins when it feels right.</span>
          </button>
          <button
            type="button"
            className={`${styles.modeCard}${
              value.connectionMode === "active" ? ` ${styles.modeActive}` : ""
            }`}
            aria-pressed={value.connectionMode === "active"}
            onClick={() => setMode("active")}
          >
            <strong>Active buddy</strong>
            <span>Shared progress on milestones, still autonomy-first.</span>
          </button>
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit">Find compatible buddies</Button>
      </div>
    </form>
  );
}
