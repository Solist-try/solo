import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GOAL_OPTIONS, INTEREST_OPTIONS, useAuth } from "../auth";

const steps = [
  {
    key: "goals" as const,
    title: "What would support your solo path?",
    subtitle:
      "Choose what matters to you right now — you set the pace, and you can change this later.",
    options: GOAL_OPTIONS,
  },
  {
    key: "interests" as const,
    title: "What should we keep nearby?",
    subtitle:
      "We’ll quietly tune your feed, resources, and toolkit around these — nothing required.",
    options: INTEREST_OPTIONS,
  },
];

type StepKey = (typeof steps)[number]["key"];

export function Onboarding() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<StepKey, string[]>>({
    goals: [],
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
        challenges: [],
        interests: selections.interests,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save onboarding.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <Link to="/" className="auth-brand">
          Go<span>Solo</span>
        </Link>
        <p className="auth-welcome">
          Hi {user?.name?.split(" ")[0] ?? "there"} — shape a path that fits
          you.
        </p>

        <div
          className="auth-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Onboarding progress"
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="auth-step">
          Step {stepIndex + 1} of {steps.length}
        </p>

        <h1 className="auth-title">{step.title}</h1>
        <p className="auth-subtitle">{step.subtitle}</p>

        <div className="auth-options" role="group" aria-label={step.title}>
          {step.options.map((option) => {
            const active = selections[step.key].includes(option);
            return (
              <button
                key={option}
                type="button"
                className={`auth-option${active ? " is-selected" : ""}`}
                aria-pressed={active}
                onClick={() => toggle(option)}
              >
                {option}
              </button>
            );
          })}
        </div>

        {error ? <p className="auth-error">{error}</p> : null}

        <div className="auth-actions">
          {stepIndex > 0 ? (
            <button
              type="button"
              className="auth-ghost"
              onClick={() => {
                setError(null);
                setStepIndex((index) => index - 1);
              }}
            >
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            className="auth-submit"
            onClick={() => {
              void continueNext();
            }}
            disabled={pending}
          >
            {stepIndex === steps.length - 1
              ? pending
                ? "Saving…"
                : "Enter your space"
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
