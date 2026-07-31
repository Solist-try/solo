import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SoftCurve,
  type ButtonVariant,
} from "../../components/ui";
import styles from "./DesignSystem.module.css";

const colorGroups = [
  {
    title: "Warm neutrals",
    swatches: [
      ["neutral-0", "var(--neutral-0)"],
      ["neutral-50", "var(--neutral-50)"],
      ["neutral-100", "var(--neutral-100)"],
      ["neutral-300", "var(--neutral-300)"],
      ["neutral-500", "var(--neutral-500)"],
      ["neutral-700", "var(--neutral-700)"],
      ["neutral-900", "var(--neutral-900)"],
    ],
  },
  {
    title: "Peach accent",
    swatches: [
      ["peach-50", "var(--peach-50)"],
      ["peach-100", "var(--peach-100)"],
      ["peach-300", "var(--peach-300)"],
      ["peach-500", "var(--peach-500)"],
      ["peach-700", "var(--peach-700)"],
    ],
  },
  {
    title: "Soft gold",
    swatches: [
      ["gold-100", "var(--gold-100)"],
      ["gold-300", "var(--gold-300)"],
      ["gold-400", "var(--gold-400)"],
      ["gold-500", "var(--gold-500)"],
    ],
  },
] as const;

const typeRows = [
  ["Hero", "type-hero", "Your own path, warmly lit."],
  ["H1", "type-h1", "Plan the stretch"],
  ["H2", "type-h2", "Find your people"],
  ["H3", "type-h3", "Travel with clarity"],
  ["H4", "type-h4", "Quiet mornings"],
  ["Body LG", "type-body-lg", "A calm home for independent travelers."],
  ["Body", "type-body", "Keep the signal warm without cluttering your week."],
  ["Label", "type-label", "Community circle"],
  ["Caption", "type-caption", "Updated for the next stretch"],
] as const;

const spaceSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "soft",
  "outline",
  "ghost",
  "danger",
];

export function DesignSystem() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className="type-label">Go Solo design system</p>
          <h1 className="type-h1">Warm neutrals, soft curves</h1>
          <p className="type-body-lg">
            Tokens, type, spacing, buttons, cards, and the curved motif that
            gives the product its rounded, welcoming feel.
          </p>
        </div>
        <SoftCurve tone="cream" />
      </header>

      <div className={`container ${styles.stack}`}>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Color tokens</h2>
            <p className="type-body-lg">
              Peach–gold accents on a warm neutral foundation.
            </p>
          </div>
          <div className={styles.colorGroups}>
            {colorGroups.map((group) => (
              <div key={group.title}>
                <h3 className="type-h4">{group.title}</h3>
                <div className={styles.swatches}>
                  {group.swatches.map(([name, value]) => (
                    <div key={name} className={styles.swatch}>
                      <span style={{ background: value }} />
                      <code>{name}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <SoftCurve variant="wave" tone="peach" />

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Typography scale</h2>
            <p className="type-body-lg">
              Fraunces for display moments, Outfit for UI and reading.
            </p>
          </div>
          <div className={styles.typeList}>
            {typeRows.map(([label, className, sample]) => (
              <div key={label} className={styles.typeRow}>
                <span className="type-caption">{label}</span>
                <p className={className}>{sample}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Spacing system</h2>
            <p className="type-body-lg">
              A 4px base scale from <code>--space-1</code> through{" "}
              <code>--space-12</code>.
            </p>
          </div>
          <div className={styles.spaceList}>
            {spaceSteps.map((step) => (
              <div key={step} className={styles.spaceRow}>
                <code>--space-{step}</code>
                <span
                  className={styles.spaceBar}
                  style={{ width: `var(--space-${step})` }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Button variants</h2>
            <p className="type-body-lg">
              Pill-shaped actions for primary work and quieter paths.
            </p>
          </div>
          <div className={styles.buttonGrid}>
            {buttonVariants.map((variant) => (
              <div key={variant} className={styles.buttonRow}>
                <span className="type-caption">{variant}</span>
                <div className={styles.buttonSizes}>
                  <Button variant={variant} size="sm">
                    Small
                  </Button>
                  <Button variant={variant} size="md">
                    Medium
                  </Button>
                  <Button variant={variant} size="lg">
                    Large
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Card components</h2>
            <p className="type-body-lg">
              Rounded containers for interactive clusters and content groups.
            </p>
          </div>
          <div className={styles.cardGrid}>
            <Card variant="elevated">
              <CardHeader
                eyebrow="Elevated"
                title="Quiet stay finder"
                description="A lifted surface for featured content."
              />
              <CardBody>
                Use when a block needs gentle separation from the page wash.
              </CardBody>
              <CardFooter>
                <Button size="sm">Open</Button>
                <Button size="sm" variant="ghost">
                  Save
                </Button>
              </CardFooter>
            </Card>

            <Card variant="soft">
              <CardHeader
                eyebrow="Soft"
                title="Morning stretch kit"
                description="A peach-tinted wash for emphasis."
              />
              <CardBody>
                Ideal for highlights and onboarding moments.
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="soft">
                  Preview
                </Button>
              </CardFooter>
            </Card>

            <Card variant="outline">
              <CardHeader
                eyebrow="Outline"
                title="Packing ritual"
                description="Border-only for lighter lists."
              />
              <CardBody>
                Keeps density low while still grouping related actions.
              </CardBody>
            </Card>

            <Card
              variant="interactive"
              role="button"
              tabIndex={0}
              onClick={() => undefined}
            >
              <CardHeader
                eyebrow="Interactive"
                title="Join a circle"
                description="Hover and focus states for clickable cards."
              />
              <CardBody>Reserved for user actions and navigation targets.</CardBody>
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Soft curved motif</h2>
            <p className="type-body-lg">
              Waves, blobs, arcs, and pills that echo the product’s rounded
              language.
            </p>
          </div>
          <div className={styles.motifGrid}>
            <Card variant="soft" padding="lg">
              <CardHeader title="Wave divider" description="Section transitions" />
              <SoftCurve tone="gold" />
            </Card>
            <Card variant="elevated" padding="lg">
              <CardHeader title="Blob" description="Decorative anchor" />
              <div className={styles.motifRow}>
                <SoftCurve variant="blob" tone="peach" />
                <SoftCurve variant="blob" tone="gold" />
              </div>
            </Card>
            <Card variant="outline" padding="lg">
              <CardHeader title="Arc & pill" description="Accent shapes" />
              <div className={styles.motifRow}>
                <SoftCurve variant="arc" tone="taupe" />
                <SoftCurve variant="pill" tone="peach" />
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
