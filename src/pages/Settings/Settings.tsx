import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { Button, Section, TextField, Toggle } from "../../components/ui";
import styles from "./Settings.module.css";

type Prefs = {
  emailDigest: boolean;
  circleNudges: boolean;
  publicProfile: boolean;
};

export function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<Prefs>({
    emailDigest: true,
    circleNudges: true,
    publicProfile: false,
  });

  const update = (key: keyof Prefs) => (value: boolean) =>
    setPrefs((current) => ({ ...current, [key]: value }));

  return (
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Settings</h1>
        <p>Tune notifications, visibility, and account basics for Go Solo.</p>
      </header>

      <Section
        title="Preferences"
        description="Keep the signal warm without cluttering your week."
      >
        <ul className={styles.prefs}>
          <li>
            <div>
              <strong>Weekly digest</strong>
              <p>A short Sunday note with circles and saved guides.</p>
            </div>
            <Toggle
              label="Weekly digest"
              checked={prefs.emailDigest}
              onChange={update("emailDigest")}
            />
          </li>
          <li>
            <div>
              <strong>Circle nudges</strong>
              <p>Gentle reminders when someone replies in your circles.</p>
            </div>
            <Toggle
              label="Circle nudges"
              checked={prefs.circleNudges}
              onChange={update("circleNudges")}
            />
          </li>
          <li>
            <div>
              <strong>Public profile</strong>
              <p>Allow other members to find you by display name.</p>
            </div>
            <Toggle
              label="Public profile"
              checked={prefs.publicProfile}
              onChange={update("publicProfile")}
            />
          </li>
        </ul>
      </Section>

      <Section
        title="Safety"
        description="Guidelines, blocked members, and reports."
      >
        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={() => navigate("/safety")}>
            Open safety center
          </Button>
        </div>
      </Section>

      <Section
        title="Account"
        description="Update the email tied to your Go Solo membership."
      >
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Email"
            type="email"
            name="email"
            defaultValue={user?.email ?? ""}
            readOnly
          />
          <TextField
            label="Timezone"
            name="timezone"
            defaultValue="America/Los_Angeles"
            hint="Used for digest timing and local event suggestions."
          />
          <div className={styles.actions}>
            <Button type="submit">Save settings</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                signOut();
                navigate("/login", { replace: true });
              }}
            >
              Sign out
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
}
