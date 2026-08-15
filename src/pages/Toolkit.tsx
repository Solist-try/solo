import { useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { Button } from "../components/ui";
import { brand } from "../styles/brand-tokens";

type MoodOption = {
  id: string;
  emoji: string;
  label: string;
};

type CheckInEntry = {
  id: string;
  mood: MoodOption;
  note: string;
  time: string;
};

type Habit = {
  id: string;
  label: string;
  week: boolean[];
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const moodOptions: MoodOption[] = [
  { id: "steady", emoji: "🙂", label: "Steady" },
  { id: "bright", emoji: "☀️", label: "Bright" },
  { id: "tender", emoji: "🤍", label: "Tender" },
  { id: "restless", emoji: "🌊", label: "Restless" },
  { id: "low", emoji: "🌧", label: "Low" },
];

const starterHabits: Habit[] = [
  {
    id: "h1",
    label: "Morning stretch (2 min)",
    week: [true, true, false, true, false, false, false],
  },
  {
    id: "h2",
    label: "Eat one real meal seated",
    week: [true, false, true, true, true, false, false],
  },
  {
    id: "h3",
    label: "Outside air / short walk",
    week: [false, true, true, false, true, false, false],
  },
  {
    id: "h4",
    label: "Evening wind-down cue",
    week: [true, true, true, false, false, false, false],
  },
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function Toolkit() {
  const [mood, setMood] = useState<MoodOption | null>(null);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<CheckInEntry[]>([]);
  const [habits, setHabits] = useState<Habit[]>(() =>
    starterHabits.map((habit) => ({ ...habit, week: [...habit.week] })),
  );
  const [income, setIncome] = useState("2400");
  const [rent, setRent] = useState("950");
  const [groceries, setGroceries] = useState("320");
  const [transit, setTransit] = useState("90");
  const [buffer, setBuffer] = useState("150");

  const budget = useMemo(() => {
    const incomeValue = Number(income) || 0;
    const expenses =
      (Number(rent) || 0) +
      (Number(groceries) || 0) +
      (Number(transit) || 0) +
      (Number(buffer) || 0);
    const remaining = incomeValue - expenses;
    return { incomeValue, expenses, remaining };
  }, [income, rent, groceries, transit, buffer]);

  const submitCheckIn = (event: FormEvent) => {
    event.preventDefault();
    if (!mood) return;
    setEntries((current) =>
      [
        {
          id: `check-${Date.now()}`,
          mood,
          note: note.trim(),
          time: "Just now",
        },
        ...current,
      ].slice(0, 4),
    );
    setMood(null);
    setNote("");
  };

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((list) =>
      list.map((habit) => {
        if (habit.id !== habitId) return habit;
        const week = [...habit.week];
        week[dayIndex] = !week[dayIndex];
        return { ...habit, week };
      }),
    );
  };

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
    ["--toolkit-radius" as string]: brand.radius.lg,
    ["--toolkit-radius-md" as string]: brand.radius.md,
    ["--toolkit-space-8" as string]: brand.spacing[8],
    ["--toolkit-space-12" as string]: brand.spacing[12],
    ["--toolkit-space-20" as string]: brand.spacing[20],
    ["--toolkit-space-32" as string]: brand.spacing[32],
    ["--toolkit-sage" as string]: brand.colors.sage,
    ["--toolkit-clay" as string]: brand.colors.clay,
    ["--toolkit-mist" as string]: brand.colors.mist,
    ["--toolkit-charcoal" as string]: brand.colors.charcoal,
    ["--toolkit-hover" as string]: brand.colors.button.hoverTint,
  } as CSSProperties;

  const headingStyle: CSSProperties = {
    fontFamily: brand.typography.heading,
    color: brand.colors.charcoal,
  };

  const bodyStyle: CSSProperties = {
    fontFamily: brand.typography.body,
    color: brand.colors.charcoalSoft,
  };

  const mistCardStyle: CSSProperties = {
    borderRadius: brand.radius.lg,
    background: brand.colors.mist,
    boxShadow: brand.shadows.soft,
    color: brand.colors.charcoal,
    gap: brand.spacing[20],
    padding: brand.spacing[20],
  };

  return (
    <div className="container toolkit-page" style={pageStyle}>
      <header className="toolkit-header" style={{ gap: brand.spacing[12] }}>
        <h1 style={headingStyle}>Solo Living Toolkit</h1>
        <p style={bodyStyle}>
          Gentle structure for the day: notice how you feel, keep small habits
          moving, and see your budget with clear eyes.
        </p>
      </header>

      <div className="toolkit-grid" style={{ gap: brand.spacing[20] }}>
        {/* Daily emotional check-in */}
        <section
          className="toolkit-card"
          style={{ ...mistCardStyle, animationDelay: "0.05s" }}
          aria-labelledby="checkin-heading"
        >
          <header
            className="toolkit-card__header"
            style={{ gap: brand.spacing[12] }}
          >
            <span
              className="toolkit-card__icon"
              aria-hidden="true"
              style={{
                borderRadius: brand.radius.md,
                background: brand.colors.sageSoft,
                color: brand.colors.sageDeep,
                boxShadow: brand.shadows.xs,
              }}
            >
              <HeartIcon />
            </span>
            <div>
              <h2
                id="checkin-heading"
                className="toolkit-card__title"
                style={headingStyle}
              >
                Daily emotional check-in
              </h2>
              <p className="toolkit-card__lede" style={bodyStyle}>
                Name how you are landing. Pick an emoji, add a short note if you
                want — support without pressure to fix anything.
              </p>
            </div>
          </header>

          <form onSubmit={submitCheckIn}>
            <div
              className="toolkit-moods"
              role="group"
              aria-label="How are you feeling?"
              style={{ gap: brand.spacing[12] }}
            >
              {moodOptions.map((option) => {
                const selected = mood?.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`toolkit-mood${selected ? " is-selected" : ""}`}
                    aria-pressed={selected}
                    onClick={() => setMood(option)}
                    style={{
                      borderRadius: brand.radius.md,
                      padding: brand.spacing[12],
                      gap: brand.spacing[4],
                      background: selected
                        ? brand.colors.sage
                        : brand.colors.white,
                      color: brand.colors.charcoal,
                      borderColor: selected
                        ? brand.colors.sage
                        : brand.colors.clay,
                      boxShadow: selected
                        ? brand.shadows.soft
                        : brand.shadows.xs,
                      fontFamily: brand.typography.body,
                    }}
                  >
                    <span className="toolkit-mood__emoji" aria-hidden="true">
                      {option.emoji}
                    </span>
                    <span className="toolkit-mood__label">{option.label}</span>
                  </button>
                );
              })}
            </div>

            <label
              className="toolkit-note"
              style={{ marginTop: brand.spacing[20], gap: brand.spacing[8] }}
            >
              <span style={{ ...headingStyle, fontSize: "0.875rem" }}>
                Notes (optional)
              </span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="One gentle line about how you are arriving today…"
                style={{
                  borderRadius: brand.radius.md,
                  padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                  background: brand.colors.white,
                  color: brand.colors.charcoal,
                  borderColor: brand.colors.clay,
                  fontFamily: brand.typography.body,
                  boxShadow: brand.shadows.xs,
                }}
              />
            </label>

            <div style={{ marginTop: brand.spacing[20] }}>
              <Button
                type="submit"
                variant="primary"
                disabled={!mood}
                style={{ borderRadius: brand.radius.md }}
              >
                Save check-in
              </Button>
            </div>
          </form>

          {entries.length > 0 ? (
            <ul
              className="toolkit-entries"
              aria-label="Recent check-ins"
              style={{ gap: brand.spacing[12] }}
            >
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="toolkit-entry"
                  style={{
                    gap: brand.spacing[4],
                    padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                    borderRadius: brand.radius.md,
                    background: brand.colors.white,
                    boxShadow: brand.shadows.xs,
                    color: brand.colors.charcoal,
                  }}
                >
                  <div
                    className="toolkit-entry__meta"
                    style={{ gap: brand.spacing[8] }}
                  >
                    <span aria-hidden="true">{entry.mood.emoji}</span>
                    <strong style={headingStyle}>{entry.mood.label}</strong>
                    <span style={bodyStyle}>{entry.time}</span>
                  </div>
                  {entry.note ? (
                    <p style={{ ...bodyStyle, color: brand.colors.charcoal }}>
                      {entry.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {/* Habit tracker */}
        <section
          className="toolkit-card"
          style={{ ...mistCardStyle, animationDelay: "0.12s" }}
          aria-labelledby="habits-heading"
        >
          <header
            className="toolkit-card__header"
            style={{ gap: brand.spacing[12] }}
          >
            <span
              className="toolkit-card__icon"
              aria-hidden="true"
              style={{
                borderRadius: brand.radius.md,
                background: brand.colors.clay,
                color: brand.colors.charcoal,
                boxShadow: brand.shadows.xs,
              }}
            >
              <SparkIcon />
            </span>
            <div>
              <h2
                id="habits-heading"
                className="toolkit-card__title"
                style={headingStyle}
              >
                Habit tracker
              </h2>
              <p className="toolkit-card__lede" style={bodyStyle}>
                Mark the days you show up — sage and clay progress bars reflect
                a calm weekly rhythm, not a streak to protect.
              </p>
            </div>
          </header>

          <ul className="toolkit-habits" style={{ gap: brand.spacing[20] }}>
            {habits.map((habit) => {
              const doneCount = habit.week.filter(Boolean).length;
              const pct = Math.round((doneCount / habit.week.length) * 100);
              return (
                <li
                  key={habit.id}
                  className="toolkit-habit"
                  style={{ gap: brand.spacing[12] }}
                >
                  <div className="toolkit-habit__top">
                    <p
                      className="toolkit-habit__label"
                      style={{
                        fontFamily: brand.typography.body,
                        color: brand.colors.charcoal,
                      }}
                    >
                      {habit.label}
                    </p>
                    <span
                      className="toolkit-habit__pct"
                      style={{
                        fontFamily: brand.typography.body,
                        color: brand.colors.charcoal,
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    className="toolkit-progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                    aria-label={`${habit.label} weekly progress`}
                    style={{
                      borderRadius: brand.radius.pill,
                      background: brand.colors.clay,
                      boxShadow: brand.shadows.xs,
                    }}
                  >
                    <div
                      className="toolkit-progress__fill"
                      style={{
                        width: `${pct}%`,
                        borderRadius: brand.radius.pill,
                        background: `linear-gradient(90deg, ${brand.colors.sage}, ${brand.colors.clay})`,
                      }}
                    />
                  </div>
                  <div
                    className="toolkit-days"
                    role="group"
                    aria-label={habit.label}
                    style={{ gap: brand.spacing[8] }}
                  >
                    {DAYS.map((day, index) => {
                      const on = habit.week[index];
                      return (
                        <button
                          key={day}
                          type="button"
                          className={`toolkit-day${on ? " is-on" : ""}`}
                          aria-pressed={on}
                          onClick={() => toggleHabitDay(habit.id, index)}
                          style={{
                            borderRadius: brand.radius.md,
                            background: on
                              ? brand.colors.sage
                              : brand.colors.white,
                            color: brand.colors.charcoal,
                            borderColor: on
                              ? brand.colors.sage
                              : brand.colors.clay,
                            fontFamily: brand.typography.body,
                            boxShadow: brand.shadows.xs,
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Budgeting tool — mist cards, charcoal text */}
        <section
          className="toolkit-card toolkit-card--wide"
          style={{ ...mistCardStyle, animationDelay: "0.18s" }}
          aria-labelledby="budget-heading"
        >
          <header
            className="toolkit-card__header"
            style={{ gap: brand.spacing[12] }}
          >
            <span
              className="toolkit-card__icon"
              aria-hidden="true"
              style={{
                borderRadius: brand.radius.md,
                background: brand.colors.white,
                color: brand.colors.charcoal,
                boxShadow: brand.shadows.xs,
              }}
            >
              <WalletIcon />
            </span>
            <div>
              <h2
                id="budget-heading"
                className="toolkit-card__title"
                style={headingStyle}
              >
                Budgeting tool
              </h2>
              <p className="toolkit-card__lede" style={bodyStyle}>
                Enter a few monthly numbers. Mist cards keep your solo budget
                structured and easy to read in charcoal.
              </p>
            </div>
          </header>

          <div
            className="toolkit-budget-grid"
            style={{ gap: brand.spacing[20] }}
          >
            <form
              className="toolkit-budget-form"
              onSubmit={(e) => e.preventDefault()}
              style={{
                gap: brand.spacing[12],
                padding: brand.spacing[20],
                borderRadius: brand.radius.lg,
                background: brand.colors.mist,
                boxShadow: brand.shadows.soft,
                color: brand.colors.charcoal,
              }}
            >
              {(
                [
                  ["Monthly income", income, setIncome],
                  ["Rent / housing", rent, setRent],
                  ["Groceries", groceries, setGroceries],
                  ["Transit", transit, setTransit],
                  ["Safety buffer", buffer, setBuffer],
                ] as const
              ).map(([label, value, setter]) => (
                <label
                  key={label}
                  className="toolkit-field"
                  style={{ gap: brand.spacing[8] }}
                >
                  <span
                    style={{
                      fontFamily: brand.typography.body,
                      color: brand.colors.charcoal,
                    }}
                  >
                    {label}
                  </span>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={value}
                    onChange={(event) => setter(event.target.value)}
                    style={{
                      borderRadius: brand.radius.md,
                      padding: `${brand.spacing[8]} ${brand.spacing[12]}`,
                      background: brand.colors.white,
                      color: brand.colors.charcoal,
                      borderColor: brand.colors.clay,
                      fontFamily: brand.typography.body,
                      boxShadow: brand.shadows.xs,
                    }}
                  />
                </label>
              ))}
            </form>

            <aside
              className="toolkit-summary"
              aria-live="polite"
              style={{
                gap: brand.spacing[12],
                padding: brand.spacing[20],
                borderRadius: brand.radius.lg,
                background: brand.colors.mist,
                boxShadow: brand.shadows.soft,
                color: brand.colors.charcoal,
              }}
            >
              <h3 style={headingStyle}>Monthly summary</h3>
              <div className="toolkit-summary__row">
                <span style={bodyStyle}>Income</span>
                <strong style={headingStyle}>
                  {formatMoney(budget.incomeValue)}
                </strong>
              </div>
              <div className="toolkit-summary__row">
                <span style={bodyStyle}>Expenses + buffer</span>
                <strong style={headingStyle}>
                  {formatMoney(budget.expenses)}
                </strong>
              </div>
              <div
                className="toolkit-summary__row"
                data-tone={budget.remaining >= 0 ? "good" : "warn"}
              >
                <span style={bodyStyle}>Remaining</span>
                <strong style={headingStyle}>
                  {formatMoney(budget.remaining)}
                </strong>
              </div>
              <p className="toolkit-summary__note" style={bodyStyle}>
                {budget.remaining >= 0
                  ? "You have room this month. If it helps, set a little aside as a quiet cushion."
                  : "You are a bit over. Adjust one flexible line or the buffer until the stretch eases."}
              </p>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9.2C5 7.5 7.2 5.5 9.6 5.5c1.4 0 2.6.7 3.4 1.8.8-1.1 2-1.8 3.4-1.8C18.8 5.5 21 7.5 21 10.8 21 15.6 12 20 12 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M12 3.5 13.2 8l4.8 1.2L13.2 10.4 12 14.9l-1.2-4.5L6 9.2 10.8 8 12 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 14.5 19.1 16.5 21 17.1l-1.9.6-.6 2-.6-2-1.9-.6 1.9-.6.6-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <rect
        x="3.5"
        y="6"
        width="17"
        height="12.5"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3.5 10h17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="14.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default Toolkit;
