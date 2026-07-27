import { useMemo, useState } from "react";
import { useAuth } from "../../auth";
import { Button } from "../../components/ui";
import { GuidelinesReminder, useSafety } from "../../modules/safety";
import { TOPICS, initialPosts, type Post, type Topic } from "./data";
import { PostCard } from "./PostCard";
import styles from "./Community.module.css";

type Filter = "All" | Topic;

export function Community() {
  const { user } = useAuth();
  const { isBlocked } = useSafety();
  const [filter, setFilter] = useState<Filter>("All");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      if (isBlocked(post.authorId)) return false;
      if (filter === "All") return true;
      return post.tags.includes(filter);
    });
  }, [filter, posts, isBlocked]);

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
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Community Feed</h1>
        <p>
          Posts, encouragement, and practical notes from people walking solo —
          with room to reply when you want company.
        </p>
      </header>

      <GuidelinesReminder />

      <div className={styles.toolbar}>
        <div
          className={styles.filters}
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
        <Button variant="secondary" size="sm">
          New post
        </Button>
      </div>

      <p className={styles.count} aria-live="polite">
        {visiblePosts.length}{" "}
        {visiblePosts.length === 1 ? "post" : "posts"}
        {filter !== "All" ? ` in ${filter}` : ""}
      </p>

      <div className={styles.feed}>
        {visiblePosts.length === 0 ? (
          <div className={styles.empty}>
            <p>No posts in this topic yet. Try another filter or start one.</p>
            <Button variant="soft" onClick={() => setFilter("All")}>
              Show all posts
            </Button>
          </div>
        ) : (
          visiblePosts.map((post, index) => (
            <div
              key={post.id}
              style={{ animationDelay: `${0.05 + index * 0.06}s` }}
              className={styles.feedItem}
            >
              <PostCard
                post={post}
                liked={likedIds.has(post.id)}
                onToggleLike={() => toggleLike(post.id)}
                onAddComment={(body) => addComment(post.id, body)}
              />
            </div>
          ))
        )}
      </div>
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
      className={`${styles.chip} ${active ? styles.chipActive : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
