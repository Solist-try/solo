import { useId, useState, type FormEvent } from "react";
import { Button } from "../../components/ui";
import { REPORT_REASONS } from "./guidelines";
import { useSafety } from "./useSafety";
import type { ReportReason, ReportTargetType } from "./types";
import styles from "./ReportModal.module.css";

export function ReportButton({
  targetType,
  targetId,
  targetLabel,
  className = "",
}: {
  targetType: ReportTargetType;
  targetId: string;
  targetLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${className}`.trim()}
        onClick={() => setOpen(true)}
      >
        Report
      </button>
      {open ? (
        <ReportModal
          targetType={targetType}
          targetId={targetId}
          targetLabel={targetLabel}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function ReportModal({
  targetType,
  targetId,
  targetLabel,
  onClose,
}: {
  targetType: ReportTargetType;
  targetId: string;
  targetLabel: string;
  onClose: () => void;
}) {
  const { submitReport } = useSafety();
  const titleId = useId();
  const [reason, setReason] = useState<ReportReason>(REPORT_REASONS[0]);
  const [details, setDetails] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitReport({
      targetType,
      targetId,
      targetLabel,
      reason,
      details,
    });
    setDone(true);
  };

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        {done ? (
          <div className={styles.success}>
            <h2 id={titleId}>Report received</h2>
            <p>
              Thanks for helping keep Go Solo supportive. Our safety review
              queue has your note.
            </p>
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit}>
            <h2 id={titleId}>Report content</h2>
            <p className={styles.lede}>
              Reporting <strong>{targetLabel}</strong>. Reports are private and
              reviewed with care.
            </p>

            <label className={styles.field}>
              <span>Reason</span>
              <select
                value={reason}
                onChange={(event) =>
                  setReason(event.target.value as ReportReason)
                }
              >
                {REPORT_REASONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Details (optional)</span>
              <textarea
                rows={3}
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder="Anything that helps reviewers understand the issue…"
              />
            </label>

            <div className={styles.actions}>
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit report</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
