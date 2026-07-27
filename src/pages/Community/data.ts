export const TOPICS = [
  "Solo Living",
  "Emotional Support",
  "Practical Tips",
  "Money-Saving Hacks",
] as const;

export type Topic = (typeof TOPICS)[number];

export type Comment = {
  id: string;
  author: string;
  body: string;
  time: string;
};

export type Post = {
  id: string;
  author: string;
  time: string;
  title: string;
  body: string;
  tags: Topic[];
  likes: number;
  comments: Comment[];
};

export const initialPosts: Post[] = [
  {
    id: "p1",
    author: "Mira Chen",
    time: "2h ago",
    title: "First week in a studio — what actually helped",
    body: "I kept evenings simple: one warm light, a short walk, and texting one friend. The quiet felt less sharp after day four. If you are settling into solo living, start smaller than you think.",
    tags: ["Solo Living", "Emotional Support"],
    likes: 48,
    comments: [
      {
        id: "c1",
        author: "Jordan Hale",
        body: "The warm light tip is underrated. Dim lamps changed my nights.",
        time: "1h ago",
      },
      {
        id: "c2",
        author: "Ava Ruiz",
        body: "Thank you for naming the sharp quiet. That is exactly it.",
        time: "45m ago",
      },
    ],
  },
  {
    id: "p2",
    author: "Sam Okonkwo",
    time: "5h ago",
    title: "Grocery rhythm that cut my weekly spend",
    body: "Two big shops + one market top-up beat daily convenience runs. I batch oats, roast a tray of veg, and freeze half. Saved about 20% without feeling deprived.",
    tags: ["Money-Saving Hacks", "Practical Tips"],
    likes: 72,
    comments: [
      {
        id: "c3",
        author: "Alex Rivera",
        body: "Freezing half is the move. I was tossing greens every week.",
        time: "3h ago",
      },
    ],
  },
  {
    id: "p3",
    author: "Jordan Hale",
    time: "Yesterday",
    title: "When solo nights feel heavy",
    body: "I do not force a big night out. I pick one gentle ritual — tea, a playlist, writing three lines. Company can wait; steadiness comes first.",
    tags: ["Emotional Support", "Solo Living"],
    likes: 91,
    comments: [
      {
        id: "c4",
        author: "Mira Chen",
        body: "Three lines is such a kind bar. Borrowing this tonight.",
        time: "18h ago",
      },
      {
        id: "c5",
        author: "Sam Okonkwo",
        body: "Glad this space holds the softer days too.",
        time: "16h ago",
      },
    ],
  },
  {
    id: "p4",
    author: "Ava Ruiz",
    time: "Yesterday",
    title: "Packing cubes + a one-bag checklist",
    body: "I keep a note with weather layers, meds, and one comfort item. Cubes stop the suitcase sprawl. Practical, boring, and strangely calming before departure.",
    tags: ["Practical Tips"],
    likes: 36,
    comments: [],
  },
  {
    id: "p5",
    author: "Alex Rivera",
    time: "2d ago",
    title: "Transit day meals under $12",
    body: "Bakery loaf + fruit + a shared kitchen tea bag travels well. Skip airport markups when you can. Happy to swap city-specific cheap bites below.",
    tags: ["Money-Saving Hacks", "Practical Tips"],
    likes: 54,
    comments: [
      {
        id: "c6",
        author: "Jordan Hale",
        body: "Lisbon: pastelaria rice cakes near the station are clutch.",
        time: "1d ago",
      },
    ],
  },
  {
    id: "p6",
    author: "Mira Chen",
    time: "3d ago",
    title: "Asking for help without over-explaining",
    body: "A short message works: “Could use a check-in tonight.” The feed here has been good practice for saying that out loud.",
    tags: ["Emotional Support"],
    likes: 63,
    comments: [
      {
        id: "c7",
        author: "Ava Ruiz",
        body: "That script is going on my phone lock screen.",
        time: "2d ago",
      },
    ],
  },
];
