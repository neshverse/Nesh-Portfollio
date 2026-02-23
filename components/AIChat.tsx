import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, User, Sparkles, Loader2, RefreshCw, Laptop, Cpu } from 'lucide-react';
import { NavigationSection, ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';
import AvatarInline from './AvatarInline';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm Dinesh's AI bot. Ask me about my work in GenAI, RAG pipelines, or my experience at Dell and UAC!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [idleExpression, setIdleExpression] = useState({ eyes: 'default', mouth: 'smile', eyebrows: 'default' });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Base Avatar Configuration - Matches Hero & Companion exactly
  const baseAvatarConfig = useMemo(() => ({
    seed: "DineshTech",
    top: "shortQuiff",
    topColor: "2c1b18",
    facialHair: "beardMedium",
    facialHairColor: "2c1b18",
    accessories: "kurt",
    accessoriesColor: "262e33",
    clothing: "shirtCrewNeck",
    clothingColor: "e6e6e6",
    skinColor: "ffdbb4",
    backgroundColor: "transparent"
  }), []);

  // Idle Animation Loop (Blinking, subtle expression changes)
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.9) {
        // Blink
        setIdleExpression(prev => ({ ...prev, eyes: 'closed' }));
        setTimeout(() => setIdleExpression(prev => ({ ...prev, eyes: 'default' })), 200);
      } else if (rand > 0.8) {
        // Look surprised/engaged briefly
        setIdleExpression({ eyes: 'surprised', mouth: 'smile', eyebrows: 'raised' });
        setTimeout(() => setIdleExpression({ eyes: 'default', mouth: 'smile', eyebrows: 'default' }), 1000);
      } else if (rand > 0.7) {
        // Subtle glance
        setIdleExpression({ eyes: 'side', mouth: 'default', eyebrows: 'default' });
        setTimeout(() => setIdleExpression({ eyes: 'default', mouth: 'smile', eyebrows: 'default' }), 1500);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [loading]);

  // Dynamic Expression Logic based on State
  const expressionConfig = useMemo(() => {
    if (loading) {
      // Thinking/Processing State
      return {
        eyes: "squint",      // Concentrating on data
        mouth: "serious",    // Focused processing
        eyebrows: "flatNatural", // Analytical look
        statusColor: "bg-amber-400",
        statusText: "Analyzing Context...",
        glowColor: "shadow-amber-500/20"
      };
    } else if (input.length > 0) {
      // Listening/Attentive State (User is typing)
      // Trigger immediately when user starts typing (input.length > 0)
      return {
        eyes: "wide", // Attentive/Listening
        mouth: "smile",
        eyebrows: "raisedExcited", // Interested in user input
        statusColor: "bg-blue-400",
        statusText: "Listening...",
        glowColor: "shadow-blue-500/20"
      };
    } else {
      // Default Idle State
      return {
        ...idleExpression,
        statusColor: "bg-emerald-400",
        statusText: "Online",
        glowColor: "shadow-primary/20"
      };
    }
  }, [loading, idleExpression, input]);

  // Generate Current Avatar URL
  const avatarUrl = useMemo(() => {
    // User customized: using local avatar.svg
    return '/avatar.svg';
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll if we have messages and it's not the initial render,
    // actually we do want initial render to show welcome message. 
    // BUT modifying scrollTop doesn't trigger window scroll, so this is safe.
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const responseText = await sendChatMessage(userMsg.text, history);

      const botMsg: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        role: 'model',
        text: "Sorry, I seem to have lost connection to the neural network. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id={NavigationSection.CHAT} className="py-12 md:py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4 tracking-tight">
            Ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 animate-gradient-x">AI</span>
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full blur-[1px]"></div>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(79,70,229,0.15)] overflow-hidden flex flex-col h-[70vh] min-h-[500px] md:h-[600px] relative transition-all duration-500 hover:shadow-[0_0_80px_rgba(79,70,229,0.25)] hover:border-white/20 group/chat ring-1 ring-white/5">

          {/* Chat Header */}
          <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md z-10">
            <div className="flex items-center space-x-5">

              {/* Enhanced Header Avatar Container */}
              <div className="relative">
                {/* Glowing Ring - Dynamic Color based on state */}
                <div className={`absolute inset-0 rounded-full blur opacity-40 transition-all duration-300 
                   ${loading ? 'bg-amber-500 opacity-60 animate-pulse' : input.length > 0 ? 'bg-blue-500 opacity-50' : 'bg-gradient-to-tr from-primary to-accent'}
                 `}></div>

                <div className="relative w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden bg-gradient-to-b from-gray-800 to-black p-1 shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="w-full h-full rounded-full bg-white/5 overflow-hidden relative flex items-center justify-center">
                    <AvatarInline className="w-14 h-14" variant={loading ? 'serious' : input.length > 0 ? 'wink' : 'smile'} />
                  </div>
                </div>

                {/* Status Dot */}
                <div className={`absolute bottom-0 right-0 w-4 h-4 ${expressionConfig.statusColor} border-2 border-card rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-colors duration-300 flex items-center justify-center`}>
                  {loading && <div className="w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  Dinesh.AI
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-400 border border-white/5 font-mono">BOT</span>
                </h3>
                <div className="flex items-center text-xs font-medium transition-all duration-300 mt-0.5">
                  {loading ? (
                    <span className="text-amber-400 flex items-center gap-1.5">
                      <Cpu size={12} className="animate-spin" /> {expressionConfig.statusText}
                    </span>
                  ) : (
                    <span className={`${input.length > 0 ? 'text-blue-400' : 'text-emerald-400'} flex items-center gap-1.5`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${input.length > 0 ? 'bg-blue-400' : 'bg-emerald-400'} animate-pulse`}></div>
                      {expressionConfig.statusText}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMessages([messages[0]])}
              className="p-3 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all border border-transparent hover:border-white/10 group/reset"
              title="Clear Chat History"
            >
              <RefreshCw size={18} className="group-hover/reset:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.role === 'model' && (
                  <div className="relative flex-shrink-0 group hidden sm:block">
                    <div className="w-9 h-9 rounded-2xl border border-white/10 overflow-hidden bg-black/40 shadow-lg">
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(baseAvatarConfig.seed)}`}
                        alt="Dinesh's AI Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-5 py-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-sm shadow-[0_4px_15px_rgba(99,102,241,0.3)]'
                    : 'bg-white/5 border border-white/10 text-gray-100 rounded-bl-sm backdrop-blur-md'
                    }`}
                >
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div className="w-9 h-9 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 hidden sm:flex">
                    <User size={16} className="text-gray-400" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator Bubble */}
            {loading && (
              <div className="flex items-end gap-3 animate-fade-in">
                <div className="w-9 h-9 rounded-2xl border border-amber-500/30 overflow-hidden bg-black/40 shadow-lg flex-shrink-0">
                  <img src={avatarUrl} alt="Thinking..." className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/5 border-t border-white/5 backdrop-blur-xl">
            <div className="relative flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about my ML projects, skills, or experience..."
                className="w-full bg-black/20 border border-white/10 text-white rounded-full pl-6 pr-14 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder-gray-500 transition-all shadow-inner font-light"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-2 p-3 bg-white text-black rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};