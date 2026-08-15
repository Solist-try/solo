import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import {
  COMMUNITY_GUIDELINES,
  ReportButton,
  useSafety,
} from "../modules/safety";
import { brand } from "../styles/brand-tokens";

export function Safety() {
  const { blockedUsers, unblockUser } = useSafety();

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
    ["--safety-radius" as string]: brand.radius.lg,
    ["--safety-radius-md" as string]: brand.radius.md,
    ["--safety-space-8" as string]: brand.spacing[8],
    ["--safety-space-12" as string]: brand.spacing[12],
    ["--safety-space-20" as string]: brand.spacing[20],
    ["--safety-space-32" as string]: brand.spacing[32],
    ["--safety-mist" as string]: brand.colors.mist,
    ["--safety-sage" as string]: brand.colors.sage,
    ["--safety-clay" as string]: brand.colors.clay,
    ["--safety-charcoal" as string]: brand.colors.charcoal,
    ["--safety-hover" as string]: brand.colors.button.hoverTint,
    ["--safety-shadow" as string]: brand.shadows.soft,
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
    gap: brand.spacing[20],
    padding: brand.spacing[20],
    borderRadius: brand.radius.lg,
    background: brand.colors.mist,
    boxShadow: brand.shadows.soft,
    color: brand.colors.charcoal,
  };

  return (
    <div className="container safety-page" style={pageStyle}>
      <header
        className="safety-header"
        style={{ gap: brand.spacing[12] }}
      >
        <h1 style={headingStyle}>Safety & Guidelines</h1>
        <p style={bodyStyle}>
          Clear community standards, a simple report path, and your blocked
          members — tools to keep Go Solo supportive and non-romantic.
        </p>
      </header>

      <section
        className="safety-section"
        aria-labelledby="guidelines-heading"
        style={{ gap: brand.spacing[20] }}
      >
        <h2 id="guidelines-heading" style={headingStyle}>
          Community guidelines
        </h2>
        <p className="safety-section__lede" style={bodyStyle}>
          These keep the space kind, practical, and free of romantic pressure.
        </p>
        <ol className="safety-guidelines" style={{ gap: brand.spacing[12] }}>
          {COMMUNITY_GUIDELINES.map((item, index) => (
            <li
              key={item.title}
              className="safety-guideline"
              style={{
                ...mistCardStyle,
                gap: brand.spacing[12],
                animationDelay: `${0.04 + index * 0.05}s`,
              }}
            >
              <span
                className="safety-guideline__index"
                aria-hidden="true"
                style={{
                  borderRadius: brand.radius.md,
                  background: brand.colors.sageSoft,
                  color: brand.colors.charcoal,
                  boxShadow: brand.shadows.xs,
                }}
              />
              <div style={{ display: "grid", gap: brand.spacing[8] }}>
                <h3 style={headingStyle}>{item.title}</h3>
                <p style={bodyStyle}>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="safety-section"
        aria-labelledby="report-heading"
        style={{ gap: brand.spacing[20] }}
      >
        <h2 id="report-heading" style={headingStyle}>
          Report something
        </h2>
        <div
          className="safety-report-card"
          style={{
            ...mistCardStyle,
            gap: brand.spacing[20],
          }}
        >
          <p style={bodyStyle}>
            If a post, message, or member crosses a line, submit a report. You
            never owe a long explanation — a reason is enough.
          </p>
          <ReportButton
            targetType="post"
            targetId="safety-center-general"
            targetLabel="General community concern"
            className="safety-report-btn"
          />
        </div>
      </section>

      <section
        className="safety-section"
        aria-labelledby="blocked-heading"
        style={{ gap: brand.spacing[20] }}
      >
        <h2 id="blocked-heading" style={headingStyle}>
          Blocked members
        </h2>
        <p className="safety-section__lede" style={bodyStyle}>
          People you’ve blocked won’t appear in your feed or message list.
        </p>
        {blockedUsers.length === 0 ? (
          <p
            className="safety-empty"
            style={{
              ...mistCardStyle,
              ...bodyStyle,
            }}
          >
            You haven’t blocked anyone. You can block from posts or chats when
            needed.
          </p>
        ) : (
          <ul className="safety-blocked" style={{ gap: brand.spacing[12] }}>
            {blockedUsers.map((person) => (
              <li
                key={person.id}
                className="safety-blocked__item"
                style={{
                  gap: brand.spacing[12],
                  padding: brand.spacing[20],
                  borderRadius: brand.radius.lg,
                  background: brand.colors.mist,
                  boxShadow: brand.shadows.soft,
                }}
              >
                <div style={{ display: "grid", gap: brand.spacing[4] }}>
                  <strong style={headingStyle}>{person.name}</strong>
                  <span style={bodyStyle}>
                    Blocked{" "}
                    {new Date(person.blockedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => unblockUser(person.id)}
                >
                  Unblock
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="safety-footer" style={bodyStyle}>
        Need another path? Visit{" "}
        <Link to="/messages" style={{ color: brand.colors.sageDeep }}>
          Messages
        </Link>{" "}
        or{" "}
        <Link to="/community" style={{ color: brand.colors.sageDeep }}>
          Community
        </Link>{" "}
        — report and block controls are also on each card and chat.
      </p>
    </div>
  );
}

export default Safety;
