import { useId, useState, type FormEvent } from "react";
import { Avatar, Button, Card, CardBody, CardFooter } from "../../components/ui";
import {
  BlockUserButton,
  ReportButton,
  useSafety,
} from "../../modules/safety";
import type { Post } from "./data";
import styles from "./PostCard.module.css";

type PostCardProps = {
  post: Post;
  liked: boolean;
  onToggleLike: () => void;
  onAddComment: (body: string) => void;
};

export function PostCard({
  post,
  liked,
  onToggleLike,
  onAddComment,
}: PostCardProps) {
  const { moderate } = useSafety();
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const formId = useId();

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
    setShowComments(true);
  };

  return (
    <Card variant="elevated" className={styles.card} padding="lg">
      <header className={styles.header}>
        <Avatar name={post.author} />
        <div className={styles.meta}>
          <strong>{post.author}</strong>
          <span>{post.time}</span>
        </div>
        <div className={styles.safetyActions}>
          <ReportButton
            targetType="post"
            targetId={post.id}
            targetLabel={post.title}
          />
          <BlockUserButton userId={post.authorId} userName={post.author} />
        </div>
      </header>

      <div className={styles.content}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>

      <ul className={styles.tags} aria-label="Post tags">
        {post.tags.map((tag) => (
          <li key={tag}>
            <span className={styles.tag}>{tag}</span>
          </li>
        ))}
      </ul>

      <CardFooter className={styles.actions}>
        <button
          type="button"
          className={`${styles.action} ${liked ? styles.liked : ""}`}
          aria-pressed={liked}
          onClick={onToggleLike}
        >
          <HeartIcon filled={liked} />
          <span>
            {post.likes} {post.likes === 1 ? "like" : "likes"}
          </span>
        </button>
        <button
          type="button"
          className={styles.action}
          aria-expanded={showComments}
          onClick={() => setShowComments((open) => !open)}
        >
          <CommentIcon />
          <span>
            {post.comments.length}{" "}
            {post.comments.length === 1 ? "comment" : "comments"}
          </span>
        </button>
      </CardFooter>

      {showComments ? (
        <CardBody className={styles.comments}>
          {post.comments.length === 0 ? (
            <p className={styles.empty}>Be the first to leave a kind note.</p>
          ) : (
            <ul className={styles.commentList}>
              {post.comments.map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  <Avatar name={comment.author} size="sm" />
                  <div>
                    <div className={styles.commentMeta}>
                      <strong>{comment.author}</strong>
                      <span>{comment.time}</span>
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

          <form className={styles.form} onSubmit={submit} id={formId}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <label className="sr-only" htmlFor={`${formId}-input`}>
              Add a comment
            </label>
            <input
              id={`${formId}-input`}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                if (error) setError(null);
              }}
              placeholder="Share a supportive reply…"
              className={styles.input}
            />
            <Button type="submit" size="sm" variant="soft" disabled={!draft.trim()}>
              Reply
            </Button>
          </form>
        </CardBody>
      ) : null}
    </Card>
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
