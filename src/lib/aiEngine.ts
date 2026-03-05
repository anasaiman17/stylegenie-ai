// ============================================================
// StyleGenie AI Engine — Rule-based + weighted recommendation
// ============================================================

export interface OutfitInput {
  gender: string;
  occasion: string;
  weather: string;
  mood: string;
  colorPreference: string;
  bodyType: string;
}

export interface OutfitSuggestion {
  id: string;
  title: string;
  top: string;
  bottom: string;
  footwear: string;
  accessory: string;
  outerLayer?: string;
  styleNote: string;
  confidenceScore: number;
  tags: string[];
  image?: string;
}

export interface ColorMatch {
  color: string;
  matches: string[];
  complementary: string[];
  analogous: string[];
  neutrals: string[];
  tips: string[];
  palette: string[];
}

export interface WardrobeItem {
  id: string;
  type: string;
  name: string;
  color: string;
  addedAt: string;
}

export interface OutfitHistoryItem extends OutfitSuggestion {
  input: OutfitInput;
  generatedAt: string;
  rating?: number;
}

// ── Outfit database (India edition) ─────────────────────────
const outfitDatabase: Record<string, Record<string, Record<string, Partial<OutfitSuggestion>[]>>> = {
  male: {
    casual: {
      hot: [
        { top: "White kurta (short/half-sleeve linen)", bottom: "Cotton pyjama or dhoti pants", footwear: "Kolhapuri chappals", accessory: "Rudraksha bracelet + canvas jhola bag", styleNote: "Breezy Indian casual — light kora cotton or linen kurta keeps you cool and rooted in culture.", tags: ["Desi Casual", "Summer", "Ethnic Minimal"] },
        { top: "Printed half-sleeve kurta (block print)", bottom: "Slim cotton trousers", footwear: "White mojaris or canvas sneakers", accessory: "Wooden bead bracelet + sunglasses", styleNote: "Block-print kurtas are India's answer to the graphic tee — bold, artisanal, and effortlessly cool.", tags: ["Artisanal", "Desi Streetwear", "Bold"] },
      ],
      cold: [
        { top: "Woolen Nehru jacket over full-sleeve kurta", bottom: "Churidar or straight-cut pants", footwear: "Brown leather juttis", accessory: "Pashmina muffler + silver kada", outerLayer: "Handloom wool shawl (Himachali/Kashmiri)", styleNote: "Layer a handloom shawl over a Nehru jacket for a look that's warm, sophisticated, and deeply Indian.", tags: ["Layered", "Winter Ethnic", "Classic"] },
        { top: "Bandhgala or Prince coat kurta", bottom: "Churidar pants", footwear: "Classic leather juttis", accessory: "Gold cufflinks + pocket square", outerLayer: "Woolen Nehru jacket", styleNote: "The Bandhgala is India's most powerful formal silhouette — timeless and commanding.", tags: ["Formal", "Power", "Royal"] },
      ],
      rainy: [
        { top: "Dark indigo kurta (cotton)", bottom: "Dark cotton trousers", footwear: "Waterproof rubber sandals (kolhapuri style)", accessory: "Compact umbrella + cloth jhola", styleNote: "Monsoon dressing: dark indigo hides rain marks. Opt for pre-washed cotton that looks better with water.", tags: ["Monsoon Ready", "Smart Casual", "Desi"] },
      ],
    },
    office: {
      hot: [
        { top: "Light blue formal kurta or cotton bandhgala shirt", bottom: "Tailored cotton trousers (cream/grey)", footwear: "Brown leather oxfords or juttis", accessory: "Leather belt + minimalist watch", styleNote: "Indian corporate dressing is evolving — a formal kurta with tailored trousers is modern, rooted, and professional.", tags: ["Corporate", "Smart", "Indo-Western"] },
      ],
      cold: [
        { top: "Formal white kurta + Nehru collar shirt", bottom: "Charcoal suit trousers", footwear: "Black leather oxfords", accessory: "Silk pocket square + cufflinks", outerLayer: "Fitted Nehru jacket (charcoal/navy)", styleNote: "A Nehru jacket over a formal kurta is the ultimate Indian power suit — wear it with confidence.", tags: ["Formal", "Executive", "Desi Power"] },
      ],
      rainy: [
        { top: "Navy formal kurta (quick-dry cotton)", bottom: "Dark navy cotton trousers", footwear: "Waterproof leather oxfords", accessory: "Slim analog watch + compact umbrella", outerLayer: "Navy cotton bandhgala jacket", styleNote: "Navy is the monsoon office champion — dark enough to hide splashes, formal enough to command respect.", tags: ["Professional", "Monsoon-Ready", "Polished"] },
      ],
    },
    party: {
      hot: [
        { top: "Silk kurta (jewel-tone: royal blue/emerald)", bottom: "Churidar or straight-cut salwar", footwear: "Embroidered golden juttis", accessory: "Gold chain + statement ring", styleNote: "A jewel-tone silk kurta is India's party armour — you'll look like royalty without trying.", tags: ["Festive", "Royal", "Bold"] },
      ],
      cold: [
        { top: "Sherwani (dark: navy/black/burgundy)", bottom: "Churidar pants", footwear: "Embellished mojaris or formal juttis", accessory: "Brooch + maala or gold chain", outerLayer: "Embroidered stole", styleNote: "A Sherwani in a deep tone is India's equivalent of the black tuxedo — unbeatable at any celebration.", tags: ["Festive", "Royal", "Celebration"] },
      ],
      rainy: [
        { top: "Embroidered kurta (dark colors)", bottom: "Dark straight-cut pants", footwear: "Classic leather juttis", accessory: "Stole + watch", styleNote: "Dark embroidered kurtas are magic in the monsoon — the richness of the fabric shines even on grey evenings.", tags: ["Monsoon Festive", "Embroidered", "Statement"] },
      ],
    },
    date: {
      hot: [
        { top: "Pastel linen kurta (blush/mint/sky blue)", bottom: "Slim white cotton trousers", footwear: "Clean mojaris or white sneakers", accessory: "Simple silver bracelet + light cologne", styleNote: "Pastels communicate softness and thoughtfulness — perfect for making a great first impression on a date.", tags: ["Romantic", "Soft", "Indo-Western Date"] },
      ],
      cold: [
        { top: "Maroon/wine kurta with subtle embroidery", bottom: "Dark churidar", footwear: "Suede brown juttis", accessory: "Silver kada bracelet", styleNote: "Maroon and wine tones are India's most romantic hues — warm, deep, and inviting.", tags: ["Romantic", "Ethnic Chic", "Intimate"] },
      ],
      rainy: [
        { top: "Dark teal/midnight blue kurta", bottom: "Dark slim trousers", footwear: "Leather juttis", accessory: "Delicate silver jewelry", outerLayer: "Shawl or stole", styleNote: "Monsoon dates call for deep jewel tones — teal and midnight blue look stunning in soft evening light.", tags: ["Mysterious", "Romantic", "Monsoon Magic"] },
      ],
    },
    travel: {
      hot: [
        { top: "Breathable cotton kurta (light colors)", bottom: "Cotton dhoti pants or pajamas", footwear: "Kolhapuri chappals or sports sandals", accessory: "Cloth jhola + compact sunglasses", styleNote: "The classic kurta-pajama is India's OG travel outfit — comfortable for trains, temples, and everything in between.", tags: ["Travel India", "Comfortable", "Desi Explorer"] },
      ],
      cold: [
        { top: "Warm kurta + thermal inner", bottom: "Heavy cotton churidar or cargo pants", footwear: "Woolen closed shoes or boots", accessory: "Woolen muffler + backpack", outerLayer: "Himachali woolen jacket or quilted jacket", styleNote: "Travelling to hill stations? Layer a traditional Himachali jacket for warmth with a touch of local culture.", tags: ["Hill Station", "Adventure", "Layered Desi"] },
      ],
      rainy: [
        { top: "Quick-dry cotton kurta", bottom: "Cotton trousers (dark)", footwear: "Waterproof chappals or rubber sandals", accessory: "Waterproof backpack + umbrella", outerLayer: "Packable rain poncho", styleNote: "Monsoon travel in India is an adventure — embrace it with quick-dry fabrics and your best umbrella.", tags: ["Monsoon Travel", "Practical", "India Adventure"] },
      ],
    },
  },
  female: {
    casual: {
      hot: [
        { top: "Cotton kurti (block-print / Jaipur print)", bottom: "Palazzo pants or cotton leggings", footwear: "Flat Kolhapuri chappals or juttis", accessory: "Jhumka earrings + cotton dupatta", styleNote: "A cotton kurti with palazzo pants is the quintessential Indian summer look — effortless, elegant, and breathable.", tags: ["Desi Casual", "Summer", "Block Print"] },
        { top: "Sleeveless Anarkali kurta (short)", bottom: "Churidar leggings", footwear: "Embroidered flats", accessory: "Statement jhumkas + potli bag", styleNote: "A short Anarkali kurta has the flowy elegance of a dress with the comfort of separates.", tags: ["Festive Casual", "Feminine", "Indian Chic"] },
      ],
      cold: [
        { top: "Kashmiri phiran or embroidered wool kurta", bottom: "Churidar or straight-cut salwar", footwear: "Embroidered woolen juttis", accessory: "Pashmina stole + layered necklace", outerLayer: "Woolen Himachali shawl", styleNote: "The Kashmiri phiran wraps you in warmth and artistry — each embroidery stitch tells a story.", tags: ["Kashmiri Chic", "Winter", "Artisanal"] },
        { top: "Fitted long kurta (heavy cotton/jacquard)", bottom: "Slim churidar + tights", footwear: "Block-heel juttis", accessory: "Bandhani dupatta + silver jhumkas", outerLayer: "Fitted blazer (contemporary fusion)", styleNote: "Fusion dressing: a traditional kurta with a modern blazer is India's most versatile cold-weather combo.", tags: ["Fusion", "Smart Casual", "Contemporary Indian"] },
      ],
      rainy: [
        { top: "Short kurti (dark indigo/deep green)", bottom: "Dark churidar or palazzos", footwear: "Rubber chappals or waterproof flats", accessory: "Compact umbrella + small potli", outerLayer: "Lightweight rain jacket", styleNote: "Monsoon kurtis should be short and dark — pair with waterproof footwear and a cheerful umbrella.", tags: ["Monsoon Ready", "Practical Desi", "Colorful"] },
      ],
    },
    office: {
      hot: [
        { top: "Formal cotton/silk kurti (solid or subtle print)", bottom: "Straight-cut trousers or tailored salwar", footwear: "Block heels or pointed-toe flats", accessory: "Pearl jhumkas + structured tote", styleNote: "The silk kurti with tailored trousers is India's answer to the Western power suit — elegant and commanding.", tags: ["Corporate India", "Power Dressing", "Polished"] },
      ],
      cold: [
        { top: "Jacquard or brocade kurti + fitted blazer", bottom: "Pencil-cut churidar or trousers", footwear: "Block-heel pumps", accessory: "Statement necklace + leather folder", styleNote: "A brocade kurti with a blazer is the ultimate Indian corporate look — boardroom-ready with cultural pride.", tags: ["Executive", "Fusion Power", "Classic"] },
      ],
      rainy: [
        { top: "Solid silk kurti (dark tones)", bottom: "Wide-leg cotton trousers", footwear: "Waterproof block-heel boots", accessory: "Gold chain bag + dupatta", outerLayer: "Structured overcoat", styleNote: "Arrive at the office looking impeccable despite the rain — silk kurtis in dark tones are weather warriors.", tags: ["Work-Ready", "Monsoon Chic", "Polished"] },
      ],
    },
    party: {
      hot: [
        { top: "Embroidered crop top (choli style) with mirror work", bottom: "Flared lehenga skirt (georgette/net)", footwear: "Strappy heels or embellished sandals", accessory: "Chandbali earrings + clutch potli bag", styleNote: "A mirror-work lehenga set makes you the star of any summer celebration — shimmer is your birthright!", tags: ["Festive Glam", "Lehenga", "Statement"] },
      ],
      cold: [
        { top: "Heavy silk saree (Banarasi/Kanjeevaram) OR velvet lehenga", bottom: "Built-in / petticoat", footwear: "Embroidered heels or juttis", accessory: "Temple jewelry set + potli bag", outerLayer: "Embroidered shawl or regal stole", styleNote: "A Banarasi silk saree or velvet lehenga is Indian luxury at its finest — wear it like the royalty you are.", tags: ["Royal", "Festive", "Luxury Indian"] },
      ],
      rainy: [
        { top: "Tissue or georgette saree (dark jewel tones)", bottom: "Saree petticoat", footwear: "Block-heel sandals (waterproof friendly)", accessory: "Gold jhumkas + elegant potli", outerLayer: "Embroidered cape blouse", styleNote: "A georgette saree in deep jewel tones is monsoon magic — light fabric that flows beautifully in the rain.", tags: ["Monsoon Saree", "Festive", "Elegant"] },
      ],
    },
    date: {
      hot: [
        { top: "Floral anarkali kurta (pastel/rose/mint)", bottom: "Built-in flared bottom", footwear: "Embroidered block-heel sandals", accessory: "Gold jhumkas + dainty bracelet", styleNote: "A floral Anarkali is pure romance — the flared silhouette moves beautifully and photographs like a dream.", tags: ["Romantic", "Feminine", "Date Night Desi"] },
      ],
      cold: [
        { top: "Pastel cashmere or woolen kurti (blush/lavender)", bottom: "Satin palazzo or churidar", footwear: "Suede block-heel juttis", accessory: "Delicate gold jewelry + small potli", styleNote: "Blush and lavender in soft fabrics is pure Indian romance — warm, gentle, and unforgettable.", tags: ["Romantic", "Cozy Desi", "Intimate"] },
      ],
      rainy: [
        { top: "Silk kurta (midnight blue/teal)", bottom: "Wide-leg palazzo (matching)", footwear: "Block-heel chappals", accessory: "Delicate silver jewelry + stole", styleNote: "Monsoon dates under umbrellas are magical — deep teal or midnight blue silk looks stunning in the rain.", tags: ["Monsoon Romance", "Elegant", "Deep Tones"] },
      ],
    },
    travel: {
      hot: [
        { top: "Cotton co-ord kurti-palazzo set", bottom: "Matching cotton palazzo", footwear: "Kolhapuri chappals or flats", accessory: "Straw tote + sunglasses + bandana dupatta", styleNote: "A cotton co-ord set is India's most versatile travel outfit — wear it from temples to cafes without a second thought.", tags: ["Travel India", "Comfortable", "Desi Traveller"] },
      ],
      cold: [
        { top: "Warm kurti + thermal inner", bottom: "Churidar with woolen socks", footwear: "Closed-toe embroidered boots", accessory: "Pashmina shawl + backpack", outerLayer: "Woolen Himachali jacket or down coat", styleNote: "Hill-station travel demands warmth — a Pashmina shawl doubles as a blanket on cold night buses.", tags: ["Hill Station", "Warm", "Mountain Desi"] },
      ],
      rainy: [
        { top: "Quick-dry cotton kurti (dark colors)", bottom: "Dark leggings or churidar", footwear: "Waterproof rubber flats", accessory: "Waterproof tote + compact umbrella", outerLayer: "Bright packable rain jacket", styleNote: "Embrace the Indian monsoon in quick-dry cotton — travel light and let the rain be your adventure.", tags: ["Monsoon Travel", "Practical", "India Explorer"] },
      ],
    },
  },
};

