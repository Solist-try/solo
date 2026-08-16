import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { CommunitySubnav } from "../components/community/CommunitySubnav";
import { Button } from "../components/ui";
import {
  SKILL_CATEGORIES,
  SkillBadgeDisplay,
  SkillCard,
  SkillMatchList,
  SkillOfferForm,
  SkillRequestForm,
  SkillSessionScheduler,
  findSkillMatches,
  skillBadgesSeed,
  skillListingsSeed,
  type SkillListing,
  type SkillMatch,
  type SkillSession,
} from "../modules/skillSwap";
import { brand } from "../styles/brand-tokens";

export function SkillSwap() {
  const { user } = useAuth();
  const [listings, setListings] = useState<SkillListing[]>(skillListingsSeed);
  const [badges, setBadges] = useState(skillBadgesSeed);
  const [sessions, setSessions] = useState<SkillSession[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<SkillMatch | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const matches = useMemo(() => findSkillMatches(listings), [listings]);

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
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

  return (
    <div className="container skill-swap-page" style={pageStyle}>
      <CommunitySubnav />

      <header style={{ display: "grid", gap: brand.spacing[12] }}>
        <h1 style={headingStyle}>Skill Swap</h1>
        <p style={bodyStyle}>
          Offer and request practical skills for solo living — cooking, budgeting,
          home fixes, emotional tools, digital safety, and travel planning.
        </p>
      </header>

      <aside
        style={{
          display: "grid",
          gap: brand.spacing[12],
          padding: brand.spacing[20],
          borderRadius: brand.radius.lg,
          background: `linear-gradient(155deg, rgba(183,196,178,0.35), ${brand.colors.mist} 50%, rgba(199,184,174,0.28))`,
          boxShadow: brand.shadows.soft,
        }}
      >
        <h2 style={{ ...headingStyle, fontSize: "1.1rem", margin: 0 }}>
          Safety & boundaries
        </h2>
        <p style={{ ...bodyStyle, margin: 0 }}>
          Swaps are supportive and non-romantic. Keep sessions timed, practical,
          and optional. Report or leave anytime via{" "}
          <Link to="/safety" style={{ color: brand.colors.sageDeep, fontWeight: 600 }}>
            Safety
          </Link>
          .
        </p>
      </aside>

      <section style={{ display: "grid", gap: brand.spacing[20] }}>
        <h2 style={headingStyle}>Skill categories</h2>
        <div
          style={{
            display: "grid",
            gap: brand.spacing[20],
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {SKILL_CATEGORIES.map((category) => (
            <SkillCard
              key={category.id}
              category={category.id}
              title={category.label}
              summary={category.blurb}
              kind="category"
            />
          ))}
        </div>
      </section>

      <div
        style={{
          display: "grid",
          gap: brand.spacing[20],
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          alignItems: "start",
        }}
      >
        <SkillOfferForm
          onSubmit={(input) => {
            setListings((current) => [
              {
                id: `offer-${Date.now()}`,
                kind: "offer",
                ownerId: user?.id ?? "you",
                ownerName: user?.name ?? "You",
                ...input,
              },
              ...current,
            ]);
            setStatus("Offer posted.");
          }}
        />
        <SkillRequestForm
          onSubmit={(input) => {
            setListings((current) => [
              {
                id: `req-${Date.now()}`,
                kind: "request",
                ownerId: user?.id ?? "you",
                ownerName: user?.name ?? "You",
                ...input,
              },
              ...current,
            ]);
            setStatus("Request posted.");
          }}
        />
      </div>

      {status ? (
        <p role="status" style={{ ...bodyStyle, color: brand.colors.sageDeep }}>
          {status}
        </p>
      ) : null}

      <section style={{ display: "grid", gap: brand.spacing[20] }}>
        <h2 style={headingStyle}>Open listings</h2>
        <div
          style={{
            display: "grid",
            gap: brand.spacing[20],
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {listings.map((listing) => (
            <SkillCard
              key={listing.id}
              category={listing.category}
              title={listing.title}
              summary={listing.summary}
              kind={listing.kind}
              ownerName={listing.ownerName}
              availability={listing.availability}
            />
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: brand.spacing[20] }}>
        <h2 style={headingStyle}>Matches (offer ↔ request)</h2>
        <div
          style={{
            display: "grid",
            gap: brand.spacing[20],
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            alignItems: "start",
          }}
        >
          <SkillMatchList matches={matches} onSchedule={setSelectedMatch} />
          <SkillSessionScheduler
            match={selectedMatch}
            onCancel={() => setSelectedMatch(null)}
            onSchedule={(session) => {
              setSessions((current) => [
                {
                  id: `session-${Date.now()}`,
                  status: "scheduled",
                  ...session,
                },
                ...current,
              ]);
              setBadges((current) =>
                current.map((badge) =>
                  badge.id === "badge-first"
                    ? { ...badge, earned: true, count: (badge.count ?? 0) + 1 }
                    : badge,
                ),
              );
              setSelectedMatch(null);
              setStatus(
                `Session scheduled (${session.mode}) for ${new Date(
                  session.when,
                ).toLocaleString()}.`,
              );
            }}
          />
        </div>
      </section>

      {sessions.length > 0 ? (
        <section style={{ display: "grid", gap: brand.spacing[12] }}>
          <h2 style={headingStyle}>Scheduled sessions</h2>
          <ul
            style={{
              display: "grid",
              gap: brand.spacing[12],
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {sessions.map((session) => (
              <li
                key={session.id}
                style={{
                  padding: brand.spacing[20],
                  borderRadius: brand.radius.lg,
                  background: brand.colors.mist,
                  boxShadow: brand.shadows.soft,
                }}
              >
                <strong>{session.mode === "chat" ? "In-app chat" : "Virtual"}</strong>
                {" · "}
                {new Date(session.when).toLocaleString()}
                {session.notes ? ` — ${session.notes}` : ""}
                <div style={{ marginTop: brand.spacing[12] }}>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSessions((current) =>
                        current.map((item) =>
                          item.id === session.id
                            ? { ...item, status: "completed" }
                            : item,
                        ),
                      );
                      setBadges((current) =>
                        current.map((badge) =>
                          badge.id === "badge-helper"
                            ? {
                                ...badge,
                                earned: true,
                                count: (badge.count ?? 0) + 1,
                              }
                            : badge,
                        ),
                      );
                      setStatus("Swap marked complete — reputation updated.");
                    }}
                  >
                    {session.status === "completed"
                      ? "Completed"
                      : "Mark complete"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section style={{ display: "grid", gap: brand.spacing[20] }}>
        <h2 style={headingStyle}>Reputation badges</h2>
        <SkillBadgeDisplay badges={badges} />
      </section>
    </div>
  );
}

export default SkillSwap;
