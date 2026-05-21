import React, { useState, useEffect } from "react";
import { Screen, SavedProject, Task, AppNotification } from "./types";
import {
  STARTING_PROJECTS,
  STARTING_TASKS,
  STARTING_NOTIFICATIONS
} from "./mockData";

// Core screen imports
import OnboardingScreen from "./components/OnboardingScreen";
import AuthScreens from "./components/AuthScreens";
import DashboardScreen from "./components/DashboardScreen";
import ThumbnailScreen from "./components/ThumbnailScreen";
import CaptionScreen from "./components/CaptionScreen";
import ScriptScreen from "./components/ScriptScreen";
import PlannerScreen from "./components/PlannerScreen";
import AnalyticsScreen from "./components/AnalyticsScreen";
import NotificationsScreen from "./components/NotificationsScreen";
import PremiumScreen from "./components/PremiumScreen";
import ProfileScreen from "./components/ProfileScreen";
import AiAssistant from "./components/AiAssistant";

// Lucide Icons
import {
  Home,
  Calendar,
  Sparkles,
  LineChart,
  User,
  Zap,
  Bell,
  Clock,
  Wifi,
  BatteryMedium,
  Check,
  X,
  Copy,
  FolderOpen
} from "lucide-react";

export default function App() {
  // 1. Navigation and Routing States
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.ONBOARDING);
  const [lastScreen, setLastScreen] = useState<Screen>(Screen.DASHBOARD);
  const [activeTab, setActiveTab] = useState<"home" | "planner" | "analytics" | "profile">("home");

  // 2. Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // 3. Saved projects and data lockers
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // 4. Auxiliary popups & focus layers
  const [selectedProject, setSelectedProject] = useState<SavedProject | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [copilotInitialTopic, setCopilotInitialTopic] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize data from localstorage or load starting presets
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("cf_isLoggedIn");
      const storedEmail = localStorage.getItem("cf_userEmail");
      const storedProjects = localStorage.getItem("cf_savedProjects");
      const storedTasks = localStorage.getItem("cf_tasks");
      const storedNotifs = localStorage.getItem("cf_notifications");

      if (storedAuth === "true" && storedEmail) {
        setIsLoggedIn(true);
        setUserEmail(storedEmail);
        setCurrentScreen(Screen.DASHBOARD);
      }

      if (storedProjects) {
        setSavedProjects(JSON.parse(storedProjects));
      } else {
        setSavedProjects(STARTING_PROJECTS);
        localStorage.setItem("cf_savedProjects", JSON.stringify(STARTING_PROJECTS));
      }

      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks(STARTING_TASKS);
        localStorage.setItem("cf_tasks", JSON.stringify(STARTING_TASKS));
      }

      if (storedNotifs) {
        setNotifications(JSON.parse(storedNotifs));
      } else {
        setNotifications(STARTING_NOTIFICATIONS);
        localStorage.setItem("cf_notifications", JSON.stringify(STARTING_NOTIFICATIONS));
      }
    } catch (e) {
      console.error("Failed to parse initialized local storage databases:", e);
    }
  }, []);

  // Sync state writing utility
  const saveProjectsToLocalStorage = (newProjects: SavedProject[]) => {
    setSavedProjects(newProjects);
    localStorage.setItem("cf_savedProjects", JSON.stringify(newProjects));
  };

  const saveTasksToLocalStorage = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("cf_tasks", JSON.stringify(newTasks));
  };

  const saveNotifsToLocalStorage = (newNotifs: AppNotification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem("cf_notifications", JSON.stringify(newNotifs));
  };

  // Login handler
  const handleAuthSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("cf_isLoggedIn", "true");
    localStorage.setItem("cf_userEmail", email);
    setCurrentScreen(Screen.DASHBOARD);
    setActiveTab("home");
  };

  // Sign out logout
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("cf_isLoggedIn");
    localStorage.removeItem("cf_userEmail");
    setCurrentScreen(Screen.LOGIN);
  };

  // Add customized task to calendar
  const handleAddTask = (taskParam: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...taskParam,
      id: `task-${Date.now()}`,
      completed: false
    };
    const updated = [newTask, ...tasks];
    saveTasksToLocalStorage(updated);
  };

  // Toggle calendar task
  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTasksToLocalStorage(updated);
  };

  // Add saved AI draft project
  const handleSaveProject = (projParam: Omit<SavedProject, "id" | "date" | "isFavorite">) => {
    const newProj: SavedProject = {
      ...projParam,
      id: `proj-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      isFavorite: false
    };
    const updated = [newProj, ...savedProjects];
    saveProjectsToLocalStorage(updated);
  };

  // Toggle bookmark / favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedProjects.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    saveProjectsToLocalStorage(updated);
  };

  // Delete saved project
  const handleDeleteProject = (id: string) => {
    const updated = savedProjects.filter((p) => p.id !== id);
    saveProjectsToLocalStorage(updated);
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  // Handle click on trend elements to route with values
  const handleSelectTrend = (title: string, category: string) => {
    setCopilotInitialTopic(title);
    if (category === "Automation" || category === "SaaS & Growth") {
      setCurrentScreen(Screen.SCRIPT_GEN);
    } else {
      setCurrentScreen(Screen.CAPTION_GEN);
    }
  };

  // Read notifications
  const handleMarkRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveNotifsToLocalStorage(updated);
  };

  const handleClearAllNotifs = () => {
    saveNotifsToLocalStorage([]);
  };

  // Copy helper inside visual viewport viewer
  const handleCopyText = (textStr: string, cId: string) => {
    navigator.clipboard.writeText(textStr);
    setCopiedId(cId);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Screen routing navigation
  const navigateToScreen = (target: Screen) => {
    setLastScreen(currentScreen);
    setCurrentScreen(target);

    // Sync active state columns
    if (target === Screen.DASHBOARD) setActiveTab("home");
    if (target === Screen.PLANNER) setActiveTab("planner");
    if (target === Screen.ANALYTICS) setActiveTab("analytics");
    if (target === Screen.PROFILE) setActiveTab("profile");
  };

  // Helper tasks statistics
  const currentDayStr = "2026-05-21";
  const baseDayTasks = tasks.filter((t) => t.date === currentDayStr);
  const tasksCount = {
    total: baseDayTasks.length,
    completed: baseDayTasks.filter((t) => t.completed).length
  };

  return (
    <div className="h-full bg-slate-950 flex items-center justify-center p-0 md:p-6 overflow-hidden relative">
      {/* Absolute Decorative ambient back spheres */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating device wrapper mock frame on tablet/desktop displays */}
      <div className="w-full h-full md:h-[840px] md:max-w-[410px] md:rounded-[44px] md:border-[10px] md:border-slate-900 bg-slate-950 overflow-hidden shadow-2xl relative flex flex-col transition-all duration-300">
        
        {/* Dynamic Island / Time status bar on desktop device screens */}
        <div className="hidden md:flex bg-slate-950 h-10 px-6 justify-between items-center text-white text-[11px] font-mono select-none z-50 border-b border-slate-900/10 shrink-0">
          <span className="font-bold">04:27 AM</span>
          <div className="w-[110px] h-6 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse mr-1" />
            <span className="text-[8px] tracking-wider text-slate-400">CreatorFlow.ai</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Viewport Render core structure */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          
          {/* Main Routing Render Matrix */}
          <div className="flex-1 overflow-hidden relative">
            {currentScreen === Screen.ONBOARDING && (
              <OnboardingScreen onComplete={(next) => navigateToScreen(next)} />
            )}

            {(currentScreen === Screen.LOGIN || currentScreen === Screen.SIGNUP || currentScreen === Screen.FORGOT_PASSWORD) && (
              <AuthScreens
                currentSubScreen={currentScreen as any}
                onNavigate={(tgt) => navigateToScreen(tgt)}
                onSuccess={(email) => handleAuthSuccess(email)}
              />
            )}

            {currentScreen === Screen.DASHBOARD && (
              <DashboardScreen
                userEmail={userEmail}
                savedProjects={savedProjects}
                tasksCount={tasksCount}
                onNavigate={(tgt) => navigateToScreen(tgt)}
                onSelectTrend={handleSelectTrend}
                onToggleFavorite={handleToggleFavorite}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            )}

            {currentScreen === Screen.THUMBNAIL_GEN && (
              <ThumbnailScreen
                initialTopic={copilotInitialTopic}
                onNavigate={(tgt) => navigateToScreen(tgt)}
                onSaveProject={handleSaveProject}
              />
            )}

            {currentScreen === Screen.CAPTION_GEN && (
              <CaptionScreen
                initialTopic={copilotInitialTopic}
                onNavigate={(tgt) => navigateToScreen(tgt)}
                onSaveProject={handleSaveProject}
              />
            )}

            {currentScreen === Screen.SCRIPT_GEN && (
              <ScriptScreen
                initialTopic={copilotInitialTopic}
                onNavigate={(tgt) => navigateToScreen(tgt)}
                onSaveProject={handleSaveProject}
              />
            )}

            {currentScreen === Screen.PLANNER && (
              <PlannerScreen
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onAddTask={handleAddTask}
                onNavigate={(tgt) => navigateToScreen(tgt)}
              />
            )}

            {currentScreen === Screen.ANALYTICS && (
              <AnalyticsScreen onNavigate={(tgt) => navigateToScreen(tgt)} />
            )}

            {currentScreen === Screen.NOTIFICATIONS && (
              <NotificationsScreen
                notifications={notifications}
                onMarkRead={handleMarkRead}
                onClearAll={handleClearAllNotifs}
                onNavigate={(tgt) => navigateToScreen(tgt)}
              />
            )}

            {currentScreen === Screen.PREMIUM && (
              <PremiumScreen
                onNavigate={(tgt) => navigateToScreen(tgt)}
                onSubscribeSuccess={() => {}}
              />
            )}

            {currentScreen === Screen.PROFILE && (
              <ProfileScreen
                userEmail={userEmail}
                savedProjects={savedProjects}
                onDeleteProject={handleDeleteProject}
                onNavigate={(tgt) => navigateToScreen(tgt)}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            )}
          </div>

          {/* Core bottom navigation rail (visible only when logged in) */}
          {isLoggedIn && (
            <div className="absolute bottom-0 inset-x-0 h-[72px] bg-slate-950/85 backdrop-blur-xl border-t border-slate-900 flex items-center justify-around px-3 z-40 select-none">
              
              <button
                onClick={() => navigateToScreen(Screen.DASHBOARD)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition cursor-pointer ${
                  activeTab === "home" ? "text-indigo-400" : "text-slate-500 hover:text-white"
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[9px] font-sans font-semibold mt-1">Home</span>
              </button>

              <button
                onClick={() => navigateToScreen(Screen.PLANNER)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition cursor-pointer ${
                  activeTab === "planner" ? "text-indigo-400" : "text-slate-500 hover:text-white"
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="text-[9px] font-sans font-semibold mt-1">Planner</span>
              </button>

              <button
                onClick={() => navigateToScreen(Screen.ANALYTICS)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition cursor-pointer ${
                  activeTab === "analytics" ? "text-indigo-400" : "text-slate-500 hover:text-white"
                }`}
              >
                <LineChart className="w-5 h-5" />
                <span className="text-[9px] font-sans font-semibold mt-1">analytics</span>
              </button>

              <button
                onClick={() => navigateToScreen(Screen.PROFILE)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition cursor-pointer ${
                  activeTab === "profile" ? "text-indigo-400" : "text-slate-500 hover:text-white"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[9px] font-sans font-semibold mt-1">Locker</span>
              </button>
            </div>
          )}

          {/* AI assistant floating button overlay */}
          {isLoggedIn && !assistantOpen && (
            <button
              onClick={() => setAssistantOpen(true)}
              className="absolute bottom-22 right-5 w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center cursor-pointer z-40"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950 animate-pulse" />
            </button>
          )}

          {/* Dynamic Side Drawer for Live Strategy Coach */}
          <AiAssistant
            userEmail={userEmail}
            isOpen={assistantOpen}
            onClose={() => setAssistantOpen(false)}
            onAutoDraft={(text, type) => {
              setCopilotInitialTopic(text);
              setAssistantOpen(false);
              if (type === "caption") setCurrentScreen(Screen.CAPTION_GEN);
              if (type === "script") setCurrentScreen(Screen.SCRIPT_GEN);
              if (type === "thumbnail") setCurrentScreen(Screen.THUMBNAIL_GEN);
            }}
          />

          {/* Immersive Viewer Overlay Modal for Saved Projects */}
          {selectedProject && (
            <div className="absolute inset-0 bg-slate-950/90 [backdrop-filter:blur(8px)] flex items-end justify-center z-50 animate-fadeIn">
              <div className="w-full bg-slate-900 border-t border-slate-800 rounded-t-3xl max-h-[85%] overflow-y-auto p-5 space-y-5 animate-slideUp flex flex-col">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-indigo-400" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 uppercase font-mono tracking-wider">{selectedProject.type} model</h4>
                      <p className="text-[9px] text-slate-500 font-mono">Archived {selectedProject.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Display contents based on project format schema */}
                <div className="flex-1 space-y-4">
                  
                  {/* Captions displays list */}
                  {selectedProject.type === "caption" && selectedProject.content?.captions?.map((c: any, cIdx: number) => {
                    const fullCopy = `${c.hook}\n\n${c.text}\n\n${c.hashtags.join(" ")}`;
                    return (
                      <div key={cIdx} className="bg-slate-950 p-4 border border-slate-850 rounded-2xl space-y-3 relative">
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                          <span className="text-[8px] font-mono uppercase text-indigo-400 block mb-0.5">Caption Hook</span>
                          <p className="text-xs font-bold text-indigo-150">{c.hook}</p>
                        </div>
                        <p className="text-xs text-slate-205 leading-relaxed whitespace-pre-wrap mt-2">{c.text}</p>
                        <div className="flex flex-wrap gap-1">
                          {c.hashtags?.map((tag: string, tIdx: number) => (
                            <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-cyan-400 font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => handleCopyText(fullCopy, `modal-cap-${cIdx}`)}
                            className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-[10px] rounded-lg text-slate-300 hover:text-white flex items-center gap-1.5 duration-150 cursor-pointer"
                          >
                            {copiedId === `modal-cap-${cIdx}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Full Post
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Copy Narrative
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Scripts displays */}
                  {selectedProject.type === "script" && selectedProject.content && (
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                        <span className="text-[8px] font-mono text-cyan-400 block uppercase">Archived Video Title</span>
                        <h4 className="text-xs font-extrabold text-white mt-0.5">{selectedProject.content.title}</h4>
                      </div>

                      <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
                        <span className="text-[8px] font-mono text-indigo-400 block uppercase">Hook Anchor</span>
                        <p className="text-xs font-black text-indigo-100 italic">"{selectedProject.content.hook}"</p>
                      </div>

                      <div className="space-y-3">
                        {selectedProject.content.bodySections?.map((sec: any, sIdx: number) => (
                          <div key={sIdx} className="bg-slate-950 border border-slate-850 rounded-xl p-3.5 space-y-2.5">
                            <div className="flex justify-between items-center pb-1 border-b border-slate-900">
                              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">{sec.sectionName}</span>
                            </div>
                            <div className="p-2 bg-slate-900 rounded border border-slate-850 text-[10px] text-slate-400 italic">
                              📹 Visual: {sec.visualCue}
                            </div>
                            <p className="text-xs text-slate-205 leading-relaxed">🎙️ Audio: {sec.narration}</p>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-955 rounded-xl text-center">
                        <span className="text-[8.5px] font-mono text-slate-500 block uppercase">Outro Call to Action</span>
                        <p className="text-xs text-slate-300 font-bold mt-0.5">"{selectedProject.content.cta}"</p>
                      </div>
                    </div>
                  )}

                  {/* Thumbnail display concepts */}
                  {selectedProject.type === "thumbnail" && selectedProject.content?.ideas?.map((t: any, tIdx: number) => (
                    <div key={tIdx} className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-sm">
                      <div className="aspect-video bg-indigo-950/20 p-5 flex flex-col justify-between border-b border-slate-900">
                        <span className="text-[8px] font-mono uppercase bg-slate-900 border border-slate-700 px-2 py-0.5 rounded self-start">Canvas Layout</span>
                        <div className="self-center my-auto">
                          <span className="px-3 py-1 bg-red-600 text-white font-sans font-black text-md uppercase skew-x-[-5deg] border border-red-500 shadow-md">
                            {t.title}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono uppercase text-slate-500 block">Composition Guide</span>
                          <p className="text-xs text-slate-200 mt-1 leading-relaxed">{t.visualDescription}</p>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-xl text-xs space-y-0.5">
                          <span className="text-[9px] font-mono uppercase text-cyan-400 block font-bold">Concept Psychology</span>
                          <p className="text-slate-302 font-sans">{t.psychology}</p>
                        </div>
                        <div className="flex gap-1.5 items-center">
                          <span className="text-[9px] font-mono text-slate-500">Colors:</span>
                          {t.colorPalette?.map((c: string, cIdx: number) => (
                            <span key={cIdx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-indigo-300">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-3.5 bg-slate-800 hover:bg-slate-750 text-xs font-bold text-white rounded-xl cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Home Indicator swipe mock line on desktop frame wrappers */}
        <div className="hidden md:block bg-slate-950 height-5 pb-3 flex justify-center items-end shrink-0 select-none z-50">
          <div className="w-28 h-1 rounded-full bg-slate-850" />
        </div>

      </div>
    </div>
  );
}
