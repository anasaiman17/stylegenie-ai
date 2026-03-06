import { useState } from "react";
import { Plus, Trash2, Sparkles, ShoppingBag } from "lucide-react";
import { getWardrobe, addToWardrobe, removeFromWardrobe, suggestFromWardrobe } from "@/lib/aiEngine";
import type { WardrobeItem } from "@/lib/aiEngine";
import Mannequin from "@/components/Mannequin";

const clothingTypes = ["Shirt", "T-Shirt", "Kurta", "Blouse", "Sweater", "Hoodie", "Pants", "Jeans", "Trousers", "Shorts", "Skirt", "Saree", "Lehenga", "Jacket", "Coat", "Shoes", "Sneakers", "Boots", "Heels", "Sandals", "Jutis", "Bag", "Accessory"];
const colors = ["Black", "White", "Navy", "Grey", "Beige", "Brown", "Red", "Blue", "Green", "Pink", "Yellow", "Saffron", "Maroon", "Olive", "Cream", "Gold", "Ivory", "Indigo"];

const typeEmoji: Record<string, string> = {
  shirt: "👔", "t-shirt": "👕", kurta: "🥻", blouse: "👚", sweater: "🧶", hoodie: "🧥",
  pants: "👖", jeans: "👖", trousers: "👖", shorts: "🩳", skirt: "👗",
  saree: "🥻", lehenga: "👗", jacket: "🧥", coat: "🧥", shoes: "👟", sneakers: "👟",
  boots: "👢", heels: "👠", sandals: "🩴", jutis: "🥿", bag: "👜", accessory: "💍",
};

// Detect item roles for mannequin preview
function getTopItem(wardrobe: WardrobeItem[]) {
  const topTypes = ["shirt", "t-shirt", "kurta", "blouse", "sweater", "hoodie"];
  return wardrobe.find(i => topTypes.includes(i.type.toLowerCase()));
}
function getBottomItem(wardrobe: WardrobeItem[]) {
  const bottomTypes = ["pants", "jeans", "trousers", "shorts", "skirt", "saree", "lehenga"];
  return wardrobe.find(i => bottomTypes.includes(i.type.toLowerCase()));
}
function getShoesItem(wardrobe: WardrobeItem[]) {
  const shoeTypes = ["shoes", "sneakers", "boots", "heels", "sandals", "jutis"];
  return wardrobe.find(i => shoeTypes.includes(i.type.toLowerCase()));
}
function getOuterItem(wardrobe: WardrobeItem[]) {
  return wardrobe.find(i => ["jacket", "coat"].includes(i.type.toLowerCase()));
}
function getAccessoryItem(wardrobe: WardrobeItem[]) {
  return wardrobe.find(i => i.type.toLowerCase() === "accessory");
}

export default function Wardrobe() {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(getWardrobe());
  const [form, setForm] = useState({ type: "Kurta", name: "", color: "Black" });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addToWardrobe({ type: form.type, name: form.name.trim(), color: form.color });
    setWardrobe(getWardrobe());
    setForm(f => ({ ...f, name: "" }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleRemove = (id: string) => {
    removeFromWardrobe(id);
    setWardrobe(getWardrobe());
  };

  const handleSuggest = () => {
    const s = suggestFromWardrobe(wardrobe);
    setSuggestions(s);
    setShowSuggestions(true);
  };

  const getEmoji = (type: string) => typeEmoji[type.toLowerCase()] || "👔";

  const groupedItems = clothingTypes.reduce((acc, type) => {
    const items = wardrobe.filter(i => i.type.toLowerCase() === type.toLowerCase());
    if (items.length > 0) acc[type] = items;
    return acc;
  }, {} as Record<string, WardrobeItem[]>);

  // Mannequin live preview
  const topItem = getTopItem(wardrobe);
  const bottomItem = getBottomItem(wardrobe);
  const shoesItem = getShoesItem(wardrobe);
  const outerItem = getOuterItem(wardrobe);
  const accessoryItem = getAccessoryItem(wardrobe);

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><ShoppingBag className="w-3 h-3" /> Virtual Wardrobe</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 gradient-text">My Wardrobe</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Add your Indian clothes to your virtual wardrobe — watch the mannequin dress up live!</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Add Item Panel */}
          <div className="glass-card rounded-3xl p-6 space-y-4 h-fit">
            <h2 className="font-display text-xl font-bold gradient-text">Add Clothing Item</h2>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Item Name</label>
              <input
                className="input-glass"
                placeholder="e.g. Banarasi Silk Saree"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && handleAdd()}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Type</label>
              <select className="select-glass" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {clothingTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Color</label>
              <div className="grid grid-cols-3 gap-2">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${form.color === c ? "border-primary bg-primary/20 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAdd} disabled={!form.name.trim()} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
              <Plus className="w-4 h-4" /> Add to Wardrobe
            </button>

            {wardrobe.length >= 3 && (
              <button onClick={handleSuggest} className="btn-gold w-full flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Get AI Outfit Suggestions
              </button>
            )}

            <div className="glass-card rounded-xl p-3 text-center">
              <p className="text-3xl font-bold gradient-text">{wardrobe.length}</p>
              <p className="text-xs text-muted-foreground">Items in wardrobe</p>
            </div>
          </div>

          {/* Live Mannequin Panel */}
          <div className="flex flex-col items-center">
            <div className="glass-card rounded-3xl p-5 w-full sticky top-24 flex flex-col items-center">
              <p className="text-xs text-muted-foreground font-semibold mb-4 uppercase tracking-widest">Mannequin Preview</p>
              {wardrobe.length > 0 ? (
                <Mannequin
                  top={topItem ? { label: topItem.name, color: topItem.color } : undefined}
                  bottom={bottomItem ? { label: bottomItem.name, color: bottomItem.color } : undefined}
                  shoes={shoesItem ? { label: shoesItem.name, color: shoesItem.color } : undefined}
                  outer={outerItem ? { label: outerItem.name, color: outerItem.color } : undefined}
                  accessory={accessoryItem ? { label: accessoryItem.name, color: accessoryItem.color } : undefined}
                  size="md"
                  animate
                />
              ) : (
                <div className="py-12 text-center opacity-40">
                  <div className="text-5xl mb-3">🧍</div>
                  <p className="text-muted-foreground text-xs">Add clothes to<br/>dress the mannequin</p>
                </div>
              )}
            </div>
          </div>

          {/* Wardrobe items + suggestions */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="glass-card rounded-2xl p-6 border border-accent/30 animate-fade-in-up">
                <h3 className="font-display text-lg font-bold text-accent mb-4">✨ AI Outfit Suggestions from Your Wardrobe</h3>
                <div className="space-y-3">
                  {suggestions.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 border border-accent/20">
                      <span className="text-lg font-bold text-accent">{i + 1}.</span>
                      <p className="text-sm">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {wardrobe.length === 0 ? (
              <div className="glass-card rounded-3xl p-16 text-center">
                <div className="text-6xl mb-4 animate-float">👗</div>
                <h3 className="font-display text-2xl font-bold gradient-text mb-2">Empty Wardrobe</h3>
                <p className="text-muted-foreground">Add your first clothing item using the panel on the left!</p>
              </div>
            ) : (
              <div className="space-y-5">
                {Object.entries(groupedItems).map(([type, items]) => (
                  <div key={type} className="glass-card rounded-2xl p-5 animate-fade-in-up">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <span className="text-xl">{getEmoji(type)}</span>
                      <span>{type}s</span>
                      <span className="tag-badge ml-auto">{items.length}</span>
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all group">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{getEmoji(item.type)}</span>
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.color} · {item.type}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/20 text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
