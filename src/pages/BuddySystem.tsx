import { useEffect, useState, type CSSProperties } from "react";
import { CommunitySubnav } from "../components/community/CommunitySubnav";
import {
  BuddyChat,
  BuddyMatchCard,
  BuddyProgressTracker,
  BuddySafetyNotice,
  FindBuddyFilters,
  MatchConfirmationModal,
  acceptBuddyRequest,
  createActiveConnection,
  defaultBuddyPreferences,
  fetchBuddyRecommendations,
  sendBuddyRequest,
  type ActiveBuddyConnection,
  type BuddyFilters,
  type BuddyProfile,
} from "../modules/buddySystem";
import { brand } from "../styles/brand-tokens";

const initialFilters: BuddyFilters = {
  interests: defaultBuddyPreferences.interests,
  availability: defaultBuddyPreferences.availability[0] ?? "any",
  activity: defaultBuddyPreferences.preferredActivities[0] ?? "any",
};

export function BuddySystem() {
  const [filters, setFilters] = useState<BuddyFilters>(initialFilters);
  const [recommendations, setRecommendations] = useState<BuddyProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [optedIn, setOptedIn] = useState(true);
  const [pendingBuddy, setPendingBuddy] = useState<BuddyProfile | null>(null);
  const [confirmedBuddy, setConfirmedBuddy] = useState<BuddyProfile | null>(
    null,
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeConnection, setActiveConnection] =
    useState<ActiveBuddyConnection | null>(null);
  const [showChat, setShowChat] = useState(false);

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

  const loadRecommendations = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const results = await fetchBuddyRecommendations({
        interests: nextFilters.interests,
        availability:
          nextFilters.availability === "any"
            ? undefined
            : nextFilters.availability,
        activity:
          nextFilters.activity === "any" ? undefined : nextFilters.activity,
      });
      setRecommendations(results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRecommendations(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial load only
  }, []);

  const requestBuddy = async (buddy: BuddyProfile) => {
    setPendingBuddy(buddy);
    await sendBuddyRequest(buddy.userId, "you");
    const match = await acceptBuddyRequest({
      fromUserId: "you",
      toUserId: buddy.userId,
    });
    const connection = createActiveConnection(buddy);
    setActiveConnection({
      ...connection,
      conversationId: `buddy-chat-${match.buddyId}`,
    });
    setConfirmedBuddy(buddy);
    setShowConfirm(true);
  };

  const openChat = () => {
    if (confirmedBuddy && !activeConnection) {
      setActiveConnection(createActiveConnection(confirmedBuddy));
    }
    setShowConfirm(false);
    setShowChat(true);
  };

  return (
    <div className="container buddy-page" style={pageStyle}>
      <CommunitySubnav />

      <header style={{ display: "grid", gap: brand.spacing[12] }}>
        <h1 style={headingStyle}>Find a Buddy</h1>
        <p style={bodyStyle}>
          Short-term or long-term company for travel, co-working, walking,
          meals, or shared interests — warm, minimal, and paced for solo living.
        </p>
      </header>

      <BuddySafetyNotice
        optedIn={optedIn}
        onOptOut={() => {
          setOptedIn(false);
          setActiveConnection(null);
          setShowChat(false);
        }}
      />

      {optedIn ? (
        <>
          <FindBuddyFilters
            value={filters}
            onChange={setFilters}
            onSearch={() => void loadRecommendations(filters)}
            loading={loading}
          />

          <section style={{ display: "grid", gap: brand.spacing[20] }}>
            <h2 style={headingStyle}>Recommended buddies</h2>
            {loading && recommendations.length === 0 ? (
              <p style={bodyStyle}>Looking for soft matches…</p>
            ) : null}
            <div style={{ display: "grid", gap: brand.spacing[20] }}>
              {recommendations.map((buddy) => (
                <BuddyMatchCard
                  key={buddy.userId}
                  buddy={buddy}
                  onConnect={(next) => void requestBuddy(next)}
                  onMessage={(next) => {
                    setActiveConnection(createActiveConnection(next));
                    setShowChat(true);
                  }}
                  ctaLabel={
                    pendingBuddy?.userId === buddy.userId
                      ? "Matched"
                      : "Request buddy"
                  }
                />
              ))}
              {!loading && recommendations.length === 0 ? (
                <p style={bodyStyle}>
                  No matches yet — try widening time or activity filters.
                </p>
              ) : null}
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
            <BuddyProgressTracker
              buddyName={activeConnection?.buddy.name}
              milestones={activeConnection?.milestones ?? []}
              onToggle={(id) => {
                setActiveConnection((current) => {
                  if (!current) return current;
                  return {
                    ...current,
                    milestones: current.milestones.map((item) =>
                      item.id === id ? { ...item, done: !item.done } : item,
                    ),
                  };
                });
              }}
            />
            {showChat ? (
              <BuddyChat
                match={activeConnection}
                onClose={() => setShowChat(false)}
              />
            ) : (
              <div
                style={{
                  borderRadius: brand.radius.lg,
                  background: brand.colors.mist,
                  boxShadow: brand.shadows.soft,
                  padding: brand.spacing[20],
                  display: "grid",
                  gap: brand.spacing[12],
                }}
              >
                <strong style={headingStyle}>Chat entry</strong>
                <p style={bodyStyle}>
                  After you match, open the placeholder chat from the
                  confirmation or a buddy card.
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "grid",
            gap: brand.spacing[20],
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            background: brand.colors.mist,
            boxShadow: brand.shadows.soft,
          }}
        >
          <p style={bodyStyle}>
            You’re opted out. Return whenever you like — nothing is required.
          </p>
          <button
            type="button"
            onClick={() => setOptedIn(true)}
            style={{
              width: "fit-content",
              minHeight: "2.6rem",
              padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
              borderRadius: brand.radius.md,
              border: "1px solid rgba(154, 174, 150, 0.45)",
              background: brand.colors.sage,
              color: brand.colors.white,
              fontFamily: brand.typography.body,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: brand.shadows.soft,
            }}
          >
            Rejoin Buddy System
          </button>
        </div>
      )}

      <MatchConfirmationModal
        open={showConfirm}
        buddy={confirmedBuddy}
        onClose={() => setShowConfirm(false)}
        onOpenChat={openChat}
      />
    </div>
  );
}

export default BuddySystem;
