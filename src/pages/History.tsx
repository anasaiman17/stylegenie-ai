import { useState } from "react";
import { Trash2, Star, Clock, Filter } from "lucide-react";
import { getHistory, updateRating } from "@/lib/aiEngine";
import type { OutfitHistoryItem } from "@/lib/aiEngine";

export default function History() {
  const [history, setHistory] = useState<OutfitHistoryItem[]>(getHistory());
  const [filter, setFilter] = useState("all");

  const handleRate = (id: string, r: number) => {
    updateRating(id, r);
    setHistory(getHistory());
  };

  const clearHistory = () => {
    localStorage.removeItem("stylegenie_history");
    setHistory([]);
  };

  const filtered = filter === "all" ? history
    : filter === "rated" ? history.filter(h => h.rating && h.rating > 0)
    : history.filter(h => h.input?.occasion?.toLowerCase() === filter);

  const occasions = ["all", "casual", "office", "party", "date", "travel", "rated"];

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><Clock className="w-3 h-3" /> Outfit Archive</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 gradient-text">Outfit History</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Review all your AI-generated outfit recommendations. Rate your favorites and save them for later.</p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {occasions.map(o => (
                <button
                  key={o}
                  onClick={() => setFilter(o)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all whitespace-nowrap ${filter === o ? "bg-primary/20 border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                >
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </button>
              ))}
            </div>
            <button onClick={clearHistory} className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-destructive border border-destructive/30 hover:bg-destructive/10 transition-all">
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="glass-card rounded-3xl p-16 text-center animate-fade-in-up">
            <div className="text-6xl mb-4 animate-float">📋</div>
            <h3 className="font-display text-2xl font-bold gradient-text mb-2">No Outfits Yet</h3>
            <p className="text-muted-foreground">Generate outfits from the Outfit Generator page and save them to see them here.</p>
          </div>
        )}

        <div className="space-y-5">
          {filtered.map((item, i) => (
            <div key={item.id} className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg font-bold">{item.title}</h3>
                    <div className="tag-badge text-xs">{item.confidenceScore}% Match</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.generatedAt).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {item.input && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[item.input.gender, item.input.occasion, item.input.weather, item.input.mood].filter(Boolean).map(tag => (
                        <span key={tag} className="tag-gold text-xs">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => handleRate(item.id, star)}>
                      <Star className={`w-5 h-5 transition-colors ${star <= (item.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { emoji: "👕", label: "Top", val: item.top },
                  { emoji: "👖", label: "Bottom", val: item.bottom },
                  { emoji: "👟", label: "Footwear", val: item.footwear },
                  { emoji: "💍", label: "Accessory", val: item.accessory },
                  ...(item.outerLayer ? [{ emoji: "🧥", label: "Outer Layer", val: item.outerLayer }] : []),
                ].map(p => (
                  <div key={p.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/50">
                    <span>{p.emoji}</span>
                    <div>
                      <p className="text-xs text-muted-foreground">{p.label}</p>
                      <p className="text-xs font-medium truncate max-w-[120px]">{p.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map(t => <span key={t} className="tag-badge text-xs">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
