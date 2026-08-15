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
    title: "Brand palette",
    swatches: [
      ["soft-gold", "var(--brand-soft-gold)"],
      ["warm-taupe", "var(--brand-warm-taupe)"],
      ["mist-grey", "var(--brand-mist-grey)"],
      ["deep-charcoal", "var(--brand-deep-charcoal)"],
      ["summer-blue", "var(--brand-soft-summer-blue)"],
      ["accent-rose", "var(--brand-accent-rose)"],
    ],
  },
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
    title: "Accent rose",
    swatches: [
      ["rose-50", "var(--rose-50)"],
      ["rose-100", "var(--rose-100)"],
      ["rose-200", "var(--rose-200)"],
      ["rose-400", "var(--rose-400)"],
      ["rose-600", "var(--rose-600)"],
    ],
  },
  {
    title: "Soft gold & blue",
    swatches: [
      ["gold-100", "var(--gold-100)"],
      ["gold-200", "var(--gold-200)"],
      ["gold-400", "var(--gold-400)"],
      ["blue-100", "var(--blue-100)"],
      ["blue-300", "var(--blue-300)"],
      ["blue-500", "var(--blue-500)"],
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

const brandSpaceSteps = [4, 8, 12, 20, 32] as const;

const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "subtle",
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
          <h1 className="type-h1">Warm gold, mist, and soft rose</h1>
          <p className="type-body-lg">
            Tokens, type, spacing, and gentle curves that keep Go Solo calm and
            welcoming.
          </p>
        </div>
        <SoftCurve tone="cream" />
      </header>

      <div className={`container ${styles.stack}`}>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Color tokens</h2>
            <p className="type-body-lg">
              Soft gold, warm taupe, mist grey, charcoal, summer blue, and
              accent rose — a calm, grounded palette.
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
              GoSoloSerif for headings, GoSoloSans for body and UI.
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
            <h2 className="type-h2">Brand spacing scale</h2>
            <p className="type-body-lg">
              Core rhythm: <code>4 · 8 · 12 · 20 · 32</code> (
              <code>--space-brand-*</code>).
            </p>
          </div>
          <div className={styles.spaceList}>
            {brandSpaceSteps.map((step) => (
              <div key={step} className={styles.spaceRow}>
                <code>
                  --space-brand-{step} · {step}px
                </code>
                <span
                  className={styles.spaceBar}
                  style={{ width: `var(--space-brand-${step})` }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Button variants</h2>
            <p className="type-body-lg">
              Primary gold, secondary taupe, and subtle mist grey — plus soft
              rose highlights. Focus rings use Soft Summer Blue.
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
              Soft shadows and 12–14px curved corners for calm, tactile
              surfaces. Highlights use Accent Rose; focus uses Soft Summer Blue.
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
                description="A rose-tinted wash for emphasis."
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
