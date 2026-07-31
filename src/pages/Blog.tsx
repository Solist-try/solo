import { useMemo, useState, type CSSProperties } from "react";
import {
  BLOG_CATEGORIES,
  blogArticles,
  type BlogArticle,
  type BlogCategory,
} from "./blogData";

type Filter = "All" | BlogCategory;

export function Blog() {
  const [filter, setFilter] = useState<Filter>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const featured =
    blogArticles.find((article) => article.featured) ?? blogArticles[0];

  const articles = useMemo(() => {
    const rest = blogArticles.filter((article) => article.id !== featured.id);
    if (filter === "All") return rest;
    return rest.filter((article) => article.category === filter);
  }, [filter, featured.id]);

  return (
    <div className="container blog-page">
      <header className="blog-header">
        <h1>Blog</h1>
        <p>
          Stories and steady notes for independent living — practical, warm, and
          written for the solo stretch.
        </p>
      </header>

      <FeaturedBanner
        article={featured}
        expanded={expandedId === featured.id}
        onToggle={() =>
          setExpandedId((current) =>
            current === featured.id ? null : featured.id,
          )
        }
      />

      <div
        className="blog-filters"
        role="toolbar"
        aria-label="Filter articles by category"
      >
        <FilterChip
          label="All"
          active={filter === "All"}
          onClick={() => setFilter("All")}
        />
        {BLOG_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={category}
            active={filter === category}
            onClick={() => setFilter(category)}
          />
        ))}
      </div>

      <p className="blog-count" aria-live="polite">
        {articles.length} {articles.length === 1 ? "article" : "articles"}
        {filter !== "All" ? ` · ${filter}` : ""}
      </p>

      {articles.length === 0 ? (
        <p className="blog-empty">
          No articles in this category yet. Try another filter.
        </p>
      ) : (
        <div className="blog-grid">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              expanded={expandedId === article.id}
              style={{ animationDelay: `${0.05 + index * 0.05}s` }}
              onToggle={() =>
                setExpandedId((current) =>
                  current === article.id ? null : article.id,
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedBanner({
  article,
  expanded,
  onToggle,
}: {
  article: BlogArticle;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="blog-featured" aria-labelledby="featured-story-title">
      <p className="blog-featured__eyebrow">Featured story · {article.category}</p>
      <h2 id="featured-story-title" className="blog-featured__title">
        {article.title}
      </h2>
      <p className="blog-featured__excerpt">
        {expanded
          ? `${article.excerpt} Take it slow — one soft next step is enough for today.`
          : article.excerpt}
      </p>
      <p className="blog-featured__meta">
        {article.author} · {article.date} · {article.readTime} read
      </p>
      <button type="button" className="blog-featured__cta" onClick={onToggle}>
        {expanded ? "Show less" : "Read story"}
        <span aria-hidden="true">{expanded ? "↑" : "→"}</span>
      </button>
    </section>
  );
}

function ArticleCard({
  article,
  expanded,
  onToggle,
  style,
}: {
  article: BlogArticle;
  expanded: boolean;
  onToggle: () => void;
  style?: CSSProperties;
}) {
  return (
    <article className="blog-card" style={style}>
      <span className="blog-card__category">{article.category}</span>
      <h3 className="blog-card__title">{article.title}</h3>
      <p className="blog-card__excerpt">
        {expanded
          ? `${article.excerpt} Keep this nearby for the next quiet stretch.`
          : article.excerpt}
      </p>
      <p className="blog-card__meta">
        {article.author} · {article.date} · {article.readTime}
      </p>
      <button type="button" className="blog-card__link" onClick={onToggle}>
        {expanded ? "Show less" : "Read more"}
        <span aria-hidden="true">{expanded ? "↑" : "→"}</span>
      </button>
    </article>
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
      className={`blog-chip${active ? " is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Blog;
