import React from "react";
import { Screen, SavedProject } from "../types";
import {
  Sparkles,
  Zap,
  Film,
  Compass,
  FileText,
  Bookmark,
  TrendingUp,
  LineChart,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Play
} from "lucide-react";
import { TRENDING_IDEAS } from "../mockData";

interface DashboardScreenProps {
  userEmail: string;
  savedProjects: SavedProject[];
  tasksCount: { total: number; completed: number };
  onNavigate: (target: Screen) => void;
  onSelectTrend: (title: string, category: string) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProject: (p: SavedProject) => void;
}

export default function DashboardScreen({
  userEmail,
  savedProjects,
  tasksCount,
  onNavigate,
  onSelectTrend,
  onToggleFavorite,
  onSelectProject,
}: DashboardScreenProps) {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  const username = userEmail.split("@")[0];
  const capitalizedUser = username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto pb-24">
      {/* Upper Brand Halo */}
      <div className="p-5 bg-gradient-to-b from-indigo-950/20 to-transparent border-b border-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold tracking-tight text-sm">CreatorFlow AI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            PRO
          </div>
          <button
            onClick={() => onNavigate(Screen.NOTIFICATIONS)}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800/85 flex items-center justify-center relative cursor-pointer hover:bg-slate-850"
          >
            <Compass className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
          </button>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {/* Greetings Panel */}
        <div className="space-y-1.5">
          <div className="text-xs text-slate-400 font-mono tracking-wide uppercase flex items-center gap-2">
            <span>{getGreeting()}</span>
            <span>•</span>
            <span className="text-indigo-400 font-bold">{capitalizedUser} 👋</span>
          </div>
          <h1 className="text-xl font-sans font-extrabold tracking-tight leading-tight">
            How are we feeding the algorithms today?
          </h1>
        </div>

        {/* Quick Productivity Stats Frame */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Calendar Streak Card */}
          <div
            onClick={() => onNavigate(Screen.PLANNER)}
            className="bg-slate-905/30 border border-slate-900 rounded-2xl p-4 space-y-3 shadow-sm hover:border-slate-800 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Consistency Plan</span>
              <Calendar className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-sans">83%</span>
              <span className="text-[10px] text-emerald-400">+5% streak</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
              <div className="bg-indigo-500 h-1 rounded-full" style={{ width: "83%" }} />
            </div>
          </div>

          {/* Pending Tasks Meter Card */}
          <div
            onClick={() => onNavigate(Screen.PLANNER)}
            className="bg-slate-905/30 border border-slate-900 rounded-2xl p-4 space-y-3 shadow-sm hover:border-slate-800 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Content Schedule</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-sans">
                {tasksCount.completed}/{tasksCount.total}
              </span>
              <span className="text-[10px] text-slate-400">Tasks ready</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
              <div
                className="bg-cyan-400 h-1 rounded-full"
                style={{ width: `${(tasksCount.completed / Math.max(tasksCount.total, 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Launchpad Buttons */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400">AI Creator Launchpad</h3>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => onNavigate(Screen.CAPTION_GEN)}
              className="flex flex-col items-center justify-center p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-indigo-500 hover:bg-slate-900 duration-200 text-center space-y-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-[11px] font-semibold text-slate-250">Caption Copy</span>
            </button>

            <button
              onClick={() => onNavigate(Screen.SCRIPT_GEN)}
              className="flex flex-col items-center justify-center p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-cyan-500 hover:bg-slate-900 duration-200 text-center space-y-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                <Film className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-[11px] font-semibold text-slate-250">Script AI</span>
            </button>

            <button
              onClick={() => onNavigate(Screen.THUMBNAIL_GEN)}
              className="flex flex-col items-center justify-center p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-purple-500 hover:bg-slate-900 duration-200 text-center space-y-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[11px] font-semibold text-slate-250">Thumb Director</span>
            </button>
          </div>
        </div>

        {/* Trending Viral Creator Sparks */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400">Viral Trends This Week</h3>
            <span className="text-[10px] text-cyan-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Live
            </span>
          </div>

          <div className="space-y-2.5">
            {TRENDING_IDEAS.map((trend) => (
              <div
                key={trend.id}
                onClick={() => onSelectTrend(trend.title, trend.category)}
                className="group relative flex justify-between items-center p-3 bg-slate-900/45 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-xl duration-150 cursor-pointer"
              >
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[9px] font-mono text-slate-400 font-medium scale-95 uppercase">
                      {trend.category}
                    </span>
                    <span className="text-[10px] text-indigo-300 font-medium font-mono">
                      {trend.growth}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                    {trend.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium font-sans">
                    {trend.views} • {trend.platform}
                  </p>
                </div>
                {/* Arrow indicator */}
                <div className="w-7 h-7 bg-slate-800 border border-slate-700/80 rounded-lg flex items-center justify-center hover:bg-indigo-600 hover:text-white duration-200 shrink-0 select-none">
                  <Play className="w-3 h-3 text-slate-300 fill-current" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Projects Desk */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400">Recent AI Innovations</h3>
            <button
              onClick={() => onNavigate(Screen.PROFILE)}
              className="text-[11px] text-slate-400 hover:text-white font-medium"
            >
              See all
            </button>
          </div>

          {savedProjects.length === 0 ? (
            <div className="border border-dashed border-slate-800/80 rounded-2xl p-8 text-center space-y-2">
              <p className="text-xs text-slate-400">No projects built yet.</p>
              <p className="text-[10px] text-slate-500">Select any launchpad tool above to generate ideas!</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {savedProjects.slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="p-3.5 bg-slate-905/50 border border-slate-900 hover:border-slate-800 hover:bg-slate-900 rounded-xl flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          proj.type === "script"
                            ? "bg-cyan-400"
                            : proj.type === "caption"
                            ? "bg-indigo-400"
                            : "bg-purple-400"
                        }`}
                      />
                      <span className="text-[9px] uppercase font-mono text-slate-500 tracking-wider">
                        {proj.type}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100 truncate">{proj.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{proj.topic}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => onToggleFavorite(proj.id, e)}
                      className="p-2 rounded-lg bg-slate-950/60 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-yellow-400 duration-200"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${proj.isFavorite ? "fill-current text-yellow-400" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
