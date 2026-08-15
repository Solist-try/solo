import { useMemo, useState, type CSSProperties } from "react";
import { brand } from "../styles/brand-tokens";
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

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
    ["--blog-radius" as string]: brand.radius.lg,
    ["--blog-radius-md" as string]: brand.radius.md,
    ["--blog-space-8" as string]: brand.spacing[8],
    ["--blog-space-12" as string]: brand.spacing[12],
    ["--blog-space-20" as string]: brand.spacing[20],
    ["--blog-space-32" as string]: brand.spacing[32],
    ["--blog-clay" as string]: brand.colors.clay,
    ["--blog-sage" as string]: brand.colors.sage,
    ["--blog-mist" as string]: brand.colors.mist,
    ["--blog-charcoal" as string]: brand.colors.charcoal,
    ["--blog-hover" as string]: brand.colors.button.hoverTint,
    ["--blog-shadow" as string]: brand.shadows.soft,
    ["--blog-shadow-lift" as string]: brand.shadows.lift,
    fontFamily: brand.typography.body,
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
    <div className="container blog-page" style={pageStyle}>
      <header className="blog-header" style={{ gap: brand.spacing[12] }}>
        <h1 style={headingStyle}>Blog</h1>
        <p style={bodyStyle}>
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
        style={{
          gap: brand.spacing[8],
          padding: brand.spacing[12],
          borderRadius: brand.radius.lg,
          background: brand.colors.mist,
          boxShadow: brand.shadows.soft,
        }}
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

      <p className="blog-count" style={bodyStyle} aria-live="polite">
        {articles.length} {articles.length === 1 ? "article" : "articles"}
        {filter !== "All" ? ` · ${filter}` : ""}
      </p>

      {articles.length === 0 ? (
        <p
          className="blog-empty"
          style={{
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            background: brand.colors.mist,
            boxShadow: brand.shadows.soft,
            color: brand.colors.charcoalSoft,
          }}
        >
          No articles in this category yet. Try another filter.
        </p>
      ) : (
        <div className="blog-grid" style={{ gap: brand.spacing[20] }}>
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
    <section
      className="blog-featured"
      aria-labelledby="featured-story-title"
      style={{
        gap: brand.spacing[20],
        padding: brand.spacing[32],
        borderRadius: brand.radius.lg,
        background: `linear-gradient(145deg, ${brand.colors.sage} 0%, ${brand.colors.mist} 48%, ${brand.colors.clay} 100%)`,
        boxShadow: brand.shadows.lift,
        color: brand.colors.charcoal,
      }}
    >
      <p
        className="blog-featured__eyebrow"
        style={{
          padding: `${brand.spacing[4]} ${brand.spacing[12]}`,
          borderRadius: brand.radius.md,
          background: brand.colors.mist,
          color: brand.colors.sageDeep,
          boxShadow: brand.shadows.xs,
          fontFamily: brand.typography.body,
        }}
      >
        Featured story · {article.category}
      </p>
      <h2
        id="featured-story-title"
        className="blog-featured__title"
        style={{
          fontFamily: brand.typography.heading,
          color: brand.colors.charcoal,
        }}
      >
        {article.title}
      </h2>
      <p
        className="blog-featured__excerpt"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoal,
          lineHeight: brand.typography.leading.relaxed,
        }}
      >
        {expanded
          ? `${article.excerpt} Take it slow — one soft next step is enough for today.`
          : article.excerpt}
      </p>
      <p
        className="blog-featured__meta"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoalSoft,
        }}
      >
        {article.author} · {article.date} · {article.readTime} read
      </p>
      <button
        type="button"
        className="blog-featured__cta"
        onClick={onToggle}
        style={{
          gap: brand.spacing[8],
          marginTop: brand.spacing[4],
          padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
          borderRadius: brand.radius.md,
          background: brand.colors.sage,
          color: brand.colors.white,
          boxShadow: brand.shadows.soft,
          fontFamily: brand.typography.body,
        }}
      >
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
    <article
      className="blog-card"
      style={{
        ...style,
        gap: brand.spacing[12],
        padding: brand.spacing[20],
        borderRadius: brand.radius.lg,
        background: brand.colors.clay,
        boxShadow: brand.shadows.soft,
        color: brand.colors.charcoal,
      }}
    >
      <span
        className="blog-card__category"
        style={{
          padding: `${brand.spacing[4]} ${brand.spacing[12]}`,
          borderRadius: brand.radius.md,
          background: brand.colors.sageSoft,
          color: brand.colors.charcoal,
          fontFamily: brand.typography.body,
        }}
      >
        {article.category}
      </span>
      <h3
        className="blog-card__title"
        style={{
          fontFamily: brand.typography.heading,
          color: brand.colors.charcoal,
        }}
      >
        {article.title}
      </h3>
      <p
        className="blog-card__excerpt"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoal,
          lineHeight: brand.typography.leading.relaxed,
        }}
      >
        {expanded
          ? `${article.excerpt} Keep this nearby for the next quiet stretch.`
          : article.excerpt}
      </p>
      <p
        className="blog-card__meta"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoalSoft,
        }}
      >
        {article.author} · {article.date} · {article.readTime}
      </p>
      <button
        type="button"
        className="blog-card__link"
        onClick={onToggle}
        style={{
          gap: brand.spacing[8],
          color: brand.colors.sageDeep,
          fontFamily: brand.typography.body,
        }}
      >
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
      style={{
        padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
        borderRadius: brand.radius.md,
        background: active ? brand.colors.sage : brand.colors.white,
        color: brand.colors.charcoal,
        boxShadow: active ? brand.shadows.soft : brand.shadows.xs,
        fontFamily: brand.typography.body,
      }}
    >
      {label}
    </button>
  );
}

export default Blog;
