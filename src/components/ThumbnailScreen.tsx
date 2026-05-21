import React, { useState } from "react";
import { Screen, SavedProject } from "../types";
import { Sparkles, ArrowLeft, Layers, Palette, BrainCircuit, Check, Flame, MessageSquarePlus, Share2 } from "lucide-react";

interface ThumbnailScreenProps {
  initialTopic?: string;
  onNavigate: (target: Screen) => void;
  onSaveProject: (project: Omit<SavedProject, "id" | "date" | "isFavorite">) => void;
}

export default function ThumbnailScreen({ initialTopic = "", onNavigate, onSaveProject }: ThumbnailScreenProps) {
  const [videoTopic, setVideoTopic] = useState(initialTopic);
  const [category, setCategory] = useState("Vlog & Entertainment");
  const [clickAngle, setClickAngle] = useState("Curiosity Gap / Contrast");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);

  const categories = ["Tech & Productivity", "Gaming & Entertainment", "Business & Finance", "Science & Space", "Vlog & Lifestyle"];
  const angles = ["Extreme Contrast / Shock", "Curiosity Gap / Contrast", "Bento Grid Bento", "Saturated Facial Reaction"];

  const loadingMessages = [
    "Consulting MrBeast layout multipliers...",
    "Modeling high-CTR physical props...",
    "Simulating saturated color grading ratios...",
    "Writing attention psychological breakdown..."
  ];

  const handleGenerate = async () => {
    if (!videoTopic) return;
    setLoading(true);
    setIdeas([]);
    setSaved(false);

    // Dynamic loading interval ticker
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % loadingMessages.length;
      setLoadingStep(step);
    }, 1500);

    try {
      const res = await fetch("/api/generate/thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoTopic, category, clickAngle })
      });
      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      }
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (ideas.length === 0) return;
    onSaveProject({
      type: "thumbnail",
      title: ideas[0].title || videoTopic,
      topic: videoTopic,
      platform: "YouTube",
      content: { ideas }
    });
    setSaved(true);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto pb-24">
      {/* Search Header bar */}
      <div className="p-4 bg-slate-905 border-b border-slate-900 flex items-center gap-3">
        <button
          onClick={() => onNavigate(Screen.DASHBOARD)}
          className="p-1.5 rounded-lg hover:bg-slate-900"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </button>
        <div>
          <h2 className="text-sm font-extrabold">Thumbnail Director</h2>
          <p className="text-[10px] text-slate-500 font-mono">Create visual click loops with Gemini</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Core Inputs Section */}
        <div className="bg-slate-900/35 border border-slate-850/80 rounded-2xl p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Video Title or Topic</label>
            <textarea
              value={videoTopic}
              onChange={(e) => setVideoTopic(e.target.value)}
              placeholder="e.g., I survived on zero electricity for 7 days in Tokyo..."
              className="w-full bg-slate-950/70 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 px-3.5 text-white placeholder-slate-600 transition h-16 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-3 text-slate-300 outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Click angle</label>
              <select
                value={clickAngle}
                onChange={(e) => setClickAngle(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-3 text-slate-300 outline-none"
              >
                {angles.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!videoTopic || loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-500 disabled:opacity-50 hover:opacity-95 active:scale-[0.98] transition-all rounded-xl text-xs font-semibold text-white tracking-wide shadow-lg shadow-purple-600/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            Direct Click Concept
          </button>
        </div>

        {/* Loading overlay representation */}
        {loading && (
          <div className="border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
            </div>
            <p className="text-xs text-slate-300 animate-pulse font-mono">{loadingMessages[loadingStep]}</p>
          </div>
        )}

        {/* Generated Thumb Layout Preview Cards */}
        {ideas.length > 0 && !loading && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400">Visual Concepts</h3>
              <button
                onClick={handleSave}
                disabled={saved}
                className="text-xs text-indigo-400 hover:text-white flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-lg"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Saved
                  </>
                ) : (
                  "Save Concept"
                )}
              </button>
            </div>

            {ideas.map((idea, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-md flex flex-col hover:border-slate-700 duration-200"
              >
                {/* Simulated Thumbnail Canvas Display */}
                <div className="aspect-video bg-slate-950 border-b border-slate-850/80 p-6 flex flex-col justify-between relative overflow-hidden group">
                  {/* Subtle graphical background flare inside the canvas */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-slate-900" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/75 border border-slate-700/60 text-[8px] font-mono uppercase tracking-wider text-slate-400">
                    Aspect ratio 16:9
                  </div>

                  {/* Simulated Human Subject Indicator Overlay */}
                  <div className="flex-1 flex items-center justify-center mt-4">
                    <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] text-center text-slate-300 backdrop-blur-md max-w-xs font-mono">
                      📸 Composition: {idea.title.toUpperCase()}
                    </div>
                  </div>

                  {/* Explosive Contrast Cover Text */}
                  <div className="z-10 mt-auto">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white font-sans font-extrabold text-lg uppercase tracking-wide skew-x-[-6deg] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border border-red-500">
                      {idea.title}
                    </span>
                  </div>
                </div>

                {/* Conceptual metadata and technical tabs */}
                <div className="p-4 space-y-4">
                  {/* Background Description Elements */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Studio Composition
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans mt-0.5">
                      {idea.visualDescription}
                    </p>
                  </div>

                  {/* CTR Psychological angle Analysis */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" /> Click Psychology
                    </span>
                    <p className="text-xs text-slate-300 font-sans mt-0.5">{idea.psychology}</p>
                  </div>

                  {/* RGB Color Palette Recs */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-indigo-400" /> Palettes:
                    </span>
                    <div className="flex gap-1.5">
                      {idea.colorPalette?.map((col: string, pix: number) => (
                        <span
                          key={pix}
                          className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-purple-300"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* YouTube Stylings Checklist */}
        <div className="space-y-3.5 select-none pt-2">
          <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-400" /> High-conversion YouTube Styles
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-905 border border-slate-900 hover:border-slate-800 rounded-xl space-y-1">
              <span className="text-xs font-bold font-sans text-slate-200">The MrBeast Look</span>
              <p className="text-[10px] text-slate-400">Exaggerated face model, hyper-saturated green accents, custom lighting shadows.</p>
            </div>
            <div className="p-3 bg-slate-905 border border-slate-900 hover:border-slate-800 rounded-xl space-y-1">
              <span className="text-xs font-bold font-sans text-slate-200">Bento Grid Bento</span>
              <p className="text-[10px] text-slate-400">Clean 2-part grid showing before/after inside physical neon boxes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
