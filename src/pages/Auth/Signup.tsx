import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { SocialLogin } from "../../components/auth/SocialLogin";
import { Button, TextField } from "../../components/ui";
import formStyles from "../../components/auth/authShared.module.css";

export function Signup() {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithSocial } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const goOnboarding = () => navigate("/onboarding", { replace: true });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      await signUpWithEmail({ name, email, password });
      goOnboarding();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setPending(false);
    }
  };

  const onSocial = async (provider: "google" | "apple") => {
    setError(null);
    setPending(true);
    try {
      const user = await signInWithSocial(provider);
      navigate(user.onboardingComplete ? "/" : "/onboarding", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Social sign-up failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthLayout
      title="Create your space"
      subtitle="Email and password to start — or continue with a social account."
      footer={
        <>
          Already a member? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form className={formStyles.form} onSubmit={onSubmit}>
        {error ? <p className={formStyles.error}>{error}</p> : null}
        <TextField
          label="Display name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
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
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          hint="At least 8 characters."
          required
          minLength={8}
        />
        <div className={formStyles.actions}>
          <Button type="submit" fullWidth disabled={pending}>
            {pending ? "Creating account…" : "Create account"}
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
