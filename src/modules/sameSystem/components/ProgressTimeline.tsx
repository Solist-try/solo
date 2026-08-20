import { brand } from "../../../styles/brand-tokens";
import { progressPercent } from "../data";
import type { SameCheckIn, SameGoal } from "../types";
import styles from "./ProgressTimeline.module.css";

export function ProgressRing({
  percent,
  label,
}: {
  percent: number;
  label: string;
}) {
  const size = 88;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={styles.ringWrap}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="same-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brand.colors.sage} />
            <stop offset="55%" stopColor={brand.colors.softSummerBlue} />
            <stop offset="100%" stopColor={brand.colors.clay} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(233,230,227,0.95)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#same-ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={brand.colors.charcoal}
          fontSize="14"
          fontWeight="700"
        >
          {percent}%
        </text>
      </svg>
      <span>{label}</span>
    </div>
  );
}

export function ProgressTimeline({
  goals,
  checkIns,
}: {
  goals: SameGoal[];
  checkIns: SameCheckIn[];
}) {
  const timeline = [...checkIns]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 12);

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
          Progress timeline
        </h2>
        <p
          style={{
            margin: 0,
            color: brand.colors.charcoalSoft,
            fontFamily: brand.typography.body,
          }}
        >
          Soft gradients and circles — progress without pressure.
        </p>
      </header>

      <div className={styles.rings} style={{ gap: brand.spacing[20] }}>
        {goals.length === 0 ? (
          <p style={{ color: brand.colors.charcoalSoft, margin: 0 }}>
            Your rings appear after you save a goal.
          </p>
        ) : (
          goals.map((goal) => (
            <ProgressRing
              key={goal.id}
              percent={progressPercent(checkIns, goal.id)}
              label={goal.title}
            />
          ))
        )}
      </div>

      <ol className={styles.timeline} style={{ gap: brand.spacing[12] }}>
        {timeline.length === 0 ? (
          <li className={styles.empty}>No check-ins yet — start gently.</li>
        ) : (
          timeline.map((item) => {
            const goal = goals.find((g) => g.id === item.goalId);
            return (
              <li
                key={item.id ?? `${item.goalId}-${item.timestamp}`}
                className={styles.item}
                style={{
                  gap: brand.spacing[8],
                  padding: brand.spacing[12],
                  borderRadius: brand.radius.md,
                }}
              >
                <span className={`${styles.dot} ${styles[item.status]}`} />
                <div>
                  <strong>{goal?.title ?? "Goal"}</strong>
                  <p>
                    {item.status} ·{" "}
                    {new Date(item.timestamp).toLocaleString()}
                    {item.note ? ` — ${item.note}` : ""}
                  </p>
                </div>
              </li>
            );
          })
        )}
      </ol>
    </section>
  );
}
