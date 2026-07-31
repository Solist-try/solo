import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useAuth } from "../auth";
import { Avatar } from "../components/ui";
import {
  BlockUserButton,
  GuidelinesReminder,
  ReportButton,
  useSafety,
} from "../modules/safety";
import {
  TOPICS,
  initialPosts,
  type Post,
  type Topic,
} from "./communityData";

type Filter = Topic | "All";

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

  return (
    <div className="container community-page">
      <header className="community-header">
        <h1>Community</h1>
        <p>
          Encouragement and practical notes from people walking solo — reply
          when you want company.
        </p>
      </header>

      <GuidelinesReminder />

      <div
        className="community-filters"
        role="toolbar"
        aria-label="Filter posts by topic"
      >
        <FilterChip
          label="All"
          active={filter === "All"}
          onClick={() => setFilter("All")}
        />
        {TOPICS.map((topic) => (
          <FilterChip
            key={topic}
            label={topic}
            active={filter === topic}
            onClick={() => setFilter(topic)}
          />
        ))}
      </div>

      <p className="community-count" aria-live="polite">
        {visiblePosts.length}{" "}
        {visiblePosts.length === 1 ? "post" : "posts"}
        {filter !== "All" ? ` · ${filter}` : ""}
      </p>

      <div className="community-feed">
        {visiblePosts.length === 0 ? (
          <div className="community-empty">
            <p>No posts in this topic yet. Try another filter.</p>
            <button
              type="button"
              className="community-empty__action"
              onClick={() => setFilter("All")}
            >
              Show all posts
            </button>
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
    <article className="community-card">
      <header className="community-card__header">
        <Avatar name={post.author} />
        <div className="community-card__meta">
          <strong className="community-card__username">{post.author}</strong>
          <time className="community-card__time" dateTime={post.time}>
            {post.time}
          </time>
        </div>
        <div className="community-card__safety">
          <ReportButton
            targetType="post"
            targetId={post.id}
            targetLabel={post.title}
          />
          <BlockUserButton userId={post.authorId} userName={post.author} />
        </div>
      </header>

      <div>
        <h3 className="community-card__title">{post.title}</h3>
        <p className="community-card__body">{post.body}</p>
      </div>

      <ul className="community-card__tags" aria-label="Post topics">
        {post.tags.map((tag) => (
          <li key={tag}>
            <span className="community-card__tag">{tag}</span>
          </li>
        ))}
      </ul>

      <footer className="community-card__actions">
        <button
          type="button"
          className={`community-action${liked ? " is-liked" : ""}`}
          aria-pressed={liked}
          aria-label={liked ? "Unlike post" : "Like post"}
          onClick={onToggleLike}
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
      >
        <header className="community-drawer__header">
          <div>
            <h2 id={`${formId}-title`}>Comments</h2>
            <p>{post.title}</p>
          </div>
          <button
            type="button"
            className="community-drawer__close"
            aria-label="Close comment drawer"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        {post.comments.length === 0 ? (
          <p className="community-drawer__empty">
            Be the first to leave a kind note.
          </p>
        ) : (
          <ul className="community-drawer__list">
            {post.comments.map((comment) => (
              <li key={comment.id} className="community-comment">
                <Avatar name={comment.author} size="sm" />
                <div>
                  <div className="community-comment__meta">
                    <strong>{comment.author}</strong>
                    <time dateTime={comment.time}>{comment.time}</time>
                    <ReportButton
                      targetType="comment"
                      targetId={comment.id}
                      targetLabel={`Comment by ${comment.author}`}
                    />
                  </div>
                  <p>{comment.body}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form className="community-drawer__form" onSubmit={submit}>
          {error ? <p className="community-drawer__error">{error}</p> : null}
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
            placeholder="Share a supportive reply…"
          />
          <button
            type="submit"
            className="community-drawer__submit"
            disabled={!draft.trim()}
          >
            Reply
          </button>
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
