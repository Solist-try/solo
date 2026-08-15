import { Button } from "../ui";
import styles from "./SocialLogin.module.css";

export function SocialLogin({
  onGoogle,
  onApple,
  pending,
}: {
  onGoogle: () => void;
  onApple: () => void;
  pending?: boolean;
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.divider}>
        <span>Or continue with</span>
      </div>
      <div className={styles.row}>
        <Button
          type="button"
          variant="secondary"
          fullWidth
          disabled={pending}
          onClick={onGoogle}
        >
          <GoogleIcon />
          Google
        </Button>
        <Button
          type="button"
          variant="secondary"
          fullWidth
          disabled={pending}
          onClick={onApple}
        >
          <AppleIcon />
          Apple
        </Button>
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
