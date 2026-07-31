import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PREFERENCE_OPTIONS, useAuth } from "../auth";
import { Avatar } from "../components/ui";

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

  return (
    <div className="container profile-page">
      <section
        className="profile-card profile-card--soft"
        style={{ animationDelay: "0.04s" }}
      >
        <div className="profile-hero">
          <Avatar name={name || user.name} size="lg" />
          <div>
            <p className="profile-kicker">Your profile</p>
            <h1 className="profile-name">{name || user.name}</h1>
            <p className="profile-bio-preview">
              {bio.trim() ||
                "Add a short bio so the community can know your pace."}
            </p>
            <p className="profile-meta">
              {homeBase || "Add a home base"} · Signed in with {providerLabel}
            </p>
          </div>
        </div>
      </section>

      <form className="profile-form" onSubmit={onSave}>
        <section className="profile-card" style={{ animationDelay: "0.08s" }}>
          <h2 className="profile-section-title">Bio</h2>
          <p className="profile-section-lede">
            Share a warm snapshot of how you live and travel solo.
          </p>
          <div className="profile-fields">
            <label className="profile-field">
              <span>Display name</span>
              <input
                name="displayName"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label className="profile-field">
              <span>Home base</span>
              <input
                name="homeBase"
                value={homeBase}
                onChange={(event) => setHomeBase(event.target.value)}
                placeholder="City, region"
              />
            </label>
            <label className="profile-field">
              <span>Bio</span>
              <textarea
                name="bio"
                rows={4}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="What does your solo living rhythm look like?"
              />
            </label>
          </div>
        </section>

        <section className="profile-card" style={{ animationDelay: "0.12s" }}>
          <h2 className="profile-section-title">Solo living preferences</h2>
          <p className="profile-section-lede">
            Choose the rhythms and supports that fit you best.
          </p>
          <div
            className="profile-prefs"
            role="group"
            aria-label="Solo living preferences"
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
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <div className="profile-split">
          <section className="profile-card" style={{ animationDelay: "0.16s" }}>
            <h2 className="profile-section-title">Saved posts</h2>
            <p className="profile-section-lede">
              Community notes you want to revisit.
            </p>
            {savedPosts.length === 0 ? (
              <p className="profile-empty">
                No saved posts yet.{" "}
                <Link to="/community">Browse the feed</Link>
              </p>
            ) : (
              <ul className="profile-list">
                {savedPosts.map((post) => (
                  <li key={post.id} className="profile-list-item">
                    <div>
                      <p className="profile-item-tag">{post.tag}</p>
                      <h3>{post.title}</h3>
                      <p className="profile-item-meta">by {post.author}</p>
                    </div>
                    <button
                      type="button"
                      className="profile-ghost"
                      onClick={() => removeSavedPost(post.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <Link className="profile-link" to="/community">
              Open community
            </Link>
          </section>

          <section className="profile-card" style={{ animationDelay: "0.2s" }}>
            <h2 className="profile-section-title">Saved toolkit items</h2>
            <p className="profile-section-lede">
              Routines, habits, and tips pinned for quick return.
            </p>
            {toolkitItems.length === 0 ? (
              <p className="profile-empty">
                No toolkit items pinned.{" "}
                <Link to="/toolkit">Visit the toolkit</Link>
              </p>
            ) : (
              <ul className="profile-list">
                {toolkitItems.map((item) => (
                  <li key={item.id} className="profile-list-item">
                    <div>
                      <p className="profile-item-tag">{item.kind}</p>
                      <h3>{item.label}</h3>
                    </div>
                    <button
                      type="button"
                      className="profile-ghost"
                      onClick={() => removeToolkitItem(item.id)}
                    >
                      Unpin
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <Link className="profile-link" to="/toolkit">
              Open toolkit
            </Link>
          </section>
        </div>

        <div className="profile-savebar">
          {message ? <p className="profile-message">{message}</p> : <span />}
          <button type="submit" className="profile-save" disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
