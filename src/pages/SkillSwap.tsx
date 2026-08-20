import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { CommunitySubnav } from "../components/community/CommunitySubnav";
import {
  MatchScreen,
  SKILL_CATEGORIES,
  SkillBadgeDisplay,
  SkillCard,
  SkillOfferForm,
  SkillRequestForm,
  findSkillSwapMatches,
  loadSkillHub,
  postSkillMatch,
  postSkillOffer,
  postSkillRequest,
  skillBadgesSeed,
  type SkillOffer,
  type SkillRequest,
  type SkillSwapMatchView,
} from "../modules/skillSwap";
import { brand } from "../styles/brand-tokens";

export function SkillSwap() {
  const { user } = useAuth();
  const [offers, setOffers] = useState<SkillOffer[]>([]);
  const [requests, setRequests] = useState<SkillRequest[]>([]);
  const [accepted, setAccepted] = useState<SkillSwapMatchView[]>([]);
  const [badges] = useState(skillBadgesSeed);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const suggested = useMemo(
    () => findSkillSwapMatches(offers, requests),
    [offers, requests],
  );

  const refresh = async () => {
    setLoading(true);
    try {
      const hub = await loadSkillHub();
      setOffers(hub.offers);
      setRequests(hub.requests);
      setAccepted(hub.accepted);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

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
        <h1 style={headingStyle}>Skill Swap Hub</h1>
        <p style={bodyStyle}>
          A warm, community-first exchange for languages, photography, cooking,
          tech help, and local guidance — offer what you know, request what you
          need.
        </p>
      </header>

      <aside
        style={{
          display: "grid",
          gap: brand.spacing[12],
          padding: brand.spacing[20],
          borderRadius: brand.radius.lg,
          background: `linear-gradient(155deg, rgba(143,166,184,0.28), ${brand.colors.mist} 52%, rgba(183,196,178,0.3))`,
          boxShadow: brand.shadows.soft,
        }}
      >
        <h2 style={{ ...headingStyle, fontSize: "1.1rem", margin: 0 }}>
          Community-first boundaries
        </h2>
        <p style={{ ...bodyStyle, margin: 0 }}>
          Swaps stay supportive and non-romantic. Keep sessions timed and
          optional. Safety tools live on{" "}
          <Link
            to="/safety"
            style={{ color: brand.colors.sageDeep, fontWeight: 600 }}
          >
            Safety
          </Link>
          .
        </p>
      </aside>

      <section style={{ display: "grid", gap: brand.spacing[20] }}>
        <h2 style={headingStyle}>Skill areas</h2>
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
              skillName={category.id}
              description={category.blurb}
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
          onSubmit={async (input) => {
            const offer = await postSkillOffer(
              input,
              user?.id ?? "you",
              user?.name ?? "You",
            );
            setOffers((current) => [offer, ...current]);
            setStatus(`Offer posted for ${offer.skillName}.`);
          }}
        />
        <SkillRequestForm
          onSubmit={async (input) => {
            const request = await postSkillRequest(
              input,
              user?.id ?? "you",
              user?.name ?? "You",
            );
            setRequests((current) => [request, ...current]);
            setStatus(`Request posted for ${request.skillName}.`);
          }}
        />
      </div>

      {status ? (
        <p
          role="status"
          style={{
            ...bodyStyle,
            color: brand.colors.sageDeep,
            padding: brand.spacing[12],
            borderRadius: brand.radius.md,
            background: brand.colors.sageSoft,
          }}
        >
          {status}
        </p>
      ) : null}

      <section style={{ display: "grid", gap: brand.spacing[20] }}>
        <h2 style={headingStyle}>Open offers</h2>
        {loading && offers.length === 0 ? (
          <p style={bodyStyle}>Loading offers…</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: brand.spacing[20],
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {offers.map((offer) => (
              <SkillCard
                key={offer.id}
                skillName={offer.skillName}
                description={offer.description}
                kind="offer"
                userName={offer.userName}
                availability={offer.availability}
                location={offer.location}
              />
            ))}
          </div>
        )}
      </section>

      <section style={{ display: "grid", gap: brand.spacing[20] }}>
        <h2 style={headingStyle}>Open requests</h2>
        <div
          style={{
            display: "grid",
            gap: brand.spacing[20],
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {requests.map((request) => (
            <SkillCard
              key={request.id}
              skillName={request.skillName}
              description={request.description}
              kind="request"
              userName={request.userName}
              availability={request.availability}
              location={request.location}
              urgency={request.urgency}
            />
          ))}
        </div>
      </section>

      <MatchScreen
        title="Match screen"
        matches={suggested}
        onMatch={async (view) => {
          const result = await postSkillMatch({
            offerId: view.offer.id,
            requestId: view.request.id,
            status: "accepted",
          });
          setAccepted((current) => [
            {
              ...view,
              match: result.match,
              score: result.match.score ?? view.score,
            },
            ...current.filter(
              (item) =>
                !(
                  item.offer.id === view.offer.id &&
                  item.request.id === view.request.id
                ),
            ),
          ]);
          setStatus(
            result.notificationMessage ??
              `Matched ${view.offer.skillName} — both people notified.`,
          );
        }}
      />

      {accepted.length > 0 ? (
        <section style={{ display: "grid", gap: brand.spacing[20] }}>
          <h2 style={headingStyle}>Accepted swaps</h2>
          <div
            style={{
              display: "grid",
              gap: brand.spacing[12],
            }}
          >
            {accepted.map((view) => (
              <article
                key={`${view.offer.id}-${view.request.id}-accepted`}
                style={{
                  padding: brand.spacing[20],
                  borderRadius: brand.radius.lg,
                  background: brand.colors.mist,
                  boxShadow: brand.shadows.soft,
                  display: "grid",
                  gap: brand.spacing[8],
                }}
              >
                <strong style={headingStyle}>{view.offer.skillName}</strong>
                <p style={{ ...bodyStyle, margin: 0 }}>
                  {view.offer.userName ?? "Offerer"} ↔{" "}
                  {view.request.userName ?? "Requester"} ·{" "}
                  {view.match.status}
                </p>
              </article>
            ))}
          </div>
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
