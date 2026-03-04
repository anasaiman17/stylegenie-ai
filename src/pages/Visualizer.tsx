import { useState } from "react";
import { Shirt, Layers } from "lucide-react";

interface VisualizerItem {
  category: string;
  emoji: string;
  selected: string;
  options: Array<{ label: string; emoji: string; color: string }>;
}

const defaultItems: VisualizerItem[] = [
  {
    category: "Shirt / Top",
    emoji: "👕",
    selected: "",
    options: [
      { label: "White T-Shirt", emoji: "👕", color: "#F5F5F0" },
      { label: "Black Turtleneck", emoji: "🖤", color: "#1a1a1a" },
      { label: "Blue Oxford Shirt", emoji: "👔", color: "#1976D2" },
      { label: "Red Flannel Shirt", emoji: "🔴", color: "#C0392B" },
      { label: "Striped Breton Top", emoji: "⚡", color: "#003D9C" },
      { label: "Silk Blouse (Ivory)", emoji: "✨", color: "#F5F0E8" },
    ],
  },
  {
    category: "Pants / Bottom",
    emoji: "👖",
    selected: "",
    options: [
      { label: "Black Slim Jeans", emoji: "🖤", color: "#1a1a1a" },
      { label: "Blue Denim Jeans", emoji: "💙", color: "#1565C0" },
      { label: "Camel Trousers", emoji: "🟤", color: "#C4A882" },
      { label: "Grey Joggers", emoji: "⚫", color: "#757575" },
      { label: "Plaid Mini Skirt", emoji: "🟫", color: "#8D6E63" },
      { label: "White Linen Pants", emoji: "⬜", color: "#FFFFF0" },
    ],
  },
  {
    category: "Shoes",
    emoji: "👟",
    selected: "",
    options: [
      { label: "White Sneakers", emoji: "👟", color: "#FFFFFF" },
      { label: "Black Chelsea Boots", emoji: "🥾", color: "#1a1a1a" },
      { label: "Brown Leather Loafers", emoji: "🤎", color: "#795548" },
      { label: "White Platform Shoes", emoji: "⬜", color: "#F5F5F5" },
      { label: "Beige Heels", emoji: "👠", color: "#D5B99C" },
      { label: "Red Ankle Boots", emoji: "🔴", color: "#C62828" },
    ],
  },
  {
    category: "Jacket / Outer",
    emoji: "🧥",
    selected: "",
    options: [
      { label: "None", emoji: "✖️", color: "transparent" },
      { label: "Camel Trench Coat", emoji: "🟤", color: "#C4A882" },
      { label: "Black Leather Jacket", emoji: "🖤", color: "#1a1a1a" },
      { label: "Navy Blazer", emoji: "💙", color: "#001F5B" },
      { label: "White Oversized Blazer", emoji: "⬜", color: "#F5F5F0" },
      { label: "Denim Jacket", emoji: "👕", color: "#1565C0" },
      { label: "Puffer Jacket (Olive)", emoji: "🟢", color: "#558B2F" },
    ],
  },
];

function getOutfitStyle(items: VisualizerItem[]): string {
  const selectedLabels = items.map(i => i.selected).filter(Boolean).join(", ").toLowerCase();
  if (!selectedLabels) return "Select items to see your outfit preview!";
  
  if (selectedLabels.includes("turtleneck") && selectedLabels.includes("trousers")) return "Quiet Luxury — understated elegance at its finest.";
  if (selectedLabels.includes("leather jacket") && selectedLabels.includes("jeans")) return "Edgy & Classic — the leather jacket elevates any denim look.";
  if (selectedLabels.includes("blazer") && (selectedLabels.includes("trousers") || selectedLabels.includes("jeans"))) return "Smart Casual Power — business-ready with a relaxed edge.";
  if (selectedLabels.includes("trench") && selectedLabels.includes("jeans")) return "Parisian Chic — effortlessly sophisticated street style.";
  if (selectedLabels.includes("white") && selectedLabels.includes("white")) return "Monochrome Mastery — an all-white look exudes luxury and confidence.";
  if (selectedLabels.includes("sneakers") && selectedLabels.includes("flannel")) return "Casual Americana — relaxed, authentic, and approachable.";
  return "Your unique combination is ready! Wear it with confidence.";
}

