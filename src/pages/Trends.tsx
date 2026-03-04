import { TrendingUp, Flame, ExternalLink } from "lucide-react";

const trends = [
  {
    id: 1, title: "Quiet Luxury", emoji: "👑", color: "from-amber-900/60 to-yellow-900/40",
    badge: "🔥 Trending #1",
    desc: "Understated elegance defined by quality fabrics, muted tones, and perfect tailoring. Think The Row, Loro Piana, and Brunello Cucinelli.",
    keyPieces: ["Cashmere crewneck sweaters", "Tailored camel trousers", "Structured leather tote", "Simple gold jewelry", "Clean leather loafers"],
    colors: ["Ivory", "Camel", "Taupe", "Forest Green", "Chocolate Brown"],
    tip: "Less is infinitely more. Invest in two perfect basics rather than ten trendy pieces.",
    season: "Year-Round", popularity: 98,
  },
  {
    id: 2, title: "Streetwear Luxe", emoji: "🔥", color: "from-orange-900/60 to-red-900/40",
    badge: "⚡ Rising Fast",
    desc: "Where luxury meets street culture. Oversized silhouettes, premium hoodies, and limited-edition sneakers define this powerhouse aesthetic.",
    keyPieces: ["Oversized premium hoodie", "Wide-leg cargo pants", "Chunky designer sneakers", "Bucket hat", "Bold graphic tee"],
    colors: ["Black", "White", "Earth tones", "Bold accents", "Camo patterns"],
    tip: "The key is premium quality basics + one statement hype piece. Let the shoes do the talking.",
    season: "Fall/Winter", popularity: 94,
  },
  {
    id: 3, title: "Maximalist Color", emoji: "🌈", color: "from-pink-900/60 to-purple-900/40",
    badge: "✨ Bold Move",
    desc: "More is more! Clashing prints, bold color blocking, and unexpected combinations rule this fearless trend. Fashion is self-expression at its loudest.",
    keyPieces: ["Color-block coat", "Mixed-print co-ords", "Statement platform shoes", "Bold printed dress", "Contrasting accessories"],
    colors: ["Hot pink + Orange", "Royal blue + Yellow", "Red + Green", "Purple + Gold", "Multiple prints"],
    tip: "Pick a dominant color and let it clash intentionally. Break the rules with conviction.",
    season: "Spring/Summer", popularity: 87,
  },
  {
    id: 4, title: "Coastal Grandmother", emoji: "🌊", color: "from-blue-900/60 to-teal-900/40",
    badge: "🌿 Evergreen",
    desc: "Relaxed, comfortable luxury with a nautical twist. Linen everything, natural fabrics, and effortless elegance that says \"I just walked off a yacht.\"",
    keyPieces: ["Flowy linen wide-leg pants", "Oversized striped shirt", "Espadrilles or simple sandals", "Woven straw bag", "Simple gold jewelry"],
    colors: ["White", "Navy", "Sage", "Sand", "Soft blue"],
    tip: "Quality natural fabrics (linen, cotton, silk) make this look work. Avoid synthetic fabrics entirely.",
    season: "Spring/Summer", popularity: 85,
  },
  {
    id: 5, title: "Dark Academia", emoji: "📚", color: "from-slate-900/60 to-stone-800/40",
    badge: "🍂 Cult Favorite",
    desc: "Inspired by elite universities and gothic literature. Rich earth tones, tweed blazers, and a sophisticated scholarly aesthetic that never goes out of style.",
    keyPieces: ["Tweed blazer", "Plaid pleated skirt", "Turtleneck sweater", "Oxford shoes or loafers", "Leather messenger bag"],
    colors: ["Dark brown", "Burgundy", "Forest green", "Mustard", "Charcoal"],
    tip: "Layering is essential. Each layer should tell a story — texture over texture, rich tone on rich tone.",
    season: "Fall/Winter", popularity: 82,
  },
  {
    id: 6, title: "Y2K Revival", emoji: "💿", color: "from-violet-900/60 to-pink-900/40",
    badge: "🕹️ Nostalgia Hit",
    desc: "2000s fashion is back and better than ever. Low-rise jeans, butterfly clips, velour tracksuits, and shiny metallics are having their moment — again.",
    keyPieces: ["Low-rise baggy jeans", "Velour tracksuit (Juicy Couture style)", "Platform flip flops or sneakers", "Mini shoulder bag", "Metallic or sparkly top"],
    colors: ["Baby pink", "Electric blue", "Chrome/Silver", "Hot pink", "Lime green"],
    tip: "Balance Y2K nostalgia with one modern element. Head-to-toe Y2K can overwhelm — mix eras for impact.",
    season: "Year-Round", popularity: 79,
  },
];

export default function Trends() {
  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><TrendingUp className="w-3 h-3" /> 2025 Fashion Intelligence</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 gradient-text">Fashion Trends</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">AI-curated trend reports with style guides, key pieces, and expert tips for 2025's most important fashion movements.</p>
        </div>

        {/* Top trend spotlight */}
        <div className={`glass-card rounded-3xl p-8 mb-10 bg-gradient-to-br ${trends[0].color} border border-amber-500/20 animate-fade-in-up`}>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <div className="tag-gold inline-flex mb-3"><Flame className="w-3 h-3" /> {trends[0].badge}</div>
              <h2 className="font-display text-4xl font-black gradient-gold-text">{trends[0].emoji} {trends[0].title}</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">{trends[0].desc}</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center min-w-[100px]">
              <p className="text-4xl font-bold gradient-gold-text">{trends[0].popularity}%</p>
              <p className="text-xs text-muted-foreground">Trend Score</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div>
              <p className="text-sm font-semibold text-accent mb-3">Key Pieces</p>
              <ul className="space-y-2">
                {trends[0].keyPieces.map((p, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent mb-3">Color Palette</p>
              <div className="flex flex-wrap gap-2">
                {trends[0].colors.map(c => <span key={c} className="tag-gold text-xs">{c}</span>)}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-xs text-accent font-medium mb-1">✨ AI Tip</p>
                <p className="text-sm">{trends[0].tip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other trends grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.slice(1).map((trend, i) => (
            <div key={trend.id} className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${trend.color} hover:scale-[1.02] transition-all duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{trend.emoji}</span>
                <div className="glass-card rounded-xl px-2 py-1 text-right">
                  <p className="text-lg font-bold gradient-text">{trend.popularity}%</p>
                </div>
              </div>
              <div className="tag-badge inline-flex mb-2 text-xs">{trend.badge}</div>
              <h3 className="font-display text-xl font-bold mb-2">{trend.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{trend.desc}</p>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-primary mb-2">Essential Pieces</p>
                <ul className="space-y-1">
                  {trend.keyPieces.slice(0, 3).map((p, j) => (
                    <li key={j} className="text-xs flex items-center gap-2 text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {trend.colors.slice(0, 3).map(c => <span key={c} className="tag-badge text-xs">{c}</span>)}
              </div>
              <div className="mt-3 p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-primary/80">💡 {trend.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