// ── Mood color mapping (India palette) ────────────────────────
const moodColorMap: Record<string, { palette: string[]; note: string }> = {
  confident: { palette: ["Maroon", "Royal Blue", "Deep Emerald", "Zari Gold"], note: "India's power colors — maroon and royal blue project authority and confidence." },
  chill: { palette: ["Khadi white", "Earthy terracotta", "Sage green", "Indigo"], note: "Natural, earthy Indic tones — the palette of handloom and calm mornings." },
  romantic: { palette: ["Rose pink", "Coral", "Champagne gold", "Peacock blue"], note: "Indian romance lives in rose, peacock blue, and gold — soft yet vibrant." },
  elegant: { palette: ["Ivory silk", "Champagne", "Midnight blue", "Emerald green"], note: "The colors of Banarasi silk and Kanjeevaram — timeless, regal, deeply Indian." },
};

// ── Body type styling notes ────────────────────────────────────
const bodyTypeNotes: Record<string, string> = {
  slim: "Layering and structured pieces add dimension to slim frames. Horizontal patterns and wide-leg cuts create beautiful proportion.",
  athletic: "You can pull off almost anything! Fitted pieces show off your physique. Avoid overly baggy clothes that hide your natural shape.",
  curvy: "Empire waists, wrap styles, and A-line silhouettes celebrate curves beautifully. Monochrome outfits create elegant elongation.",
  petite: "Vertical lines and monochromatic outfits elongate your frame. High-waisted bottoms and cropped tops are your secret weapons.",
  tall: "You can rock oversized and flowy pieces that shorter frames struggle with. Wide-leg trousers and maxi lengths look stunning on you.",
  plus: "Empire lines, wrap dresses, and structured blazers are universally flattering. Quality fabrics drape beautifully on fuller figures.",
};

