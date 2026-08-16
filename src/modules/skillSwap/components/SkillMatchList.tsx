import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import type { SkillMatch } from "../types";
import styles from "./SkillMatchList.module.css";

export function SkillMatchList({
  matches,
  onSchedule,
}: {
  matches: SkillMatch[];
  onSchedule: (match: SkillMatch) => void;
}) {
  if (matches.length === 0) {
    return (
      <p
        className={styles.empty}
        style={{
          padding: brand.spacing[20],
          borderRadius: brand.radius.lg,
          background: brand.colors.mist,
          boxShadow: brand.shadows.soft,
        }}
      >
        No category matches yet. Post an offer and a request in the same skill
        area to see pairings.
      </p>
    );
  }

  return (
    <ul className={styles.list} style={{ gap: brand.spacing[12] }}>
      {matches.map((match) => (
        <li
          key={match.id}
          className={styles.item}
          style={{
            gap: brand.spacing[12],
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            boxShadow: brand.shadows.soft,
          }}
        >
          <div className={styles.top}>
            <h3 style={{ fontFamily: brand.typography.heading }}>
              {match.offer.category}
            </h3>
            <span className={styles.score}>{match.score}% fit</span>
          </div>
          <div className={styles.pair}>
            <p>
              <strong>{match.offer.ownerName}</strong> offers “{match.offer.title}”
            </p>
            <p>
              <strong>{match.request.ownerName}</strong> needs “
              {match.request.title}”
            </p>
          </div>
          <Button type="button" onClick={() => onSchedule(match)}>
            Schedule session
          </Button>
        </li>
      ))}
    </ul>
  );
}
