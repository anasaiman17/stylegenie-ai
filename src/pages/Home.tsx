import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Zap, Star, TrendingUp, Briefcase, Palette, Code2, HeartPulse, GraduationCap, ChefHat } from "lucide-react";
import heroFashion from "@/assets/hero-fashion.jpg";
import outfitCasual from "@/assets/outfit-casual.jpg";
import outfitFormal from "@/assets/outfit-formal.jpg";
import outfitDate from "@/assets/outfit-date.jpg";
import { getDailyTip } from "@/lib/aiEngine";

// Profession-themed color system
const professionThemes = [
  {
    profession: "Business & Corporate",
    icon: Briefcase,
    color: "from-slate-700 to-blue-900",
    accent: "#1e40af",
    hue: "210",
    desc: "Tailored bandhgala suits, Nehru jackets, formal kurta sets",
  },
  {
    profession: "Creative & Artist",
    icon: Palette,
    color: "from-rose-700 to-pink-900",
    accent: "#be185d",
    hue: "330",
    desc: "Vibrant block-prints, artisanal handloom, bold dupattas",
  },
  {
    profession: "Tech & Engineer",
    icon: Code2,
    color: "from-cyan-700 to-teal-900",
    accent: "#0f766e",
    hue: "175",
    desc: "Smart-casual kurtas, minimalist khadi, clean Indo-western",
  },
  {
    profession: "Healthcare & Doctor",
    icon: HeartPulse,
    color: "from-green-700 to-emerald-900",
    accent: "#047857",
    hue: "160",
    desc: "Crisp white kurtas, pastel professional sets, soft fabrics",
  },
  {
    profession: "Education & Teacher",
    icon: GraduationCap,
    color: "from-amber-700 to-orange-900",
    accent: "#b45309",
    hue: "32",
    desc: "Classic cotton kurtis, earthy Ikat, dignified handlooms",
  },
  {
    profession: "Culinary & Chef",
    icon: ChefHat,
    color: "from-red-700 to-rose-900",
    accent: "#be123c",
    hue: "350",
    desc: "Bold saffron prints, terracotta tones, energetic patterns",
  },
];

const quickLinks = [
  { path: "/generator", label: "Outfit Generator", emoji: "✨", color: "from-violet-600 to-purple-700" },
  { path: "/chatbot", label: "AI Stylist Chat", emoji: "💬", color: "from-pink-600 to-rose-700" },
  { path: "/color-matcher", label: "Color Matcher", emoji: "🎨", color: "from-amber-500 to-orange-600" },
  { path: "/quiz", label: "Style Quiz", emoji: "🧩", color: "from-teal-500 to-cyan-600" },
  { path: "/wardrobe", label: "My Wardrobe", emoji: "👗", color: "from-indigo-500 to-blue-600" },
  { path: "/trends", label: "Fashion Trends", emoji: "🔥", color: "from-red-500 to-rose-600" },
];

const features = [
  { icon: "🧠", title: "AI Outfit Engine", desc: "Rule-based AI generates perfect Indian outfits for any occasion, weather, and mood." },
  { icon: "🎨", title: "Color AI Matcher", desc: "Color theory algorithm finds your perfect palette and complementary Indian combinations." },
  { icon: "💬", title: "AI Style Chatbot", desc: "Chat with your personal Desi fashion AI for advice, tips, and outfit ideas." },
  { icon: "👗", title: "Virtual Wardrobe", desc: "Organize your Indian clothes and let AI suggest outfits from what you already own." },
  { icon: "📊", title: "Style DNA Quiz", desc: "Discover your Indian fashion personality — from Khadi Minimalist to Royal Luxury." },
  { icon: "🌟", title: "Fashion Trends", desc: "Stay ahead with curated Indian trend reports and AI-enhanced style guides." },
];

export default function Home() {
  const dailyTip = getDailyTip();

  return (
    <div className="page-bg min-h-screen">
      {/* Decorative blobs */}
      <div className="fixed top-20 left-10 w-96 h-96 rounded-full opacity-10 bg-primary blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-80 h-80 rounded-full opacity-10 bg-accent blur-3xl pointer-events-none" />

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="tag-badge mb-6 inline-flex">
              <Sparkles className="w-3 h-3" />
              भारतीय AI Fashion Intelligence
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              Your Personal{" "}
              <span className="gradient-text">AI Fashion</span>{" "}
              Stylist
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              StyleGenie blends Indian color theory, weather intelligence, and mood analysis to curate ethnic and fusion outfits — from kurta-pyjama to Banarasi silk — that make you look extraordinary every day.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/generator" className="btn-primary flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" /> Start Styling
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/quiz" className="btn-gold flex items-center gap-2 text-sm">
                <Star className="w-4 h-4" /> Discover Your Style
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> 10 AI Modules</div>
              <div className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-accent" /> 500+ Indian Outfits</div>
              <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> Desi Color AI</div>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-pulse-glow">
              <img src={heroFashion} alt="AI Fashion Stylist" className="w-full h-[480px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card rounded-2xl p-4">
                  <p className="text-xs text-muted-foreground mb-1">💡 Daily Style Tip</p>
                  <p className="text-sm font-medium text-foreground">{dailyTip}</p>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 animate-float">
              <p className="text-xs text-muted-foreground">AI Confidence</p>
              <p className="text-2xl font-bold gradient-text">97%</p>
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 animate-float-delay">
              <p className="text-xs text-muted-foreground">Outfits Generated</p>
              <p className="text-2xl font-bold gradient-gold-text">∞</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profession Themes */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4">👔 Dress for Your Profession</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-3">Style by Profession</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Every profession has its own style language. Find your identity — powered by Indian fashion intelligence.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {professionThemes.map((p, i) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.profession}
                to="/generator"
                className={`glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300 animate-fade-in-up relative overflow-hidden`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Background gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1 text-foreground">{p.profession}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    Generate outfit <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center mb-10 gradient-text">Explore StyleGenie</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`glass-card rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 group animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                {link.emoji}
              </div>
              <p className="text-sm font-medium text-foreground">{link.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Outfit showcase */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl font-bold gradient-text">Indian Outfit Inspirations</h2>
          <Link to="/generator" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
            Generate yours <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { img: outfitCasual, label: "Desi Casual Street", badge: "Summer 2025" },
            { img: outfitFormal, label: "Corporate Kurta Look", badge: "Professional" },
            { img: outfitDate, label: "Romantic Ethnic Date", badge: "Evening" },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute top-3 right-3 tag-gold text-xs">{item.badge}</div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-lg">{item.label}</h3>
                <Link to="/generator" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
                  Generate similar <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center mb-4 gradient-text">Powered by Desi Fashion AI</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Six intelligent modules working together to make you look and feel authentically Indian and extraordinary.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto pb-24">
        <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl font-black mb-4">Ready to Elevate Your Desi Style?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Let AI generate your perfect Indian outfit in seconds — from casual cotton kurta to festive sherwani — tailored to your mood, weather, and occasion.</p>
            <Link to="/generator" className="btn-primary inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Generate My Outfit Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
