import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PREFERENCE_OPTIONS, useAuth } from "../../auth";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TextField,
} from "../../components/ui";
import styles from "./Profile.module.css";

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
      setMessage(err instanceof Error ? err.message : "Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`container page ${styles.page}`}>
      <Card variant="soft" padding="lg" className={styles.heroCard}>
        <div className={styles.heroBlock}>
          <Avatar name={name || user.name} size="lg" />
          <div>
            <p className={styles.kicker}>Your profile</p>
            <h1>{name || user.name}</h1>
            <p className={styles.bioPreview}>
              {bio.trim() || "Add a short bio so the community can know your pace."}
            </p>
            <p className={styles.metaLine}>
              {homeBase || "Add a home base"} · Signed in with{" "}
              {user.provider === "email"
                ? "email"
                : user.provider === "google"
                  ? "Google"
                  : "Apple"}
            </p>
          </div>
        </div>
      </Card>

      <form className={styles.stack} onSubmit={onSave}>
        <Card variant="elevated" padding="lg" className={styles.panel}>
          <CardHeader
            eyebrow="About"
            title="Editable bio"
            description="Share a warm snapshot of how you live and travel solo."
          />
          <CardBody className={styles.formBody}>
            <TextField
              label="Display name"
              name="displayName"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <TextField
              label="Home base"
              name="homeBase"
              value={homeBase}
              onChange={(event) => setHomeBase(event.target.value)}
              placeholder="City, region"
            />
            <label className={styles.textareaField}>
              <span>Bio</span>
              <textarea
                name="bio"
                rows={4}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="What does your solo living rhythm look like?"
              />
            </label>
          </CardBody>
        </Card>

        <Card variant="soft" padding="lg" className={styles.panel}>
          <CardHeader
            eyebrow="Preferences"
            title="Solo living preferences"
            description="Choose the rhythms and supports that fit you best."
          />
          <CardBody>
            <div
              className={styles.preferenceGrid}
              role="group"
              aria-label="Solo living preferences"
            >
              {PREFERENCE_OPTIONS.map((option) => {
                const active = preferences.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.prefChip} ${active ? styles.prefChipActive : ""}`}
                    aria-pressed={active}
                    onClick={() => togglePreference(option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <div className={styles.split}>
          <Card variant="elevated" padding="lg" className={styles.panel}>
            <CardHeader
              eyebrow="Saved"
              title="Saved posts"
              description="Community notes you want to revisit."
            />
            <CardBody>
              {savedPosts.length === 0 ? (
                <p className={styles.empty}>
                  No saved posts yet.{" "}
                  <Link to="/community">Browse the feed</Link>
                </p>
              ) : (
                <ul className={styles.list}>
                  {savedPosts.map((post) => (
                    <li key={post.id} className={styles.listItem}>
                      <div>
                        <p className={styles.itemTag}>{post.tag}</p>
                        <h3>{post.title}</h3>
                        <p className={styles.itemMeta}>by {post.author}</p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSavedPost(post.id)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
            <CardFooter>
              <Link to="/community">
                <Button type="button" size="sm" variant="outline">
                  Open community
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card variant="elevated" padding="lg" className={styles.panel}>
            <CardHeader
              eyebrow="Toolkit"
              title="Personal toolkit items"
              description="Routines, habits, and tips pinned for quick return."
            />
            <CardBody>
              {toolkitItems.length === 0 ? (
                <p className={styles.empty}>
                  No toolkit items pinned.{" "}
                  <Link to="/toolkit">Visit the toolkit</Link>
                </p>
              ) : (
                <ul className={styles.list}>
                  {toolkitItems.map((item) => (
                    <li key={item.id} className={styles.listItem}>
                      <div>
                        <p className={styles.itemTag}>{item.kind}</p>
                        <h3>{item.label}</h3>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeToolkitItem(item.id)}
                      >
                        Unpin
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
            <CardFooter>
              <Link to="/toolkit">
                <Button type="button" size="sm" variant="soft">
                  Open toolkit
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className={styles.saveBar}>
          {message ? <p className={styles.message}>{message}</p> : <span />}
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