// ── Main recommendation engine ─────────────────────────────────
export function generateOutfit(input: OutfitInput): OutfitSuggestion {
  const gender = input.gender.toLowerCase();
  const occasion = input.occasion.toLowerCase();
  const weather = input.weather.toLowerCase();

  const genderData = outfitDatabase[gender] || outfitDatabase.female;
  const occasionData = genderData[occasion] || genderData.casual;
  const weatherOptions = occasionData[weather] || occasionData.hot || [];

  let base: Partial<OutfitSuggestion>;
  if (weatherOptions.length > 0) {
    base = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
  } else {
    base = {
      top: "Classic fitted top",
      bottom: "Well-fitted trousers",
      footwear: "Clean sneakers",
      accessory: "Minimalist watch",
      styleNote: "Clean and classic always works.",
      tags: ["Classic", "Versatile"],
    };
  }

  const moodInfo = moodColorMap[input.mood?.toLowerCase()] || moodColorMap.confident;
  const bodyNote = bodyTypeNotes[input.bodyType?.toLowerCase()] || "";

  const colorHint = input.colorPreference
    ? ` Incorporate ${input.colorPreference} tones for your color preference.`
    : "";

  const confidenceScore = Math.floor(Math.random() * 15) + 85;

  return {
    id: `outfit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: `${capitalise(occasion)} ${capitalise(weather)}-Weather Look`,
    top: base.top || "Stylish top",
    bottom: base.bottom || "Matching bottom",
    footwear: base.footwear || "Appropriate footwear",
    accessory: base.accessory || "Simple accessories",
    outerLayer: base.outerLayer,
    styleNote: (base.styleNote || "") + colorHint + (bodyNote ? ` ${bodyNote}` : "") + ` Mood palette: ${moodInfo.palette.join(", ")} — ${moodInfo.note}`,
    confidenceScore,
    tags: base.tags || ["Stylish"],
  };
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Color matching AI ─────────────────────────────────────────
const colorTheory: Record<string, Omit<ColorMatch, "color">> = {
  black: {
    matches: ["White", "Gold", "Silver", "Red", "Camel"],
    complementary: ["White", "Ivory", "Cream"],
    analogous: ["Charcoal", "Dark grey", "Navy"],
    neutrals: ["White", "Grey", "Beige"],
    tips: ["Black is the ultimate neutral — it pairs with literally everything.", "Use black as a base and add one bold accent color.", "Mix textures in black (velvet + matte) for sophisticated monochrome looks."],
    palette: ["#000000", "#1a1a1a", "#333333", "#4d4d4d", "#FFFFFF"],
  },
  white: {
    matches: ["Navy", "Black", "Pastels", "Earth tones", "Gold"],
    complementary: ["Black", "Dark navy"],
    analogous: ["Ivory", "Cream", "Off-white"],
    neutrals: ["Beige", "Grey", "Camel"],
    tips: ["All-white outfits exude luxury when you play with textures.", "White + camel is a timeless, sophisticated combination.", "Add a pop of color through accessories to elevate all-white."],
    palette: ["#FFFFFF", "#F5F5F0", "#E8E8E0", "#D0D0C8", "#B8B8B0"],
  },
  navy: {
    matches: ["White", "Gold", "Camel", "Burgundy", "Light grey"],
    complementary: ["Orange", "Gold", "Camel"],
    analogous: ["Royal blue", "Midnight blue", "Teal"],
    neutrals: ["White", "Light grey", "Beige"],
    tips: ["Navy and gold is a classic luxury pairing.", "Navy works as well as black but feels fresher and more dynamic.", "Pair navy with white stripes for a nautical-chic look."],
    palette: ["#001F5B", "#002D7A", "#003D9C", "#1A5276", "#2E86AB"],
  },
  red: {
    matches: ["Black", "White", "Navy", "Gold", "Denim blue"],
    complementary: ["Green (emerald)", "Teal"],
    analogous: ["Burgundy", "Coral", "Tomato red"],
    neutrals: ["Black", "White", "Grey"],
    tips: ["Red is the most powerful statement color — let it be the hero piece.", "Red + black is timeless drama.", "Use red in small doses (bag, shoes) for versatility."],
    palette: ["#C0392B", "#E74C3C", "#E91E63", "#C62828", "#B71C1C"],
  },
  blue: {
    matches: ["White", "Navy", "Grey", "Brown", "Gold"],
    complementary: ["Orange", "Coral", "Peach"],
    analogous: ["Teal", "Navy", "Sky blue"],
    neutrals: ["White", "Grey", "Beige"],
    tips: ["Blue denim is the most versatile piece in any wardrobe.", "Cobalt blue is a bold statement that photographs beautifully.", "Light blue + white creates a classic, clean look."],
    palette: ["#1976D2", "#2196F3", "#42A5F5", "#64B5F6", "#90CAF9"],
  },
  green: {
    matches: ["Camel", "Brown", "Cream", "White", "Gold"],
    complementary: ["Red", "Burgundy", "Pink"],
    analogous: ["Olive", "Emerald", "Sage", "Forest green"],
    neutrals: ["Cream", "Beige", "Tan"],
    tips: ["Emerald green is having a major fashion moment — wear it head-to-toe for impact.", "Sage green pairs beautifully with natural textures like linen and cotton.", "Olive green and camel is an earthy, sophisticated combination."],
    palette: ["#1B5E20", "#2E7D32", "#388E3C", "#66BB6A", "#A5D6A7"],
  },
  pink: {
    matches: ["White", "Black", "Navy", "Gold", "Nude"],
    complementary: ["Green (sage)", "Olive"],
    analogous: ["Blush", "Rose", "Coral", "Mauve"],
    neutrals: ["White", "Cream", "Nude"],
    tips: ["Hot pink makes a bold, confident statement — own it.", "Blush pink is the most versatile and romantic neutral.", "Barbiecore: all-pink with varying shades is a powerful trend."],
    palette: ["#E91E63", "#F06292", "#F48FB1", "#FFCDD2", "#FCE4EC"],
  },
  beige: {
    matches: ["Brown", "White", "Camel", "Olive", "Rust"],
    complementary: ["Navy", "Deep burgundy"],
    analogous: ["Cream", "Sand", "Tan", "Camel"],
    neutrals: ["White", "Cream", "Light grey"],
    tips: ["Tonal beige outfits (same family, different shades) are effortlessly chic.", "Beige + brown leather accessories is the quintessential quiet luxury look.", "Add interest to beige with texture — knit, suede, linen."],
    palette: ["#F5F0E8", "#EDE0C4", "#D5B99C", "#C4A882", "#B8956A"],
  },
};

export function getColorMatches(colorInput: string): ColorMatch {
  const key = colorInput.toLowerCase().trim();
  const found = Object.keys(colorTheory).find(c => key.includes(c) || c.includes(key));

  if (found) {
    return { color: colorInput, ...colorTheory[found] };
  }

  // Fallback for unknown colors
  return {
    color: colorInput,
    matches: ["Black", "White", "Navy", "Grey", "Beige"],
    complementary: ["Opposite hue on the color wheel"],
    analogous: ["Adjacent hues — 30° apart on the color wheel"],
    neutrals: ["Black", "White", "Grey", "Beige"],
    tips: [
      `${colorInput} pairs beautifully with neutrals as a starting point.`,
      "When in doubt, black + white + your color = classic and foolproof.",
      "Use your color as the hero piece and build around neutrals.",
    ],
    palette: ["#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6", "#1F2937"],
  };
}

// ── Chatbot AI ────────────────────────────────────────────────
interface ChatResponse {
  message: string;
  outfit?: Partial<OutfitSuggestion>;
}

const chatPatterns: Array<{ patterns: string[]; response: () => ChatResponse }> = [
  {
    patterns: ["date", "romantic", "dinner"],
    response: () => ({
      message: "💕 For an Indian date night, go for something that blends elegance with a hint of tradition. Here's my top pick:",
      outfit: { top: "Silk kurta (wine/teal) or embroidered blouse", bottom: "Churidar or palazzo (matching)", footwear: "Embellished juttis or block heels", accessory: "Jhumkas/silver chain + signature ittar perfume", styleNote: "Deep jewel tones like wine, teal, or royal blue in silk fabrics photograph beautifully and feel luxuriously Indian." },
    }),
  },
  {
    patterns: ["winter", "cold", "freezing", "snow", "hill station"],
    response: () => ({
      message: "🧥 Indian winter dressing is about warmth with cultural grace! Here's a cozy-chic Desi formula:",
      outfit: { top: "Woolen kurta or bandhgala top", bottom: "Churidar with warm tights", footwear: "Embroidered closed-toe juttis or leather shoes", accessory: "Pashmina/Kashmiri stole + silver kada", outerLayer: "Himachali woolen jacket or long shawl" },
    }),
  },
  {
    patterns: ["summer", "hot", "beach", "heat", "goa"],
    response: () => ({
      message: "☀️ Indian summer style is about staying cool while looking effortlessly desi-chic:",
      outfit: { top: "Linen kurta or cotton kurti (block-print)", bottom: "Palazzos or cotton churidar", footwear: "Kolhapuri chappals or flat juttis", accessory: "Dupattas as headwrap + woven jute bag + sunglasses" },
    }),
  },
  {
    patterns: ["office", "work", "professional", "business", "meeting"],
    response: () => ({
      message: "💼 Indian corporate dressing: where tradition meets professionalism. Here's your power formula:",
      outfit: { top: "Formal silk/cotton kurti or bandhgala kurta", bottom: "Tailored straight-cut trousers or churidar", footwear: "Block heels or leather oxfords", accessory: "Structured bag + pearl/minimalist jewelry", outerLayer: "Nehru jacket or fitted blazer" },
    }),
  },
  {
    patterns: ["party", "shaadi", "wedding", "celebrate", "festival", "diwali"],
    response: () => ({
      message: "🎉 Indian parties and festivals call for celebration dressing! Go bold, go ethnic:",
      outfit: { top: "Embroidered kurta or silk saree blouse / lehenga choli", bottom: "Churidar or lehenga skirt / saree", footwear: "Embellished heels or golden juttis", accessory: "Chandbali earrings + gold set + potli bag", styleNote: "Pick one standout piece — a Banarasi dupatta or mirror-work blouse — and let it be the hero." },
    }),
  },
  {
    patterns: ["kurta", "salwar", "saree", "lehenga", "sherwani"],
    response: () => ({
      message: "🇮🇳 Classic Indian ethnic wear — here's how to style it perfectly:",
      outfit: { top: "Embroidered or printed kurta/kurti", bottom: "Churidar, palazzo, or straight-cut salwar", footwear: "Juttis, mojaris, or block heels", accessory: "Dupatta + jhumkas + bangle set", styleNote: "The secret to great Indian dressing: always invest in a well-stitched, well-fitted piece over a cheap heavily-embellished one." },
    }),
  },
  {
    patterns: ["casual", "weekend", "chill", "relax", "lazy"],
    response: () => ({
      message: "😎 Indian casual chic — comfort and culture, no compromises:",
      outfit: { top: "Cotton half-sleeve kurta (solid or subtle print)", bottom: "Pyjama trousers or slim cotton pants", footwear: "Kolhapuri chappals or canvas sneakers", accessory: "Wooden bracelet + jhola bag", styleNote: "A well-fitted cotton kurta-pajama is India's answer to the 'jeans + tee' — effortlessly cool and deeply rooted." },
    }),
  },
  {
    patterns: ["rain", "rainy", "monsoon", "wet", "umbrella"],
    response: () => ({
      message: "🌧️ Indian monsoon fashion is a whole vibe! Embrace it with style:",
      outfit: { top: "Dark indigo or deep green kurta (pre-washed cotton)", bottom: "Short churidar or dark trousers", footwear: "Rubber Kolhapuri-style chappals or waterproof flats", accessory: "Transparent or bright umbrella + waterproof tote", outerLayer: "Lightweight rain poncho or trench coat" },
    }),
  },
  {
    patterns: ["travel", "train", "trip", "vacation", "pilgrimage"],
    response: () => ({
      message: "✈️🚂 Indian travel style: comfortable, practical, and culturally adaptable:",
      outfit: { top: "Soft cotton kurta (light colors)", bottom: "Cotton pyjama or palazzos", footwear: "Kolhapuri chappals (easy to slip off at temples!)", accessory: "Jhola bag + portable charger + small dupatta", outerLayer: "Pashmina stole (doubles as blanket on trains/buses)" },
    }),
  },
  {
    patterns: ["minimize", "minimalist", "simple", "clean"],
    response: () => ({
      message: "✨ Indian minimalism — the beauty of handloom and restraint:",
      outfit: { top: "Perfect white khadi kurta or plain cotton kurti", bottom: "Straight white or off-white trousers", footwear: "Plain leather mojaris or clean flats", accessory: "One quality piece — silver kada or thin gold chain", styleNote: "Khadi minimalism is India's quiet luxury. A crisp white kurta in natural fabric says more than any embellishment." },
    }),
  },
  {
    patterns: ["streetwear", "street", "hype", "urban", "cool", "desi street"],
    response: () => ({
      message: "🔥 Desi streetwear is India's freshest fashion movement — bold, cultural, fearless:",
      outfit: { top: "Oversized band tee OR printed half-kurta", bottom: "Baggy cargo pants or wide denim", footwear: "Chunky sneakers or traditional mojaris (unexpected flex!)", accessory: "Silver chain + cap + crossbody bag", styleNote: "Mix a jutti with cargo pants or a printed kurta with joggers — that's Desi street code." },
    }),
  },
  {
    patterns: ["color", "colours", "palette", "match"],
    response: () => ({
      message: "🎨 Indian color combinations to know:\n\n🟡 **Saffron + White** — pure power\n💙 **Peacock Blue + Gold** — royal elegance\n❤️ **Maroon + Cream** — festive classic\n🌿 **Olive + Terracotta** — earthy Rajasthani chic\n💗 **Rose + Champagne** — soft romance\n\nIndian fashion golden rule: zari/gold accessories elevate ANY color combination!" }),
  },
  {
    patterns: ["tip", "advice", "fashion", "help", "style"],
    response: () => ({
      message: getRandomFashionTip(),
    }),
  },
];

export function getChatbotResponse(message: string): ChatResponse {
  const lower = message.toLowerCase();

  for (const pattern of chatPatterns) {
    if (pattern.patterns.some(p => lower.includes(p))) {
      return pattern.response();
    }
  }

  return {
    message: `Great question! Here's a universal style tip: ${getRandomFashionTip()} What specific look are you going for? Try asking about: date night, office wear, winter/summer outfits, party looks, or specific items like "black jeans"!`,
  };
}

