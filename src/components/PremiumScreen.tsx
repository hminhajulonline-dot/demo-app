import React, { useState } from "react";
import { Screen } from "../types";
import { ArrowLeft, Check, Sparkles, Zap, Flame, Star, ShieldAlert } from "lucide-react";

interface PremiumScreenProps {
  onNavigate: (target: Screen) => void;
  onSubscribeSuccess: () => void;
}

export default function PremiumScreen({ onNavigate, onSubscribeSuccess }: PremiumScreenProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => {
      onSubscribeSuccess();
      onNavigate(Screen.DASHBOARD);
    }, 1500);
  };

  const benefits = [
    "Unlimited AI Caption generations",
    "Detailed B-Roll Direction on Scripts",
    "Psychology-driven Thumbnail Concepts",
    "Full Weekly consistency analytics",
    "Early niche trend alerts (SMS & alerts)",
    "Flowy's 1-on-1 Strategy Coach Chat"
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto pb-24">
      {/* Search Header Bar */}
      <div className="p-4 bg-slate-905 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(Screen.DASHBOARD)}
            className="p-1.5 rounded-lg hover:bg-slate-900"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          <div>
            <h2 className="text-sm font-extrabold">Flowy Pro Membership</h2>
            <p className="text-[10px] text-slate-500 font-mono">Unlock unlimited high-CTR content models</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Core upgrade Hero message */}
        <div className="text-center space-y-2 py-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg shadow-amber-400/10">
            <Star className="w-3.5 h-3.5 fill-current" /> BEST CREATOR VAULT
          </div>
          <h1 className="text-2xl font-black tracking-tight leading-tight">
            Build Better Content Systems, 10x Faster
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Join 14,000+ top creators, freelancers, and marketers automating their workflows with CreatorFlow.
          </p>
        </div>

        {/* Annual billing Toggle indicator */}
        <div className="flex justify-center">
          <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-800 flex items-center select-none">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                billingCycle === "monthly" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition flex items-center gap-1 ${
                billingCycle === "annual" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Annual <span className="text-[8px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full uppercase scale-90">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Card Deck */}
        <div className="space-y-4">
          {/* Pro tier card container */}
          <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-6 space-y-5 relative overflow-hidden shadow-xl shadow-indigo-650/10 shadow-[0_4px_30px_rgba(79,70,229,0.08)]">
            <div className="absolute top-0 right-0 bg-indigo-505 text-white text-[9px] uppercase font-mono tracking-widest px-4 py-1.5 rounded-bl-xl font-bold">
              Most Popular
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">CREATOR PRO</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black font-sans">
                  {billingCycle === "monthly" ? "$19" : "$15"}
                </span>
                <span className="text-xs text-slate-400">/ user / mo</span>
              </div>
              <p className="text-[10px] text-slate-400">Complete ideation and scheduling engine for individuals.</p>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={subscribed}
              className="w-full py-4.5 bg-gradient-to-r from-indigo-605 via-indigo-500 to-cyan-500 hover:opacity-90 active:scale-[0.98] transition rounded-2xl text-xs font-extrabold text-white uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              {subscribed ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" /> Upgrading Profile...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" /> Start Pro Plan
                </>
              )}
            </button>

            {/* Benefits Checklist */}
            <div className="space-y-3 pt-3 border-t border-slate-850/80">
              {benefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-350 font-sans">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agency Plan Card */}
          <div className="bg-slate-905 border border-slate-900 rounded-2xl p-5 space-y-4.5">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">TEAM AGENCY</span>
                <p className="text-xs text-slate-300 mt-1 font-sans">For social media studios & channel hubs.</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold">$49</span>
                <p className="text-[9px] text-slate-500">/ mo</p>
              </div>
            </div>
            <button
              onClick={handleSubscribe}
              disabled={subscribed}
              className="w-full py-3 bg-slate-950 border border-slate-800 hover:bg-slate-900 duration-150 rounded-xl text-xs font-semibold text-slate-305 tracking-wide cursor-pointer"
            >
              Acquire Enterprise Suite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
