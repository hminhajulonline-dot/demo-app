import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client safely
const apiKey = process.env.GEMINI_API_KEY;
let ai: any = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini client successfully initialized.");
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. Operating in fallback mock generation mode.");
}

// 1. AI Caption Generator API
app.post("/api/generate/caption", async (req, res) => {
  const { topic, niche, platform, tone } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  if (!ai) {
    // Elegant fallback simulation
    return res.json({
      captions: [
        {
          hook: "🚨 STOP SCROLLING! This is are the exact step I used to solve this...",
          text: `Want to skyrocket your growth in the ${niche || "creator"} space? Here is the truth: consistency beats talent every single time. It is not about the perfect light or camera, it is about hitting upload. Let me know in the comments what is holding you back! 👇`,
          hashtags: ["#contentcreator", `#${platform || "socialmedia"}`, "#freelance", "#creatorflow", "#productivity"],
        },
        {
          hook: "This 1 simple shift changed my entire workflow forever. 🤯",
          text: `Struggling to find ideas for your next ${platform || "video"}? Save this post immediately. I write down 10 raw ideas every morning. 9 are absolute rubbish, but 1 is a viral gem. Start doing this tomorrow and watch what happens.`,
          hashtags: ["#growsocial", "#creativetips", "#socialstrategy", "#creatorflowai"],
        },
      ],
    });
  }

  try {
    const prompt = `Generate 2 highly engaging social media captions for the platform "${platform || "Instagram"}" in the niche "${niche || "Tech/Creator"}" on the topic: "${topic}". The tone should be "${tone || "engaging & energetic"}". Include emojis, bullet points if helpful, and line-breaks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, viral social media ghostwriter. You write captions that maximize comment engagement, click-through rates, and bookmarks.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            captions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hook: { type: Type.STRING, description: "Short, punchy, high-CTR headline or first line." },
                  text: { type: Type.STRING, description: "The main caption text. Use formatting, spacings, and conversational narrative style." },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 to 5 highly targeted tags." },
                },
                required: ["hook", "text", "hashtags"],
              },
            },
          },
          required: ["captions"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (err: any) {
    console.error("Caption generation error:", err);
    res.status(500).json({ error: "Failed to generate captions. Please try again later." });
  }
});

// 2. AI Script Writer API
app.post("/api/generate/script", async (req, res) => {
  const { topic, objective, targetLength, videoStyle } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  if (!ai) {
    return res.json({
      title: `How I automated my ${topic} content workflow`,
      hook: "🤯 If you are still doing this manually in 2026, you are wasting hours. Listen up.",
      bodySections: [
        {
          sectionName: "Hook & Setup (0-5s)",
          visualCue: "A tight talking head shot pointing upwards with overlay text saying: 'THE OLD WAY IS DEAD'. Fast zoom-in.",
          narration: "We've all been there: staring at a blank screen for three hours, trying to think of one good hook. But what if I told you that the best creators don't brainstorm? They systemize.",
        },
        {
          sectionName: "The Secret Formula (5-20s)",
          visualCue: "B-roll screen-recording of a clean, futuristic workspace app dashboard filling up with folders.",
          narration: "By breaking your concepts down into simple content templates—hooks, body loops, and clear CTAs—you remove the friction of starting. You write the systems first, then you write the words.",
        },
        {
          sectionName: "Outro & CTA (20-30s)",
          visualCue: "Points down toward screen. Graphic slides up: 'CreatorFlow.AI/Free'.",
          narration: "I put together my top 5 viral video script formats in a clean Notion file. Comment 'FLOW' below and my auto-responder will slide it straight into your DMs.",
        },
      ],
      cta: "Comment 'FLOW' below to get my free template kit instantly!",
    });
  }

  try {
    const prompt = `Write a premium short-form video script (TikTok, YouTube Shorts, Reels) for topic: "${topic}". Objective: "${objective || "Brand Awareness"}". Targeted length: "${targetLength || "30 seconds"}". Video style: "${videoStyle || "Talking Head with B-roll"}".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional script writer for top-tier creators (like Colin & Samir or Ali Abdaal). You write highly engaging scripts with detailed visual direction (B-roll cues) and dynamic narration rhythms.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy, clickable hypothetical title." },
            hook: { type: Type.STRING, description: "Explosive 3-second hook." },
            bodySections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sectionName: { type: Type.STRING, description: "E.g., Intro, Problem, Shift, Solution, Call to Action." },
                  visualCue: { type: Type.STRING, description: "Visual directions, camera angles, text overlays, sound effects, or B-roll hints." },
                  narration: { type: Type.STRING, description: "The precise script lines spoken by the presenter." },
                },
                required: ["sectionName", "visualCue", "narration"],
              },
            },
            cta: { type: Type.STRING, description: "A high-conversion vocal Call to Action." },
          },
          required: ["title", "hook", "bodySections", "cta"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (err: any) {
    console.error("Script generation error:", err);
    res.status(500).json({ error: "Failed to generate script." });
  }
});

