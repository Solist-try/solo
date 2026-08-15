import { useId, useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import { brand } from "../styles/brand-tokens";

const faqs = [
  {
    id: "faq-1",
    question: "Is Go Solo a dating app?",
    answer:
      "No. Go Solo is for friendship, practical help, and emotional care — not flirting or romantic pursuit. Report anything that feels off.",
  },
  {
    id: "faq-2",
    question: "How do I report or block someone?",
    answer:
      "Use Report on a post, comment, or chat, or visit the Safety center. You can block a member anytime; they won’t appear in your feed or messages.",
  },
  {
    id: "faq-3",
    question: "Can I change my goals and interests later?",
    answer:
      "Yes. Update preferences anytime from your Profile, and revisit Resources or the Toolkit whenever your solo living rhythm shifts.",
  },
  {
    id: "faq-4",
    question: "Where can I find practical solo living guides?",
    answer:
      "Browse the Resources Library and Blog for checklists, housing tips, emotional care notes, and calm travel planning ideas.",
  },
  {
    id: "faq-5",
    question: "How quickly will support reply?",
    answer:
      "We aim to reply within 1–2 business days. If you’re in immediate danger, contact local emergency services first.",
  },
] as const;

const safetyResources = [
  {
    title: "GoSolo Safety center",
    body: "Community guidelines, report tools, and your blocked members list.",
    href: "/safety",
    external: false,
  },
  {
    title: "Local emergency services",
    body: "If you or someone else is in immediate danger, call your local emergency number right away.",
    href: "tel:911",
    external: true,
  },
  {
    title: "988 Suicide & Crisis Lifeline (US)",
    body: "Free, confidential support 24/7 for emotional distress or crisis moments.",
    href: "https://988lifeline.org/",
    external: true,
  },
  {
    title: "RAINN National Sexual Assault Hotline (US)",
    body: "Confidential support for survivors — chat and phone options available.",
    href: "https://www.rainn.org/",
    external: true,
  },
] as const;

const topics = [
  "Account help",
  "Safety concern",
  "Community feedback",
  "Technical issue",
  "Other",
] as const;

export function Support() {
  const formId = useId();
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof topics)[number]>(topics[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSent(false);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setSent(true);
      setMessage("");
    }, 450);
  };

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
    ["--support-radius" as string]: brand.radius.lg,
    ["--support-radius-md" as string]: brand.radius.md,
    ["--support-space-8" as string]: brand.spacing[8],
    ["--support-space-12" as string]: brand.spacing[12],
    ["--support-space-20" as string]: brand.spacing[20],
    ["--support-space-32" as string]: brand.spacing[32],
    ["--support-mist" as string]: brand.colors.mist,
    ["--support-sage" as string]: brand.colors.sage,
    ["--support-clay" as string]: brand.colors.clay,
    ["--support-charcoal" as string]: brand.colors.charcoal,
    ["--support-hover" as string]: brand.colors.button.hoverTint,
    ["--support-shadow" as string]: brand.shadows.soft,
    fontFamily: brand.typography.body,
    color: brand.colors.charcoal,
  } as CSSProperties;

  const headingStyle: CSSProperties = {
    fontFamily: brand.typography.heading,
    color: brand.colors.charcoal,
  };

  const bodyStyle: CSSProperties = {
    fontFamily: brand.typography.body,
    color: brand.colors.charcoalSoft,
    lineHeight: brand.typography.leading.relaxed,
  };

  const mistCardStyle: CSSProperties = {
    borderRadius: brand.radius.lg,
    background: brand.colors.mist,
    boxShadow: brand.shadows.soft,
    color: brand.colors.charcoal,
  };

  const fieldControlStyle: CSSProperties = {
    borderRadius: brand.radius.md,
    padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
    color: brand.colors.charcoal,
    boxShadow: brand.shadows.xs,
    fontFamily: brand.typography.body,
  };

  return (
    <div className="container support-page" style={pageStyle}>
      <header className="support-header" style={{ gap: brand.spacing[12] }}>
        <h1 style={headingStyle}>Support</h1>
        <p style={bodyStyle}>
          Answers, a direct contact path, and safety resources — so you never
          have to figure solo living out completely alone.
        </p>
      </header>

      <section
        className="support-section"
        aria-labelledby="faq-heading"
        style={{ gap: brand.spacing[20] }}
      >
        <h2 id="faq-heading" style={headingStyle}>
          FAQ
        </h2>
        <p className="support-section__lede" style={bodyStyle}>
          Quick answers about safety, community, and getting around GoSolo.
        </p>
        <ul className="support-faq" style={{ gap: brand.spacing[12] }}>
          {faqs.map((faq) => {
            const open = openFaq === faq.id;
            return (
              <li
                key={faq.id}
                className={`support-faq__item${open ? " is-open" : ""}`}
                style={{
                  ...mistCardStyle,
                  borderColor: open
                    ? "rgba(183, 196, 178, 0.55)"
                    : "rgba(199, 184, 174, 0.28)",
                }}
              >
                <button
                  type="button"
                  className="support-faq__trigger"
                  aria-expanded={open}
                  aria-controls={`${faq.id}-panel`}
                  id={`${faq.id}-trigger`}
                  onClick={() =>
                    setOpenFaq((current) =>
                      current === faq.id ? null : faq.id,
                    )
                  }
                  style={{
                    gap: brand.spacing[12],
                    padding: brand.spacing[20],
                    color: brand.colors.charcoal,
                    fontFamily: brand.typography.heading,
                  }}
                >
                  <span>{faq.question}</span>
                  <span
                    className="support-faq__icon"
                    aria-hidden="true"
                    style={{
                      borderRadius: brand.radius.md,
                      background: brand.colors.sage,
                      color: brand.colors.charcoal,
                      boxShadow: brand.shadows.xs,
                    }}
                  >
                    +
                  </span>
                </button>
                {open ? (
                  <div
                    className="support-faq__panel"
                    id={`${faq.id}-panel`}
                    role="region"
                    aria-labelledby={`${faq.id}-trigger`}
                    style={{
                      padding: `0 ${brand.spacing[20]} ${brand.spacing[20]}`,
                      ...bodyStyle,
                    }}
                  >
                    <p>{faq.answer}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section
        className="support-section"
        aria-labelledby="contact-heading"
        style={{ gap: brand.spacing[20] }}
      >
        <h2 id="contact-heading" style={headingStyle}>
          Contact us
        </h2>
        <p className="support-section__lede" style={bodyStyle}>
          Send a note and we’ll follow up. For urgent safety issues, use the
          resources below first.
        </p>
        <div
          className="support-form-card"
          style={{
            ...mistCardStyle,
            gap: brand.spacing[20],
            padding: brand.spacing[20],
          }}
        >
          <form
            className="support-form"
            onSubmit={onSubmit}
            noValidate
            style={{ gap: brand.spacing[12] }}
          >
            {error ? <p className="support-error">{error}</p> : null}
            {sent ? (
              <p className="support-success" role="status">
                Thanks — your message is on its way. We’ll reply soon.
              </p>
            ) : null}

            <label className="support-field" style={{ gap: brand.spacing[8] }}>
              <span style={{ color: brand.colors.charcoal }}>Name</span>
              <input
                id={`${formId}-name`}
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                style={fieldControlStyle}
              />
            </label>

            <label className="support-field" style={{ gap: brand.spacing[8] }}>
              <span style={{ color: brand.colors.charcoal }}>Email</span>
              <input
                id={`${formId}-email`}
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                style={fieldControlStyle}
              />
            </label>

            <label className="support-field" style={{ gap: brand.spacing[8] }}>
              <span style={{ color: brand.colors.charcoal }}>Topic</span>
              <select
                id={`${formId}-topic`}
                name="topic"
                value={topic}
                onChange={(event) =>
                  setTopic(event.target.value as (typeof topics)[number])
                }
                style={fieldControlStyle}
              >
                {topics.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="support-field" style={{ gap: brand.spacing[8] }}>
              <span style={{ color: brand.colors.charcoal }}>Message</span>
              <textarea
                id={`${formId}-message`}
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us what’s going on — as much or as little as you want."
                required
                style={fieldControlStyle}
              />
            </label>

            <Button type="submit" disabled={pending}>
              {pending ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </section>

      <section
        className="support-section"
        aria-labelledby="safety-heading"
        style={{ gap: brand.spacing[20] }}
      >
        <h2 id="safety-heading" style={headingStyle}>
          Safety resources
        </h2>
        <p className="support-section__lede" style={bodyStyle}>
          Keep these nearby. If you’re in immediate danger, contact local
          emergency services first.
        </p>
        <ul className="support-resources" style={{ gap: brand.spacing[12] }}>
          {safetyResources.map((resource) => (
            <li
              key={resource.title}
              className="support-resource"
              style={{
                ...mistCardStyle,
                gap: brand.spacing[8],
                padding: brand.spacing[20],
                borderLeft: `3px solid ${brand.colors.sage}`,
              }}
            >
              <h3 style={headingStyle}>{resource.title}</h3>
              <p style={bodyStyle}>{resource.body}</p>
              {resource.external ? (
                <a
                  href={resource.href}
                  target={resource.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    resource.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  style={{ color: brand.colors.sageDeep }}
                >
                  Open resource →
                </a>
              ) : (
                <Link to={resource.href} style={{ color: brand.colors.sageDeep }}>
                  Open resource →
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <p className="support-footer" style={bodyStyle}>
        You can also visit the{" "}
        <Link to="/safety" style={{ color: brand.colors.sageDeep }}>
          Safety center
        </Link>{" "}
        or{" "}
        <Link to="/messages" style={{ color: brand.colors.sageDeep }}>
          Messages
        </Link>{" "}
        anytime.
      </p>
    </div>
  );
}

export default Support;
