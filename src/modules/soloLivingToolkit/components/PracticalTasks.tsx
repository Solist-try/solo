import { Checklist } from "./Checklist";
import type { ChecklistItem } from "../data";

export type PracticalTasksProps = {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
};

export function PracticalTasks({ items, onToggle }: PracticalTasksProps) {
  return (
    <Checklist
      title="Practical solo-living tasks"
      description="Household and life admin that keeps independence feeling supported."
      items={items}
      onToggle={onToggle}
    />
  );
}
