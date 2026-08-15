import { Checklist } from "./Checklist";
import type { ChecklistItem } from "../data";
import styles from "./DailyRoutine.module.css";

export type DailyRoutineProps = {
  morning: ChecklistItem[];
  evening: ChecklistItem[];
  onToggleMorning: (id: string) => void;
  onToggleEvening: (id: string) => void;
};

export function DailyRoutine({
  morning,
  evening,
  onToggleMorning,
  onToggleEvening,
}: DailyRoutineProps) {
  return (
    <div className={styles.routines}>
      <Checklist
        title="Morning routine"
        description="A soft start that does not demand a perfect day."
        items={morning}
        onToggle={onToggleMorning}
      />
      <Checklist
        title="Evening routine"
        description="Close the day gently so tomorrow feels less abrupt."
        items={evening}
        onToggle={onToggleEvening}
      />
    </div>
  );
}
