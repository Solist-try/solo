import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SoftCurve,
  type ButtonVariant,
} from "../../components/ui";
import {
  buttons as brandButtons,
  colors,
  spacing,
  typography,
} from "../../styles/brand-tokens";
import styles from "./DesignSystem.module.css";

const colorGroups = [
  {
    title: "Core brand",
    swatches: [
      ["sage", colors.sage],
      ["mist", colors.mist],
      ["clay", colors.clay],
      ["charcoal", colors.charcoal],
    ],
  },
  {
    title: "Brand palette",
    swatches: [
      ["sage-green", colors.sageGreen],
      ["mist-grey", colors.mistGrey],
      ["clay-beige", colors.clayBeige],
      ["deep-charcoal", colors.deepCharcoal],
      ["soft-gold", colors.softGold],
      ["summer-blue", colors.softSummerBlue],
      ["accent-rose", colors.accentRose],
    ],
  },
  {
    title: "Warm neutrals",
    swatches: [
      ["white", colors.white],
      ["mist-soft", colors.mistSoft],
      ["mist-deep", colors.mistDeep],
      ["charcoal-soft", colors.charcoalSoft],
      ["sage-soft", colors.sageSoft],
      ["sage-deep", colors.sageDeep],
    ],
  },
  {
    title: "Supporting accents",
    swatches: [
      ["rose-soft", colors.roseSoft],
      ["rose-deep", colors.roseDeep],
      ["gold-soft", colors.goldSoft],
      ["gold-deep", colors.goldDeep],
      ["blue-soft", colors.blueSoft],
      ["blue-deep", colors.blueDeep],
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
          <h1 className="type-h1" style={{ fontFamily: typography.fontHeading }}>
            Sage, mist, and clay
          </h1>
          <p className="type-body-lg" style={{ fontFamily: typography.fontBody }}>
            Tokens from <code>brand-tokens.ts</code> — spacing, type, and gentle
            curves that keep Go Solo calm and welcoming.
          </p>
        </div>
        <SoftCurve tone="mist" />
      </header>

      <div className={`container ${styles.stack}`}>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Color tokens</h2>
            <p className="type-body-lg">
              Sage {colors.sage}, mist {colors.mist}, clay {colors.clay}, and
              charcoal {colors.charcoal} — a calm, grounded palette.
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
                      <code>
                        {name} · {value}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <SoftCurve variant="wave" tone="sage" />

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Typography scale</h2>
            <p className="type-body-lg">
              Heading and body share IBM Plex Sans via brand tokens (
              {typography.fontHeading.split(",")[0].replace(/"/g, "")}).
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
              Soft rhythm: <code>4 · 8 · 12 · 20 · 32</code> (
              <code>--space-brand-*</code>).
            </p>
          </div>
          <div className={styles.spaceList}>
            {brandSpaceSteps.map((step) => (
              <div key={step} className={styles.spaceRow}>
                <code>
                  --space-brand-{step} · {spacing[step]}
                </code>
                <span
                  className={styles.spaceBar}
                  style={{ width: spacing[step] }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Corner radius</h2>
            <p className="type-body-lg">
              Soft rounded corners stay in a calm 10–14px range for surfaces and
              controls.
            </p>
          </div>
          <div className={styles.spaceList}>
            {(
              [
                ["sm", "10px"],
                ["md", "12px"],
                ["lg", "14px"],
              ] as const
            ).map(([name, px]) => (
              <div key={name} className={styles.spaceRow}>
                <code>
                  --radius-{name} · {px}
                </code>
                <span
                  className={styles.spaceBar}
                  style={{
                    width: "4.5rem",
                    height: "2.25rem",
                    borderRadius: `var(--radius-${name})`,
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className="type-h2">Button variants</h2>
            <p className="type-body-lg">
              {brandButtons.primary.label}, {brandButtons.secondary.label}, and{" "}
              {brandButtons.subtle.label} — soft clay hover tints from
              brand-tokens.
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
              surfaces.
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
                description="A soft wash for emphasis."
              />
              <CardBody>Ideal for highlights and onboarding moments.</CardBody>
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
              Waves, blobs, arcs, and pills filled from brand-tokens.
            </p>
          </div>
          <div className={styles.motifGrid}>
            <Card variant="soft" padding="lg">
              <CardHeader title="Wave divider" description="Section transitions" />
              <SoftCurve tone="sage" />
            </Card>
            <Card variant="elevated" padding="lg">
              <CardHeader title="Blob" description="Decorative anchor" />
              <div className={styles.motifRow}>
                <SoftCurve variant="blob" tone="mist" />
                <SoftCurve variant="blob" tone="clay" />
              </div>
            </Card>
            <Card variant="outline" padding="lg">
              <CardHeader title="Arc & pill" description="Accent shapes" />
              <div className={styles.motifRow}>
                <SoftCurve variant="arc" tone="taupe" />
                <SoftCurve variant="pill" tone="gold" />
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
