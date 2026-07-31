import {
  useDeferredValue,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
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

  return (
    <div className="container resources-page">
      <header className="resources-header">
        <h1>Resources Library</h1>
        <p>
          Guides, tools, and checklists for solo living — search by topic when
          you need something steady and useful.
        </p>
      </header>

      <div className="resources-controls">
        <label className="resources-search">
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
            placeholder="Search guides, tools, topics…"
            autoComplete="off"
          />
        </label>

        <div
          className="resources-filters"
          role="toolbar"
          aria-label="Filter resources by category"
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

      <p className="resources-count" aria-live="polite">
        {visible.length} {visible.length === 1 ? "resource" : "resources"}
        {filter !== "All" ? ` · ${filter}` : ""}
        {deferredQuery.trim() ? ` matching “${deferredQuery.trim()}”` : ""}
      </p>

      {visible.length === 0 ? (
        <div className="resources-empty">
          <p>No resources match that search. Try another keyword or category.</p>
          <button
            type="button"
            className="resources-empty__action"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Clear search & filters
          </button>
        </div>
      ) : (
        <div className="resources-grid">
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
    <article className="resources-card" style={style}>
      <span className="resources-card__category">{resource.category}</span>
      <h2 className="resources-card__title">{resource.title}</h2>
      <p className="resources-card__description">{resource.summary}</p>

      {expanded ? (
        <div className="resources-card__details">
          <p>
            <strong>{resource.format}</strong> · {resource.readTime} read
          </p>
          <p>
            Keep this nearby for the moments when solo living asks for a clear
            next step — steady, practical, and kind to your pace.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        className="resources-card__read-more"
        aria-expanded={expanded}
        onClick={onReadMore}
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
    >
      {label}
    </button>
  );
}

export default Resources;
