import { SavedProject, Task, AppNotification } from "./types";

export const STARTING_PROJECTS: SavedProject[] = [
  {
    id: "p1",
    type: "script",
    title: "10 AI Tools to Automate Content Creation",
    topic: "AI tools for productivity",
    date: "2026-05-20",
    platform: "YouTube",
    isFavorite: true,
    content: {
      title: "How I Automated My Content Workflow with 10 Free AI Tools",
      hook: "🚨 If you are still doing this manually in 2026, you are wasting hours! Listen up.",
      bodySections: [
        {
          sectionName: "The Problem (0-15s)",
          visualCue: "Tight shot on creator with stressed facial expression, overlaying fire emojis",
          narration: "Staring at a blank page is the ultimate creator bottleneck. But the best social media giants don't build content. They build content systems."
        },
        {
          sectionName: "The Solution (15-45s)",
          visualCue: "Slick screen layout panning inside CreatorFlow AI analytics tab",
          narration: "That is where automated systemizers come in. Here is the process: Feed Gemini your raw notes, extract three title hooks, plan details in CreatorFlow, and script out B-roll highlights in 15 seconds."
        },
        {
          sectionName: "Wrap-up (45-60s)",
          visualCue: "Creator smiling pointing down to click link",
          narration: "Comment 'TOOLS' below and I'll send you my curated pipeline automation template for free. Hit follow for more systems!"
        }
      ],
      cta: "Comment 'TOOLS' below to get the exclusive pipeline setup!"
    }
  },
  {
    id: "p2",
    type: "caption",
    title: "Zero to 10k Followers Strategy",
    topic: "Organic platform growth tips",
    date: "2026-05-19",
    platform: "Instagram",
    isFavorite: false,
    content: {
      captions: [
        {
          hook: "🎯 The exact blueprint I'd use to grow on IG from scratch in 2026.",
          text: "Stop obsessing over high-production cameras. The algorithm only cares about one thing: watch time and shares.\n\nHere is how to design shared content:\n1. Open with an intellectual trigger or shock statement.\n2. Add a visual contrast in the background.\n3. Close with a micro-conversion loop.\n\nRead that again. Consistency beats luck. Every. Single. Time.",
          hashtags: ["#groworganic", "#contentgrowth", "#creatorspace", "#marketingshift"]
        }
      ]
    }
  },
  {
    id: "p3",
    type: "thumbnail",
    title: "Inside the AI Secret Lab",
    topic: "Vist to tech facility",
    date: "2026-05-18",
    platform: "YouTube",
    isFavorite: true,
    content: {
      ideas: [
        {
          title: "I STOLE CODES",
          visualDescription: "An expansive, low-light shot showing metallic computer servers glowing vivid violet. In the middle, the creator stands holding a high-definition translucent holographic tablet displaying fluorescent source codes. Saturated teal and purple contrast highlights the background.",
          colorPalette: ["Vibrant Indigo (#4f46e5)", "Teal Blue (#06b6d4)", "Bright White glow"],
          psychology: "Vocal trigger (stole) combined with futuristic sci-fi server graphics instantly arouses safe curiosity."
        }
      ]
    }
  }
];

export const STARTING_TASKS: Task[] = [
  {
    id: "t1",
    title: "Script YouTube Automation video",
    date: "2026-05-21",
    completed: true,
    platform: "youtube",
    type: "script"
  },
  {
    id: "t2",
    title: "Review analytics graphs on growth",
    date: "2026-05-21",
    completed: false,
    platform: "instagram",
    type: "custom"
  },
  {
    id: "t3",
    title: "Generate thumbnail for Tech Lab vlog",
    date: "2026-05-22",
    completed: false,
    platform: "youtube",
    type: "thumbnail"
  },
  {
    id: "t4",
    title: "Write captions for Reels carousel",
    date: "2026-05-23",
    completed: false,
    platform: "tiktok",
    type: "caption"
  },
  {
    id: "t5",
    title: "Record A-roll monologue sections",
    date: "2026-05-24",
    completed: false,
    platform: "tiktok",
    type: "custom"
  }
];

export const STARTING_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    text: "🔥 YouTube Alert: 'Bento Grid' styled thumbnail layouts are seeing a 14% CTR rise this week among tech creators.",
    type: "alert",
    tag: "Trending Style",
    time: "10m ago",
    read: false
  },
  {
    id: "n2",
    text: "💡 AI Tip: Try keeping your video intros under 2.5 seconds to bypass TikTok's drop-off limit.",
    type: "tip",
    tag: "Algorithm Tip",
    time: "2h ago",
    read: false
  },
  {
    id: "n3",
    text: "📅 Planning Reminder: You have 3 tasks due tomorrow. Keep your publishing streak green!",
    type: "reminder",
    tag: "Productivity",
    time: "5h ago",
    read: true
  }
];

export const TRENDING_IDEAS = [
  {
    id: "tr1",
    title: "I simulated 100 days of AI automation",
    views: "240k views",
    category: "Automation",
    platform: "YouTube",
    growth: "+24% CTR potential"
  },
  {
    id: "tr2",
    title: "No-camera visual narration guide",
    views: "1.2M engagement",
    category: "No-face Reels",
    platform: "Instagram",
    growth: "+18% retention"
  },
  {
    id: "tr3",
    title: "The micro-newsletter shift of 2026",
    views: "12k signups avg",
    category: "SaaS & Growth",
    platform: "LinkedIn",
    growth: "+32% share rate"
  }
];
