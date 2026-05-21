import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, HelpCircle, CornerDownRight, MessageSquare, AlertCircle } from "lucide-react";

interface AiAssistantProps {
  userEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onAutoDraft: (text: string, type: "caption" | "script" | "thumbnail") => void;
}

export default function AiAssistant({ userEmail, isOpen, onClose, onAutoDraft }: AiAssistantProps) {
  const [messages, setMessages] = useState<any[]>([
    {
      role: "model",
      text: "👋 Hey creator! I am *Flowy*, your personal AI algorithm strategist. Ready to optimize titles, script hooks, or analyze CTR drops? Ask me anything!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const starterPrompts = [
    { text: "Write an explosive intro hook about coding", type: "script" as const },
    { text: "Viral caption outline for e-commerce metrics", type: "caption" as const },
    { text: "Thumbnail idea: 'I lived in a box for 48 hours'", type: "thumbnail" as const }
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: "user", text: textToSend.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: { userEmail }
        })
      });
      const data = await res.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "⚠️ I encountered an algorithm buffer issue connecting to the main server. Let me retry that workflow alignment!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 top-[20%] bg-slate-950 border-t border-slate-900 rounded-t-3xl flex flex-col shadow-[0_-15px_40px_rgba(0,0,0,0.6)] z-50 animate-slideUp">
      {/* Header Bar */}
      <div className="p-4 bg-slate-905 border-b border-indigo-950/40 rounded-t-3xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center p-0.5 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xs text-white">Flowy Social Coach</span>
            <span className="block text-[8px] uppercase tracking-widest font-mono text-cyan-400">Gemini Strategist</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => {
          const isModel = m.role === "model";
          return (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${
                isModel ? "self-start items-start mr-auto" : "self-end items-end ml-auto"
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed font-sans ${
                  isModel
                    ? "bg-slate-900/60 border border-slate-850/80 text-slate-200 rounded-tl-sm"
                    : "bg-indigo-600 text-white rounded-tr-sm shadow-md"
                }`}
              >
                {m.text}

                {/* Intelligent CTA buttons within AI feedback */}
                {isModel && idx === 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[9px] uppercase font-mono text-slate-500 block">Quick Action Prompts</span>
                    <div className="space-y-1.5 pt-0.5">
                      {starterPrompts.map((p, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSend(p.text)}
                          className="w-full text-left p-2 rounded bg-slate-950 border border-slate-850 text-[10px] text-slate-350 hover:bg-slate-900 duration-150 flex items-center justify-between group cursor-pointer"
                        >
                          <span className="truncate pr-4">{p.text}</span>
                          <CornerDownRight className="w-3 h-3 text-indigo-400 shrink-0 opacity-40 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="self-start flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-850/80 text-xs text-slate-400 italic font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce delay-75" />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce delay-150" />
            <span>Formulating strategy vectors...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input keyboard region */}
      <div className="p-3 bg-slate-905 border-t border-slate-900 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask Flowy content hacks, edit tags, titles..."
          className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-600 font-sans"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="p-3 bg-indigo-600 disabled:opacity-50 text-white rounded-xl flex items-center justify-center shrink-0 hover:bg-indigo-500 active:scale-95 duration-150 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
