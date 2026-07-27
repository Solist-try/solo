import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { SocialLogin } from "../../components/auth/SocialLogin";
import { Button, TextField } from "../../components/ui";
import formStyles from "../../components/auth/authShared.module.css";

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

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your solo living path — go solo, not alone."
      footer={
        <>
          New here? <Link to="/signup">Create an account</Link>
        </>
      }
    >
      <form className={formStyles.form} onSubmit={onSubmit}>
        {error ? <p className={formStyles.error}>{error}</p> : null}
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <div className={formStyles.actions}>
          <Button type="submit" fullWidth disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </div>
      </form>

      <SocialLogin
        pending={pending}
        onGoogle={() => onSocial("google")}
        onApple={() => onSocial("apple")}
      />
    </AuthLayout>
  );
}
