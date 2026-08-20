import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import type { SkillSwapMatchView } from "../types";
import styles from "./SkillMatchList.module.css";

export function SkillMatchList({
  matches,
  onMatch,
  actionLabel = "Create match",
}: {
  matches: SkillSwapMatchView[];
  onMatch: (view: SkillSwapMatchView) => void;
  actionLabel?: string;
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
        No skill matches yet. Offers and requests align by skill name, location,
        and availability.
      </p>
    );
  }

  return (
    <ul className={styles.list} style={{ gap: brand.spacing[12] }}>
      {matches.map((view) => (
        <li
          key={`${view.offer.id}-${view.request.id}`}
          className={styles.item}
          style={{
            gap: brand.spacing[12],
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            boxShadow: brand.shadows.soft,
            background:
              "linear-gradient(160deg, rgba(143,166,184,0.18), rgba(233,230,227,0.95))",
          }}
        >
          <div className={styles.top}>
            <h3 style={{ fontFamily: brand.typography.heading }}>
              {view.offer.skillName}
            </h3>
            <span className={styles.score}>{view.score}% fit</span>
          </div>
          <div className={styles.pair}>
            <p>
              <strong>{view.offer.userName ?? "Offerer"}</strong> offers in{" "}
              {view.offer.location} · {view.offer.availability}
            </p>
            <p>
              <strong>{view.request.userName ?? "Requester"}</strong> needs help
              {view.request.location ? ` in ${view.request.location}` : ""} ·
              urgency {view.request.urgency}
            </p>
          </div>
          <p style={{ margin: 0, color: brand.colors.charcoalSoft, fontSize: "0.9rem" }}>
            {view.offer.description}
          </p>
          <Button type="button" onClick={() => onMatch(view)}>
            {actionLabel}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export function MatchScreen({
  matches,
  onMatch,
  title = "Match screen",
}: {
  matches: SkillSwapMatchView[];
  onMatch: (view: SkillSwapMatchView) => void;
  title?: string;
}) {
  return (
    <section style={{ display: "grid", gap: brand.spacing[20] }}>
      <header style={{ display: "grid", gap: brand.spacing[8] }}>
        <h2
          style={{
            margin: 0,
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: brand.typography.body,
            color: brand.colors.charcoalSoft,
          }}
        >
          Confirm a community-first exchange. Both people are notified when a
          match is created.
        </p>
      </header>
      <SkillMatchList matches={matches} onMatch={onMatch} />
    </section>
  );
}
