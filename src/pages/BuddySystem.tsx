import { useMemo, useState, type CSSProperties } from "react";
import { CommunitySubnav } from "../components/community/CommunitySubnav";
import {
  BuddyChat,
  BuddyMatchCard,
  BuddyPreferencesForm,
  BuddyProgressTracker,
  BuddySafetyNotice,
  createMatch,
  defaultBuddyPreferences,
  matchBuddies,
  type BuddyMatch,
  type BuddyPreferences,
  type BuddyProfile,
} from "../modules/buddySystem";
import { brand } from "../styles/brand-tokens";

export function BuddySystem() {
  const [preferences, setPreferences] = useState<BuddyPreferences>(
    defaultBuddyPreferences,
  );
  const [matches, setMatches] = useState<BuddyProfile[]>(() =>
    matchBuddies(defaultBuddyPreferences),
  );
  const [activeMatch, setActiveMatch] = useState<BuddyMatch | null>(null);
  const [optedIn, setOptedIn] = useState(true);

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

  const findMatches = () => {
    setMatches(matchBuddies(preferences));
  };

  const connect = (buddy: BuddyProfile) => {
    if (!optedIn) setOptedIn(true);
    setActiveMatch(createMatch(buddy));
  };

  const visibleMatches = useMemo(
    () => (optedIn ? matches : []),
    [matches, optedIn],
  );

  return (
    <div className="container buddy-page" style={pageStyle}>
      <CommunitySubnav />

      <header style={{ display: "grid", gap: brand.spacing[12] }}>
        <h1 style={headingStyle}>Buddy System</h1>
        <p style={bodyStyle}>
          Match with compatible buddies for solo-living and solo-travel goals —
          light check-ins or shared progress, always autonomy-first.
        </p>
      </header>

      <BuddySafetyNotice
        optedIn={optedIn}
        onOptOut={() => {
          setOptedIn(false);
          setActiveMatch(null);
        }}
      />

      {optedIn ? (
        <>
          <BuddyPreferencesForm
            value={preferences}
            onChange={setPreferences}
            onFindMatches={findMatches}
          />

          <section style={{ display: "grid", gap: brand.spacing[20] }}>
            <h2 style={headingStyle}>Compatible buddies</h2>
            <div
              style={{
                display: "grid",
                gap: brand.spacing[20],
              }}
            >
              {visibleMatches.map((buddy) => (
                <BuddyMatchCard
                  key={buddy.id}
                  buddy={buddy}
                  onConnect={connect}
                  onMessage={connect}
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
            <BuddyProgressTracker
              buddyName={activeMatch?.buddy.name}
              milestones={activeMatch?.milestones ?? []}
              onToggle={(id) => {
                setActiveMatch((current) => {
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
            <BuddyChat match={activeMatch} />
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
    </div>
  );
}

export default BuddySystem;
