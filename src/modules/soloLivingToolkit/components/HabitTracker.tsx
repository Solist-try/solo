import { useId } from "react";
import { dayLabels, type Habit } from "../data";
import styles from "./HabitTracker.module.css";

export type HabitTrackerProps = {
  habits: Habit[];
  onToggle: (habitId: string, dayIndex: number) => void;
};

export function HabitTracker({ habits, onToggle }: HabitTrackerProps) {
  const headingId = useId();

  return (
    <section className={styles.tracker} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h3 id={headingId}>Habit tracker</h3>
        <p>Tap a day to mark it — keep the streak soft, not strict.</p>
      </header>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.habitCol}>
                Habit
              </th>
              {dayLabels.map((day) => (
                <th key={day} scope="col">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <th scope="row">{habit.label}</th>
                {habit.week.map((done, index) => (
                  <td key={`${habit.id}-${index}`}>
                    <button
                      type="button"
                      className={`${styles.day} ${done ? styles.dayOn : ""}`}
                      aria-pressed={done}
                      aria-label={`${habit.label} on ${dayLabels[index]}`}
                      onClick={() => onToggle(habit.id, index)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
