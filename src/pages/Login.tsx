import { useState, type CSSProperties, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { Button } from "../components/ui";
import { brand } from "../styles/brand-tokens";

export function Login() {
  const navigate = useNavigate();
  const { signInWithEmail, signInWithSocial } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const finish = (onboardingComplete: boolean) => {
    navigate(onboardingComplete ? "/" : "/onboarding", { replace: true });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const user = await signInWithEmail({ email, password });
      finish(user.onboardingComplete);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setPending(false);
    }
  };

  const onSocial = async (provider: "google" | "apple") => {
    setError(null);
    setPending(true);
    try {
      const user = await signInWithSocial(provider);
      finish(user.onboardingComplete);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Social sign-in failed.");
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
      <div className="auth-card" style={cardStyle}>
        <Link
          to="/login"
          className="auth-brand"
          style={{
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
          }}
        >
          Go<span style={{ color: brand.colors.sage }}>Solo</span>
        </Link>
        <h1 className="auth-title" style={headingStyle}>
          Welcome back
        </h1>
        <p className="auth-subtitle" style={bodyStyle}>
          Sign in when you are ready — your space stays yours. Go solo, not
          alone.
        </p>

        <form
          className="auth-form"
          onSubmit={onSubmit}
          style={{ gap: brand.spacing[20] }}
        >
          {error ? <p className="auth-error">{error}</p> : null}

          <label className="auth-field" style={{ gap: brand.spacing[8] }}>
            <span style={{ color: brand.colors.charcoal }}>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              style={{
                borderRadius: brand.radius.md,
                padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                color: brand.colors.charcoal,
                boxShadow: brand.shadows.xs,
              }}
            />
          </label>

          <label className="auth-field" style={{ gap: brand.spacing[8] }}>
            <span style={{ color: brand.colors.charcoal }}>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              style={{
                borderRadius: brand.radius.md,
                padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                color: brand.colors.charcoal,
                boxShadow: brand.shadows.xs,
              }}
            />
          </label>

          <Button type="submit" fullWidth disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="auth-divider" style={{ gap: brand.spacing[12] }}>
          <span>Or continue with</span>
        </div>

        <div
          className="auth-social"
          style={{ gap: brand.spacing[12] }}
        >
          <button
            type="button"
            className="auth-social__btn"
            disabled={pending}
            onClick={() => onSocial("google")}
            style={{
              borderRadius: brand.radius.md,
              padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
              background: brand.colors.white,
              color: brand.colors.charcoal,
              boxShadow: brand.shadows.xs,
            }}
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type="button"
            className="auth-social__btn"
            disabled={pending}
            onClick={() => onSocial("apple")}
            style={{
              borderRadius: brand.radius.md,
              padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
              background: brand.colors.white,
              color: brand.colors.charcoal,
              boxShadow: brand.shadows.xs,
            }}
          >
            <AppleIcon />
            Apple
          </button>
        </div>

        <p className="auth-footer" style={bodyStyle}>
          New here?{" "}
          <Link to="/signup" style={{ color: brand.colors.sageDeep }}>
            Create your space
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 11.5v3.2h4.5c-.2 1.1-1.5 3.3-4.5 3.3-2.7 0-4.9-2.2-4.9-5s2.2-5 4.9-5c1.5 0 2.6.7 3.2 1.2l2.2-2.1C16.2 5.6 14.3 4.7 12 4.7 7.9 4.7 4.5 8.1 4.5 12.2S7.9 19.7 12 19.7c4.1 0 6.8-2.9 6.8-6.9 0-.5 0-.8-.1-1.3H12Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.7 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1-.1 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.2-3.2ZM14.8 6.4c.6-.7 1-1.7.9-2.7-0.9.1-1.9.6-2.5 1.3-.6.6-1.1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z"
      />
    </svg>
  );
}

export default Login;
