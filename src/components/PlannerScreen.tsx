import React, { useState } from "react";
import { Screen, Task } from "../types";
import { ArrowLeft, Plus, Calendar, CheckSquare, Square, Trash2, ShieldAlert, Sparkles, Flame, Check } from "lucide-react";

interface PlannerScreenProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<Task, "id" | "completed">) => void;
  onNavigate: (target: Screen) => void;
}

export default function PlannerScreen({ tasks, onToggleTask, onAddTask, onNavigate }: PlannerScreenProps) {
  const [selectedDayOffset, setSelectedDayOffset] = useState(0); // 0 corresponds to Today, 1 to Tomorrow, etc.
  const [taskTitle, setTaskTitle] = useState("");
  const [platform, setPlatform] = useState<"youtube" | "instagram" | "tiktok" | "newsletter">("youtube");
  const [type, setType] = useState<"thumbnail" | "caption" | "script" | "custom">("custom");
  const [showAddForm, setShowAddForm] = useState(false);

  // Helper arrays for dates
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate date strings relative to today (2026-05-21)
  const baseDate = new Date("2026-05-21T04:27:00Z");

  const getDayDetails = (offset: number) => {
    const d = new Date(baseDate.getTime());
    d.setDate(baseDate.getDate() + offset);
    const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
    return {
      dateStr,
      dayNum: d.getDate(),
      dayNameShort: shortDays[d.getDay()],
      dayNameFull: daysOfWeek[d.getDay()]
    };
  };

  // Generate 7 days starting from today
  const calendarDays = Array.from({ length: 7 }, (_, i) => getDayDetails(i));
  const activeDay = calendarDays[selectedDayOffset];

  // Filter tasks for the selected date
  const filteredTasks = tasks.filter((t) => t.date === activeDay.dateStr);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onAddTask({
      title: taskTitle.trim(),
      date: activeDay.dateStr,
      platform,
      type
    });

    setTaskTitle("");
    setShowAddForm(false);
  };

  // Stats calculation
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / Math.max(tasks.length, 1)) * 100);

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
            <h2 className="text-sm font-extrabold">Weekly Scheduler</h2>
            <p className="text-[10px] text-slate-500 font-mono">Build continuous publishing habits</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-505 flex items-center justify-center cursor-pointer shadow-md shadow-indigo-600/10"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Productivity Streak Callout banner */}
        <div className="bg-gradient-to-r from-orange-600/15 via-indigo-900/10 to-transparent p-4 border border-orange-500/15 rounded-2xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-current animate-pulse text-orange-500" /> STREAK MULTIPLIER ACTIVE
            </span>
            <h3 className="text-xs font-bold text-white">🔥 12-Day Upload Consistency Streak</h3>
            <p className="text-[10px] text-slate-400">Complete tasks daily to multiply organic algorithm boosts.</p>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-indigo-500 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold font-mono">{progressPercent}%</span>
          </div>
        </div>

        {/* Scrollable Weekly Calendar timeline display */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400">Select Date</h4>
            <span className="text-[10px] text-indigo-400 font-medium font-sans">{activeDay.dayNameFull}</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((day, idx) => {
              const isSelected = idx === selectedDayOffset;
              const hasTasks = tasks.some((t) => t.date === day.dateStr);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDayOffset(idx)}
                  className={`flex flex-col items-center justify-between py-2.5 rounded-xl border transition-all duration-150 relative cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                      : "bg-slate-905 border-slate-900 text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  <span className="text-[9px] uppercase font-mono tracking-wide">
                    {day.dayNameShort}
                  </span>
                  <span className="text-sm font-bold font-sans mt-1">
                    {day.dayNum}
                  </span>
                  {hasTasks && (
                    <span
                      className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        isSelected ? "bg-white" : "bg-cyan-400"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic add chore Form Panel */}
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fadeIn"
          >
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest">New Content Task</h4>
              <p className="text-[10px] text-slate-500">Append a task to {activeDay.dayNameFull}'s posting queue.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Task Title</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g., Finalize Talking Head Monologue B-rolls..."
                className="w-full bg-slate-950/70 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 px-3 w-full text-white placeholder-slate-600 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Social Channel</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-2.5 text-slate-300 outline-none"
                >
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="newsletter">Newsletter</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Task Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-950/70 border border-slate-800 text-xs rounded-xl py-3 px-2.5 text-slate-300 outline-none"
                >
                  <option value="thumbnail">Thumbnail</option>
                  <option value="caption">Caption</option>
                  <option value="script">Script</option>
                  <option value="custom">Custom Chore</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-405 text-xs font-semibold text-white rounded-xl tracking-wide duration-200"
              >
                Schedule Task
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-3 bg-slate-950 border border-slate-800 text-xs text-slate-400 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Tasks Checklist display queue */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400">Publishing Tasks List</h4>

          {filteredTasks.length === 0 ? (
            <div className="border border-dashed border-slate-900 bg-slate-955/20 rounded-2xl p-7 text-center space-y-3">
              <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="space-y-1">
                <p className="text-xs text-slate-400">All columns clear for {activeDay.dayNameFull}!</p>
                <p className="text-[10px] text-slate-500">Take an upload break or click '+' to schedule extra objectives.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 bg-slate-900/40 border rounded-xl flex items-center justify-between gap-3.5 duration-150 select-none ${
                    task.completed ? "border-slate-900/50 opacity-65" : "border-slate-850"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className="text-indigo-400 hover:text-indigo-300 transition duration-150 cursor-pointer shrink-0"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-indigo-500" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-600" />
                      )}
                    </button>

                    <div className="min-w-0 space-y-0.5">
                      <span className="inline-block px-1.5 py-0.5 bg-slate-950 border border-slate-800 text-[8px] font-mono uppercase tracking-widest text-slate-400 rounded">
                        {task.platform} • {task.type}
                      </span>
                      <p
                        className={`text-xs text-slate-205 leading-snug truncate font-medium ${
                          task.completed ? "line-through text-slate-400 font-normal" : ""
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        task.completed ? "bg-slate-600" : "bg-orange-400 animate-pulse"
                      }`}
                    />
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
