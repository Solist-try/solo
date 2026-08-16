import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { CommunitySubnav } from "../components/community/CommunitySubnav";
import { Avatar, Button } from "../components/ui";
import {
  BlockUserButton,
  GuidelinesReminder,
  ReportButton,
  useSafety,
} from "../modules/safety";
import { brand } from "../styles/brand-tokens";
import {
  TOPICS,
  initialPosts,
  type Post,
  type Topic,
} from "./communityData";

type Filter = Topic | "All";

const FILTERS: Filter[] = ["All", ...TOPICS];

export function Community() {
  const { user } = useAuth();
  const { isBlocked } = useSafety();
  const [filter, setFilter] = useState<Filter>("All");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      if (isBlocked(post.authorId)) return false;
      if (filter === "All") return true;
      return post.tags.includes(filter);
    });
  }, [filter, posts, isBlocked]);

  const activePost =
    activePostId == null
      ? null
      : (posts.find((post) => post.id === activePostId) ?? null);

  const toggleLike = (postId: string) => {
    const liked = likedIds.has(postId);

    setLikedIds((current) => {
      const next = new Set(current);
      if (liked) next.delete(postId);
      else next.add(postId);
      return next;
    });

    setPosts((list) =>
      list.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + (liked ? -1 : 1) }
          : post,
      ),
    );
  };

  const addComment = (postId: string, body: string) => {
    setPosts((list) =>
      list.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `local-${postId}-${post.comments.length + 1}`,
                  author: user?.name ?? "You",
                  body,
                  time: "Just now",
                },
              ],
            }
          : post,
      ),
    );
  };

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
    ["--community-radius" as string]: brand.radius.lg,
    ["--community-radius-md" as string]: brand.radius.md,
    ["--community-space-8" as string]: brand.spacing[8],
    ["--community-space-12" as string]: brand.spacing[12],
    ["--community-space-20" as string]: brand.spacing[20],
    ["--community-space-32" as string]: brand.spacing[32],
  } as CSSProperties;

  return (
    <div className="container community-page" style={pageStyle}>
      <CommunitySubnav />

      <header
        className="community-header"
        style={{ gap: brand.spacing[12] }}
      >
        <h1
          style={{
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
          }}
        >
          Community
        </h1>
        <p
          style={{
            fontFamily: brand.typography.body,
            color: brand.colors.charcoalSoft,
          }}
        >
          Supportive notes from people building solo lives on their own terms —
          share what helps, take what you need, leave the rest.
        </p>
      </header>

      <section
        aria-label="Community modules"
        style={{
          display: "grid",
          gap: brand.spacing[20],
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <Link
          to="/community/buddy"
          style={{
            display: "grid",
            gap: brand.spacing[12],
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            background: `linear-gradient(155deg, rgba(183,196,178,0.4), ${brand.colors.mist} 55%, rgba(199,184,174,0.35))`,
            boxShadow: brand.shadows.soft,
            color: brand.colors.charcoal,
            textDecoration: "none",
          }}
        >
          <strong style={{ fontFamily: brand.typography.heading, fontSize: "1.15rem" }}>
            Buddy System
          </strong>
          <span style={{ fontFamily: brand.typography.body, color: brand.colors.charcoalSoft }}>
            Match on solo goals, choose light or active connection, and track
            shared milestones.
          </span>
        </Link>
        <Link
          to="/community/skill-swap"
          style={{
            display: "grid",
            gap: brand.spacing[12],
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            background: `linear-gradient(155deg, rgba(199,184,174,0.4), ${brand.colors.mist} 55%, rgba(183,196,178,0.35))`,
            boxShadow: brand.shadows.soft,
            color: brand.colors.charcoal,
            textDecoration: "none",
          }}
        >
          <strong style={{ fontFamily: brand.typography.heading, fontSize: "1.15rem" }}>
            Skill Swap
          </strong>
          <span style={{ fontFamily: brand.typography.body, color: brand.colors.charcoalSoft }}>
            Offer and request practical skills — cook, budget, travel, and more.
          </span>
        </Link>
      </section>

      <GuidelinesReminder />

      <div
        className="community-filters"
        role="toolbar"
        aria-label="Filter posts by topic"
        style={{
          gap: brand.spacing[8],
          padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
          borderRadius: brand.radius.lg,
          background: brand.colors.mist,
          boxShadow: brand.shadows.soft,
        }}
      >
        {FILTERS.map((topic) => (
          <FilterChip
            key={topic}
            label={topic}
            active={filter === topic}
            onClick={() => setFilter(topic)}
          />
        ))}
      </div>

      <p
        className="community-count"
        aria-live="polite"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoalMuted,
        }}
      >
        {visiblePosts.length}{" "}
        {visiblePosts.length === 1 ? "post" : "posts"}
        {filter !== "All" ? ` · ${filter}` : ""}
      </p>

      <div className="community-feed" style={{ gap: brand.spacing[20] }}>
        {visiblePosts.length === 0 ? (
          <div
            className="community-empty"
            style={{
              gap: brand.spacing[20],
              padding: brand.spacing[32],
              borderRadius: brand.radius.lg,
              background: brand.colors.mist,
              boxShadow: brand.shadows.soft,
              color: brand.colors.charcoal,
            }}
          >
            <p>Nothing in this topic yet. Browse another filter when you are ready.</p>
            <Button variant="secondary" size="sm" onClick={() => setFilter("All")}>
              Show all posts
            </Button>
          </div>
        ) : (
          visiblePosts.map((post, index) => (
            <div
              key={post.id}
              className="community-feed__item"
              style={{ animationDelay: `${0.05 + index * 0.06}s` }}
            >
              <PostCard
                post={post}
                liked={likedIds.has(post.id)}
                onToggleLike={() => toggleLike(post.id)}
                onOpenComments={() => setActivePostId(post.id)}
              />
            </div>
          ))
        )}
      </div>

      {activePost ? (
        <CommentDrawer
          post={activePost}
          onClose={() => setActivePostId(null)}
          onAddComment={(body) => addComment(activePost.id, body)}
        />
      ) : null}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`community-chip${active ? " is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
      style={{
        borderRadius: brand.radius.md,
        padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
        fontFamily: brand.typography.body,
        background: active ? brand.colors.sage : brand.colors.white,
        color: active ? brand.colors.white : brand.colors.charcoal,
        borderColor: active ? brand.colors.sage : brand.colors.clay,
      }}
    >
      {label}
    </button>
  );
}

function PostCard({
  post,
  liked,
  onToggleLike,
  onOpenComments,
}: {
  post: Post;
  liked: boolean;
  onToggleLike: () => void;
  onOpenComments: () => void;
}) {
  return (
    <article
      className="community-card"
      style={{
        gap: brand.spacing[20],
        padding: `${brand.spacing[32]} ${brand.spacing[20]}`,
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
        color: brand.colors.charcoal,
      }}
    >
      <header
        className="community-card__header"
        style={{ gap: brand.spacing[12] }}
      >
        <Avatar name={post.author} />
        <div className="community-card__meta" style={{ gap: brand.spacing[4] }}>
          <strong
            className="community-card__username"
            style={{
              fontFamily: brand.typography.body,
              color: brand.colors.charcoal,
            }}
          >
            {post.author}
          </strong>
          <time
            className="community-card__time"
            dateTime={post.time}
            style={{ color: brand.colors.charcoalMuted }}
          >
            {post.time}
          </time>
        </div>
        <div
          className="community-card__safety"
          style={{ gap: brand.spacing[8] }}
        >
          <ReportButton
            targetType="post"
            targetId={post.id}
            targetLabel={post.title}
          />
          <BlockUserButton userId={post.authorId} userName={post.author} />
        </div>
      </header>

      <div>
        <h3
          className="community-card__title"
          style={{
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
            marginBottom: brand.spacing[8],
          }}
        >
          {post.title}
        </h3>
        <p
          className="community-card__body"
          style={{
            fontFamily: brand.typography.body,
            color: brand.colors.charcoal,
          }}
        >
          {post.body}
        </p>
      </div>

      <ul
        className="community-card__tags"
        aria-label="Post topics"
        style={{ gap: brand.spacing[8] }}
      >
        {post.tags.map((tag) => (
          <li key={tag}>
            <span
              className="community-card__tag"
              style={{
                borderRadius: brand.radius.md,
                padding: `${brand.spacing[4]} ${brand.spacing[12]}`,
                background: brand.colors.sageSoft,
                color: brand.colors.charcoal,
                fontFamily: brand.typography.body,
              }}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>

      <footer
        className="community-card__actions"
        style={{
          gap: brand.spacing[8],
          paddingTop: brand.spacing[20],
        }}
      >
        <button
          type="button"
          className={`community-action${liked ? " is-liked" : ""}`}
          aria-pressed={liked}
          aria-label={liked ? "Unlike post" : "Like post"}
          onClick={onToggleLike}
          style={{
            gap: brand.spacing[8],
            padding: `${brand.spacing[8]} ${brand.spacing[12]}`,
            borderRadius: brand.radius.md,
            background: liked ? brand.colors.sageSoft : brand.colors.white,
            color: liked ? brand.colors.sageDeep : brand.colors.charcoal,
            borderColor: liked ? brand.colors.sage : brand.colors.clay,
            fontFamily: brand.typography.body,
            boxShadow: brand.shadows.xs,
          }}
        >
          <HeartIcon filled={liked} />
          <span>
            {post.likes} {post.likes === 1 ? "Like" : "Likes"}
          </span>
        </button>
        <button
          type="button"
          className="community-action"
          aria-haspopup="dialog"
          aria-label="Open comments"
          onClick={onOpenComments}
          style={{
            gap: brand.spacing[8],
            padding: `${brand.spacing[8]} ${brand.spacing[12]}`,
            borderRadius: brand.radius.md,
            background: brand.colors.white,
            color: brand.colors.charcoal,
            borderColor: brand.colors.clay,
            fontFamily: brand.typography.body,
            boxShadow: brand.shadows.xs,
          }}
        >
          <CommentIcon />
          <span>
            {post.comments.length}{" "}
            {post.comments.length === 1 ? "Comment" : "Comments"}
          </span>
        </button>
      </footer>
    </article>
  );
}

function CommentDrawer({
  post,
  onClose,
  onAddComment,
}: {
  post: Post;
  onClose: () => void;
  onAddComment: (body: string) => void;
}) {
  const { moderate } = useSafety();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const formId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = moderate(draft, "comment");
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    onAddComment(draft.trim());
    setDraft("");
    setError(null);
  };

  return (
    <div className="community-drawer" role="presentation">
      <button
        type="button"
        className="community-drawer__backdrop"
        aria-label="Close comments"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="community-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        style={{
          gap: brand.spacing[20],
          padding: `${brand.spacing[20]} ${brand.spacing[20]} ${brand.spacing[32]}`,
          borderRadius: `${brand.radius.lg} ${brand.radius.lg} ${brand.radius.md} ${brand.radius.md}`,
          background: brand.colors.mist,
          boxShadow: brand.shadows.lift,
          color: brand.colors.charcoal,
        }}
      >
        <header
          className="community-drawer__header"
          style={{ gap: brand.spacing[20] }}
        >
          <div>
            <h2
              id={`${formId}-title`}
              style={{
                fontFamily: brand.typography.heading,
                color: brand.colors.charcoal,
                marginBottom: brand.spacing[4],
              }}
            >
              Comments
            </h2>
            <p
              style={{
                fontFamily: brand.typography.body,
                color: brand.colors.charcoalSoft,
              }}
            >
              {post.title}
            </p>
          </div>
          <button
            type="button"
            className="community-drawer__close"
            aria-label="Close comment drawer"
            onClick={onClose}
            style={{
              borderRadius: brand.radius.md,
              color: brand.colors.charcoal,
              background: brand.colors.white,
            }}
          >
            ×
          </button>
        </header>

        {post.comments.length === 0 ? (
          <p
            className="community-drawer__empty"
            style={{
              fontFamily: brand.typography.body,
              color: brand.colors.charcoalMuted,
            }}
          >
            No replies yet — add a supportive note if you want to.
          </p>
        ) : (
          <ul className="community-drawer__list" style={{ gap: brand.spacing[12] }}>
            {post.comments.map((comment) => (
              <li
                key={comment.id}
                className="community-comment"
                style={{
                  gap: brand.spacing[12],
                  padding: brand.spacing[12],
                  borderRadius: brand.radius.md,
                  background: brand.colors.white,
                  boxShadow: brand.shadows.xs,
                  color: brand.colors.charcoal,
                }}
              >
                <Avatar name={comment.author} size="sm" />
                <div>
                  <div
                    className="community-comment__meta"
                    style={{ gap: brand.spacing[8] }}
                  >
                    <strong
                      style={{
                        fontFamily: brand.typography.body,
                        color: brand.colors.charcoal,
                      }}
                    >
                      {comment.author}
                    </strong>
                    <time
                      dateTime={comment.time}
                      style={{ color: brand.colors.charcoalMuted }}
                    >
                      {comment.time}
                    </time>
                    <ReportButton
                      targetType="comment"
                      targetId={comment.id}
                      targetLabel={`Comment by ${comment.author}`}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: brand.typography.body,
                      color: brand.colors.charcoal,
                    }}
                  >
                    {comment.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form
          className="community-drawer__form"
          onSubmit={submit}
          style={{ gap: brand.spacing[8] }}
        >
          {error ? (
            <p
              className="community-drawer__error"
              style={{
                borderRadius: brand.radius.md,
                padding: `${brand.spacing[8]} ${brand.spacing[12]}`,
              }}
            >
              {error}
            </p>
          ) : null}
          <label className="sr-only" htmlFor={`${formId}-input`}>
            Add a comment
          </label>
          <input
            ref={inputRef}
            id={`${formId}-input`}
            className="community-drawer__input"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              if (error) setError(null);
            }}
            placeholder="Share a practical or encouraging note…"
            style={{
              borderRadius: brand.radius.md,
              padding: `${brand.spacing[12]} ${brand.spacing[12]}`,
              background: brand.colors.white,
              color: brand.colors.charcoal,
              fontFamily: brand.typography.body,
              borderColor: brand.colors.clay,
            }}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!draft.trim()}
            style={{ borderRadius: brand.radius.md }}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9.2C5 7.5 7.2 5.5 9.6 5.5c1.4 0 2.6.7 3.4 1.8.8-1.1 2-1.8 3.4-1.8C18.8 5.5 21 7.5 21 10.8 21 15.6 12 20 12 20Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M6 18.5 4 21V7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v8A2.5 2.5 0 0 1 17.5 18H6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Community;