// ── Fashion tips ──────────────────────────────────────────────
const fashionTips = [
  "✨ Invest in fit above all else — a well-stitched ₹500 kurta beats a poorly-fitted ₹5000 one every time.",
  "🎨 Build your Indian wardrobe around 3 neutral kurtis and 2 statement dupattas — endless combinations.",
  "👟 Your chappals and juttis make or break an ethnic look. One great pair of Kolhapuris elevates everything.",
  "📐 The 80/20 rule: 80% classic Indian basics (kurta-pajama, simple saris), 20% statement festive pieces.",
  "🧴 Great grooming + confident posture complete any outfit. Fashion is 50% clothing, 50% how you carry it.",
  "♻️ India's handloom heritage is fashion's best-kept secret — Khadi, Ikat, Chanderi never go out of style.",
  "🌈 Tonal Indian looks (ivory on ivory, navy on navy) are effortlessly sophisticated and very in vogue.",
  "👜 A beautiful potli bag or jute jhola instantly transforms even the simplest kurta into a complete look.",
  "📏 Anarkali silhouettes are universally flattering — the flared skirt celebrates every body type beautifully.",
  "🌟 Indian fashion secret: a good dupatta can transform an ordinary kurta into a festival outfit.",
  "🎭 Zari borders, mirror work, and chikankari embroidery are India's answer to high fashion — wear them proudly.",
  "💡 When buying a new Indian outfit, ask: can I style this with 3 things I already own?",
  "🪷 Ittar (Indian perfume) is the ultimate accessory — a signature scent elevates any outfit from great to unforgettable.",
  "🏺 Terracotta, indigo, and saffron are India's power colors — rooted, bold, and globally admired.",
];