export default function Visualizer() {
  const [items, setItems] = useState<VisualizerItem[]>(defaultItems);

  const handleSelect = (categoryIdx: number, label: string) => {
    setItems(prev => prev.map((item, i) => i === categoryIdx ? { ...item, selected: label } : item));
  };

  const selectedCount = items.filter(i => i.selected && i.selected !== "None").length;
  const outfitStyle = getOutfitStyle(items);

  const reset = () => setItems(defaultItems.map(i => ({ ...i, selected: "" })));

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><Layers className="w-3 h-3" /> Outfit Visualizer</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 gradient-text">Outfit Visualizer</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Mix and match clothing pieces to build your perfect outfit. Select from each category to see your combined look.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selector panels */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item, idx) => (
              <div key={item.category} className="glass-card rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.category}</span>
                  {item.selected && item.selected !== "None" && (
                    <span className="ml-auto tag-badge text-xs">Selected: {item.selected}</span>
                  )}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {item.options.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(idx, opt.label)}
                      className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                        item.selected === opt.label
                          ? "border-primary bg-primary/15 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg border border-white/10 flex-shrink-0 flex items-center justify-center text-sm"
                          style={{ backgroundColor: opt.color !== "transparent" ? opt.color : "hsl(260 25% 15%)" }}>
                          {opt.color === "transparent" ? "✖" : ""}
                        </div>
                        <span className="text-xs font-medium leading-tight">{opt.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Preview panel */}
          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-6 sticky top-24 animate-fade-in-up delay-400">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-lg font-bold gradient-text">Outfit Preview</h2>
                {selectedCount > 0 && (
                  <button onClick={reset} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Reset</button>
                )}
              </div>

              {/* Outfit figure */}
              <div className="relative bg-secondary/30 rounded-2xl h-80 flex flex-col items-center justify-center overflow-hidden mb-5 border border-border">
                {selectedCount === 0 ? (
                  <div className="text-center">
                    <Shirt className="w-16 h-16 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">Start selecting items</p>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-1 p-4">
                    {/* Jacket / Outer */}
                    {items[3].selected && items[3].selected !== "None" && (
                      <div className="absolute inset-x-6 top-4 bottom-4 rounded-2xl opacity-30"
                        style={{ backgroundColor: items[3].options.find(o => o.label === items[3].selected)?.color || "transparent" }} />
                    )}
                    {/* Layered clothing display */}
                    <div className="z-10 text-center space-y-2">
                      {items.filter(i => i.selected && i.selected !== "None").map(item => {
                        const opt = item.options.find(o => o.label === item.selected);
                        return (
                          <div key={item.category} className="flex items-center gap-2 glass-card rounded-lg px-3 py-2">
                            <div className="w-5 h-5 rounded flex-shrink-0 border border-white/20"
                              style={{ backgroundColor: opt?.color || "#888" }} />
                            <div>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                              <p className="text-xs font-semibold">{item.selected}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Style analysis */}
              {selectedCount >= 2 && (
                <div className="border border-accent/30 rounded-xl p-4 bg-accent/10 mb-4">
                  <p className="text-xs text-accent font-semibold mb-1">✨ Style Analysis</p>
                  <p className="text-sm">{outfitStyle}</p>
                </div>
              )}

              <div className="text-center">
                <p className="text-muted-foreground text-sm">{selectedCount} of {items.length} pieces selected</p>
                <div className="flex justify-center gap-1 mt-2">
                  {items.map((item, i) => (
                    <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${item.selected && item.selected !== "None" ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
