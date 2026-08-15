export const CATEGORIES = [
  "Solo Living Guides",
  "Emotional Wellbeing",
  "Practical Tools",
  "Money & Housing",
  "Safety",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type ResourceFormat =
  | "Guide"
  | "Checklist"
  | "Worksheet"
  | "Essay"
  | "Toolkit";

export type Resource = {
  id: string;
  title: string;
  summary: string;
  category: Category;
  format: ResourceFormat;
  readTime: string;
  tags: string[];
};

export const resources: Resource[] = [
  {
    id: "r1",
    title: "Settling into a solo apartment",
    summary:
      "A gentle first-month plan for routines, lighting, and making a small space feel like yours.",
    category: "Solo Living Guides",
    format: "Guide",
    readTime: "9 min",
    tags: ["home", "routines", "first month"],
  },
  {
    id: "r2",
    title: "One-bag packing ritual",
    summary:
      "A calm checklist that keeps your bag light and your mind clearer before departure.",
    category: "Practical Tools",
    format: "Checklist",
    readTime: "5 min",
    tags: ["travel", "packing"],
  },
  {
    id: "r3",
    title: "When quiet nights feel heavy",
    summary:
      "Soft rituals and check-in scripts for evenings when solitude feels sharper than usual.",
    category: "Emotional Wellbeing",
    format: "Essay",
    readTime: "7 min",
    tags: ["loneliness", "rituals"],
  },
  {
    id: "r4",
    title: "Rent & utilities without the spiral",
    summary:
      "A simple worksheet for deposits, monthly costs, and a buffer that protects your stretch.",
    category: "Money & Housing",
    format: "Worksheet",
    readTime: "11 min",
    tags: ["budget", "rent", "housing"],
  },
  {
    id: "r5",
    title: "First-night safety map",
    summary:
      "Arrival routines for new places: exits, lighting, local contacts, and a calm settle-in order.",
    category: "Safety",
    format: "Checklist",
    readTime: "4 min",
    tags: ["arrival", "travel", "safety"],
  },
  {
    id: "r6",
    title: "Solo dining without the awkward",
    summary:
      "Small habits that turn a table-for-one into a restorative pause instead of a performance.",
    category: "Solo Living Guides",
    format: "Essay",
    readTime: "6 min",
    tags: ["dining", "confidence"],
  },
  {
    id: "r7",
    title: "Weekly spend tracker",
    summary:
      "Track groceries, transit, and one joy purchase without guilt — built for solo households.",
    category: "Money & Housing",
    format: "Toolkit",
    readTime: "8 min",
    tags: ["budget", "habits"],
  },
  {
    id: "r8",
    title: "Boundary phrases that still feel kind",
    summary:
      "Short scripts for declining plans, asking for space, and requesting a check-in.",
    category: "Emotional Wellbeing",
    format: "Guide",
    readTime: "6 min",
    tags: ["boundaries", "communication"],
  },
  {
    id: "r9",
    title: "Home maintenance mini-kit",
    summary:
      "The small tools and seasonal tasks that keep a solo home running without overwhelm.",
    category: "Practical Tools",
    format: "Toolkit",
    readTime: "10 min",
    tags: ["home", "maintenance"],
  },
  {
    id: "r10",
    title: "Digital safety for solo travelers",
    summary:
      "Share your route wisely, lock down accounts, and set location check-ins that respect privacy.",
    category: "Safety",
    format: "Guide",
    readTime: "8 min",
    tags: ["travel", "digital", "privacy"],
  },
  {
    id: "r11",
    title: "Lease red-flag checklist",
    summary:
      "What to scan before signing — fees, notice periods, guests, and repair responsibilities.",
    category: "Money & Housing",
    format: "Checklist",
    readTime: "7 min",
    tags: ["lease", "housing"],
  },
  {
    id: "r12",
    title: "Breathing reset for decision fatigue",
    summary:
      "A two-minute reset when choices pile up and your nervous system needs a softer gear.",
    category: "Emotional Wellbeing",
    format: "Toolkit",
    readTime: "3 min",
    tags: ["calm", "nervous system"],
  },
];
