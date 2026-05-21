import React, { useState } from "react";
import { Screen } from "../types";
import { ArrowLeft, TrendingUp, Sparkles, Filter, ChevronRight, CheckCircle, BarChart3, LineChart, Star } from "lucide-react";

interface AnalyticsScreenProps {
  onNavigate: (target: Screen) => void;
}

export default function AnalyticsScreen({ onNavigate }: AnalyticsScreenProps) {
  const [activePlatform, setActivePlatform] = useState<"YouTube" | "Instagram" | "TikTok">("YouTube");

  // Chart data configs
  const platformData = {
    YouTube: {
      subscribers: "42.8k",
      growthSubscribers: "+14.3% in 30d",
      ctr: "8.6%",
      industryAvgCtr: "4.8%",
      retention: "62.4%",
      impressionsHistory: [24, 38, 30, 48, 59, 72, 85] // y values
    },
    Instagram: {
      subscribers: "128.5k",
      growthSubscribers: "+28.1% in 30d",
      ctr: "6.2%",
      industryAvgCtr: "3.5%",
      retention: "50.1%",
      impressionsHistory: [40, 48, 65, 58, 80, 92, 110]
    },
    TikTok: {
      subscribers: "254.0k",
      growthSubscribers: "+42.5% in 30d",
      ctr: "11.4%",
      industryAvgCtr: "8.0%",
      retention: "45.8%",
      impressionsHistory: [90, 80, 120, 150, 140, 180, 240]
    }
  };

  const currentStats = platformData[activePlatform];

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
          <h2 className="text-sm font-extrabold">Creative Growth Pulse</h2>
          <p className="text-[10px] text-slate-500 font-mono font-medium">Algorithmic retention & reach analytics</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Platform selection filters */}
        <div className="flex gap-1.5 bg-slate-900/60 border border-slate-850 p-1.5 rounded-2xl">
          {(["YouTube", "Instagram", "TikTok"] as const).map((plat) => {
            const isSelected = plat === activePlatform;
            return (
              <button
                key={plat}
                onClick={() => setActivePlatform(plat)}
                className={`flex-1 text-center py-2 rounded-xl text-xs font-semibold duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white hover:bg-slate-850"
                }`}
              >
                {plat}
              </button>
            );
          })}
        </div>

        {/* Dynamic hand-crafted Area Chart Graph widget using pure responsive SVG */}
        <div className="bg-slate-900/35 border border-slate-850 p-5 rounded-2xl space-y-3.5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Estimated Reach</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black">{currentStats.subscribers}</span>
                <span className="text-[10px] font-semibold text-emerald-400">{currentStats.growthSubscribers}</span>
              </div>
            </div>
            <div className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[9px] font-mono text-slate-400">
              Last 7 Videos
            </div>
          </div>

          {/* SVG Rendering */}
          <div className="h-32 w-full pt-2">
            <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id={`${activePlatform}Glow`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid guide rows */}
              <line x1="0" y1="30" x2="300" y2="30" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="0" y1="70" x2="300" y2="70" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="0" y1="110" x2="300" y2="110" stroke="#1e293b" strokeWidth="0.5" />

              {/* Area layout */}
              <path
                d={`M 0,110 
                   L 0,${110 - currentStats.impressionsHistory[0] * 0.7} 
                   L 50,${110 - currentStats.impressionsHistory[1] * 0.7} 
                   L 100,${110 - currentStats.impressionsHistory[2] * 0.7} 
                   L 150,${110 - currentStats.impressionsHistory[3] * 0.7} 
                   L 200,${110 - currentStats.impressionsHistory[4] * 0.7} 
                   L 250,${110 - currentStats.impressionsHistory[5] * 0.7} 
                   L 300,${110 - currentStats.impressionsHistory[6] * 0.7} 
                   L 300,110 Z`}
                fill={`url(#${activePlatform}Glow)`}
              />

              {/* Stroke line layout */}
              <path
                d={`M 0,${110 - currentStats.impressionsHistory[0] * 0.7} 
                   L 50,${110 - currentStats.impressionsHistory[1] * 0.7} 
                   L 100,${110 - currentStats.impressionsHistory[2] * 0.7} 
                   L 150,${110 - currentStats.impressionsHistory[3] * 0.7} 
                   L 200,${110 - currentStats.impressionsHistory[4] * 0.7} 
                   L 250,${110 - currentStats.impressionsHistory[5] * 0.7} 
                   L 300,${110 - currentStats.impressionsHistory[6] * 0.7}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Glowing anchor circle */}
              <circle
                cx="300"
                cy={110 - currentStats.impressionsHistory[6] * 0.7}
                r="4.5"
                fill="#00ffff"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="animate-pulse"
              />
            </svg>
          </div>

          <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono font-medium pt-1">
            <span>Video 1</span>
            <span>Video 3</span>
            <span>Video 5</span>
            <span className="text-indigo-400">Latest (V7)</span>
          </div>
        </div>

        {/* Analytics performance grid indicators */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="p-4 bg-slate-905 border border-slate-900/60 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Average CTR</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black">{currentStats.ctr}</span>
              <span className="text-[9px] text-slate-400 font-mono">Avg {currentStats.industryAvgCtr}</span>
            </div>
            <p className="text-[10px] text-emerald-400">+1.8% vs benchmark</p>
          </div>

          <div className="p-4 bg-slate-905 border border-slate-900/60 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Retention rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black">{currentStats.retention}</span>
              <span className="text-[9px] text-slate-400 font-mono">Avg 40%</span>
            </div>
            <p className="text-[10px] text-indigo-300">Golden audience loop</p>
          </div>
        </div>

        {/* Core AI Flowy Optimization Suggestions card */}
        <div className="p-5 bg-gradient-to-r from-indigo-950/45 to-slate-900/40 border border-indigo-500/15 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">Flowy's AI Optimization Suggestion</h4>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2.5 items-start">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                🎬 Your retention is dropping significantly during first <strong>2.5 seconds</strong>. Incorporate a high-contrast zoom cuts at the 3s milestone to lock attention.
              </p>
            </div>
            <div className="flex gap-2.5 items-start">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                ✍️ Captions containing double line breaks and conversational hooks are yielding <strong>1.8x higher bookmark rates</strong> on Instagram than paragraphs.
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Creator Report Card */}
        <div className="space-y-3.5">
          <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400">Weekly Report Card</h4>
          <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl flex justify-between items-center cursor-pointer hover:border-slate-700">
            <div className="space-y-1">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[8px] font-mono text-amber-400 tracking-wider font-bold">
                RECOMMENDED ACTION
              </span>
              <h5 className="text-xs font-bold text-white">Synthesize 1 Short-form script</h5>
              <p className="text-[10px] text-slate-400">Restore your YouTube posting pace to stay ahead of algorithm declines.</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
