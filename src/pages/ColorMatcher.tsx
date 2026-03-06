import { useState } from "react";
import { getColorMatches } from "@/lib/aiEngine";
import type { ColorMatch } from "@/lib/aiEngine";
import { Search, Palette } from "lucide-react";
import Mannequin from "@/components/Mannequin";

const popularColors = ["Black", "White", "Navy", "Red", "Blue", "Green", "Pink", "Beige", "Saffron", "Maroon"];

export default function ColorMatcher() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ColorMatch | null>(null);

  const handleSearch = (color?: string) => {
    const c = color || input.trim();
    if (!c) return;
    setResult(getColorMatches(c));
    setInput(c);
  };

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><Palette className="w-3 h-3" /> AI Color Theory Engine</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 gradient-text">AI Color Matcher</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Enter any color and our AI uses color theory algorithms to find perfect matches, complementary combinations, and outfit tips.</p>
        </div>

        {/* Search */}
        <div className="glass-card rounded-2xl p-4 flex gap-3 mb-8 animate-fade-in-up">
          <input className="input-glass" placeholder="Enter a color (e.g. Navy, Saffron, Maroon...)" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} />
          <button onClick={() => handleSearch()} className="btn-primary flex items-center gap-2 whitespace-nowrap px-5">
            <Search className="w-4 h-4" /> Analyze
          </button>
        </div>

        {/* Popular */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-fade-in-up">
          {popularColors.map(c => (
            <button key={c} onClick={() => handleSearch(c)}
              className="px-4 py-2 glass-card rounded-xl text-sm font-medium hover:border-primary/40 transition-all">
              {c}
            </button>
          ))}
        </div>

        {!result && (
          <div className="text-center py-10 animate-fade-in-up flex flex-col items-center gap-6">
            <div className="text-7xl mb-2 animate-float">🎨</div>
            <Mannequin
              top={{ label: "Silk Kurta", color: "Saffron" }}
              bottom={{ label: "White Palazzo", color: "White" }}
              shoes={{ label: "Gold Jutis", color: "Gold" }}
              accessory={{ label: "Dupatta", color: "maroon" }}
              size="md"
              animate
            />
            <div>
              <h3 className="font-display text-2xl font-bold gradient-text mb-2">Enter a Color</h3>
              <p className="text-muted-foreground">Discover perfect Indian color combinations using color theory.</p>
            </div>
          </div>
        )}

        {result && (
          <div className="grid lg:grid-cols-4 gap-6 animate-fade-in-up">
            {/* Mannequin preview with matched colors */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-5 sticky top-24 flex flex-col items-center">
                <p className="text-xs text-muted-foreground font-semibold mb-3 uppercase tracking-widest">Color Preview</p>
                <Mannequin
                  top={{ label: "Kurta", color: result.color }}
                  bottom={{ label: "Salwar", color: result.matches[0] || "White" }}
                  shoes={{ label: "Jutis", color: result.neutrals[0] || "Brown" }}
                  accessory={{ label: "Dupatta", color: result.complementary[0] || "Gold" }}
                  size="md"
                  animate
                />
                <p className="text-xs text-primary text-center mt-2">Color-matched outfit</p>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-5">
              <div className="glass-card rounded-3xl p-6">
                <h2 className="font-display text-2xl font-bold mb-1">Results for <span className="gradient-text capitalize">{result.color}</span></h2>
                <p className="text-muted-foreground text-sm mb-5">Color theory analysis with {result.matches.length} perfect matches found</p>
                <div className="flex gap-3 flex-wrap">
                  {result.palette.map((hex, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-xl border border-white/10 shadow-lg" style={{ backgroundColor: hex }} />
                      <span className="text-xs text-muted-foreground">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="font-semibold text-primary mb-3">✅ Perfect Matches</h3>
                  <ul className="space-y-2">
                    {result.matches.map(m => <li key={m} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />{m}</li>)}
                  </ul>
                </div>
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="font-semibold text-accent mb-3">⚡ Complementary</h3>
                  <ul className="space-y-2">
                    {result.complementary.map(m => <li key={m} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />{m}</li>)}
                  </ul>
                </div>
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="font-semibold mb-3" style={{ color: "hsl(185 80% 60%)" }}>🎨 Analogous</h3>
                  <ul className="space-y-2">
                    {result.analogous.map(m => <li key={m} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(185 80% 60%)" }} />{m}</li>)}
                  </ul>
                </div>
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="font-semibold mb-3" style={{ color: "hsl(38 80% 65%)" }}>⬜ Neutrals to Pair</h3>
                  <ul className="space-y-2">
                    {result.neutrals.map(m => <li key={m} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(38 80% 65%)" }} />{m}</li>)}
                  </ul>
                </div>
                <div className="glass-card rounded-2xl p-5 sm:col-span-2">
                  <h3 className="font-semibold text-accent mb-3">✨ AI Fashion Tips</h3>
                  <ul className="space-y-3">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="text-sm flex gap-3">
                        <span className="text-accent font-bold flex-shrink-0">{i + 1}.</span>
                        <span className="text-foreground/80">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ColorMatch | null>(null);

  const handleSearch = (color?: string) => {
    const c = color || input.trim();
    if (!c) return;
    setResult(getColorMatches(c));
    setInput(c);
  };

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><Palette className="w-3 h-3" /> AI Color Theory Engine</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 gradient-text">AI Color Matcher</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Enter any color and our AI uses color theory algorithms to find perfect matches, complementary combinations, and outfit tips.</p>
        </div>

        {/* Search */}
        <div className="glass-card rounded-2xl p-4 flex gap-3 mb-8 animate-fade-in-up">
          <input className="input-glass" placeholder="Enter a color (e.g. Navy, Red, Olive...)" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} />
          <button onClick={() => handleSearch()} className="btn-primary flex items-center gap-2 whitespace-nowrap px-5">
            <Search className="w-4 h-4" /> Analyze
          </button>
        </div>

        {/* Popular */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-fade-in-up">
          {popularColors.map(c => (
            <button key={c} onClick={() => handleSearch(c)}
              className="px-4 py-2 glass-card rounded-xl text-sm font-medium hover:border-primary/40 transition-all">
              {c}
            </button>
          ))}
        </div>

        {!result && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="text-7xl mb-4 animate-float">🎨</div>
            <h3 className="font-display text-2xl font-bold gradient-text mb-2">Enter a Color</h3>
            <p className="text-muted-foreground">Discover perfect color combinations using the science of color theory.</p>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Color palette */}
            <div className="glass-card rounded-3xl p-6">
              <h2 className="font-display text-2xl font-bold mb-1">Results for <span className="gradient-text capitalize">{result.color}</span></h2>
              <p className="text-muted-foreground text-sm mb-5">Color theory analysis with {result.matches.length} perfect matches found</p>
              <div className="flex gap-3 flex-wrap">
                {result.palette.map((hex, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-xl border border-white/10 shadow-lg" style={{ backgroundColor: hex }} />
                    <span className="text-xs text-muted-foreground">{hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-primary mb-3">✅ Perfect Matches</h3>
                <ul className="space-y-2">
                  {result.matches.map(m => <li key={m} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />{m}</li>)}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-accent mb-3">⚡ Complementary</h3>
                <ul className="space-y-2">
                  {result.complementary.map(m => <li key={m} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />{m}</li>)}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold mb-3" style={{ color: "hsl(200 70% 65%)" }}>🎨 Analogous</h3>
                <ul className="space-y-2">
                  {result.analogous.map(m => <li key={m} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(200 70% 65%)" }} />{m}</li>)}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold mb-3" style={{ color: "hsl(280 30% 70%)" }}>⬜ Neutrals to Pair</h3>
                <ul className="space-y-2">
                  {result.neutrals.map(m => <li key={m} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(280 30% 70%)" }} />{m}</li>)}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-5 sm:col-span-2">
                <h3 className="font-semibold text-accent mb-3">✨ AI Fashion Tips</h3>
                <ul className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="text-sm flex gap-3">
                      <span className="text-accent font-bold flex-shrink-0">{i + 1}.</span>
                      <span className="text-foreground/80">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
