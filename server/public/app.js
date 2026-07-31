const views = ["home", "community", "resources", "events", "toolkit"];

const seedPosts = [
  {
    author: "Maya",
    body: "Took the long way to the market alone and loved every quiet corner.",
  },
  {
    author: "Jonah",
    body: "First café meal solo — book open, no rush. Highly recommend.",
  },
  {
    author: "Aisha",
    body: "Shared a sunset walk with two strangers from the community board.",
  },
];

const seedEvents = [
  {
    id: "sunrise-walk",
    title: "Sunrise shoreline walk",
    when: "Sat · 7:00 AM",
    spot: "East pier",
  },
  {
    id: "cafe-hour",
    title: "Quiet café hour",
    when: "Sun · 10:30 AM",
    spot: "Harbor Roasters",
  },
  {
    id: "evening-reset",
    title: "Evening reset circle",
    when: "Wed · 6:30 PM",
    spot: "Community loft",
  },
];

const seedTasks = [
  "Fill a water bottle before heading out",
  "Send one kind check-in text",
  "Leave 20 minutes of unplanned wandering",
];

const posts = [...seedPosts];
const rsvps = new Set();
const checked = new Set();

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function showView(name) {
  const view = views.includes(name) ? name : "home";

  views.forEach((id) => {
    const el = $(`#view-${id}`);
    if (!el) return;
    const active = id === view;
    el.classList.toggle("is-active", active);
    el.hidden = !active;
  });

  $all("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === view);
  });

  if (location.hash !== `#${view}`) {
    history.replaceState(null, "", `#${view}`);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderFeed() {
  const feed = $("#feed");
  if (!feed) return;
  feed.innerHTML = posts
    .map(
      (post) => `
      <li class="feed__item">
        <article>
          <header>
            <span class="avatar" aria-hidden="true">${post.author.slice(0, 1)}</span>
            <strong>${post.author}</strong>
          </header>
          <p>${post.body}</p>
        </article>
      </li>`
    )
    .join("");
}

function renderEvents() {
  const list = $("#events-list");
  if (!list) return;
  list.innerHTML = seedEvents
    .map((event) => {
      const going = rsvps.has(event.id);
      return `
      <li>
        <article class="event">
          <div>
            <h3>${event.title}</h3>
            <p>${event.when} · ${event.spot}</p>
          </div>
          <button
            type="button"
            class="btn ${going ? "btn--secondary" : "btn--primary"} btn--small"
            data-rsvp="${event.id}"
          >
            ${going ? "Going ✓" : "RSVP"}
          </button>
        </article>
      </li>`;
    })
    .join("");
}

function renderChecklist() {
  const list = $("#checklist");
  if (!list) return;
  list.innerHTML = seedTasks
    .map((task, index) => {
      const id = `task-${index}`;
      const done = checked.has(id);
      return `
      <li>
        <label class="check ${done ? "is-done" : ""}">
          <input type="checkbox" data-task="${id}" ${done ? "checked" : ""} />
          <span>${task}</span>
        </label>
      </li>`;
    })
    .join("");
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const nav = event.target.closest("[data-nav]");
    if (!nav) return;
    event.preventDefault();
    showView(nav.dataset.nav);
  });

  window.addEventListener("hashchange", () => {
    showView(location.hash.replace("#", ""));
  });
}

function bindCompose() {
  const form = $("#compose-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#compose-text");
    const body = input.value.trim();
    if (!body) return;
    posts.unshift({ author: "You", body });
    input.value = "";
    renderFeed();
  });
}

function bindEvents() {
  const list = $("#events-list");
  if (!list) return;
  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-rsvp]");
    if (!button) return;
    const id = button.dataset.rsvp;
    if (rsvps.has(id)) rsvps.delete(id);
    else rsvps.add(id);
    renderEvents();
  });
}

function bindChecklist() {
  const list = $("#checklist");
  if (!list) return;
  list.addEventListener("change", (event) => {
    const input = event.target.closest("[data-task]");
    if (!input) return;
    if (input.checked) checked.add(input.dataset.task);
    else checked.delete(input.dataset.task);
    renderChecklist();
  });
}

function bindMoods() {
  const note = $("#mood-note");
  $all(".mood").forEach((button) => {
    button.addEventListener("click", () => {
      $all(".mood").forEach((b) => b.classList.remove("is-selected"));
      button.classList.add("is-selected");
      const mood = button.dataset.mood;
      const messages = {
        steady: "Steady looks good on you. Keep the gentle pace.",
        curious: "Curiosity is a great travel companion today.",
        tender: "Tender days deserve soft plans and warm tea.",
        tired: "Rest counts as progress. A shorter route is enough.",
      };
      note.textContent = messages[mood] || "Noted.";
    });
  });
}

async function loadApiAndHealth() {
  const healthLabel = $("#health-label");
  try {
    const health = await fetch("/health").then((r) => r.json());
    healthLabel.textContent = health.ok ? "Service ready" : "Service issue";
  } catch {
    healthLabel.textContent = "Service offline";
  }

  try {
    const payload = await fetch("/api/data").then((r) => r.json());
    const grid = $("#feature-grid");
    if (!grid || !Array.isArray(payload.features)) return;
    grid.innerHTML = payload.features
      .map(
        (feature) => `
      <button type="button" class="pathway" data-nav="${feature.id}">
        <span class="pathway__accent" aria-hidden="true"></span>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      </button>`
      )
      .join("");
  } catch {
    // Keep seed pathway buttons if API is unavailable.
  }
}

function init() {
  renderFeed();
  renderEvents();
  renderChecklist();
  bindNavigation();
  bindCompose();
  bindEvents();
  bindChecklist();
  bindMoods();
  loadApiAndHealth();
  showView(location.hash.replace("#", "") || "home");
}

init();
