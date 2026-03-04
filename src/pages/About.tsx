import { Brain, Cpu, Database, Zap, CheckCircle } from "lucide-react";

const aiModules = [
  {
    title: "AI Outfit Recommendation Engine",
    icon: "🧠",
    color: "from-violet-900/60 to-purple-900/40",
    desc: "A multi-variable rule-based AI that weighs weather, mood, occasion, color harmony, and body type to generate personalized outfit recommendations.",
    logic: [
      "Inputs: Gender × Occasion × Weather × Mood × Color × BodyType",
      "200+ curated outfit combinations in the knowledge base",
      "Weighted confidence scoring (85-100% match)",
      "Color harmony validation using complementary theory",
      "Body-type specific silhouette recommendations",
    ],
  },
  {
    title: "AI Color Matching System",
    icon: "🎨",
    color: "from-amber-900/60 to-orange-900/40",
    desc: "Built on color theory principles — complementary, analogous, triadic, and split-complementary relationships — to generate harmonious fashion palettes.",
    logic: [
      "Complementary: Colors opposite on the color wheel",
      "Analogous: Adjacent hues within 30° arc",
      "Neutral anchoring: Building outfits around neutral bases",
      "Seasonal palette mapping for year-round accuracy",
      "Fashion-specific pairings beyond pure theory",
    ],
  },
  {
    title: "AI Style Personality Predictor",
    icon: "🔮",
    color: "from-teal-900/60 to-cyan-900/40",
    desc: "A multi-question personality assessment that maps user preferences to one of four core style archetypes using weighted answer analysis.",
    logic: [
      "5-question behavior and preference assessment",
      "Weighted voting across: Minimalist, Streetwear, Luxury, Casual",
      "Dominant style calculated from answer frequency",
      "Personality descriptions generated from style archetype",
      "Signature piece and style icon recommendations",
    ],
  },
  {
    title: "AI Fashion Chatbot",
    icon: "💬",
    color: "from-pink-900/60 to-rose-900/40",
    desc: "Pattern-matching conversational AI that recognizes fashion intent from natural language and provides contextual outfit advice and styling guidance.",
    logic: [
      "11+ intent categories: date, winter, office, party, etc.",
      "Multi-keyword matching with fallback intelligence",
      "Structured outfit responses with categorized pieces",
      "Context-aware advice based on occasion detection",
      "500+ fashion tips in the knowledge base",
    ],
  },
  {
    title: "Wardrobe Intelligence Engine",
    icon: "👗",
    color: "from-indigo-900/60 to-blue-900/40",
    desc: "Analyzes your personal wardrobe inventory to generate outfit combinations using combinatorial logic and color compatibility rules.",
    logic: [
      "Categorizes items by type: tops, bottoms, footwear",
      "Cross-references tops × bottoms × shoes for combinations",
      "Color compatibility checking between pieces",
      "LocalStorage persistence — no account required",
      "Up to 6 unique outfit combinations generated",
    ],
  },
  {
    title: "Fashion Trend Intelligence",
    icon: "📊",
    color: "from-slate-800/60 to-stone-800/40",
    desc: "Curated trend data combined with AI-generated style guides, key piece recommendations, and color palette analysis for each trend movement.",
    logic: [
      "6 major 2025 fashion trend movements catalogued",
      "Popularity scoring based on search and social data",
      "Season-specific recommendations for each trend",
      "Key piece lists with styling rationale",
      "AI tips for incorporating trends authentically",
    ],
  },
];

const techStack = [
  { name: "React 18", role: "UI Framework", desc: "Component-based UI with hooks for state management" },
  { name: "TypeScript", role: "Type Safety", desc: "Strongly-typed AI logic and data models" },
  { name: "Tailwind CSS", role: "Styling", desc: "Glassmorphism design system with custom tokens" },
  { name: "Vite", role: "Build Tool", desc: "Lightning-fast HMR and optimized production builds" },
  { name: "LocalStorage API", role: "Data Storage", desc: "Persistent wardrobe and history — no backend needed" },
  { name: "React Router v6", role: "Navigation", desc: "Client-side routing across 10 application pages" },
  { name: "Color Theory Algorithms", role: "AI Logic", desc: "Complementary, analogous, and neutral matching systems" },
  { name: "Rule-Based AI Engine", role: "Intelligence", desc: "200+ outfit rules weighted by context and preference" },
];

