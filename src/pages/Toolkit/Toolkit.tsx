import { useState } from "react";
import { Card } from "../../components/ui";
import {
  DailyRoutine,
  EmotionalCheckIn,
  HabitTracker,
  PracticalTasks,
  QuickTips,
  eveningRoutine,
  morningRoutine,
  practicalTasks,
  quickTips,
  starterHabits,
  type CheckInEntry,
  type ChecklistItem,
  type Habit,
} from "../../modules/soloLivingToolkit";
import styles from "./Toolkit.module.css";

function withDone(items: ChecklistItem[]): ChecklistItem[] {
  return items.map((item) => ({ ...item, done: Boolean(item.done) }));
}

function toggleItem(items: ChecklistItem[], id: string): ChecklistItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item,
  );
}

export function Toolkit() {
  const [morning, setMorning] = useState(() => withDone(morningRoutine));
  const [evening, setEvening] = useState(() => withDone(eveningRoutine));
  const [tasks, setTasks] = useState(() => withDone(practicalTasks));
  const [habits, setHabits] = useState<Habit[]>(() =>
    starterHabits.map((habit) => ({ ...habit, week: [...habit.week] })),
  );
  const [entries, setEntries] = useState<CheckInEntry[]>([]);

  const toggleHabit = (habitId: string, dayIndex: number) => {
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
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Solo Living Toolkit</h1>
        <p>
          Checklists, habit tracking, and quick tips for daily routines,
          emotional check-ins, and the practical work of living well on your own.
        </p>
      </header>

      <div className={styles.stack}>
        <Card variant="elevated" padding="lg" className={styles.panel}>
          <DailyRoutine
            morning={morning}
            evening={evening}
            onToggleMorning={(id) => setMorning((items) => toggleItem(items, id))}
            onToggleEvening={(id) => setEvening((items) => toggleItem(items, id))}
          />
        </Card>

        <div className={styles.split}>
          <Card variant="soft" padding="lg" className={styles.panel}>
            <EmotionalCheckIn
              entries={entries}
              onSubmit={({ mood, note }) =>
                setEntries((current) => [
                  {
                    id: `check-${Date.now()}`,
                    mood,
                    note,
                    time: "Just now",
                  },
                  ...current,
                ].slice(0, 5))
              }
            />
          </Card>

          <Card variant="elevated" padding="lg" className={styles.panel}>
            <PracticalTasks
              items={tasks}
              onToggle={(id) => setTasks((items) => toggleItem(items, id))}
            />
          </Card>
        </div>

        <Card variant="elevated" padding="lg" className={styles.panel}>
          <HabitTracker habits={habits} onToggle={toggleHabit} />
        </Card>

        <Card variant="outline" padding="lg" className={styles.panel}>
          <QuickTips tips={quickTips} />
        </Card>
      </div>
    </div>
  );
}
