import { useMemo, useState, type CSSProperties } from "react";
import { useAuth } from "../auth";
import { Button } from "../components/ui";
import {
  EVENT_TYPES,
  eventsCatalog,
  formatEventWhen,
  type EventType,
  type SoloEvent,
} from "../modules/events";
import { brand } from "../styles/brand-tokens";

type Filter = "All" | EventType;

const FILTER_LABELS: Record<EventType, string> = {
  workshop: "Workshops",
  discussion: "Discussions",
  meetup: "Meetups",
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const EMPTY_RSVPS: string[] = [];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function Events() {
  const { user, updateProfile } = useAuth();
  const [filter, setFilter] = useState<Filter>("All");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [monthCursor, setMonthCursor] = useState(() => startOfMonth(new Date()));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const rsvpIds = user?.rsvpEventIds ?? EMPTY_RSVPS;

  const eventDays = useMemo(() => {
    const map = new Map<string, SoloEvent[]>();
    for (const event of eventsCatalog) {
      const day = new Date(event.start);
      const key = dayKey(day);
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    }
    return map;
  }, []);

  const visible = useMemo(() => {
    let list =
      filter === "All"
        ? eventsCatalog
        : eventsCatalog.filter((event) => event.type === filter);

    if (selectedDay) {
      list = list.filter((event) => sameDay(new Date(event.start), selectedDay));
    }
    return list;
  }, [filter, selectedDay]);

  const calendarCells = useMemo(() => {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Array<{ date: Date | null; key: string }> = [];

    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push({ date: null, key: `empty-${i}` });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      cells.push({ date, key: dayKey(date) });
    }
    return cells;
  }, [monthCursor]);

  const monthLabel = monthCursor.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const today = new Date();

  const toggleRsvp = async (eventId: string) => {
    if (!user) return;
    setPendingId(eventId);
    const next = rsvpIds.includes(eventId)
      ? rsvpIds.filter((id) => id !== eventId)
      : [...rsvpIds, eventId];
    try {
      await updateProfile({ rsvpEventIds: next });
    } finally {
      setPendingId(null);
    }
  };

  const pageStyle = {
    gap: brand.spacing[32],
    paddingBlock: `${brand.spacingSteps[8]} ${brand.spacingSteps[12]}`,
    ["--events-radius" as string]: brand.radius.lg,
    ["--events-radius-md" as string]: brand.radius.md,
    ["--events-space-8" as string]: brand.spacing[8],
    ["--events-space-12" as string]: brand.spacing[12],
    ["--events-space-20" as string]: brand.spacing[20],
    ["--events-space-32" as string]: brand.spacing[32],
    ["--events-sage" as string]: brand.colors.sage,
    ["--events-clay" as string]: brand.colors.clay,
    ["--events-mist" as string]: brand.colors.mist,
    ["--events-charcoal" as string]: brand.colors.charcoal,
    ["--events-hover" as string]: brand.colors.button.hoverTint,
  } as CSSProperties;

  const headingStyle: CSSProperties = {
    fontFamily: brand.typography.heading,
    color: brand.colors.charcoal,
  };

  const bodyStyle: CSSProperties = {
    fontFamily: brand.typography.body,
    color: brand.colors.charcoalSoft,
  };

  return (
    <div className="container events-page" style={pageStyle}>
      <header className="events-header" style={{ gap: brand.spacing[12] }}>
        <h1 style={headingStyle}>Events</h1>
        <p style={bodyStyle}>
          Workshops, discussions, and meetups for solo living — RSVP when you
          want company on the calendar.
        </p>
      </header>

      <div
        className="events-filters"
        role="toolbar"
        aria-label="Filter events by type"
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
        {EVENT_TYPES.map((type) => (
          <FilterChip
            key={type}
            label={FILTER_LABELS[type]}
            active={filter === type}
            onClick={() => setFilter(type)}
          />
        ))}
      </div>

      <div className="events-layout" style={{ gap: brand.spacing[20] }}>
        <aside
          className="events-calendar"
          aria-label="Calendar preview"
          style={{
            gap: brand.spacing[20],
            padding: brand.spacing[20],
            borderRadius: brand.radius.lg,
            background: brand.colors.mist,
            boxShadow: brand.shadows.soft,
            color: brand.colors.charcoal,
          }}
        >
          <div className="events-calendar__header">
            <h2 style={headingStyle}>{monthLabel}</h2>
            <div className="events-calendar__nav" style={{ gap: brand.spacing[8] }}>
              <button
                type="button"
                aria-label="Previous month"
                onClick={() =>
                  setMonthCursor(
                    new Date(
                      monthCursor.getFullYear(),
                      monthCursor.getMonth() - 1,
                      1,
                    ),
                  )
                }
                style={{
                  borderRadius: brand.radius.md,
                  background: brand.colors.sage,
                  color: brand.colors.charcoal,
                  boxShadow: brand.shadows.xs,
                }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() =>
                  setMonthCursor(
                    new Date(
                      monthCursor.getFullYear(),
                      monthCursor.getMonth() + 1,
                      1,
                    ),
                  )
                }
                style={{
                  borderRadius: brand.radius.md,
                  background: brand.colors.sage,
                  color: brand.colors.charcoal,
                  boxShadow: brand.shadows.xs,
                }}
              >
                ›
              </button>
            </div>
          </div>

          <div className="events-calendar__weekdays" aria-hidden="true">
            {WEEKDAYS.map((day) => (
              <span key={day} style={{ color: brand.colors.charcoalMuted }}>
                {day}
              </span>
            ))}
          </div>

          <div className="events-calendar__grid" style={{ gap: brand.spacing[8] }}>
            {calendarCells.map((cell) => {
              if (!cell.date) {
                return (
                  <div
                    key={cell.key}
                    className="events-calendar__day is-empty"
                    aria-hidden="true"
                  />
                );
              }

              const hasEvent = eventDays.has(cell.key);
              const selected =
                selectedDay != null && sameDay(cell.date, selectedDay);
              const isToday = sameDay(cell.date, today);

              return (
                <button
                  key={cell.key}
                  type="button"
                  className={[
                    "events-calendar__day",
                    hasEvent ? "has-event" : "",
                    selected ? "is-selected" : "",
                    isToday ? "is-today" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={!hasEvent}
                  aria-pressed={selected}
                  aria-label={`${cell.date.toLocaleDateString()}${hasEvent ? ", has events" : ""}`}
                  onClick={() =>
                    setSelectedDay((current) =>
                      current && sameDay(current, cell.date!)
                        ? null
                        : cell.date,
                    )
                  }
                  style={{
                    borderRadius: brand.radius.md,
                    background: selected
                      ? brand.colors.sage
                      : hasEvent
                        ? brand.colors.clay
                        : brand.colors.white,
                    color: brand.colors.charcoal,
                    fontFamily: brand.typography.body,
                    boxShadow: hasEvent ? brand.shadows.xs : "none",
                  }}
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>

          <p className="events-calendar__legend" style={bodyStyle}>
            Highlighted days have upcoming Go Solo events. Tap again to clear the
            day filter.
            {rsvpIds.length > 0
              ? ` You’re going to ${rsvpIds.length}.`
              : ""}
          </p>
        </aside>

        <div style={{ display: "grid", gap: brand.spacing[20] }}>
          <p
            className="events-count"
            aria-live="polite"
            style={{
              fontFamily: brand.typography.body,
              color: brand.colors.charcoalMuted,
            }}
          >
            {visible.length} {visible.length === 1 ? "event" : "events"}
            {filter !== "All" ? ` · ${FILTER_LABELS[filter]}` : ""}
            {selectedDay
              ? ` · ${selectedDay.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}`
              : ""}
          </p>

          {visible.length === 0 ? (
            <div
              className="events-empty"
              style={{
                gap: brand.spacing[20],
                padding: brand.spacing[32],
                borderRadius: brand.radius.lg,
                background: brand.colors.mist,
                boxShadow: brand.shadows.soft,
                color: brand.colors.charcoal,
              }}
            >
              <p style={bodyStyle}>No events in this view yet.</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setFilter("All");
                  setSelectedDay(null);
                }}
              >
                Show all events
              </Button>
            </div>
          ) : (
            <div className="events-grid" style={{ gap: brand.spacing[20] }}>
              {visible.map((event, index) => (
                <EventCardView
                  key={event.id}
                  event={event}
                  rsvped={rsvpIds.includes(event.id)}
                  pending={pendingId === event.id}
                  style={{ animationDelay: `${0.05 + index * 0.05}s` }}
                  onToggleRsvp={() => {
                    if (pendingId) return;
                    void toggleRsvp(event.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCardView({
  event,
  rsvped,
  pending,
  onToggleRsvp,
  style,
}: {
  event: SoloEvent;
  rsvped: boolean;
  pending: boolean;
  onToggleRsvp: () => void;
  style?: CSSProperties;
}) {
  return (
    <article
      className="events-card"
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
        className="events-card__type"
        style={{
          borderRadius: brand.radius.md,
          background: brand.colors.sage,
          color: brand.colors.charcoal,
          padding: `${brand.spacing[4]} ${brand.spacing[12]}`,
          fontFamily: brand.typography.body,
        }}
      >
        {FILTER_LABELS[event.type]}
      </span>
      <h3
        className="events-card__title"
        style={{
          fontFamily: brand.typography.heading,
          color: brand.colors.charcoal,
        }}
      >
        {event.title}
      </h3>
      <p
        className="events-card__date"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoal,
        }}
      >
        {formatEventWhen(event.start, event.end)}
      </p>
      <p
        className="events-card__description"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoal,
        }}
      >
        {event.description}
      </p>
      <p
        className="events-card__meta"
        style={{
          fontFamily: brand.typography.body,
          color: brand.colors.charcoalSoft,
        }}
      >
        Hosted by {event.host} · {event.location}
      </p>
      <div className="events-card__actions">
        <Button
          type="button"
          variant="primary"
          disabled={pending}
          aria-pressed={rsvped}
          onClick={onToggleRsvp}
          className={`events-rsvp${rsvped ? " is-going" : ""}`}
          style={{
            borderRadius: brand.radius.md,
            background: brand.colors.sage,
            color: brand.colors.charcoal,
            boxShadow: brand.shadows.xs,
          }}
        >
          {pending ? "Saving…" : rsvped ? "Going ✓" : "RSVP"}
        </Button>
      </div>
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
      className={`events-chip${active ? " is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
      style={{
        borderRadius: brand.radius.md,
        padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
        background: active ? brand.colors.sage : brand.colors.white,
        color: brand.colors.charcoal,
        fontFamily: brand.typography.body,
        boxShadow: active ? brand.shadows.xs : "none",
        borderColor: active ? brand.colors.sage : brand.colors.clay,
      }}
    >
      {label}
    </button>
  );
}

export default Events;
