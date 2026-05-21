import React, { useState } from "react";
import { Screen } from "../types";
import { Zap, Mail, Lock, User, Github, AlertTriangle, Sparkles, Check } from "lucide-react";

interface AuthScreensProps {
  currentSubScreen: Screen.LOGIN | Screen.SIGNUP | Screen.FORGOT_PASSWORD;
  onNavigate: (target: Screen) => void;
  onSuccess: (userEmail: string) => void;
}

export default function AuthScreens({ currentSubScreen, onNavigate, onSuccess }: AuthScreensProps) {
  const [email, setEmail] = useState("hminhajulonline@gmail.com");
  const [password, setPassword] = useState("•••••••••");
  const [name, setName] = useState("Minhajul Islam");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please fill in your email address.");
      return;
    }
    // Simulate successful login
    onSuccess(email);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
    setSuccessMsg("Account built successfully! Logging in...");
    setTimeout(() => {
      onSuccess(email);
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }
    setError("");
    setSuccessMsg("Password reset proposal sent to inbox.");
  };

  return (
    <div className="relative h-full flex flex-col justify-between p-6 bg-slate-950 text-white overflow-y-auto">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-20%] right-[-20%] w-[120%] h-[60%] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[120%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Logotype */}
      <div className="flex flex-col items-center justify-center pt-8 pb-3 z-10 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            CreatorFlow AI
          </h1>
          <p className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase mt-1">
            Elite Creator Engine
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full z-10 pt-4 pb-4">
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-semibold tracking-tight text-white flex items-center gap-1.5">
              {currentSubScreen === Screen.LOGIN && "Welcome Back"}
              {currentSubScreen === Screen.SIGNUP && "Create Creator Account"}
              {currentSubScreen === Screen.FORGOT_PASSWORD && "Reset Password Code"}
            </h2>
            <p className="text-xs text-slate-400">
              {currentSubScreen === Screen.LOGIN && "Enter credentials to load your creative workspace."}
              {currentSubScreen === Screen.SIGNUP && "Unlock smart tools, calendars, metrics and prompts."}
              {currentSubScreen === Screen.FORGOT_PASSWORD && "We will check your email to transmit instructions."}
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-200">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Core Input Form fields */}
          {currentSubScreen === Screen.LOGIN && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Creator Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 transition duration-200"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Password</label>
                  <button
                    type="button"
                    onClick={() => onNavigate(Screen.FORGOT_PASSWORD)}
                    className="text-[10px] text-slate-400 hover:text-indigo-400 font-medium"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 transition duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-95 active:scale-[0.98] transition-all rounded-xl text-xs font-semibold text-white tracking-wide shadow-md shadow-indigo-600/10"
              >
                Access Dashboard
              </button>
            </form>
          )}

          {currentSubScreen === Screen.SIGNUP && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Direct Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 transition duration-200"
                    placeholder="Minhajul Islam"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Creator Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 transition duration-200"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 transition duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-95 active:scale-[0.98] transition-all rounded-xl text-xs font-semibold text-white tracking-wide"
              >
                Create Free Account
              </button>
            </form>
          )}

          {currentSubScreen === Screen.FORGOT_PASSWORD && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Creative Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 transition duration-200"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-slate-800 hover:bg-slate-705 border border-slate-700 active:scale-[0.98] transition-all rounded-xl text-xs font-semibold text-white tracking-wide"
              >
                Transmit Reset Link
              </button>

              <button
                type="button"
                onClick={() => onNavigate(Screen.LOGIN)}
                className="w-full text-center text-[11px] text-slate-400 hover:text-white"
              >
                Back to log in screen
              </button>
            </form>
          )}

          {/* Premium dividers & social connectors for login/signup */}
          {currentSubScreen !== Screen.FORGOT_PASSWORD && (
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800/80"></div>
                <span className="flex-shrink mx-3 text-[10px] font-mono uppercase text-slate-500">
                  Secure connect
                </span>
                <div className="flex-grow border-t border-slate-800/80"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onSuccess("google@creatorflow.ai")}
                  className="flex items-center justify-center gap-2 py-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-[11px] hover:bg-slate-900 duration-200"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" width="24" height="24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="12" y="16" fontSize="12" fontWeight="bold" textAnchor="middle" fill="currentColor">G</text>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => onSuccess("youtube@creatorflow.ai")}
                  className="flex items-center justify-center gap-2 py-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-[11px] hover:bg-slate-900 duration-200"
                >
                  <svg className="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11c.502-1.87.502-5.837.502-5.837s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation Swaps */}
      <div className="z-10 text-center py-4 text-xs">
        {currentSubScreen === Screen.LOGIN && (
          <p className="text-slate-400">
            Freelancer or Agency?{" "}
            <button
              onClick={() => onNavigate(Screen.SIGNUP)}
              className="font-bold text-indigo-400 hover:underline"
            >
              Sign up today
            </button>
          </p>
        )}
        {currentSubScreen === Screen.SIGNUP && (
          <p className="text-slate-400">
            Already registered?{" "}
            <button
              onClick={() => onNavigate(Screen.LOGIN)}
              className="font-bold text-indigo-400 hover:underline"
            >
              Log in instead
            </button>
          </p>
        )}
        {currentSubScreen === Screen.FORGOT_PASSWORD && (
          <p className="text-indigo-400 font-bold hover:underline">
            <button onClick={() => onNavigate(Screen.LOGIN)}>Return to Sign in</button>
          </p>
        )}
      </div>
    </div>
  );
}
