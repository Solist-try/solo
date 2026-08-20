import { brand } from "../../../styles/brand-tokens";
import type { SameCheckInStatus, SameGoal } from "../types";
import styles from "./CheckInPanel.module.css";

const STATUSES: { id: SameCheckInStatus; label: string }[] = [
  { id: "done", label: "Done" },
  { id: "partial", label: "Partial" },
  { id: "rest", label: "Rest" },
  { id: "skipped", label: "Skipped" },
];

export function CheckInPanel({
  goals,
  prompts,
  onCheckIn,
}: {
  goals: SameGoal[];
  prompts: { id: string; goalId: string; message: string }[];
  onCheckIn: (goalId: string, status: SameCheckInStatus) => void | Promise<void>;
}) {
  const active = goals[0] ?? null;

  return (
    <section
      className={styles.panel}
      style={{
        gap: brand.spacing[20],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        boxShadow: brand.shadows.soft,
      }}
    >
      <header style={{ display: "grid", gap: brand.spacing[8] }}>
        <h2
          style={{
            margin: 0,
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
          }}
        >
          Daily / weekly check-in
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: brand.typography.body,
            color: brand.colors.charcoalSoft,
          }}
        >
          Gentle prompts only — mark what feels true today.
        </p>
      </header>

      {prompts.slice(0, 2).map((prompt) => (
        <p key={prompt.id} className={styles.prompt}>
          {prompt.message}
        </p>
      ))}

      {goals.length === 0 ? (
        <p className={styles.empty}>Create a goal to start check-ins.</p>
      ) : (
        <div className={styles.goals} style={{ gap: brand.spacing[12] }}>
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={styles.goalRow}
              style={{
                gap: brand.spacing[12],
                padding: brand.spacing[12],
                borderRadius: brand.radius.md,
              }}
            >
              <div>
                <strong style={{ fontFamily: brand.typography.heading }}>
                  {goal.title}
                </strong>
                <p>
                  {goal.frequency} · {goal.category}
                </p>
              </div>
              <div className={styles.actions} style={{ gap: brand.spacing[8] }}>
                {STATUSES.map((status) => (
                  <button
                    key={status.id}
                    type="button"
                    className={styles.chip}
                    onClick={() => void onCheckIn(goal.id, status.id)}
                    style={{
                      borderRadius: brand.radius.md,
                      background:
                        status.id === "done"
                          ? brand.colors.sage
                          : status.id === "rest"
                            ? brand.colors.softSummerBlue
                            : brand.colors.white,
                      color: brand.colors.charcoal,
                    }}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {active ? (
        <p className={styles.hint}>
          Focusing on “{active.title}” — consistency over intensity.
        </p>
      ) : null}
    </section>
  );
}
