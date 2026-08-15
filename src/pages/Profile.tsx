import {
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { Link } from "react-router-dom";
import { PREFERENCE_OPTIONS, useAuth } from "../auth";
import { Avatar, Button } from "../components/ui";
import { brand } from "../styles/brand-tokens";

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [homeBase, setHomeBase] = useState(user?.homeBase ?? "");
  const [preferences, setPreferences] = useState<string[]>(
    user?.preferences ?? [],
  );
  const [savedPosts, setSavedPosts] = useState(user?.savedPosts ?? []);
  const [toolkitItems, setToolkitItems] = useState(user?.toolkitItems ?? []);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setBio(user.bio);
    setHomeBase(user.homeBase);
    setPreferences(user.preferences);
    setSavedPosts(user.savedPosts);
    setToolkitItems(user.toolkitItems);
  }, [user]);

  if (!user) return null;

  const togglePreference = (value: string) => {
    setPreferences((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const removeSavedPost = (id: string) => {
    setSavedPosts((current) => current.filter((post) => post.id !== id));
  };

  const removeToolkitItem = (id: string) => {
    setToolkitItems((current) => current.filter((item) => item.id !== id));
  };

  const onSave = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateProfile({
        name,
        bio,
        homeBase,
        preferences,
        savedPosts,
        toolkitItems,
      });
      setMessage("Profile saved.");
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Could not save profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  const providerLabel =
    user.provider === "email"
      ? "email"
      : user.provider === "google"
        ? "Google"
        : "Apple";

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
    ["--profile-radius" as string]: brand.radius.lg,
    ["--profile-radius-md" as string]: brand.radius.md,
    ["--profile-space-8" as string]: brand.spacing[8],
    ["--profile-space-12" as string]: brand.spacing[12],
    ["--profile-space-20" as string]: brand.spacing[20],
    ["--profile-space-32" as string]: brand.spacing[32],
    ["--profile-mist" as string]: brand.colors.mist,
    ["--profile-clay" as string]: brand.colors.clay,
    ["--profile-sage" as string]: brand.colors.sage,
    ["--profile-charcoal" as string]: brand.colors.charcoal,
    ["--profile-hover" as string]: brand.colors.button.hoverTint,
    ["--profile-shadow" as string]: brand.shadows.soft,
    ["--profile-shadow-card" as string]: brand.shadows.card,
    fontFamily: brand.typography.body,
  } as CSSProperties;

  const mistCardStyle: CSSProperties = {
    gap: brand.spacing[20],
    padding: brand.spacing[20],
    borderRadius: brand.radius.lg,
    background: brand.colors.mist,
    boxShadow: brand.shadows.soft,
    color: brand.colors.charcoal,
  };

  const headingStyle: CSSProperties = {
    fontFamily: brand.typography.heading,
    color: brand.colors.charcoal,
  };

  const bodyStyle: CSSProperties = {
    fontFamily: brand.typography.body,
    color: brand.colors.charcoalSoft,
  };

  const clayAccentStyle: CSSProperties = {
    color: brand.colors.clay,
  };

  return (
    <div className="container profile-page" style={pageStyle}>
      <section
        className="profile-card profile-card--hero"
        style={{
          ...mistCardStyle,
          borderTop: `3px solid ${brand.colors.clay}`,
          animationDelay: "0.04s",
        }}
      >
        <div className="profile-hero" style={{ gap: brand.spacing[20] }}>
          <Avatar name={name || user.name} size="lg" />
          <div style={{ display: "grid", gap: brand.spacing[8] }}>
            <p
              className="profile-kicker"
              style={{
                ...clayAccentStyle,
                fontFamily: brand.typography.body,
                letterSpacing: brand.typography.tracking.wide,
              }}
            >
              Your profile
            </p>
            <h1 className="profile-name" style={headingStyle}>
              {name || user.name}
            </h1>
            <p className="profile-bio-preview" style={bodyStyle}>
              {bio.trim() ||
                "Add a short bio so the community can know your pace."}
            </p>
            <p className="profile-meta" style={bodyStyle}>
              {homeBase || "Add a home base"} · Signed in with {providerLabel}
            </p>
          </div>
        </div>
      </section>

      <form
        className="profile-form"
        onSubmit={onSave}
        style={{ gap: brand.spacing[20] }}
      >
        <section
          className="profile-card"
          style={{ ...mistCardStyle, animationDelay: "0.08s" }}
        >
          <h2 className="profile-section-title" style={headingStyle}>
            Bio
          </h2>
          <p className="profile-section-lede" style={bodyStyle}>
            Share a warm snapshot of how you live and travel solo.
          </p>
          <div className="profile-fields" style={{ gap: brand.spacing[12] }}>
            <label className="profile-field" style={{ gap: brand.spacing[8] }}>
              <span style={{ color: brand.colors.charcoal }}>Display name</span>
              <input
                name="displayName"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                style={{
                  borderRadius: brand.radius.md,
                  padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                  color: brand.colors.charcoal,
                  boxShadow: brand.shadows.xs,
                }}
              />
            </label>
            <label className="profile-field" style={{ gap: brand.spacing[8] }}>
              <span style={{ color: brand.colors.charcoal }}>Home base</span>
              <input
                name="homeBase"
                value={homeBase}
                onChange={(event) => setHomeBase(event.target.value)}
                placeholder="City, region"
                style={{
                  borderRadius: brand.radius.md,
                  padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                  color: brand.colors.charcoal,
                  boxShadow: brand.shadows.xs,
                }}
              />
            </label>
            <label className="profile-field" style={{ gap: brand.spacing[8] }}>
              <span style={{ color: brand.colors.charcoal }}>Bio</span>
              <textarea
                name="bio"
                rows={4}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="What does your solo living rhythm look like?"
                style={{
                  borderRadius: brand.radius.md,
                  padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                  color: brand.colors.charcoal,
                  boxShadow: brand.shadows.xs,
                }}
              />
            </label>
          </div>
        </section>

        <section
          className="profile-card"
          style={{ ...mistCardStyle, animationDelay: "0.12s" }}
        >
          <h2 className="profile-section-title" style={headingStyle}>
            Solo living preferences
          </h2>
          <p className="profile-section-lede" style={bodyStyle}>
            Choose the rhythms and supports that fit you best.
          </p>
          <div
            className="profile-prefs"
            role="group"
            aria-label="Solo living preferences"
            style={{ gap: brand.spacing[12] }}
          >
            {PREFERENCE_OPTIONS.map((option) => {
              const active = preferences.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  className={`profile-pref${active ? " is-selected" : ""}`}
                  aria-pressed={active}
                  onClick={() => togglePreference(option)}
                  style={{
                    borderRadius: brand.radius.md,
                    padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
                    background: active
                      ? brand.colors.clay
                      : brand.colors.white,
                    color: brand.colors.charcoal,
                    boxShadow: active
                      ? brand.shadows.soft
                      : brand.shadows.xs,
                    fontFamily: brand.typography.body,
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <div className="profile-split" style={{ gap: brand.spacing[20] }}>
          <section
            className="profile-card"
            style={{ ...mistCardStyle, animationDelay: "0.16s" }}
          >
            <h2 className="profile-section-title" style={headingStyle}>
              Saved posts
            </h2>
            <p className="profile-section-lede" style={bodyStyle}>
              Community notes you want to revisit.
            </p>
            {savedPosts.length === 0 ? (
              <p className="profile-empty" style={bodyStyle}>
                No saved posts yet.{" "}
                <Link
                  to="/community"
                  style={{ color: brand.colors.sageDeep }}
                >
                  Browse the feed
                </Link>
              </p>
            ) : (
              <ul className="profile-list" style={{ gap: brand.spacing[12] }}>
                {savedPosts.map((post) => (
                  <li
                    key={post.id}
                    className="profile-list-item"
                    style={{
                      gap: brand.spacing[12],
                      padding: brand.spacing[12],
                      borderRadius: brand.radius.md,
                      background: brand.colors.white,
                      borderLeft: `3px solid ${brand.colors.clay}`,
                      boxShadow: brand.shadows.xs,
                    }}
                  >
                    <div>
                      <p
                        className="profile-item-tag"
                        style={clayAccentStyle}
                      >
                        {post.tag}
                      </p>
                      <h3 style={headingStyle}>{post.title}</h3>
                      <p className="profile-item-meta" style={bodyStyle}>
                        by {post.author}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="profile-ghost"
                      onClick={() => removeSavedPost(post.id)}
                      style={{
                        borderRadius: brand.radius.md,
                        color: brand.colors.charcoalSoft,
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <Link
              className="profile-link"
              to="/community"
              style={{
                borderRadius: brand.radius.md,
                padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
                background: brand.colors.clay,
                color: brand.colors.charcoal,
                boxShadow: brand.shadows.xs,
              }}
            >
              Open community
            </Link>
          </section>

          <section
            className="profile-card"
            style={{ ...mistCardStyle, animationDelay: "0.2s" }}
          >
            <h2 className="profile-section-title" style={headingStyle}>
              Saved toolkit items
            </h2>
            <p className="profile-section-lede" style={bodyStyle}>
              Routines, habits, and tips pinned for quick return.
            </p>
            {toolkitItems.length === 0 ? (
              <p className="profile-empty" style={bodyStyle}>
                No toolkit items pinned.{" "}
                <Link to="/toolkit" style={{ color: brand.colors.sageDeep }}>
                  Visit the toolkit
                </Link>
              </p>
            ) : (
              <ul className="profile-list" style={{ gap: brand.spacing[12] }}>
                {toolkitItems.map((item) => (
                  <li
                    key={item.id}
                    className="profile-list-item"
                    style={{
                      gap: brand.spacing[12],
                      padding: brand.spacing[12],
                      borderRadius: brand.radius.md,
                      background: brand.colors.white,
                      borderLeft: `3px solid ${brand.colors.clay}`,
                      boxShadow: brand.shadows.xs,
                    }}
                  >
                    <div>
                      <p
                        className="profile-item-tag"
                        style={clayAccentStyle}
                      >
                        {item.kind}
                      </p>
                      <h3 style={headingStyle}>{item.label}</h3>
                    </div>
                    <button
                      type="button"
                      className="profile-ghost"
                      onClick={() => removeToolkitItem(item.id)}
                      style={{
                        borderRadius: brand.radius.md,
                        color: brand.colors.charcoalSoft,
                      }}
                    >
                      Unpin
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <Link
              className="profile-link"
              to="/toolkit"
              style={{
                borderRadius: brand.radius.md,
                padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
                background: brand.colors.clay,
                color: brand.colors.charcoal,
                boxShadow: brand.shadows.xs,
              }}
            >
              Open toolkit
            </Link>
          </section>
        </div>

        <div
          className="profile-savebar"
          style={{
            gap: brand.spacing[12],
            padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
            borderRadius: brand.radius.lg,
            background: brand.colors.mist,
            boxShadow: brand.shadows.soft,
          }}
        >
          {message ? (
            <p
              className="profile-message"
              style={{ color: brand.colors.charcoal }}
            >
              {message}
            </p>
          ) : (
            <span />
          )}
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
