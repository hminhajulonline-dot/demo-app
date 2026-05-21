import React, { useState } from "react";
import { Screen, SavedProject } from "../types";
import { ArrowLeft, Sparkles, Film, Copy, Check, Eye, HelpCircle, Flame, Star, Compass } from "lucide-react";

interface ScriptScreenProps {
  initialTopic?: string;
  onNavigate: (target: Screen) => void;
  onSaveProject: (project: Omit<SavedProject, "id" | "date" | "isFavorite">) => void;
}

export default function ScriptScreen({ initialTopic = "", onNavigate, onSaveProject }: ScriptScreenProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [objective, setObjective] = useState("Brand Awareness");
  const [videoStyle, setVideoStyle] = useState("Faceless B-roll (Vocal-heavy)");
  const [targetLength, setTargetLength] = useState("30 seconds");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [script, setScript] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const objectives = ["Brand Awareness", "Direct Sales / Conversions", "Educational Value", "Storytelling / Vlog Hook"];
  const styles = ["Faceless B-roll (Vocal-heavy)", "Talking Head Studio Zoom", "Interactive Split-Screen Grid"];
  const lengths = ["30 seconds", "60 seconds", "90 seconds"];

  const loadingMessages = [
    "Structuring cinematic narrative progression...",
    "Injecting 3-second rapid viewer hooks...",
    "Drafting detailed physical visual cues...",
    "Weaving energetic call-to-action layers..."
  ];

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setScript(null);
    setSaved(false);

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % loadingMessages.length;
      setLoadingStep(step);
    }, 1200);

    try {
      const res = await fetch("/api/generate/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, objective, videoStyle, targetLength })
      });
      const data = await res.json();
      if (data.title) {
        setScript(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!script) return;
    let fullText = `TITLE: ${script.title}\nHOOK: ${script.hook}\n\n`;
    script.bodySections.forEach((sec: any) => {
      fullText += `${sec.sectionName}\n[VISUAL]: ${sec.visualCue}\n[AUDIO]: ${sec.narration}\n\n`;
    });
    fullText += `CTA: ${script.cta}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = () => {
    if (!script) return;
    onSaveProject({
      type: "script",
      title: script.title,
      topic,
      platform: "Shorts & Reels",
      content: script
    });
    setSaved(true);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto pb-24">
      {/* Header bar */}
      <div className="p-4 bg-slate-905 border-b border-slate-900 flex items-center gap-3">
        <button
          onClick={() => onNavigate(Screen.DASHBOARD)}
          className="p-1.5 rounded-lg hover:bg-slate-900"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </button>
        <div>
          <h2 className="text-sm font-extrabold">Script AI Director</h2>
          <p className="text-[10px] text-slate-500 font-mono">Build complete segmented short-form scripts</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Parameters input grid */}
        <div className="bg-slate-900/35 border border-slate-850/80 rounded-2xl p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Video Concept Or Topic</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How to double your productivity using 3 simple morning habits..."
              className="w-full bg-slate-950/70 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 px-3.5 text-white placeholder-slate-600 transition h-16 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Objective</label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-3 text-slate-300 outline-none"
              >
                {objectives.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Duration</label>
              <select
                value={targetLength}
                onChange={(e) => setTargetLength(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-3 text-slate-300 outline-none"
              >
                {lengths.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Visual Aesthetic Direction</label>
            <select
              value={videoStyle}
              onChange={(e) => setVideoStyle(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-3.5 text-slate-300 outline-none"
            >
              {styles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic || loading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-indigo-650 to-indigo-500 disabled:opacity-50 hover:opacity-95 active:scale-[0.98] transition rounded-xl text-xs font-semibold text-white tracking-wide shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            Synthesize Story Script
          </button>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
            </div>
            <p className="text-xs text-slate-300 animate-pulse font-mono">{loadingMessages[loadingStep]}</p>
          </div>
        )}

        {/* Generated Script Content */}
        {script && !loading && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400">Target Output</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className="text-xs text-indigo-400 hover:text-white flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1.5 rounded-lg cursor-pointer"
                >
                  {saved ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Saved
                    </>
                  ) : (
                    "Save To Locker"
                  )}
                </button>
                <button
                  onClick={handleCopy}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Script!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Script
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Title and metadata box */}
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4.5 space-y-2">
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">VIRAL PRODUCTION TITLE</span>
              <h4 className="text-sm font-extrabold text-white">{script.title}</h4>
            </div>

            {/* Explosive Hook Section */}
            <div className="p-4 bg-gradient-to-r from-indigo-950/40 to-slate-950 border border-indigo-500/20 rounded-2xl space-y-2">
              <span className="text-[10px] text-indigo-400 font-mono tracking-wider flex items-center gap-1.5 uppercase">
                <Flame className="w-4 h-4 text-orange-400" /> Critical Hook Line (0 - 3s)
              </span>
              <p className="text-sm font-black text-indigo-100 italic leading-relaxed">
                "{script.hook}"
              </p>
            </div>

            {/* Segmented scenes list */}
            <div className="space-y-4">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block">SCENE SEGMENT CARDS</span>
              {script.bodySections?.map((sec: any, sIdx: number) => (
                <div
                  key={sIdx}
                  className="bg-slate-900/40 border border-slate-900 hover:border-slate-850 rounded-2xl p-4.5 space-y-3.5"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-850/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      {sec.sectionName}
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-800/30">
                      Phase {sIdx + 1}
                    </span>
                  </div>

                  {/* Visual Cues box */}
                  <div className="space-y-1 p-2.5 bg-slate-950 rounded-lg border border-slate-900">
                    <span className="text-[9px] font-mono uppercase text-indigo-400 tracking-wider flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Visual Direction / B-Roll
                    </span>
                    <p className="text-[11px] text-slate-350 leading-normal italic font-sans">
                      {sec.visualCue}
                    </p>
                  </div>

                  {/* Vocal Speak narration */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                      🎙️ Audio Vocal Read
                    </span>
                    <p className="text-xs text-slate-100 leading-relaxed font-sans mt-0.5">
                      {sec.narration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Final highlighting */}
            <div className="p-4 bg-slate-905 border border-slate-850 rounded-xl space-y-1">
              <span className="text-[9px] font-mono uppercase text-slate-500 tracking-wider">
                Vocal Outro Call-to-action (CTA)
              </span>
              <p className="text-xs text-slate-200 mt-0.5 font-semibold">
                {script.cta}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
