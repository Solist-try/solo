import { Avatar, Button, Section, TextField } from "../../components/ui";
import styles from "./Profile.module.css";

const highlights = [
  { label: "Trips logged", value: "12" },
  { label: "Circles joined", value: "4" },
  { label: "Guides saved", value: "9" },
];

export function Profile() {
  return (
    <div className={`container page ${styles.page}`}>
      <header className={styles.heroBlock}>
        <Avatar name="Alex Rivera" size="lg" />
        <div>
          <p className={styles.kicker}>Your profile</p>
          <h1>Alex Rivera</h1>
          <p className={styles.bio}>
            Coastal walker · Quiet mornings · Always packing light
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

      <Section
        title="About you"
        description="This is how the community sees your pace and preferences."
      >
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Display name"
            name="displayName"
            defaultValue="Alex Rivera"
          />
          <TextField
            label="Home base"
            name="homeBase"
            defaultValue="Portland, OR"
          />
          <TextField
            label="Travel style"
            name="style"
            defaultValue="Slow · Scenic · Solo-friendly cities"
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
