import React from "react";
import { Screen, AppNotification } from "../types";
import { ArrowLeft, Check, BellOff, Info, Flame, Lightbulb, Grid, Sparkles } from "lucide-react";

interface NotificationsScreenProps {
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (target: Screen) => void;
}

export default function NotificationsScreen({
  notifications,
  onMarkRead,
  onClearAll,
  onNavigate,
}: NotificationsScreenProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto pb-24">
      {/* Header Bar */}
      <div className="p-4 bg-slate-905 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(Screen.DASHBOARD)}
            className="p-1.5 rounded-lg hover:bg-slate-900"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          <div>
            <h2 className="text-sm font-extrabold">Notifications</h2>
            <p className="text-[10px] text-slate-500 font-mono">Algorithm updates and consistency reminders</p>
          </div>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[10px] text-slate-400 hover:text-white font-mono cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Statistics display header */}
        <div className="flex justify-between items-center bg-slate-900/40 border border-slate-850 p-4 rounded-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Unread Signals</span>
            <p className="text-lg font-bold">
              {unreadCount} Dynamic alert{unreadCount !== 1 && "s"} active
            </p>
          </div>
          <BellOff className="w-5 h-5 text-slate-500" />
        </div>

        {/* List of dynamic alerts */}
        {notifications.length === 0 ? (
          <div className="border border-dashed border-slate-900 py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-600">
              <Grid className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-400 font-sans">Inbox clear! No outstanding alerts.</p>
            <p className="text-[10px] text-slate-500 font-mono">We will alert you on viral niche changes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onMarkRead(notif.id)}
                className={`p-4 bg-slate-900/50 border rounded-xl flex items-start gap-4 duration-150 cursor-pointer ${
                  notif.read ? "border-slate-900/60 opacity-60" : "border-slate-850 shadow-[0_4px_20px_rgba(79,70,229,0.05)]"
                }`}
              >
                {/* Visual icon halos based on category */}
                <div className="mt-0.5 shrink-0">
                  {notif.type === "alert" && (
                    <div className="w-7 h-7 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center">
                      <Flame className="w-4 h-4 text-red-400" />
                    </div>
                  )}
                  {notif.type === "tip" && (
                    <div className="w-7 h-7 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-indigo-400" />
                    </div>
                  )}
                  {notif.type === "reminder" && (
                    <div className="w-7 h-7 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Info className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}
                </div>

                {/* Narrative content block */}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">
                      {notif.tag}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-0.5 leading-relaxed font-sans">{notif.text}</p>
                </div>

                {/* Mark as read marker */}
                {!notif.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkRead(notif.id);
                    }}
                    className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 duration-150 text-slate-400 hover:text-white shrink-0 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
