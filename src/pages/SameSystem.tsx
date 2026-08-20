import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { CommunitySubnav } from "../components/community/CommunitySubnav";
import {
  CheckInPanel,
  CreateGoalForm,
  PartnerMatchingScreen,
  ProgressTimeline,
  SAME_CATEGORIES,
  SameGoalCard,
  SamePartnerCard,
  loadSameDashboard,
  postSameCheckIn,
  postSameGoal,
  postSamePartnerRequest,
  queueGentlePrompts,
  type SameCheckIn,
  type SameGoal,
  type SamePartner,
  type SamePartnerCandidate,
  type SamePrompt,
} from "../modules/sameSystem";
import { brand } from "../styles/brand-tokens";

export function SameSystem() {
  const { user } = useAuth();
  const userId = user?.id ?? "you";
  const userName = user?.name ?? "You";

  const [goals, setGoals] = useState<SameGoal[]>([]);
  const [partners, setPartners] = useState<SamePartner[]>([]);
  const [checkIns, setCheckIns] = useState<SameCheckIn[]>([]);
  const [candidates, setCandidates] = useState<SamePartnerCandidate[]>([]);
  const [prompts, setPrompts] = useState<SamePrompt[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const hub = await loadSameDashboard(userId);
        if (!active) return;
        setGoals(hub.goals);
        setPartners(hub.partners);
        setCheckIns(hub.checkIns);
        setCandidates(hub.candidates);
        setPrompts(hub.prompts);
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [userId]);

  const refresh = async () => {
    setLoading(true);
    try {
      const hub = await loadSameDashboard(userId);
      setGoals(hub.goals);
      setPartners(hub.partners);
      setCheckIns(hub.checkIns);
      setCandidates(hub.candidates);
      setPrompts(hub.prompts);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="container same-page" style={pageStyle}>
      <CommunitySubnav />

      <header style={{ display: "grid", gap: brand.spacing[12] }}>
        <h1 style={headingStyle}>SAME Dashboard</h1>
        <p style={bodyStyle}>
          Support–Accountability–Mutual–Engagement — lightweight partners for
          routines, habits, learning, fitness, or creative work. Warm,
          supportive, and non-intrusive.
        </p>
      </header>

      <aside
        style={{
          display: "grid",
          gap: brand.spacing[12],
          padding: brand.spacing[20],
          borderRadius: brand.radius.lg,
          background: `linear-gradient(155deg, rgba(183,196,178,0.35), ${brand.colors.mist} 50%, rgba(143,166,184,0.25))`,
          boxShadow: brand.shadows.soft,
        }}
      >
        <h2 style={{ ...headingStyle, fontSize: "1.1rem", margin: 0 }}>
          Soft accountability
        </h2>
        <p style={{ ...bodyStyle, margin: 0 }}>
          Check-ins are optional. Rest counts. Leave anytime via{" "}
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
        <h2 style={headingStyle}>Focus areas</h2>
        <div
          style={{
            display: "grid",
            gap: brand.spacing[12],
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          {SAME_CATEGORIES.map((category) => (
            <article
              key={category.id}
              style={{
                padding: brand.spacing[20],
                borderRadius: brand.radius.lg,
                background: brand.colors.mist,
                boxShadow: brand.shadows.soft,
                display: "grid",
                gap: brand.spacing[8],
              }}
            >
              <strong style={headingStyle}>{category.label}</strong>
              <p style={{ ...bodyStyle, margin: 0, fontSize: "0.9rem" }}>
                {category.blurb}
              </p>
            </article>
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
        <CreateGoalForm
          onSubmit={async (input) => {
            const goal = await postSameGoal(input, userId, userName);
            setGoals((current) => [goal, ...current]);
            setPrompts(queueGentlePrompts(userId));
            setStatus(`Goal saved: ${goal.title}`);
            await refresh();
          }}
        />
        <CheckInPanel
          goals={goals}
          prompts={prompts}
          onCheckIn={async (goalId, checkStatus) => {
            const checkIn = await postSameCheckIn(
              { goalId, status: checkStatus },
              userId,
            );
            setCheckIns((current) => [checkIn, ...current]);
            setStatus(`Check-in recorded (${checkStatus}).`);
          }}
        />
      </div>

      {status ? (
        <p
          role="status"
          style={{
            ...bodyStyle,
            margin: 0,
            padding: brand.spacing[12],
            borderRadius: brand.radius.md,
            background: brand.colors.sageSoft,
            color: brand.colors.sageDeep,
          }}
        >
          {status}
        </p>
      ) : null}

      <section style={{ display: "grid", gap: brand.spacing[20] }}>
        <h2 style={headingStyle}>Your goals</h2>
        {loading && goals.length === 0 ? (
          <p style={bodyStyle}>Loading goals…</p>
        ) : goals.length === 0 ? (
          <p style={bodyStyle}>No goals yet — create one to begin.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: brand.spacing[20],
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            {goals.map((goal) => (
              <SameGoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </section>

      <PartnerMatchingScreen
        candidates={candidates}
        onRequest={async (candidate) => {
          const result = await postSamePartnerRequest({
            fromUserId: userId,
            toUserId: candidate.userId,
            goalId: candidate.goal.id,
          });
          setPartners((current) => [result.partner, ...current]);
          setCandidates((current) =>
            current.filter((item) => item.userId !== candidate.userId),
          );
          setStatus(
            `Partner connected with ${candidate.name}. Gentle prompts stay optional.`,
          );
        }}
      />

      {partners.length > 0 ? (
        <section style={{ display: "grid", gap: brand.spacing[20] }}>
          <h2 style={headingStyle}>Your partners</h2>
          <div
            style={{
              display: "grid",
              gap: brand.spacing[12],
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            {partners.map((partner) => (
              <SamePartnerCard
                key={`${partner.userId}-${partner.partnerId}-${partner.createdAt}`}
                partner={partner}
              />
            ))}
          </div>
        </section>
      ) : null}

      <ProgressTimeline goals={goals} checkIns={checkIns} />
    </div>
  );
}

export default SameSystem;
