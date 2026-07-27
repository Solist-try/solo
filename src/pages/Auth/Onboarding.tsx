import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CHALLENGE_OPTIONS,
  GOAL_OPTIONS,
  INTEREST_OPTIONS,
  useAuth,
} from "../../auth";
import { Button } from "../../components/ui";
import styles from "./Onboarding.module.css";

const steps = [
  {
    key: "goals",
    title: "What are your solo living goals?",
    subtitle: "Pick what you want more of — you can change these later.",
    options: GOAL_OPTIONS,
  },
  {
    key: "challenges",
    title: "What feels hardest right now?",
    subtitle: "Naming the challenge helps us suggest softer next steps.",
    options: CHALLENGE_OPTIONS,
  },
  {
    key: "interests",
    title: "What interests should we highlight?",
    subtitle: "We’ll tune your feed, resources, and toolkit around these.",
    options: INTEREST_OPTIONS,
  },
] as const;

type StepKey = (typeof steps)[number]["key"];

export function Onboarding() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<StepKey, string[]>>({
    goals: [],
    challenges: [],
    interests: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const step = steps[stepIndex];
  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / steps.length) * 100),
    [stepIndex],
  );

  const toggle = (value: string) => {
    setSelections((current) => {
      const list = current[step.key];
      const next = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...current, [step.key]: next };
    });
  };

  const continueNext = async () => {
    setError(null);
    if (selections[step.key].length === 0) {
      setError("Select at least one option to continue.");
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((index) => index + 1);
      return;
    }

    setPending(true);
    try {
      await completeOnboarding({
        goals: selections.goals,
        challenges: selections.challenges,
        interests: selections.interests,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save onboarding.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.brand}>Go Solo</p>
          <p className={styles.welcome}>
            Hi {user?.name?.split(" ")[0] ?? "there"} — let’s personalize your
            path.
          </p>
          <div
            className={styles.progress}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Onboarding progress"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.stepLabel}>
            Step {stepIndex + 1} of {steps.length}
          </p>
        </header>

        <section className={styles.card} key={step.key}>
          <h1>{step.title}</h1>
          <p className={styles.subtitle}>{step.subtitle}</p>

          <div className={styles.options} role="group" aria-label={step.title}>
            {step.options.map((option) => {
              const active = selections[step.key].includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  className={`${styles.option} ${active ? styles.optionActive : ""}`}
                  aria-pressed={active}
                  onClick={() => toggle(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {error ? <p className={styles.error}>{error}</p> : null}

          <div className={styles.actions}>
            {stepIndex > 0 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setError(null);
                  setStepIndex((index) => index - 1);
                }}
              >
                Back
              </Button>
            ) : (
              <span />
            )}
            <Button type="button" onClick={continueNext} disabled={pending}>
              {stepIndex === steps.length - 1
                ? pending
                  ? "Saving…"
                  : "Finish setup"
                : "Continue"}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
