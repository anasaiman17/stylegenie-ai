import { useState } from "react";
import { Layers } from "lucide-react";
import Mannequin from "@/components/Mannequin";

interface VisualizerItem {
  category: string;
  emoji: string;
  selected: string;
  selectedColor: string;
  options: Array<{ label: string; emoji: string; color: string }>;
}

const defaultItems: VisualizerItem[] = [
  {
    category: "Shirt / Top",
    emoji: "👕",
    selected: "",
    selectedColor: "",
    options: [
      { label: "White Kurta", emoji: "👕", color: "#F5F5F0" },
      { label: "Black Nehru Shirt", emoji: "🖤", color: "#1a1a1a" },
      { label: "Blue Linen Shirt", emoji: "👔", color: "#1976D2" },
      { label: "Saffron Kurta", emoji: "🟠", color: "#ff7722" },
      { label: "Silk Kurta (Ivory)", emoji: "✨", color: "#F5F0E8" },
      { label: "Maroon Sherwani Top", emoji: "🔴", color: "#800000" },
    ],
  },
  {
    category: "Pants / Bottom",
    emoji: "👖",
    selected: "",
    selectedColor: "",
    options: [
      { label: "Black Churidar", emoji: "🖤", color: "#1a1a1a" },
      { label: "White Dhoti Pants", emoji: "⬜", color: "#F5F5F0" },
      { label: "Navy Salwar", emoji: "💙", color: "#1565C0" },
      { label: "Beige Palazzo", emoji: "🟤", color: "#C4A882" },
      { label: "Indigo Saree Drape", emoji: "💜", color: "#3f51b5" },
      { label: "Mustard Lehenga", emoji: "🟡", color: "#e3a50a" },
    ],
  },
  {
    category: "Shoes",
    emoji: "👟",
    selected: "",
    selectedColor: "",
    options: [
      { label: "Kolhapuri Chappals", emoji: "🩴", color: "#795548" },
      { label: "Black Mojris", emoji: "🥾", color: "#1a1a1a" },
      { label: "Gold Jutis", emoji: "✨", color: "#d4a017" },
      { label: "White Canvas", emoji: "⬜", color: "#F5F5F5" },
      { label: "Tan Leather Sandals", emoji: "🤎", color: "#D5B99C" },
      { label: "Red Heels", emoji: "👠", color: "#C62828" },
    ],
  },
  {
    category: "Jacket / Dupatta",
    emoji: "🧥",
    selected: "",
    selectedColor: "",
    options: [
      { label: "None", emoji: "✖️", color: "transparent" },
      { label: "Bandhani Dupatta", emoji: "🌸", color: "#e91e8c" },
      { label: "Silk Dupatta (Gold)", emoji: "✨", color: "#d4a017" },
      { label: "Nehru Jacket (Navy)", emoji: "💙", color: "#001F5B" },
      { label: "Embroidered Shawl", emoji: "🟤", color: "#8D6E63" },
      { label: "Khadi Vest (Cream)", emoji: "⬜", color: "#fdf6e3" },
      { label: "Puffer Jacket (Olive)", emoji: "🟢", color: "#558B2F" },
    ],
  },
];

function getOutfitStyle(items: VisualizerItem[]): string {
  const selectedLabels = items.map(i => i.selected).filter(Boolean).join(", ").toLowerCase();
  if (!selectedLabels) return "Select items to see your outfit preview!";
  if (selectedLabels.includes("sherwani") && selectedLabels.includes("churidar")) return "Royal Shahi Look — wedding-ready grandeur.";
  if (selectedLabels.includes("kurta") && selectedLabels.includes("palazzo")) return "Ethnic Chic — the perfect fusion of comfort and grace.";
  if (selectedLabels.includes("nehru") && (selectedLabels.includes("churidar") || selectedLabels.includes("dhoti"))) return "Smart Indian — clean lines with a desi soul.";
  if (selectedLabels.includes("dupatta") && selectedLabels.includes("lehenga")) return "Festive Queen — ready for sangeet or mehndi night!";
  if (selectedLabels.includes("silk") && selectedLabels.includes("jutis")) return "Heritage Luxury — timeless Indian craftsmanship.";
  if (selectedLabels.includes("kolhapuri")) return "Desi Street Style — casual cool with ethnic roots.";
  return "Your unique Indian combination is ready! Wear it with confidence.";
}

export default function Visualizer() {
  const [items, setItems] = useState<VisualizerItem[]>(defaultItems);

  const handleSelect = (categoryIdx: number, label: string, color: string) => {
    setItems(prev => prev.map((item, i) => i === categoryIdx ? { ...item, selected: label, selectedColor: color } : item));
  };

  const selectedCount = items.filter(i => i.selected && i.selected !== "None").length;
  const outfitStyle = getOutfitStyle(items);

  const reset = () => setItems(defaultItems.map(i => ({ ...i, selected: "", selectedColor: "" })));

  // Map items to mannequin props
  const topItem = items[0].selected && items[0].selected !== "None" ? { label: items[0].selected, color: items[0].selectedColor } : undefined;
  const bottomItem = items[1].selected && items[1].selected !== "None" ? { label: items[1].selected, color: items[1].selectedColor } : undefined;
  const shoesItem = items[2].selected && items[2].selected !== "None" ? { label: items[2].selected, color: items[2].selectedColor } : undefined;
  const outerItem = items[3].selected && items[3].selected !== "None" ? { label: items[3].selected, color: items[3].selectedColor } : undefined;

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><Layers className="w-3 h-3" /> Outfit Visualizer</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 gradient-text">Outfit Visualizer</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Mix and match Indian clothing pieces to build your perfect outfit. See a live mannequin preview on the right.</p>
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
                    <span className="ml-auto tag-badge text-xs">✓ {item.selected}</span>
                  )}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {item.options.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(idx, opt.label, opt.color)}
                      className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                        item.selected === opt.label
                          ? "border-primary bg-primary/15 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg border border-white/10 flex-shrink-0 flex items-center justify-center text-sm"
                          style={{ backgroundColor: opt.color !== "transparent" ? opt.color : "hsl(220 18% 15%)" }}>
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

          {/* Mannequin Preview panel */}
          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-6 sticky top-24 animate-fade-in-up delay-400">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-lg font-bold gradient-text">Live Mannequin</h2>
                {selectedCount > 0 && (
                  <button onClick={reset} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Reset</button>
                )}
              </div>

              {/* Mannequin or placeholder */}
              <div className="flex justify-center min-h-[280px] items-center">
                {selectedCount === 0 ? (
                  <div className="text-center opacity-40">
                    <div className="text-5xl mb-3">🧍</div>
                    <p className="text-muted-foreground text-sm">Start selecting<br/>items to dress<br/>the mannequin</p>
                  </div>
                ) : (
                  <Mannequin
                    top={topItem}
                    bottom={bottomItem}
                    shoes={shoesItem}
                    outer={outerItem}
                    size="md"
                    animate
                  />
                )}
              </div>

              {/* Style analysis */}
              {selectedCount >= 2 && (
                <div className="border border-accent/30 rounded-xl p-4 bg-accent/10 mt-4">
                  <p className="text-xs text-accent font-semibold mb-1">✨ Style Analysis</p>
                  <p className="text-sm">{outfitStyle}</p>
                </div>
              )}

              <div className="text-center mt-4">
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