// 3. AI Thumbnail Concept Generator API
app.post("/api/generate/thumbnail", async (req, res) => {
  const { videoTopic, category, clickAngle } = req.body;

  if (!videoTopic) {
    return res.status(400).json({ error: "Video topic is required" });
  }

  if (!ai) {
    return res.json({
      ideas: [
        {
          title: "I BUILT A COLD ROOM",
          visualDescription: "Split-screen layout. On the left, a vibrant, high-contrast, glowing neon purple office with ambient lights. On the right, the creator wearing a heavy puffer jacket shivering inside a dark blue frosted workspace room with visible cold breath steam overlay. Professional studio lighting with saturated color channels.",
          colorPalette: ["Deep Blue (#0d1b2a)", "Neon Teal (#00f5d4)", "Vivid Red text overlays"],
          psychology: "Curiosity loop: High contrast between warm and freezing environments. The jacket creates a physical shock factor.",
        },
        {
          title: "HOW I SURVIVED 100 DAYS",
          visualDescription: "Minimalist bento-grid overlay style. A single hyper-focused workspace desk in a pitch black room, with a giant bright orange countdown number '100 DAYS' glowing in the center. The creator is small in frame, resting head on desk under a single dramatic warm spotlight with faint background charts fading out.",
          colorPalette: ["Pitch Black (#000000)", "Bright Orange (#ff9f1c)", "Clean White text"],
          psychology: "Extreme scale: Single spotlight indicates exhaustion, making the viewer curious about the mental stamina required.",
        },
      ],
    });
  }

  try {
    const prompt = `Create 2 distinct thumbnail visual concepts for a video titled: "${videoTopic}". Category: "${category || "Education"}". Target CTR strategy: "${clickAngle || "Curiosity gap/Shock factor"}".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, professional YouTube Thumbnail Director. Yo describe thumb concepts down to background shadows, color channels, text positioning, physical props, and face expressions.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "The explosive, short text printed directly on the image (max 3 words)." },
                  visualDescription: { type: Type.STRING, description: "Detailed guide for composition, characters, background elements, lighting, and camera angle." },
                  colorPalette: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 color hex codes or descriptors that establish the target mood." },
                  psychology: { type: Type.STRING, description: "Psychological triggers utilized (contrast, shock, emotion framing)." },
                },
                required: ["title", "visualDescription", "colorPalette", "psychology"],
              },
            },
          },
          required: ["ideas"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (err: any) {
    console.error("Thumbnail concept generation error:", err);
    res.status(500).json({ error: "Failed to generate thumbnail concept." });
  }
});

// 4. Copilot AI assistant chat endpoint
app.post("/api/generate/chat", async (req, res) => {
  const { messages, context } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  if (!ai) {
    return res.json({
      text: "I am ready! That sounds like an awesome strategy for CreatorFlow AI. Have you considered scheduling this across channels automatically?",
    });
  }

  try {
    const formattedHistory = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Add extra context as system instruction or first message
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction: `You are 'Flowy', the core built-in AI productivity coach and strategy consultant inside CreatorFlow AI. You love social media, CTR optimization, scripting hooks, and time-management. Use concise bullet points, professional emojis, and friendly SaaS coach style. Current user context: ${JSON.stringify(context || {})} `,
      },
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error("Assistant chat error:", err);
    res.status(500).json({ error: "Failed to communicate with assistant." });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CreatorFlow AI Express Backend running on http://localhost:${PORT}`);
  });
}

startServer();
