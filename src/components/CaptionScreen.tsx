import React, { useState } from "react";
import { Screen, SavedProject } from "../types";
import { ArrowLeft, Sparkles, Copy, Check, Bookmark, Send, Globe, MessageSquare, Instagram, Video } from "lucide-react";

interface CaptionScreenProps {
  initialTopic?: string;
  onNavigate: (target: Screen) => void;
  onSaveProject: (project: Omit<SavedProject, "id" | "date" | "isFavorite">) => void;
}

export default function CaptionScreen({ initialTopic = "", onNavigate, onSaveProject }: CaptionScreenProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [platform, setPlatform] = useState("Instagram");
  const [niche, setNiche] = useState("Tech/Creator");
  const [tone, setTone] = useState("Energetic & Conversational");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const platforms = ["Instagram", "TikTok", "YouTube Shorts", "LinkedIn", "Twitter/X"];
  const niches = ["Tech/Creator", "Fitness & Diet", "Business & Finance", "Lifestyle & Travel", "E-commerce"];
  const tones = ["Energetic & Conversational", "Educational & Deep", "Sarcastic & Witty", "Direct / High-intensity"];

  const loadingMessages = [
    "Compiling algorithmic hook structures...",
    "Drafting dynamic comment loops...",
    "Injecting native emoji engagement breaks...",
    "Optimizing hashtag visibility matrix..."
  ];

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setResults([]);
    setSaved(false);

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % loadingMessages.length;
      setLoadingStep(step);
    }, 1200);

    try {
      const res = await fetch("/api/generate/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, platform, niche, tone })
      });
      const data = await res.json();
      if (data.captions) {
        setResults(data.captions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleCopy = (textStr: string, id: string) => {
    navigator.clipboard.writeText(textStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleSave = () => {
    if (results.length === 0) return;
    onSaveProject({
      type: "caption",
      title: `${platform} Post: ${topic.slice(0, 30)}...`,
      topic: topic,
      platform,
      content: { captions: results }
    });
    setSaved(true);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto pb-24">
      {/* Header Bar */}
      <div className="p-4 bg-slate-905 border-b border-slate-900 flex items-center gap-3">
        <button
          onClick={() => onNavigate(Screen.DASHBOARD)}
          className="p-1.5 rounded-lg hover:bg-slate-900"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </button>
        <div>
          <h2 className="text-sm font-extrabold">Caption Ghostwriter</h2>
          <p className="text-[10px] text-slate-500 font-mono">Formulate viral hooks and tags with Gemini</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Input panel */}
        <div className="bg-slate-900/35 border border-slate-850/80 rounded-2xl p-5 space-y-4">
          {/* Main Topic field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Caption Core Theme</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Why 99% of creators fail in their first 3 months..."
              className="w-full bg-slate-950/70 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 px-3.5 text-white placeholder-slate-600 transition h-16 resize-none"
            />
          </div>

          {/* Configuration Matrix */}
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Social Channel</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-3 text-slate-300 outline-none"
                >
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Target Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-3 text-slate-300 outline-none"
                >
                  {niches.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Atmosphere Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-3.5 text-slate-300 outline-none"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic || loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 disabled:opacity-50 hover:opacity-95 active:scale-[0.98] transition rounded-xl text-xs font-semibold text-white tracking-wide shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-300" />
            Launch AI Ghostwriter
          </button>
        </div>

        {/* Informative loading pane */}
        {loading && (
          <div className="border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
            </div>
            <p className="text-xs text-slate-300 animate-pulse font-mono">{loadingMessages[loadingStep]}</p>
          </div>
        )}

        {/* Writing Results Displays */}
        {results.length > 0 && !loading && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400">Formulated Captions</h3>
              <button
                onClick={handleSave}
                disabled={saved}
                className="text-xs text-indigo-400 hover:text-white flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Saved to Saved
                  </>
                ) : (
                  "Save Project"
                )}
              </button>
            </div>

            {results.map((c, idx) => {
              const fullText = `${c.hook}\n\n${c.text}\n\n${c.hashtags.join(" ")}`;
              const cId = `cap-${idx}`;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 shadow-sm space-y-4 relative"
                >
                  {/* Hook segment header */}
                  <div className="p-3.5 bg-indigo-600/10 border border-indigo-500/25 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase font-mono text-indigo-400 tracking-wider flex items-center gap-1">
                      <Send className="w-3 h-3" /> Algorithmic Hook
                    </span>
                    <p className="text-xs font-bold text-indigo-200">{c.hook}</p>
                  </div>

                  {/* Main Body content narration */}
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-mono text-slate-500 tracking-wider flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Copy Body
                    </span>
                    <p className="text-xs text-slate-200 mt-1 whitespace-pre-wrap leading-relaxed font-sans">
                      {c.text}
                    </p>
                  </div>

                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-850/60">
                    {c.hashtags?.map((tag: string, tix: number) => (
                      <span
                        key={tix}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-400 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Copy button bar */}
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleCopy(fullText, cId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800/80 hover:bg-slate-850 active:scale-[0.98] rounded-xl text-[10px] text-slate-300 hover:text-white duration-150 cursor-pointer"
                    >
                      {copiedId === cId ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Full Post
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
