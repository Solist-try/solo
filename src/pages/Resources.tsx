import {
  useDeferredValue,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { brand } from "../styles/brand-tokens";
import {
  CATEGORIES,
  resources,
  type Category,
  type Resource,
} from "./resourcesData";

type Filter = "All" | Category;

export function Resources() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  const visible = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesCategory = filter === "All" || resource.category === filter;
      if (!matchesCategory) return false;
      if (!normalized) return true;

      const haystack = [
        resource.title,
        resource.summary,
        resource.category,
        resource.format,
        ...resource.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [deferredQuery, filter]);

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
    ["--resources-hover-tint" as string]: brand.colors.button.hoverTint,
    ["--resources-radius" as string]: brand.radius.lg,
    ["--resources-radius-md" as string]: brand.radius.md,
    ["--resources-space-8" as string]: brand.spacing[8],
    ["--resources-space-12" as string]: brand.spacing[12],
    ["--resources-space-20" as string]: brand.spacing[20],
    ["--resources-space-32" as string]: brand.spacing[32],
  } as CSSProperties;

  return (
    <div className="container resources-page" style={pageStyle}>
      <header className="resources-header" style={{ gap: brand.spacing[12] }}>
        <h1
          style={{
            fontFamily: brand.typography.heading,
            color: brand.colors.charcoal,
          }}
        >
          Resources Library
        </h1>
        <p
          style={{
            fontFamily: brand.typography.body,
            color: brand.colors.charcoalSoft,
          }}
        >
          Clear guides and practical tools for solo living — find what you need,
          use what fits, leave the rest without guilt.
        </p>
      </header>

      <div className="resources-controls" style={{ gap: brand.spacing[20] }}>
        <label
          className="resources-search"
          style={{
            background: brand.colors.mist,
            color: brand.colors.charcoal,
            borderRadius: brand.radius.md,
            boxShadow: brand.shadows.soft,
            gap: brand.spacing[12],
            padding: `${brand.spacing[12]} ${brand.spacing[20]}`,
          }}
        >
          <span className="sr-only">Search resources</span>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle
              cx="11"
              cy="11"
              r="6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="m16 16 4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by topic, format, or need…"
            autoComplete="off"
            style={{
              color: brand.colors.charcoal,
              fontFamily: brand.typography.body,
            }}
          />
        </label>

        <div
          className="resources-filters"
          role="toolbar"
          aria-label="Filter resources by category"
          style={{ gap: brand.spacing[8] }}
        >
          <FilterChip
            label="All"
            active={filter === "All"}
            onClick={() => setFilter("All")}
          />
          {CATEGORIES.map((category) => (
            <FilterChip
              key={category}
              label={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            />
          ))}
        </div>
      </div>

      <p
        className="resources-count"
        aria-live="polite"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoalMuted,
        }}
      >
        {visible.length} {visible.length === 1 ? "resource" : "resources"}
        {filter !== "All" ? ` · ${filter}` : ""}
        {deferredQuery.trim() ? ` matching “${deferredQuery.trim()}”` : ""}
      </p>

      {visible.length === 0 ? (
        <div
          className="resources-empty"
          style={{
            gap: brand.spacing[20],
            padding: brand.spacing[32],
            borderRadius: brand.radius.lg,
            background: brand.colors.mist,
            boxShadow: brand.shadows.soft,
            color: brand.colors.charcoal,
          }}
        >
          <p>
            Nothing matches that search. Try a broader word, or clear filters and
            start again.
          </p>
          <button
            type="button"
            className="resources-empty__action"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
            style={{
              borderRadius: brand.radius.md,
              background: brand.colors.sage,
              color: brand.colors.charcoal,
              padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
              fontFamily: brand.typography.body,
            }}
          >
            Clear search & filters
          </button>
        </div>
      ) : (
        <div className="resources-grid" style={{ gap: brand.spacing[20] }}>
          {visible.map((resource, index) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              expanded={openId === resource.id}
              onReadMore={() =>
                setOpenId((current) =>
                  current === resource.id ? null : resource.id,
                )
              }
              style={{ animationDelay: `${0.04 + index * 0.04}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceCard({
  resource,
  expanded,
  onReadMore,
  style,
}: {
  resource: Resource;
  expanded: boolean;
  onReadMore: () => void;
  style?: CSSProperties;
}) {
  return (
    <article
      className="resources-card"
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
        className="resources-card__category"
        style={{
          borderRadius: brand.radius.md,
          background: brand.colors.sage,
          color: brand.colors.charcoal,
          padding: `${brand.spacing[4]} ${brand.spacing[12]}`,
          fontFamily: brand.typography.body,
        }}
      >
        {resource.category}
      </span>
      <h2
        className="resources-card__title"
        style={{
          fontFamily: brand.typography.heading,
          color: brand.colors.charcoal,
        }}
      >
        {resource.title}
      </h2>
      <p
        className="resources-card__description"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoal,
        }}
      >
        {resource.summary}
      </p>

      {expanded ? (
        <div
          className="resources-card__details"
          style={{
            gap: brand.spacing[8],
            paddingTop: brand.spacing[8],
            fontFamily: brand.typography.body,
            color: brand.colors.charcoal,
          }}
        >
          <p>
            <strong>{resource.format}</strong> · {resource.readTime} read
          </p>
          <p>
            Keep this close for moments that ask for a clear next step — practical,
            paced, and honest about what helps.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        className="resources-card__read-more"
        aria-expanded={expanded}
        onClick={onReadMore}
        style={{
          marginTop: "auto",
          borderRadius: brand.radius.md,
          padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
          background: brand.colors.sage,
          color: brand.colors.charcoal,
          fontFamily: brand.typography.body,
          boxShadow: brand.shadows.xs,
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
      className={`resources-chip${active ? " is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
      style={{
        borderRadius: brand.radius.md,
        padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
        background: brand.colors.sage,
        color: brand.colors.charcoal,
        fontFamily: brand.typography.body,
        boxShadow: active ? brand.shadows.xs : "none",
        outline: active
          ? `2px solid ${brand.colors.charcoal}`
          : "2px solid transparent",
        outlineOffset: "2px",
      }}
    >
      {label}
    </button>
  );
}

export default Resources;
