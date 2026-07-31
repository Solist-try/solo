export const BLOG_CATEGORIES = [
  "Solo Living",
  "Emotional Care",
  "Practical Tips",
  "Travel",
  "Money & Housing",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  readTime: string;
  date: string;
  featured?: boolean;
};

export const blogArticles: BlogArticle[] = [
  {
    id: "b1",
    title: "The first quiet week in a new place",
    excerpt:
      "How to settle your nervous system when the suitcase is unpacked but the apartment still feels unfamiliar.",
    category: "Solo Living",
    author: "Mira Chen",
    readTime: "6 min",
    date: "Jul 22, 2026",
    featured: true,
  },
  {
    id: "b2",
    title: "A kinder script for lonely evenings",
    excerpt:
      "Short phrases and rituals that turn a heavy night into something you can hold with gentleness.",
    category: "Emotional Care",
    author: "Jordan Hale",
    readTime: "5 min",
    date: "Jul 18, 2026",
  },
  {
    id: "b3",
    title: "One-bag packing without the spiral",
    excerpt:
      "A calm checklist for weather layers, meds, and one comfort item — nothing more, nothing less.",
    category: "Travel",
    author: "Ava Ruiz",
    readTime: "4 min",
    date: "Jul 14, 2026",
  },
  {
    id: "b4",
    title: "Rent math that protects your stretch",
    excerpt:
      "A simple way to look at deposits, utilities, and a buffer before you fall for the light in a listing.",
    category: "Money & Housing",
    author: "Sam Okonkwo",
    readTime: "8 min",
    date: "Jul 10, 2026",
  },
  {
    id: "b5",
    title: "Small home systems that keep you steady",
    excerpt:
      "Laundry cadence, a clear landing spot, and one weekly reset that makes living alone feel lighter.",
    category: "Practical Tips",
    author: "Alex Rivera",
    readTime: "7 min",
    date: "Jul 6, 2026",
  },
  {
    id: "b6",
    title: "Travel days under a gentle budget",
    excerpt:
      "Bakery stops, shared kitchens, and skipping the airport markup without feeling deprived.",
    category: "Travel",
    author: "Mira Chen",
    readTime: "5 min",
    date: "Jul 2, 2026",
  },
  {
    id: "b7",
    title: "When confidence wavers mid-solo trip",
    excerpt:
      "Name the wobble, shrink the next step, and remember support can be one message away.",
    category: "Emotional Care",
    author: "Jordan Hale",
    readTime: "6 min",
    date: "Jun 28, 2026",
  },
  {
    id: "b8",
    title: "Building a home base that feels like yours",
    excerpt:
      "Warm light, one soft surface, and a morning cue that turns a rental into a place you return to.",
    category: "Solo Living",
    author: "Ava Ruiz",
    readTime: "6 min",
    date: "Jun 24, 2026",
  },
];
