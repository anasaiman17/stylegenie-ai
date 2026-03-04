import { useState } from "react";
import { Sparkles, RefreshCw, Star, Save } from "lucide-react";
import {
  generateOutfit,
  saveToHistory,
  type OutfitInput,
  type OutfitSuggestion,
  type OutfitHistoryItem,
} from "@/lib/aiEngine";

const genderOptions = ["Male", "Female", "Unisex"];
const occasionOptions = ["Casual", "Office", "Party", "Date", "Travel"];
const weatherOptions = ["Hot", "Cold", "Rainy"];
const moodOptions = ["Confident", "Chill", "Romantic", "Elegant"];
const colorOptions = ["Black", "White", "Navy", "Red", "Blue", "Green", "Pink", "Beige", "Burgundy", "Olive", "Custom"];
const bodyTypeOptions = ["Slim", "Athletic", "Curvy", "Petite", "Tall", "Plus"];

const outfitEmoji: Record<string, string> = {
  top: "👕", bottom: "👖", footwear: "👟", accessory: "💍", outerLayer: "🧥",
};

export default function OutfitGenerator() {
  const [form, setForm] = useState<OutfitInput>({
    gender: "Female",
    occasion: "Casual",
    weather: "Hot",
    mood: "Confident",
    colorPreference: "Black",
    bodyType: "Athletic",
  });
  const [customColor, setCustomColor] = useState("");
  const [outfit, setOutfit] = useState<OutfitSuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rating, setRating] = useState(0);

  const handleGenerate = () => {
    setLoading(true);
    setSaved(false);
    setRating(0);
    setTimeout(() => {
      const input = { ...form, colorPreference: form.colorPreference === "Custom" ? customColor || "your preferred color" : form.colorPreference };
      const result = generateOutfit(input);
      setOutfit(result);
      setLoading(false);
    }, 800);
  };

  const handleSurprise = () => {
    const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    setForm({
      gender: rand(genderOptions),
      occasion: rand(occasionOptions),
      weather: rand(weatherOptions),
      mood: rand(moodOptions),
      colorPreference: rand(colorOptions.slice(0, -1)),
      bodyType: rand(bodyTypeOptions),
    });
    setTimeout(handleGenerate, 100);
  };

  const handleSave = () => {
    if (!outfit) return;
    const historyItem: OutfitHistoryItem = {
      ...outfit,
      input: form,
      generatedAt: new Date().toISOString(),
      rating,
    };
    saveToHistory(historyItem);
    setSaved(true);
  };

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><Sparkles className="w-3 h-3" /> AI Outfit Generator</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 gradient-text">Generate Your Perfect Outfit</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Fill in your preferences and let our AI create a personalized outfit recommendation just for you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form panel */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-6 space-y-5">
            <h2 className="font-display text-xl font-bold gradient-text">Your Preferences</h2>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Gender</label>
              <div className="flex gap-2">
                {genderOptions.map(g => (
                  <button key={g} onClick={() => setForm(f => ({ ...f, gender: g }))}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${form.gender === g ? "bg-primary/20 border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Occasion</label>
              <div className="grid grid-cols-3 gap-2">
                {occasionOptions.map(o => (
                  <button key={o} onClick={() => setForm(f => ({ ...f, occasion: o }))}
                    className={`py-2 rounded-xl text-sm font-medium border transition-all ${form.occasion === o ? "bg-primary/20 border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather */}
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Weather</label>
              <div className="flex gap-2">
                {weatherOptions.map((w, i) => {
                  const emojis = ["☀️", "❄️", "🌧️"];
                  return (
                    <button key={w} onClick={() => setForm(f => ({ ...f, weather: w }))}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${form.weather === w ? "bg-primary/20 border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                      {emojis[i]} {w}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mood */}
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Mood</label>
              <div className="grid grid-cols-2 gap-2">
                {moodOptions.map((m, i) => {
                  const emojis = ["💪", "😎", "💕", "✨"];
                  return (
                    <button key={m} onClick={() => setForm(f => ({ ...f, mood: m }))}
                      className={`py-2 rounded-xl text-sm font-medium border transition-all ${form.mood === m ? "bg-accent/20 border-accent text-accent" : "border-border text-muted-foreground hover:border-accent/50"}`}>
                      {emojis[i]} {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Color Preference</label>
              <select className="select-glass" value={form.colorPreference} onChange={e => setForm(f => ({ ...f, colorPreference: e.target.value }))}>
                {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {form.colorPreference === "Custom" && (
                <input className="input-glass mt-2" placeholder="Enter your color..." value={customColor} onChange={e => setCustomColor(e.target.value)} />
              )}
            </div>

            {/* Body type */}
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Body Type</label>
              <div className="grid grid-cols-3 gap-2">
                {bodyTypeOptions.map(b => (
                  <button key={b} onClick={() => setForm(f => ({ ...f, bodyType: b }))}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all ${form.bodyType === b ? "bg-secondary border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleGenerate} disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loading ? "Generating..." : "Generate Outfit"}
              </button>
              <button onClick={handleSurprise} className="btn-gold px-4 py-2 rounded-xl text-sm font-medium" title="Surprise Me!">🎲</button>
            </div>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-3">
            {!outfit && !loading && (
              <div className="glass-card rounded-3xl h-full flex items-center justify-center p-12 text-center">
                <div>
                  <div className="text-6xl mb-4 animate-float">✨</div>
                  <h3 className="font-display text-2xl font-bold mb-2 gradient-text">Your Outfit Awaits</h3>
                  <p className="text-muted-foreground">Fill in your preferences and click Generate Outfit to reveal your AI-curated look.</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="glass-card rounded-3xl h-full flex items-center justify-center p-12 text-center">
                <div>
                  <div className="text-6xl mb-4 animate-spin-slow">🌀</div>
                  <h3 className="font-display text-2xl font-bold mb-2 gradient-text">AI is styling you...</h3>
                  <p className="text-muted-foreground">Analyzing your preferences with color theory and mood intelligence.</p>
                </div>
              </div>
            )}

            {outfit && !loading && (
              <div className="space-y-5 animate-fade-in-up">
                {/* Header card */}
                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="tag-badge mb-2">AI Generated • {outfit.confidenceScore}% Match</div>
                      <h2 className="font-display text-2xl font-bold">{outfit.title}</h2>
                    </div>
                    <div className="text-4xl animate-float">✨</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {outfit.tags.map(tag => <span key={tag} className="tag-gold text-xs">{tag}</span>)}
                  </div>
                </div>

                {/* Outfit pieces */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "top", label: "Top Wear" },
                    { key: "bottom", label: "Bottom Wear" },
                    { key: "footwear", label: "Footwear" },
                    { key: "accessory", label: "Accessories" },
                    ...(outfit.outerLayer ? [{ key: "outerLayer", label: "Outer Layer" }] : []),
                  ].map(({ key, label }) => (
                    <div key={key} className="glass-card rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{outfitEmoji[key] || "👔"}</span>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium">{label}</p>
                          <p className="text-sm font-semibold">{outfit[key as keyof OutfitSuggestion] as string}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Style note */}
                <div className="glass-card rounded-2xl p-5 border border-accent/20">
                  <p className="text-xs text-accent font-medium mb-1">✨ AI Style Note</p>
                  <p className="text-sm text-foreground leading-relaxed">{outfit.styleNote}</p>
                </div>

                {/* Rating + Save */}
                <div className="glass-card rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Rate this outfit</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => setRating(star)}>
                          <Star className={`w-6 h-6 transition-colors ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleGenerate} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:border-primary/50 transition-all">
                      <RefreshCw className="w-4 h-4" /> Regenerate
                    </button>
                    <button onClick={handleSave} disabled={saved} className={`btn-${saved ? "gold" : "primary"} flex items-center gap-2 text-sm`}>
                      <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save Outfit"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
