import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div className="container support-page">
      <header className="support-header">
        <h1>Support</h1>
        <p>
          Answers, a direct contact path, and safety resources — so you never
          have to figure solo living out completely alone.
        </p>
      </header>

      <section className="support-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">FAQ</h2>
        <p className="support-section__lede">
          Quick answers about safety, community, and getting around GoSolo.
        </p>
        <ul className="support-faq">
          {faqs.map((faq) => {
            const open = openFaq === faq.id;
            return (
              <li
                key={faq.id}
                className={`support-faq__item${open ? " is-open" : ""}`}
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
                >
                  <span>{faq.question}</span>
                  <span className="support-faq__icon" aria-hidden="true">
                    +
                  </span>
                </button>
                {open ? (
                  <div
                    className="support-faq__panel"
                    id={`${faq.id}-panel`}
                    role="region"
                    aria-labelledby={`${faq.id}-trigger`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="support-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact us</h2>
        <p className="support-section__lede">
          Send a note and we’ll follow up. For urgent safety issues, use the
          resources below first.
        </p>
        <div className="support-form-card">
          <form className="support-form" onSubmit={onSubmit} noValidate>
            {error ? <p className="support-error">{error}</p> : null}
            {sent ? (
              <p className="support-success" role="status">
                Thanks — your message is on its way. We’ll reply soon.
              </p>
            ) : null}

            <label className="support-field">
              <span>Name</span>
              <input
                id={`${formId}-name`}
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>

            <label className="support-field">
              <span>Email</span>
              <input
                id={`${formId}-email`}
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="support-field">
              <span>Topic</span>
              <select
                id={`${formId}-topic`}
                name="topic"
                value={topic}
                onChange={(event) =>
                  setTopic(event.target.value as (typeof topics)[number])
                }
              >
                {topics.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="support-field">
              <span>Message</span>
              <textarea
                id={`${formId}-message`}
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us what’s going on — as much or as little as you want."
                required
              />
            </label>

            <button type="submit" className="support-submit" disabled={pending}>
              {pending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </section>

      <section className="support-section" aria-labelledby="safety-heading">
        <h2 id="safety-heading">Safety resources</h2>
        <p className="support-section__lede">
          Keep these nearby. If you’re in immediate danger, contact local
          emergency services first.
        </p>
        <ul className="support-resources">
          {safetyResources.map((resource) => (
            <li key={resource.title} className="support-resource">
              <h3>{resource.title}</h3>
              <p>{resource.body}</p>
              {resource.external ? (
                <a
                  href={resource.href}
                  target={resource.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    resource.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  Open resource →
                </a>
              ) : (
                <Link to={resource.href}>Open resource →</Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <p className="support-footer">
        You can also visit the <Link to="/safety">Safety center</Link> or{" "}
        <Link to="/messages">Messages</Link> anytime.
      </p>
    </div>
  );
}

export default Support;