export function getRandomFashionTip(): string {
  return fashionTips[Math.floor(Math.random() * fashionTips.length)];
}

// ── Daily tip (changes by day) ────────────────────────────────
export function getDailyTip(): string {
  const dayIndex = new Date().getDate() % fashionTips.length;
  return fashionTips[dayIndex];
}

// ── Style quiz engine ─────────────────────────────────────────
export interface QuizQuestion {
  id: number;
  question: string;
  emoji: string;
  options: Array<{ label: string; value: string; style: string }>;
}

export interface QuizResult {
  style: string;
  description: string;
  icon: string;
  pieces: string[];
  celebrities: string[];
  color: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Your ideal Sunday outfit for going out is...",
    emoji: "🛍️",
    options: [
      { label: "Plain white kurta + well-fitted cotton trousers", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Printed half-sleeve kurta + cargo pants + sneakers", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Embroidered kurta + formal trousers + juttis", value: "luxury", style: "bg-amber-900/50" },
      { label: "Soft cotton kurta-pyjama + chappals", value: "casual", style: "bg-blue-900/50" },
    ],
  },
  {
    id: 2,
    question: "Your go-to Indian color palette is...",
    emoji: "🎨",
    options: [
      { label: "White, off-white, ivory, soft grey", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Bold saffron, electric blue, neon accents", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Emerald, maroon, deep navy, champagne gold", value: "luxury", style: "bg-amber-900/50" },
      { label: "Whatever fits and feels comfortable", value: "casual", style: "bg-blue-900/50" },
    ],
  },
  {
    id: 3,
    question: "Your bag of choice for a day out is...",
    emoji: "👜",
    options: [
      { label: "Minimal leather tote or small potli bag", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Crossbody sling bag or graffiti-print jhola", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Embroidered clutch or structured leather bag", value: "luxury", style: "bg-amber-900/50" },
      { label: "Whatever fits my aadhaar card and phone", value: "casual", style: "bg-blue-900/50" },
    ],
  },
  {
    id: 4,
    question: "Your dream wardrobe contains...",
    emoji: "👗",
    options: [
      { label: "10 perfect Khadi pieces in neutral tones", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Rare streetwear drops + bold printed kurtas", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Handloom Banarasi silk + bespoke sherwanis", value: "luxury", style: "bg-amber-900/50" },
      { label: "Lots of soft comfortable kurtas and pyjamas", value: "casual", style: "bg-blue-900/50" },
    ],
  },
  {
    id: 5,
    question: "Your Indian fashion icon is...",
    emoji: "⭐",
    options: [
      { label: "Sabyasachi's minimalist bride / Rajkummar Rao", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Ranveer Singh / Doja Cat India tour", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Deepika Padukone / Virat's sherwani looks", value: "luxury", style: "bg-amber-900/50" },
      { label: "No icon — I wear what makes me happy", value: "casual", style: "bg-blue-900/50" },
    ],
  },
];

