import { useMemo, useState, type CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GOAL_OPTIONS, INTEREST_OPTIONS, useAuth } from "../auth";
import { Button } from "../components/ui";
import { brand } from "../styles/brand-tokens";

const steps = [
  {
    key: "goals" as const,
    title: "What are your solo living goals?",
    subtitle:
      "Choose what would support you right now — you set the pace, and you can change this later.",
    options: GOAL_OPTIONS,
  },
  {
    key: "interests" as const,
    title: "Which interests should we keep nearby?",
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

  const pageStyle = {
    ["--auth-radius" as string]: brand.radius.lg,
    ["--auth-radius-md" as string]: brand.radius.md,
    ["--auth-space-8" as string]: brand.spacing[8],
    ["--auth-space-12" as string]: brand.spacing[12],
    ["--auth-space-20" as string]: brand.spacing[20],
    ["--auth-space-32" as string]: brand.spacing[32],
    ["--auth-sage" as string]: brand.colors.sage,
    ["--auth-mist" as string]: brand.colors.mist,
    ["--auth-clay" as string]: brand.colors.clay,
    ["--auth-charcoal" as string]: brand.colors.charcoal,
    ["--auth-hover" as string]: brand.colors.button.hoverTint,
    ["--auth-shadow" as string]: brand.shadows.lift,
    ["--auth-shadow-soft" as string]: brand.shadows.soft,
    padding: `${brand.spacing[32]} ${brand.spacing[20]} ${brand.spacingSteps[8]}`,
    fontFamily: brand.typography.body,
  } as CSSProperties;

  const cardStyle: CSSProperties = {
    gap: brand.spacing[20],
    padding: `${brand.spacing[32]} ${brand.spacing[20]} ${brand.spacing[20]}`,
    borderRadius: brand.radius.lg,
    background: brand.colors.mist,
    boxShadow: brand.shadows.lift,
    color: brand.colors.charcoal,
  };

  const headingStyle: CSSProperties = {
    fontFamily: brand.typography.heading,
    color: brand.colors.charcoal,
    fontWeight: brand.typography.weight.semibold,
    letterSpacing: brand.typography.tracking.tight,
    lineHeight: brand.typography.leading.snug,
  };

  const bodyStyle: CSSProperties = {
    fontFamily: brand.typography.body,
    color: brand.colors.charcoalSoft,
    lineHeight: brand.typography.leading.relaxed,
  };

  return (
    <div className="auth-page" style={pageStyle}>
      <div className="auth-card auth-card--wide" style={cardStyle}>
        <Link
          to="/"
          className="auth-brand"
          style={{
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
          }}
        >
          Go<span style={{ color: brand.colors.sage }}>Solo</span>
        </Link>
        <p
          className="auth-welcome"
          style={{
            fontFamily: brand.typography.body,
            color: brand.colors.charcoalSoft,
          }}
        >
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
          style={{
            borderRadius: brand.radius.pill,
            background: brand.colors.mistDeep,
            boxShadow: brand.shadows.xs,
          }}
        >
          <span
            style={{
              width: `${progress}%`,
              borderRadius: brand.radius.pill,
              background: brand.colors.sage,
            }}
          />
        </div>
        <p
          className="auth-step"
          style={{
            fontFamily: brand.typography.body,
            color: brand.colors.sageDeep,
            letterSpacing: brand.typography.tracking.wide,
          }}
        >
          Step {stepIndex + 1} of {steps.length}
        </p>

        <h1 className="auth-title" style={headingStyle}>
          {step.title}
        </h1>
        <p className="auth-subtitle" style={bodyStyle}>
          {step.subtitle}
        </p>

        <div
          className="auth-options"
          role="group"
          aria-label={step.title}
          style={{ gap: brand.spacing[12] }}
        >
          {step.options.map((option) => {
            const active = selections[step.key].includes(option);
            return (
              <button
                key={option}
                type="button"
                className={`auth-option${active ? " is-selected" : ""}`}
                aria-pressed={active}
                onClick={() => toggle(option)}
                style={{
                  borderRadius: brand.radius.md,
                  padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                  background: active ? brand.colors.sage : brand.colors.white,
                  color: brand.colors.charcoal,
                  boxShadow: active ? brand.shadows.soft : brand.shadows.xs,
                  fontFamily: brand.typography.body,
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {error ? <p className="auth-error">{error}</p> : null}

        <div
          className="auth-actions"
          style={{ gap: brand.spacing[12], marginTop: brand.spacing[4] }}
        >
          {stepIndex > 0 ? (
            <Button
              type="button"
              variant="secondary"
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
          <Button
            type="button"
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
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