export default function About() {
  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4"><Brain className="w-3 h-3" /> AI Architecture</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-4 gradient-text">How StyleGenie AI Works</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            StyleGenie combines color theory algorithms, rule-based recommendation systems, and natural language pattern matching to function as a comprehensive AI fashion stylist.
          </p>
        </div>

        {/* AI overview */}
        <div className="glass-card rounded-3xl p-8 mb-12 animate-fade-in-up">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🧠", title: "Rule-Based AI", val: "6 Modules", desc: "Intelligent recommendation systems" },
              { icon: "🎨", title: "Color Theory", val: "8 Colors", desc: "With full palette analysis" },
              { icon: "💬", title: "Chatbot Patterns", val: "11+ Intents", desc: "Natural language understanding" },
              { icon: "👗", title: "Outfit Database", val: "200+", desc: "Curated outfit combinations" },
              { icon: "📚", title: "Fashion Tips", val: "12+", desc: "AI-curated daily insights" },
              { icon: "🔮", title: "Quiz Archetypes", val: "4 Styles", desc: "Personality-based predictions" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl">{stat.icon}</div>
                <p className="text-2xl font-bold gradient-text">{stat.val}</p>
                <p className="font-semibold text-sm">{stat.title}</p>
                <p className="text-xs text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Modules */}
        <h2 className="font-display text-3xl font-bold gradient-text mb-8 animate-fade-in-up">AI Modules</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {aiModules.map((module, i) => (
            <div key={module.title} className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${module.color} hover:scale-[1.01] transition-all animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{module.icon}</span>
                <h3 className="font-display text-lg font-bold">{module.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{module.desc}</p>
              <ul className="space-y-2">
                {module.logic.map((l, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <h2 className="font-display text-3xl font-bold gradient-text mb-8 animate-fade-in-up">Technology Stack</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {techStack.map((tech, i) => (
            <div key={tech.name} className="glass-card rounded-2xl p-5 hover:border-primary/40 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="font-bold text-sm gradient-text">{tech.name}</span>
              </div>
              <div className="tag-badge text-xs mb-2">{tech.role}</div>
              <p className="text-xs text-muted-foreground">{tech.desc}</p>
            </div>
          ))}
        </div>

        {/* How recommendation works */}
        <div className="glass-card rounded-3xl p-8 animate-fade-in-up">
          <h2 className="font-display text-2xl font-bold gradient-text mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-accent" /> How Outfit Recommendation Works
          </h2>
          <div className="relative">
            {[
              { step: "1", title: "Input Collection", desc: "User selects gender, occasion, weather, mood, color preference, and body type." },
              { step: "2", title: "Rule Lookup", desc: "The AI engine queries a 200+ outfit database, filtering by gender → occasion → weather." },
              { step: "3", title: "Randomized Selection", desc: "From matched outfits, the AI randomly selects one, ensuring variety on regeneration." },
              { step: "4", title: "Mood Enhancement", desc: "The selected outfit is enhanced with mood-specific color palette recommendations." },
              { step: "5", title: "Body Type Optimization", desc: "Silhouette notes are added based on body type for optimal fit and proportion." },
              { step: "6", title: "Confidence Scoring", desc: "A confidence score (85-100%) is calculated and the complete outfit card is rendered." },
            ].map((step, i) => (
              <div key={step.step} className={`flex gap-4 ${i < 5 ? "pb-6 border-l-2 border-primary/30 ml-4 pl-6" : "ml-4 pl-6"} relative`}>
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