const quizResults: Record<string, QuizResult> = {
  minimalist: {
    style: "Khadi Minimalist",
    description: "You embody India's quiet luxury — the elegance of handloom, natural fibers, and restraint. Your wardrobe is a curated capsule of perfect-fitting Khadi and cotton pieces. You understand that a crisp white kurta in natural fabric speaks louder than any embellishment.",
    icon: "◻️",
    pieces: ["Perfect-fit white khadi kurta", "Straight cotton trousers", "Plain leather mojaris", "One silver kada", "Minimal potli bag"],
    celebrities: ["Rajkummar Rao (ethnic looks)", "Sabyasachi minimal bride", "Anushka Sharma casual", "Khadi minimalism aesthetic"],
    color: "from-slate-800 to-slate-600",
  },
  streetwear: {
    style: "Desi Streetwear",
    description: "You live and breathe Desi culture. Your outfit is a statement — mixing jutti with cargo, printed kurta with joggers, or a dhoti with sneakers. You're reshaping Indian fashion, one unexpected combo at a time.",
    icon: "🔥",
    pieces: ["Bold printed half-kurta", "Cargo or baggy trousers", "Chunky sneakers or mojaris (unexpected!)", "Silver chain + cap", "Graffiti jhola bag"],
    celebrities: ["Ranveer Singh", "Badshah", "Diljit Dosanjh street looks", "Desi hypebeast aesthetic"],
    color: "from-orange-900 to-red-800",
  },
  luxury: {
    style: "Royal Indian Luxury",
    description: "You invest in heritage and it shows. Handloom Banarasi, bespoke Sherwani, Kanjeevaram silk — you choose quality over quantity and timeless over trendy. You understand the power of a well-crafted Indian garment.",
    icon: "👑",
    pieces: ["Embroidered silk kurta or sherwani", "Premium Kanjeevaram or Banarasi piece", "Embellished mojaris or classic leather shoes", "Chandbali or gold jewelry set", "Artisanal potli bag"],
    celebrities: ["Deepika Padukone (ethnic)", "Virat Kohli sherwani", "Sabyasachi designs", "Ritu Kumar aesthetic"],
    color: "from-amber-900 to-yellow-800",
  },
  casual: {
    style: "Desi Casual Cool",
    description: "Life's too short for itchy fabrics! You've mastered the art of looking pulled-together without trying too hard. A well-fitted cotton kurta-pyjama and chappals is your uniform — and honestly, you make it look effortlessly cool.",
    icon: "😎",
    pieces: ["Soft cotton kurta (solid color)", "Comfortable pyjama or palazzos", "Kolhapuri chappals", "Simple cotton dupatta", "Small jhola bag"],
    celebrities: ["Aamir Khan casual looks", "Taapsee Pannu off-duty", "Irrfan Khan everyday style", "Panchayat vibes aesthetic"],
    color: "from-blue-900 to-indigo-800",
  },
};

