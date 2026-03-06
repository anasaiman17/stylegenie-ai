import { useState, useRef, useEffect } from "react";
import { Send, RefreshCw } from "lucide-react";
import { getChatbotResponse } from "@/lib/aiEngine";
import Mannequin from "@/components/Mannequin";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  outfit?: Record<string, string>;
  timestamp: Date;
}

const suggestions = [
  "What should I wear for a date?",
  "Suggest a winter outfit",
  "What matches black jeans?",
  "Office outfit ideas",
  "Summer beach look",
  "Party night outfit",
  "Give me a fashion tip",
  "Streetwear ideas",
];

const welcomeMessage: Message = {
  id: "welcome",
  role: "bot",
  content: "👋 Hi! I'm your AI Fashion Stylist. Ask me anything about outfits, colors, occasions, or style tips. I'm here to make you look amazing!",
  timestamp: new Date(),
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lastOutfit, setLastOutfit] = useState<Record<string, string> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getChatbotResponse(messageText);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response.message,
        outfit: response.outfit as Record<string, string> | undefined,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      if (response.outfit && Object.keys(response.outfit).length > 0) {
        setLastOutfit(response.outfit as Record<string, string>);
      }
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([welcomeMessage]);
  };

  return (
    <div className="page-bg min-h-screen pt-24 pb-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto h-[calc(100vh-7rem)] flex flex-col">
        {/* Header */}
        <div className="glass-card rounded-3xl p-5 mb-4 flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold gradient-text">AI Style Chatbot</h1>
              <div className="flex items-center gap-1.5 text-xs" style={{color:"hsl(145 70% 50%)"}}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{backgroundColor:"hsl(145 70% 50%)"}} /> Always online
              </div>
            </div>
          </div>
          <button onClick={clearChat} className="p-2 rounded-xl glass-card hover:border-primary/40 transition-all" title="Clear chat">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">
                  ✨
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === "user" ? "max-w-[65%]" : ""}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "glass-card"
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  {msg.outfit && Object.keys(msg.outfit).length > 0 && (
                    <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                      {Object.entries(msg.outfit).map(([key, val]) => val && (
                        <div key={key} className="flex gap-2 text-xs">
                          <span className="text-muted-foreground capitalize font-medium min-w-[70px]">{key}:</span>
                          <span className="text-foreground">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm mr-2 flex-shrink-0">✨</div>
              <div className="glass-card rounded-2xl px-5 py-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 hide-scrollbar">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl border border-border text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex-shrink-0 glass-card"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="glass-card rounded-2xl p-3 flex items-center gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI stylist anything..."
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || typing}
            className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
