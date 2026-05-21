import React, { useState } from "react";
import { Screen } from "../types";
import { Sparkles, Video, CalendarCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OnboardingScreenProps {
  onComplete: (nextScreen: Screen) => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      icon: <Sparkles className="w-12 h-12 text-indigo-400" />,
      title: "AI-Powered Ideation",
      subtitle: "CreatorFlow AI",
      description: "Generate viral social media captions, short-form video scripts, and eye-catching YouTube thumbnail concepts using state-of-the-art Gemini AI technology.",
      badge: "Gemini 3.5 Backed",
      color: "from-indigo-600/30 via-purple-600/20 to-transparent"
    },
    {
      icon: <Video className="w-12 h-12 text-cyan-400" />,
      title: "YouTube & TikTok Focus",
      subtitle: "Niche Optimization",
      description: "Instantly tailor scripts and hooks for YouTube Shorts, Instagram Reels, TikTok, and newsletters with customized audience engagement hooks and calls-to-action.",
      badge: "Viral Hook Engine",
      color: "from-cyan-600/30 via-slate-900 to-transparent"
    },
    {
      icon: <CalendarCheck className="w-12 h-12 text-purple-400" />,
      title: "Publishing & Planner",
      subtitle: "Never Miss an Upload",
      description: "Plan your weekly schedule inside our built-in interactive calendar. Track posting consistency, update tasks, and monitor growth metrics in one workspace.",
      badge: "Consistency First",
      color: "from-purple-600/30 via-blue-900 to-transparent"
    }
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      onComplete(Screen.LOGIN);
    }
  };

  const handleSkip = () => {
    onComplete(Screen.LOGIN);
  };

  return (
    <div id="onboarding-viewport" className="relative h-full flex flex-col justify-between p-6 bg-slate-950 text-white overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute top-[-10%] left-[-20%] w-[100%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[100%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex justify-between items-center z-10 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-sans font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
            CreatorFlow AI
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="text-xs text-slate-400 hover:text-white transition duration-200"
        >
          Skip
        </button>
      </div>

      {/* Slide Content Frame */}
      <div className="flex-1 flex flex-col justify-center items-center z-10 max-w-sm mx-auto my-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex flex-col items-center text-center space-y-6"
          >
            {/* Visual Icon Halo */}
            <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-800/50 border border-slate-700/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent" />
              {slides[slide].icon}
            </div>

            {/* Badge Indicator */}
            <div className="px-3 py-1 bg-slate-905 border border-slate-800 rounded-full text-[10px] uppercase font-mono tracking-widest text-indigo-300 flex items-center gap-1.5 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {slides[slide].badge}
            </div>

            {/* Typography Stack */}
            <div className="space-y-2">
              <h2 className="text-2xl font-sans font-extrabold tracking-tight text-white leading-tight">
                {slides[slide].title}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {slides[slide].subtitle}
              </p>
            </div>

            <p className="text-sm text-slate-300 px-4 leading-relaxed max-w-xs font-sans">
              {slides[slide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation Controls */}
      <div className="space-y-6 z-10 pt-2 pb-4">
        {/* Step Indicators */}
        <div className="flex justify-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === slide ? "w-6 bg-indigo-500" : "w-1.5 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        {/* Dynamic CTA Button */}
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:opacity-90 active:scale-[0.98] transition-all rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 tracking-wide"
        >
          {slide === slides.length - 1 ? "Get Started" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
