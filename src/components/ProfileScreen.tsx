import React, { useState } from "react";
import { Screen, SavedProject } from "../types";
import {
  ArrowLeft,
  Settings,
  Share2,
  Bookmark,
  Trash2,
  Sparkles,
  Zap,
  BookmarkCheck,
  Video,
  FileText,
  Layers,
  Check,
  Palette,
  Eye,
  BrainCircuit,
  Flame,
  X,
  Copy
} from "lucide-react";

interface ProfileScreenProps {
  userEmail: string;
  savedProjects: SavedProject[];
  onDeleteProject: (id: string) => void;
  onNavigate: (target: Screen) => void;
  onSelectProject: (p: SavedProject) => void;
}

export default function ProfileScreen({
  userEmail,
  savedProjects,
  onDeleteProject,
  onNavigate,
  onSelectProject,
}: ProfileScreenProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "caption" | "script" | "thumbnail">("all");

  const filteredProjects = savedProjects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.type === activeFilter;
  });

  const username = userEmail.split("@")[0];
  const capitalizedUser = username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto pb-24">
      {/* Header bar */}
      <div className="p-4 bg-slate-905 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(Screen.DASHBOARD)}
            className="p-1.5 rounded-lg hover:bg-slate-900"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          <div>
            <h2 className="text-sm font-extrabold">Creator Locker</h2>
            <p className="text-[10px] text-slate-500 font-mono">My custom parameters & saved projects</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Upper Profile Info banner details */}
        <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden">
          {/* Subtle logo vector behind avatar */}
          <div className="absolute right-[-10%] bottom-[-10%] w-24 h-24 bg-indigo-505/5 rounded-full blur-2xl pointer-events-none" />

          {/* Glowing Avatar circle */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center p-0.5 shadow-lg shadow-indigo-550/15">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-md font-bold text-white uppercase font-mono">
              {username.slice(0, 2)}
            </div>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              {capitalizedUser} <span className="text-[10px] font-mono text-cyan-400">PRO</span>
            </h3>
            <p className="text-[10px] text-slate-400">{userEmail}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[9px] uppercase font-mono tracking-wider font-semibold text-indigo-300">
                ⭐ Creator Flow Pro
              </span>
            </div>
          </div>
        </div>

        {/* Subscription state controls / upgrade path */}
        <div className="bg-gradient-to-tr from-indigo-950/20 to-purple-950/25 p-4 border border-indigo-500/15 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5 pr-4">
            <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400" /> Billing Status
            </h4>
            <p className="text-[10px] text-slate-400 leading-normal">
              You are currently on the Pro Annual license. Ingress renews globally.
            </p>
          </div>
          <button
            onClick={() => onNavigate(Screen.PREMIUM)}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-505 rounded-xl text-[10px] tracking-wide font-mono text-white duration-150 cursor-pointer"
          >
            Manage
          </button>
        </div>

        {/* Saved Projects Segment lists */}
        <div className="space-y-3.5">
          <div className="flex justify-between items-center">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400">Locker Vault</h4>
            <span className="text-[10px] text-slate-500 font-mono font-medium">
              {savedProjects.length} Projects saved
            </span>
          </div>

          {/* Filtering buttons */}
          <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-850">
            {([
              { id: "all", label: "All" },
              { id: "caption", label: "Captions" },
              { id: "script", label: "Scripts" },
              { id: "thumbnail", label: "Thumbs" },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`flex-1 text-[11px] font-semibold py-1.5 rounded-lg text-center transition duration-150 cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List display */}
          {filteredProjects.length === 0 ? (
            <div className="border border-dashed border-slate-900 bg-slate-950/30 rounded-2xl p-10 text-center space-y-3">
              <Bookmark className="w-8 h-8 text-slate-700 mx-auto" />
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Locker is empty.</p>
                <p className="text-[10px] text-slate-500">Your generated items will be archived here upon saving.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="p-3.5 bg-slate-905/60 border border-slate-900 hover:border-indigo-500/30 rounded-2xl flex items-center justify-between gap-4 duration-150 cursor-pointer"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {proj.type === "script" && <Video className="w-3.5 h-3.5 text-cyan-400" />}
                      {proj.type === "caption" && <FileText className="w-3.5 h-3.5 text-indigo-400" />}
                      {proj.type === "thumbnail" && <Layers className="w-3.5 h-3.5 text-purple-400" />}
                      <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-500">
                        {proj.type}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-205 truncate">{proj.title}</h5>
                    <p className="text-[9px] text-slate-500 font-mono truncate">Created {proj.date}</p>
                  </div>

                  {/* Delete controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(proj.id);
                      }}
                      className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-red-950/40 border border-slate-850 hover:border-red-500/20 text-slate-500 hover:text-red-400 duration-150 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
