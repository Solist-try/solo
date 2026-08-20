import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import {
  BUDDY_ACTIVITIES,
  BUDDY_AVAILABILITY,
  BUDDY_INTERESTS,
} from "../data";
import type {
  BuddyActivity,
  BuddyAvailabilityWindow,
  BuddyFilters,
  BuddyInterest,
} from "../types";
import styles from "./FindBuddyFilters.module.css";

export function FindBuddyFilters({
  value,
  onChange,
  onSearch,
  loading = false,
}: {
  value: BuddyFilters;
  onChange: (next: BuddyFilters) => void;
  onSearch: () => void;
  loading?: boolean;
}) {
  const toggleInterest = (interest: BuddyInterest) => {
    onChange({
      ...value,
      interests: value.interests.includes(interest)
        ? value.interests.filter((item) => item !== interest)
        : [...value.interests, interest],
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
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
        <h3 style={{ fontFamily: brand.typography.heading }}>Interests</h3>
        <p>Filter for short-term or long-term company that fits your pace.</p>
        <div className={styles.chips} role="group" aria-label="Interests">
          {BUDDY_INTERESTS.map((interest) => {
            const active = value.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                className={`${styles.chip}${active ? ` ${styles.chipActive}` : ""}`}
                aria-pressed={active}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span style={{ fontFamily: brand.typography.heading }}>Time</span>
          <select
            value={value.availability}
            onChange={(event) =>
              onChange({
                ...value,
                availability: event.target.value as
                  | BuddyAvailabilityWindow
                  | "any",
              })
            }
            style={{
              borderRadius: brand.radius.md,
              padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
              fontFamily: brand.typography.body,
            }}
          >
            <option value="any">Any time</option>
            {BUDDY_AVAILABILITY.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span style={{ fontFamily: brand.typography.heading }}>Activity</span>
          <select
            value={value.activity}
            onChange={(event) =>
              onChange({
                ...value,
                activity: event.target.value as BuddyActivity | "any",
              })
            }
            style={{
              borderRadius: brand.radius.md,
              padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
              fontFamily: brand.typography.body,
            }}
          >
            <option value="any">Any activity</option>
            {BUDDY_ACTIVITIES.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.actions}>
        <Button type="submit" disabled={loading}>
          {loading ? "Finding…" : "Find a buddy"}
        </Button>
      </div>
    </form>
  );
}
