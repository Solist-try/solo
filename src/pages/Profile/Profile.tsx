import { useAuth } from "../../auth";
import { Avatar, Button, Section, TextField } from "../../components/ui";
import styles from "./Profile.module.css";

export function Profile() {
  const { user } = useAuth();
  const name = user?.name ?? "Go Solo member";
  const interests = user?.onboarding?.interests ?? [];
  const goals = user?.onboarding?.goals ?? [];

  const highlights = [
    { label: "Goals set", value: String(goals.length || "—") },
    { label: "Interests", value: String(interests.length || "—") },
    {
      label: "Signed in via",
      value:
        user?.provider === "email"
          ? "Email"
          : user?.provider === "google"
            ? "Google"
            : user?.provider === "apple"
              ? "Apple"
              : "—",
    },
  ];

  return (
    <div className={`container page ${styles.page}`}>
      <header className={styles.heroBlock}>
        <Avatar name={name} size="lg" />
        <div>
          <p className={styles.kicker}>Your profile</p>
          <h1>{name}</h1>
          <p className={styles.bio}>
            {interests.length > 0
              ? interests.slice(0, 3).join(" · ")
              : "Your solo living path is taking shape."}
          </p>
        </div>
      </header>

      <div className={styles.stats} aria-label="Profile highlights">
        {highlights.map((item) => (
          <div key={item.label} className={styles.stat}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {goals.length > 0 || interests.length > 0 ? (
        <Section
          title="Onboarding snapshot"
          description="From the goals and interests you shared when you joined."
        >
          <div className={styles.chips}>
            {[...goals, ...interests].map((item) => (
              <span key={item} className={styles.chip}>
                {item}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      <Section
        title="About you"
        description="This is how the community sees your pace and preferences."
      >
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Display name"
            name="displayName"
            defaultValue={name}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            defaultValue={user?.email ?? ""}
            readOnly
          />
          <TextField
            label="Home base"
            name="homeBase"
            defaultValue="Portland, OR"
          />
          <label className={styles.textareaField}>
            <span>Bio</span>
            <textarea
              name="bio"
              rows={4}
              defaultValue="I plan short solo stretches to reset — usually near water, always with a good bakery stop."
            />
          </label>
          <div className={styles.actions}>
            <Button type="submit">Save profile</Button>
            <Button type="button" variant="ghost">
              Preview public view
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
}
