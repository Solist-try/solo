import { useDeferredValue, useMemo, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "../../components/ui";
import { CATEGORIES, resources, type Category } from "./data";
import styles from "./Resources.module.css";

type Filter = "All" | Category;

export function Resources() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const deferredQuery = useDeferredValue(query);

  const visible = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesCategory =
        filter === "All" || resource.category === filter;

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
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Resources Library</h1>
        <p>
          Guides, tools, and checklists for solo living — searchable by topic
          when you need something steady and useful.
        </p>
      </header>

      <div className={styles.controls}>
        <label className={styles.search}>
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
            placeholder="Search guides, tools, tags…"
            autoComplete="off"
          />
        </label>

        <div
          className={styles.filters}
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

      <p className={styles.count} aria-live="polite">
        {visible.length} {visible.length === 1 ? "resource" : "resources"}
        {filter !== "All" ? ` in ${filter}` : ""}
        {deferredQuery.trim() ? ` matching “${deferredQuery.trim()}”` : ""}
      </p>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <p>No resources match that search. Try another keyword or category.</p>
          <div className={styles.emptyActions}>
            <Button
              variant="soft"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Clear search & filters
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {visible.map((resource, index) => (
            <Card
              key={resource.id}
              variant="elevated"
              className={styles.card}
              style={{ animationDelay: `${0.04 + index * 0.04}s` }}
            >
              <CardHeader
                eyebrow={`${resource.format} · ${resource.readTime}`}
                title={resource.title}
              />
              <CardBody>
                <p className={styles.summary}>{resource.summary}</p>
                <div className={styles.metaRow}>
                  <span className={styles.category}>{resource.category}</span>
                  <ul className={styles.tags} aria-label="Tags">
                    {resource.tags.map((tag) => (
                      <li key={tag}>
                        <span className={styles.tag}>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="outline">
                  Open resource
                </Button>
                <Button size="sm" variant="ghost">
                  Save
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
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
