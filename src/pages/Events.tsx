import { useMemo, useState, type CSSProperties } from "react";
import { useAuth } from "../auth";
import {
  EVENT_TYPES,
  eventsCatalog,
  formatEventWhen,
  type EventType,
  type SoloEvent,
} from "../modules/events";

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

  return (
    <div className="container events-page">
      <header className="events-header">
        <h1>Events</h1>
        <p>
          Workshops, discussions, and meetups for solo living — RSVP when you
          want company on the calendar.
        </p>
      </header>

      <div
        className="events-filters"
        role="toolbar"
        aria-label="Filter events by type"
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

      <div className="events-layout">
        <aside className="events-calendar" aria-label="Calendar preview">
          <div className="events-calendar__header">
            <h2>{monthLabel}</h2>
            <div className="events-calendar__nav">
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
              >
                ›
              </button>
            </div>
          </div>

          <div className="events-calendar__weekdays" aria-hidden="true">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="events-calendar__grid">
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
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>

          <p className="events-calendar__legend">
            Highlighted days have upcoming GoSolo events. Tap again to clear the
            day filter.
            {rsvpIds.length > 0
              ? ` You’re going to ${rsvpIds.length}.`
              : ""}
          </p>
        </aside>

        <div>
          <p className="events-count" aria-live="polite">
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
            <div className="events-empty">
              <p>No events in this view yet.</p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setSelectedDay(null);
                }}
              >
                Show all events
              </button>
            </div>
          ) : (
            <div className="events-grid">
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
    <article className="events-card" style={style}>
      <span className="events-card__type">{FILTER_LABELS[event.type]}</span>
      <h3 className="events-card__title">{event.title}</h3>
      <p className="events-card__date">{formatEventWhen(event.start, event.end)}</p>
      <p className="events-card__description">{event.description}</p>
      <p className="events-card__meta">
        Hosted by {event.host} · {event.location}
      </p>
      <div className="events-card__actions">
        <button
          type="button"
          className={`events-rsvp${rsvped ? " is-going" : ""}`}
          disabled={pending}
          aria-pressed={rsvped}
          onClick={onToggleRsvp}
        >
          {pending ? "Saving…" : rsvped ? "Going ✓" : "RSVP"}
        </button>
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
    >
      {label}
    </button>
  );
}

export default Events;
