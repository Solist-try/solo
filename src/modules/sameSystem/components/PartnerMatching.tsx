import { Button } from "../../../components/ui";
import { brand } from "../../../styles/brand-tokens";
import type { SamePartnerCandidate } from "../types";
import styles from "./PartnerMatching.module.css";

export function PartnerMatchingScreen({
  candidates,
  onRequest,
}: {
  candidates: SamePartnerCandidate[];
  onRequest: (candidate: SamePartnerCandidate) => void | Promise<void>;
}) {
  return (
    <section className={styles.wrap} style={{ gap: brand.spacing[20] }}>
      <header style={{ display: "grid", gap: brand.spacing[8] }}>
        <h2
          style={{
            margin: 0,
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
          }}
        >
          Partner matching
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: brand.typography.body,
            color: brand.colors.charcoalSoft,
          }}
        >
          Matched by goal category and frequency — warm, optional, non-intrusive.
        </p>
      </header>

      {candidates.length === 0 ? (
        <p
          style={{
            margin: 0,
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            background: brand.colors.mist,
            boxShadow: brand.shadows.soft,
            color: brand.colors.charcoalSoft,
          }}
        >
          Create a goal to see gentle partner suggestions.
        </p>
      ) : (
        <ul className={styles.list} style={{ gap: brand.spacing[12] }}>
          {candidates.map((candidate) => (
            <li
              key={candidate.userId}
              className={styles.card}
              style={{
                gap: brand.spacing[12],
                padding: brand.spacing[20],
                borderRadius: brand.radius.lg,
                boxShadow: brand.shadows.soft,
              }}
            >
              <div className={styles.top}>
                <div>
                  <h3 style={{ fontFamily: brand.typography.heading }}>
                    {candidate.name}
                  </h3>
                  <p>{candidate.goal.title}</p>
                </div>
                <span className={styles.score}>{candidate.matchScore}% fit</span>
              </div>
              <p className={styles.meta}>
                {candidate.sharedCategory}
                {candidate.sharedFrequency
                  ? ` · ${candidate.sharedFrequency}`
                  : ""}
              </p>
              <p className={styles.desc}>{candidate.goal.description}</p>
              <Button type="button" onClick={() => void onRequest(candidate)}>
                Request partner
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
