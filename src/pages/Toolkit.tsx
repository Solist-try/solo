import { useMemo, useState, type FormEvent } from "react";

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

  return (
    <div className="container toolkit-page">
      <header className="toolkit-header">
        <h1>Solo Living Toolkit</h1>
        <p>
          Soft daily tools for emotional check-ins, habit momentum, and a clear
          look at your solo budget.
        </p>
      </header>

      <div className="toolkit-grid">
        {/* Emotional check-in */}
        <section
          className="toolkit-card"
          style={{ animationDelay: "0.05s" }}
          aria-labelledby="checkin-heading"
        >
          <header className="toolkit-card__header">
            <span className="toolkit-card__icon" aria-hidden="true">
              <HeartIcon />
            </span>
            <div>
              <h2 id="checkin-heading" className="toolkit-card__title">
                Daily emotional check-in
              </h2>
              <p className="toolkit-card__lede">
                Pick an emoji that fits, leave a note if you want — no fixing
                required.
              </p>
            </div>
          </header>

          <form onSubmit={submitCheckIn}>
            <div
              className="toolkit-moods"
              role="group"
              aria-label="How are you feeling?"
            >
              {moodOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`toolkit-mood${mood?.id === option.id ? " is-selected" : ""}`}
                  aria-pressed={mood?.id === option.id}
                  onClick={() => setMood(option)}
                >
                  <span className="toolkit-mood__emoji" aria-hidden="true">
                    {option.emoji}
                  </span>
                  <span className="toolkit-mood__label">{option.label}</span>
                </button>
              ))}
            </div>

            <label className="toolkit-note" style={{ marginTop: "1rem" }}>
              <span>Notes (optional)</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="One gentle sentence about how you’re arriving today…"
              />
            </label>

            <button
              type="submit"
              className="toolkit-btn"
              style={{ marginTop: "1rem" }}
              disabled={!mood}
            >
              Save check-in
            </button>
          </form>

          {entries.length > 0 ? (
            <ul className="toolkit-entries" aria-label="Recent check-ins">
              {entries.map((entry) => (
                <li key={entry.id} className="toolkit-entry">
                  <div className="toolkit-entry__meta">
                    <span aria-hidden="true">{entry.mood.emoji}</span>
                    <strong>{entry.mood.label}</strong>
                    <span>{entry.time}</span>
                  </div>
                  {entry.note ? <p>{entry.note}</p> : null}
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {/* Habit tracker */}
        <section
          className="toolkit-card"
          style={{ animationDelay: "0.12s" }}
          aria-labelledby="habits-heading"
        >
          <header className="toolkit-card__header">
            <span
              className="toolkit-card__icon"
              data-tone="gold"
              aria-hidden="true"
            >
              <SparkIcon />
            </span>
            <div>
              <h2 id="habits-heading" className="toolkit-card__title">
                Habit tracker
              </h2>
              <p className="toolkit-card__lede">
                Toggle days as you go — progress bars show the week’s rhythm.
              </p>
            </div>
          </header>

          <ul className="toolkit-habits">
            {habits.map((habit) => {
              const doneCount = habit.week.filter(Boolean).length;
              const pct = Math.round((doneCount / habit.week.length) * 100);
              return (
                <li key={habit.id} className="toolkit-habit">
                  <div className="toolkit-habit__top">
                    <p className="toolkit-habit__label">{habit.label}</p>
                    <span className="toolkit-habit__pct">{pct}%</span>
                  </div>
                  <div
                    className="toolkit-progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                    aria-label={`${habit.label} weekly progress`}
                  >
                    <div
                      className="toolkit-progress__fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="toolkit-days" role="group" aria-label={habit.label}>
                    {DAYS.map((day, index) => (
                      <button
                        key={day}
                        type="button"
                        className={`toolkit-day${habit.week[index] ? " is-on" : ""}`}
                        aria-pressed={habit.week[index]}
                        onClick={() => toggleHabitDay(habit.id, index)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Budgeting tool */}
        <section
          className="toolkit-card toolkit-card--wide"
          style={{ animationDelay: "0.18s" }}
          aria-labelledby="budget-heading"
        >
          <header className="toolkit-card__header">
            <span
              className="toolkit-card__icon"
              data-tone="taupe"
              aria-hidden="true"
            >
              <WalletIcon />
            </span>
            <div>
              <h2 id="budget-heading" className="toolkit-card__title">
                Budgeting tool
              </h2>
              <p className="toolkit-card__lede">
                Enter a few monthly numbers — the summary keeps your solo budget
                clear.
              </p>
            </div>
          </header>

          <div className="toolkit-budget-grid">
            <form className="toolkit-budget-form" onSubmit={(e) => e.preventDefault()}>
              <label className="toolkit-field">
                <span>Monthly income</span>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={income}
                  onChange={(event) => setIncome(event.target.value)}
                />
              </label>
              <label className="toolkit-field">
                <span>Rent / housing</span>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={rent}
                  onChange={(event) => setRent(event.target.value)}
                />
              </label>
              <label className="toolkit-field">
                <span>Groceries</span>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={groceries}
                  onChange={(event) => setGroceries(event.target.value)}
                />
              </label>
              <label className="toolkit-field">
                <span>Transit</span>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={transit}
                  onChange={(event) => setTransit(event.target.value)}
                />
              </label>
              <label className="toolkit-field">
                <span>Safety buffer</span>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={buffer}
                  onChange={(event) => setBuffer(event.target.value)}
                />
              </label>
            </form>

            <aside className="toolkit-summary" aria-live="polite">
              <h3>Monthly summary</h3>
              <div className="toolkit-summary__row">
                <span>Income</span>
                <strong>{formatMoney(budget.incomeValue)}</strong>
              </div>
              <div className="toolkit-summary__row">
                <span>Expenses + buffer</span>
                <strong>{formatMoney(budget.expenses)}</strong>
              </div>
              <div
                className="toolkit-summary__row"
                data-tone={budget.remaining >= 0 ? "good" : "warn"}
              >
                <span>Remaining</span>
                <strong>{formatMoney(budget.remaining)}</strong>
              </div>
              <p className="toolkit-summary__note">
                {budget.remaining >= 0
                  ? "You’re in the clear this month — consider parking a little of what’s left for a calm cushion."
                  : "You’re a bit over. Try trimming one flexible line or adjusting the buffer until the stretch eases."}
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