export function calculateQuizResult(answers: Record<number, string>): QuizResult {
  const counts: Record<string, number> = { minimalist: 0, streetwear: 0, luxury: 0, casual: 0 };
  Object.values(answers).forEach(v => { if (counts[v] !== undefined) counts[v]++; });
  const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  return quizResults[winner];
}

// ── Wardrobe AI ───────────────────────────────────────────────
export function suggestFromWardrobe(items: WardrobeItem[]): string[] {
  if (items.length === 0) return ["Add items to your wardrobe to get personalized suggestions!"];

  const tops = items.filter(i => ["shirt", "top", "blouse", "sweater", "tshirt", "t-shirt"].includes(i.type.toLowerCase()));
  const bottoms = items.filter(i => ["pants", "jeans", "skirt", "trousers", "shorts"].includes(i.type.toLowerCase()));
  const shoes = items.filter(i => ["shoes", "sneakers", "boots", "heels", "sandals"].includes(i.type.toLowerCase()));

  const suggestions: string[] = [];

  tops.forEach(top => {
    bottoms.forEach(bottom => {
      const shoe = shoes[Math.floor(Math.random() * Math.max(shoes.length, 1))];
      const shoeText = shoe ? ` + ${shoe.color} ${shoe.name}` : "";
      suggestions.push(`${top.color} ${top.name} + ${bottom.color} ${bottom.name}${shoeText}`);
    });
  });

  if (suggestions.length === 0) {
    return items.map(item => `Style your ${item.color} ${item.name} with neutral basics.`);
  }

  return suggestions.slice(0, 6);
}

// ── History storage ───────────────────────────────────────────
const HISTORY_KEY = "stylegenie_history";
const WARDROBE_KEY = "stylegenie_wardrobe";

export function saveToHistory(item: OutfitHistoryItem) {
  const history = getHistory();
  history.unshift(item);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}

export function getHistory(): OutfitHistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function updateRating(id: string, rating: number) {
  const history = getHistory();
  const idx = history.findIndex(h => h.id === id);
  if (idx !== -1) {
    history[idx].rating = rating;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}

export function getWardrobe(): WardrobeItem[] {
  try {
    return JSON.parse(localStorage.getItem(WARDROBE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToWardrobe(item: Omit<WardrobeItem, "id" | "addedAt">): WardrobeItem {
  const wardrobe = getWardrobe();
  const newItem: WardrobeItem = {
    ...item,
    id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    addedAt: new Date().toISOString(),
  };
  wardrobe.push(newItem);
  localStorage.setItem(WARDROBE_KEY, JSON.stringify(wardrobe));
  return newItem;
}

export function removeFromWardrobe(id: string) {
  const wardrobe = getWardrobe().filter(i => i.id !== id);
  localStorage.setItem(WARDROBE_KEY, JSON.stringify(wardrobe));
}
