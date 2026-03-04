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

// ── Outfit database ──────────────────────────────────────────
const outfitDatabase: Record<string, Record<string, Record<string, Partial<OutfitSuggestion>[]>>> = {
  male: {
    casual: {
      hot: [
        { top: "White linen shirt (short sleeve)", bottom: "Slim chino shorts", footwear: "White canvas sneakers", accessory: "Silver watch + sunglasses", styleNote: "Keep it breezy! Light fabrics in neutral tones are your best friend on hot days.", tags: ["Summer", "Minimal", "Effortless"] },
        { top: "Graphic tee (oversized)", bottom: "Cargo shorts", footwear: "Chunky sneakers", accessory: "Cap + crossbody bag", styleNote: "Streetwear meets comfort — perfect for city exploring in the heat.", tags: ["Streetwear", "Urban", "Bold"] },
      ],
      cold: [
        { top: "Turtleneck knit sweater", bottom: "Dark slim jeans", footwear: "Chelsea boots", accessory: "Woolen scarf + leather gloves", outerLayer: "Wool overcoat", styleNote: "Layering is the art of cold-weather fashion. Your overcoat is the statement piece.", tags: ["Classic", "Sophisticated", "Winter"] },
        { top: "Flannel shirt over thermal", bottom: "Straight-leg jeans", footwear: "Leather boots", accessory: "Beanie + leather wallet chain", outerLayer: "Puffer jacket", styleNote: "Rugged and warm — the lumberjack aesthetic elevated.", tags: ["Rugged", "Casual", "Cozy"] },
      ],
      rainy: [
        { top: "Merino wool crewneck", bottom: "Dark trousers", footwear: "Waterproof ankle boots", accessory: "Minimalist watch", outerLayer: "Trench coat", styleNote: "Trench coats are timeless rain warriors — functional and impossibly stylish.", tags: ["Smart-Casual", "Rainy Day", "Classic"] },
      ],
    },
    office: {
      hot: [
        { top: "Light blue Oxford shirt (slim fit)", bottom: "Tailored grey trousers", footwear: "Brown derby shoes", accessory: "Leather belt + pocket square", styleNote: "Cool tones and breathable fabrics keep you sharp without overheating.", tags: ["Business", "Smart", "Professional"] },
      ],
      cold: [
        { top: "White dress shirt + tie", bottom: "Charcoal suit trousers", footwear: "Black Oxford shoes", accessory: "Silk tie + cufflinks", outerLayer: "Fitted blazer", styleNote: "The power suit — timeless authority in charcoal and white.", tags: ["Formal", "Power", "Executive"] },
      ],
      rainy: [
        { top: "Navy dress shirt", bottom: "Dark navy suit trousers", footwear: "Waterproof leather Oxfords", accessory: "Slim tie + umbrella", outerLayer: "Double-breasted wool blazer", styleNote: "Navy is the most forgiving office color — it repels rain stains and commands respect.", tags: ["Professional", "Rain-Ready", "Polished"] },
      ],
    },
    party: {
      hot: [
        { top: "Silk button-down (floral/print)", bottom: "White slim chinos", footwear: "Loafers (no socks)", accessory: "Gold chain necklace + rings", styleNote: "Resort-party chic — the confident host aesthetic.", tags: ["Party", "Bold", "Summer Vibes"] },
      ],
      cold: [
        { top: "Black turtleneck", bottom: "Tailored black trousers", footwear: "Chelsea boots", accessory: "Minimalist silver jewelry", styleNote: "All-black with varying textures is an infallible party formula.", tags: ["Chic", "Sleek", "Night Out"] },
      ],
      rainy: [
        { top: "Velvet blazer over dark shirt", bottom: "Dark fitted trousers", footwear: "Leather Chelsea boots", accessory: "Pocket square + watch", styleNote: "Velvet absorbs light and adds luxury — perfect for arriving in style despite the rain.", tags: ["Luxury", "Party", "Statement"] },
      ],
    },
    date: {
      hot: [
        { top: "Fitted linen shirt (pastel)", bottom: "Slim chinos (beige)", footwear: "Clean white sneakers or loafers", accessory: "Simple watch + subtle cologne", styleNote: "Soft pastels signal approachability and thoughtfulness — perfect first impression.", tags: ["Romantic", "Fresh", "Date Night"] },
      ],
      cold: [
        { top: "Burgundy knit sweater", bottom: "Dark skinny jeans", footwear: "Suede Chelsea boots", accessory: "Simple silver chain", styleNote: "Burgundy is the most romantic cold-weather color — warm, deep, inviting.", tags: ["Romantic", "Cozy", "Intimate"] },
      ],
      rainy: [
        { top: "Dark fitted shirt", bottom: "Black slim jeans", footwear: "Clean leather boots", accessory: "Leather watch", outerLayer: "Sleek trench coat", styleNote: "There's nothing more romantic than arriving perfectly dressed despite the rain.", tags: ["Mysterious", "Romantic", "Stylish"] },
      ],
    },
    travel: {
      hot: [
        { top: "Moisture-wicking polo", bottom: "Zip-off convertible pants", footwear: "Trail running sneakers", accessory: "Packable daypack + sunglasses", styleNote: "Smart adventurer — comfort without sacrificing a clean look.", tags: ["Travel", "Functional", "Explorer"] },
      ],
      cold: [
        { top: "Base layer thermal top", bottom: "Fleece-lined tech pants", footwear: "Insulated hiking boots", accessory: "Packable down jacket + gloves", outerLayer: "Waterproof shell jacket", styleNote: "Layer up, adventure awaits. The 3-layer system keeps you warm on any journey.", tags: ["Adventure", "Layered", "Winter Travel"] },
      ],
      rainy: [
        { top: "Quick-dry long-sleeve shirt", bottom: "Waterproof tech pants", footwear: "Waterproof trail shoes", accessory: "Compact umbrella + waterproof backpack", outerLayer: "Packable rain jacket", styleNote: "Rain-proof travel kit — be prepared for anything.", tags: ["Travel", "Rain-Ready", "Practical"] },
      ],
    },
  },
  female: {
    casual: {
      hot: [
        { top: "Flowy crop top (cotton)", bottom: "High-waist linen wide-leg pants", footwear: "Strappy sandals", accessory: "Layered gold necklaces + woven bag", styleNote: "Breezy and effortlessly chic — the perfect summer casual.", tags: ["Summer", "Boho", "Effortless"] },
        { top: "Oversized graphic tee (tied at waist)", bottom: "Mini denim skirt", footwear: "Platform sneakers", accessory: "Hoop earrings + mini backpack", styleNote: "90s revival done right — bold, playful, and totally Instagrammable.", tags: ["Streetwear", "Y2K", "Fun"] },
      ],
      cold: [
        { top: "Chunky turtleneck sweater (cream)", bottom: "Plaid mini skirt + sheer tights", footwear: "Knee-high boots", accessory: "Wool beret + structured bag", styleNote: "Academia meets cozy — intellectual elegance for cold days.", tags: ["Dark Academia", "Cozy", "Chic"] },
        { top: "Fitted ribbed long-sleeve", bottom: "Straight-leg corduroy pants", footwear: "Platform loafers", accessory: "Crossbody bag + layered rings", outerLayer: "Oversized blazer", styleNote: "Cozy-chic: the oversized blazer is the most versatile cold-weather piece.", tags: ["Smart Casual", "Layered", "Trendy"] },
      ],
      rainy: [
        { top: "Fitted turtleneck", bottom: "Mom jeans", footwear: "Colorful rain boots", accessory: "Transparent umbrella + cute bucket hat", outerLayer: "Trench coat", styleNote: "Rainy days are secretly the best fashion opportunities — a great trench is iconic.", tags: ["Rainy Chic", "Classic", "Colorful"] },
      ],
    },
    office: {
      hot: [
        { top: "Silk blouse (light blue/white)", bottom: "High-waist tailored trousers", footwear: "Pointed-toe heels (nude)", accessory: "Pearl earrings + structured tote", styleNote: "Polished power — silk blouse with tailored trousers is unbeatable office elegance.", tags: ["Corporate", "Polished", "Power"] },
      ],
      cold: [
        { top: "Fitted blazer + blouse", bottom: "Pencil skirt + sheer tights", footwear: "Block-heel pumps", accessory: "Statement necklace + leather folder", styleNote: "The pencil skirt and blazer combo is timeless executive authority.", tags: ["Executive", "Power Dressing", "Classic"] },
      ],
      rainy: [
        { top: "Monochrome blouse", bottom: "Wide-leg trousers (dark)", footwear: "Waterproof ankle boots with heel", accessory: "Gold chain bag", outerLayer: "Belted trench coat", styleNote: "Arrive in style — a belted trench over monochrome is sophisticated in any weather.", tags: ["Work-Ready", "Sophisticated", "Polished"] },
      ],
    },
    party: {
      hot: [
        { top: "Halter neck bodysuit (metallic)", bottom: "Mini skirt (sequin/satin)", footwear: "Strappy heels (silver/gold)", accessory: "Clutch bag + statement earrings", styleNote: "Be the room — metallic and shimmer are non-negotiable for summer parties.", tags: ["Glamour", "Sparkle", "Night Out"] },
      ],
      cold: [
        { top: "Off-shoulder velvet dress (deep red/emerald)", bottom: "Built-in", footwear: "Strappy heels + sheer tights", accessory: "Diamond tennis bracelet + evening clutch", styleNote: "Velvet is winter glamour royalty — a deep jewel tone will turn every head.", tags: ["Luxury", "Glamour", "Festive"] },
      ],
      rainy: [
        { top: "Slip dress (satin) + fitted turtleneck underneath", bottom: "Built-in", footwear: "Ankle boots with heel", accessory: "Statement earrings + compact umbrella", outerLayer: "Faux fur stole", styleNote: "Layering a slip dress over a turtleneck is peak 90s-luxe — timeless and weather-proof.", tags: ["Chic", "Layered", "Luxe"] },
      ],
    },
    date: {
      hot: [
        { top: "Floral wrap dress", bottom: "Built-in", footwear: "Block-heel sandals", accessory: "Gold hoops + woven clutch", styleNote: "Wrap dresses are universally flattering and effortlessly romantic — perfect for any date.", tags: ["Romantic", "Feminine", "Summer Love"] },
      ],
      cold: [
        { top: "Fitted cashmere sweater (blush/dusty rose)", bottom: "Satin midi skirt", footwear: "Knee-high suede boots", accessory: "Delicate gold jewelry + small evening bag", styleNote: "Blush + satin is pure romance — soft, luxurious, and deeply memorable.", tags: ["Romantic", "Luxury", "Intimate"] },
      ],
      rainy: [
        { top: "Silk blouse (soft colors)", bottom: "Wide-leg satin trousers", footwear: "Block-heel ankle boots", accessory: "Delicate jewelry", outerLayer: "Belted wrap coat (camel)", styleNote: "A camel wrap coat is the most romantic rainy-day layer — it photographs beautifully.", tags: ["Elegant", "Romantic", "Rainy Day"] },
      ],
    },
    travel: {
      hot: [
        { top: "Linen co-ord set top", bottom: "Linen wide-leg pants (matching)", footwear: "Espadrilles or sandals", accessory: "Straw hat + canvas tote + sunglasses", styleNote: "The linen co-ord is the ultimate travel outfit — effortless, stylish, and breathable.", tags: ["Travel", "Resort", "Effortless"] },
      ],
      cold: [
        { top: "Thermal base layer", bottom: "Insulated leggings", footwear: "Chunky snow-ready boots", accessory: "Faux fur earmuffs + backpack", outerLayer: "Long puffer coat", styleNote: "Fashion meets function — a long puffer coat is the travel winter essential.", tags: ["Winter Travel", "Warm", "Practical"] },
      ],
      rainy: [
        { top: "Quick-dry long-sleeve", bottom: "Waterproof joggers", footwear: "Colorful waterproof sneakers", accessory: "Mini backpack + rain hat", outerLayer: "Packable windbreaker (bright color)", styleNote: "Bright colors make rainy travel fun — don't let grey skies dull your outfit.", tags: ["Travel", "Colorful", "Adventure"] },
      ],
    },
  },
};

// ── Mood color mapping ─────────────────────────────────────────
const moodColorMap: Record<string, { palette: string[]; note: string }> = {
  confident: { palette: ["Black", "Red", "Deep Navy", "Burgundy"], note: "Bold, rich colors amplify your confidence and command attention." },
  chill: { palette: ["Earth tones", "Beige", "Sage green", "Dusty blue"], note: "Muted, earthy tones match your relaxed energy perfectly." },
  romantic: { palette: ["Blush pink", "Dusty rose", "Burgundy", "Champagne"], note: "Soft pinks and roses evoke romance and warmth." },
  elegant: { palette: ["Ivory", "Champagne", "Black", "Emerald"], note: "Jewel tones and neutrals are the language of understated elegance." },
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
      message: "💕 For a date night, I'd suggest something that makes you feel confident and a touch mysterious. Here's my top pick:",
      outfit: { top: "Silk blouse or fitted shirt", bottom: "Well-tailored trousers or midi skirt", footwear: "Heels or clean Chelsea boots", accessory: "Delicate jewelry + a signature scent", styleNote: "Opt for deep, warm tones like burgundy, dusty rose, or classic black. The key is fitting clothes that make you feel amazing." },
    }),
  },
  {
    patterns: ["winter", "cold", "freezing", "snow"],
    response: () => ({
      message: "🧥 Winter dressing is all about strategic layering! Here's a cozy-chic formula:",
      outfit: { top: "Chunky turtleneck or thermal base", bottom: "Dark slim jeans or tailored trousers", footwear: "Leather or suede Chelsea boots", accessory: "Cashmere scarf + leather gloves", outerLayer: "Wool coat or puffer jacket" },
    }),
  },
  {
    patterns: ["summer", "hot", "beach", "heat"],
    response: () => ({
      message: "☀️ Summer style is about staying cool while looking effortlessly stylish:",
      outfit: { top: "Linen shirt or flowy top", bottom: "Chino shorts or wide-leg linen pants", footwear: "Sandals or canvas sneakers", accessory: "Sunglasses + straw hat + woven bag" },
    }),
  },
  {
    patterns: ["office", "work", "professional", "business", "meeting"],
    response: () => ({
      message: "💼 Professional dressing is about projecting confidence and competence. Here's a power formula:",
      outfit: { top: "Crisp blouse or Oxford shirt", bottom: "Tailored trousers or pencil skirt", footwear: "Block heels or Oxford shoes", accessory: "Structured bag + minimal jewelry", outerLayer: "Fitted blazer" },
    }),
  },
  {
    patterns: ["party", "club", "night out", "celebrate"],
    response: () => ({
      message: "🎉 Time to shine! For a party, go bold and don't hold back:",
      outfit: { top: "Metallic or velvet statement top", bottom: "Mini skirt or fitted trousers", footwear: "Strappy heels or Chelsea boots", accessory: "Statement earrings + clutch bag", styleNote: "Pick one hero piece and build around it. You want people to remember one thing about your outfit." },
    }),
  },
  {
    patterns: ["black jeans", "black denim", "black pants"],
    response: () => ({
      message: "🖤 Black jeans are one of fashion's most versatile items! Here's how to style them:",
      outfit: { top: "Almost anything! White tee for casual, silk blouse for evening, band tee for edgy", footwear: "Chelsea boots, white sneakers, or heeled boots", accessory: "Belt + watch/jewelry to add polish" },
    }),
  },
  {
    patterns: ["casual", "weekend", "chill", "relax", "lazy"],
    response: () => ({
      message: "😎 Casual doesn't mean careless! Here's an effortlessly cool look:",
      outfit: { top: "Premium graphic tee or linen shirt", bottom: "Straight-leg jeans or joggers", footwear: "Clean white sneakers", accessory: "Watch + simple cap or beanie", styleNote: "Invest in one elevated basic (a great pair of jeans, clean white tee) and your casual looks will always be polished." },
    }),
  },
  {
    patterns: ["rain", "rainy", "wet", "umbrella"],
    response: () => ({
      message: "🌧️ Rainy days are secretly great style opportunities! Here's how to conquer them:",
      outfit: { top: "Fitted knit or long-sleeve", bottom: "Dark jeans or tailored trousers", footwear: "Waterproof boots or rain boots (make them fun!)", accessory: "Transparent umbrella + waterproof bag", outerLayer: "Trench coat — the ultimate rain-chic icon" },
    }),
  },
  {
    patterns: ["travel", "airport", "trip", "vacation"],
    response: () => ({
      message: "✈️ Travel style needs to be comfortable, stylish, and practical all at once:",
      outfit: { top: "Soft knit or moisture-wicking top", bottom: "Wide-leg trousers or leggings (not jeans!)", footwear: "Slip-on sneakers (easy at security)", accessory: "Neck pillow, portable charger, crossbody bag", outerLayer: "Oversized trench or denim jacket (doubles as a blanket)" },
    }),
  },
  {
    patterns: ["minimize", "minimalist", "simple", "clean"],
    response: () => ({
      message: "✨ Minimalism is the ultimate luxury. Here's the formula:",
      outfit: { top: "Perfect-fitting white or cream top", bottom: "Tailored black or navy trousers", footwear: "Clean leather sneakers or loafers", accessory: "One quality piece — a great watch or minimal gold jewelry", styleNote: "Buy less, choose better. Three perfectly fitting pieces beat ten mediocre ones." },
    }),
  },
  {
    patterns: ["streetwear", "street", "hype", "urban", "cool"],
    response: () => ({
      message: "🔥 Streetwear is all about attitude and proportion:",
      outfit: { top: "Graphic tee or hoodie (oversized)", bottom: "Cargo pants or baggy denim", footwear: "Chunky sneakers or high-tops", accessory: "Cap, chain necklace, crossbody bag", styleNote: "The key to streetwear is confidence. Own the oversized proportions." },
    }),
  },
  {
    patterns: ["color", "colours", "palette", "match"],
    response: () => ({
      message: "🎨 Great color combinations to know:\n\n🔷 **Navy + Gold** — classic luxury\n🤍 **White + Camel** — quiet sophistication\n🖤 **Black + Burgundy** — powerful elegance\n🌿 **Olive + Cream** — earthy chic\n💗 **Blush + Brown** — soft romance\n\nA golden rule: choose one statement color and build with neutrals around it!" }),
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
  "✨ Invest in fit above all else — a tailored $30 shirt beats an ill-fitting $300 one every time.",
  "🎨 Build your wardrobe around 3 neutrals and 2 accent colors for infinite outfit combinations.",
  "👟 Your shoes make or break an outfit. One great pair of shoes elevates everything.",
  "📐 The 80/20 rule: 80% basics, 20% statement pieces. Quality over quantity always.",
  "🧴 Grooming and posture complete any outfit. Fashion is 50% clothing, 50% how you carry it.",
  "♻️ Shop your own wardrobe first — you probably have more outfits than you think.",
  "🌈 Monochromatic outfits (one color, varied shades) are effortlessly sophisticated.",
  "👜 Accessories are the fastest, cheapest way to transform a basic outfit.",
  "📏 High-waisted bottoms elongate legs and define the waist on all body types.",
  "🌟 Wear what makes you feel like the best version of yourself. Confidence is the ultimate accessory.",
  "🎭 Dress for the job/life you want, not just where you currently are.",
  "💡 When shopping, ask: does this work with at least 3 things I already own?",
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
    question: "Your ideal Saturday outfit is...",
    emoji: "🛍️",
    options: [
      { label: "White tee + perfectly fitted jeans", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Graphic hoodie + cargo pants + sneakers", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Blazer + tailored trousers + loafers", value: "luxury", style: "bg-amber-900/50" },
      { label: "Comfy joggers + oversized tee + slides", value: "casual", style: "bg-blue-900/50" },
    ],
  },
  {
    id: 2,
    question: "Your go-to color palette is...",
    emoji: "🎨",
    options: [
      { label: "Black, white, grey, navy", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Bold colors, camo, neon accents", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Camel, ivory, forest green, burgundy", value: "luxury", style: "bg-amber-900/50" },
      { label: "Whatever's comfy and available", value: "casual", style: "bg-blue-900/50" },
    ],
  },
  {
    id: 3,
    question: "Your bag of choice is...",
    emoji: "👜",
    options: [
      { label: "Minimal leather tote or nothing at all", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Crossbody bag or backpack", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Structured leather handbag or briefcase", value: "luxury", style: "bg-amber-900/50" },
      { label: "Whatever fits my stuff", value: "casual", style: "bg-blue-900/50" },
    ],
  },
  {
    id: 4,
    question: "Your dream closet contains...",
    emoji: "👗",
    options: [
      { label: "10 perfect pieces, all in neutral tones", value: "minimalist", style: "bg-slate-700/50" },
      { label: "Rare sneakers, limited drops, graphic tees", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Quality over quantity — investment pieces", value: "luxury", style: "bg-amber-900/50" },
      { label: "Lots of comfortable basics", value: "casual", style: "bg-blue-900/50" },
    ],
  },
  {
    id: 5,
    question: "Your fashion icon is...",
    emoji: "⭐",
    options: [
      { label: "Steve Jobs / Zara Larsson", value: "minimalist", style: "bg-slate-700/50" },
      { label: "A$AP Rocky / Billie Eilish", value: "streetwear", style: "bg-orange-900/50" },
      { label: "Audrey Hepburn / Harry Styles", value: "luxury", style: "bg-amber-900/50" },
      { label: "No icon — I wear what I like", value: "casual", style: "bg-blue-900/50" },
    ],
  },
];

const quizResults: Record<string, QuizResult> = {
  minimalist: {
    style: "Minimalist",
    description: "You are the epitome of less is more. Your wardrobe is a carefully curated capsule — every piece earns its place. You understand that true luxury is simplicity, and your style exudes quiet confidence and refined taste.",
    icon: "◻️",
    pieces: ["Perfect-fit white tee", "Dark slim jeans", "Leather minimalist sneakers", "One quality watch", "Structured tote"],
    celebrities: ["Steve Jobs", "Zara Larsson", "Kanye (early era)", "The Row aesthetic"],
    color: "from-slate-800 to-slate-600",
  },
  streetwear: {
    style: "Streetwear",
    description: "You live and breathe culture. Your outfit is a statement, a reference, a conversation starter. You know your drops, your references, and your proportions. Fashion is self-expression and you take it seriously.",
    icon: "🔥",
    pieces: ["Graphic tee (vintage or collab)", "Cargo or baggy jeans", "Chunky sneakers", "Cap or bucket hat", "Chain necklace"],
    celebrities: ["A$AP Rocky", "Virgil Abloh", "Billie Eilish", "Travis Scott"],
    color: "from-orange-900 to-red-800",
  },
  luxury: {
    style: "Luxury",
    description: "You invest in quality and it shows. Your style is timeless rather than trendy, and you'd rather own three perfect pieces than thirty average ones. You understand craftsmanship, heritage, and the power of a well-tailored garment.",
    icon: "👑",
    pieces: ["Tailored blazer", "Premium cashmere sweater", "Quality leather shoes", "Structured handbag", "Classic trench coat"],
    celebrities: ["Harry Styles", "Audrey Hepburn", "Tom Ford era Gucci", "The Row"],
    color: "from-amber-900 to-yellow-800",
  },
  casual: {
    style: "Casual",
    description: "Life's too short for uncomfortable clothes! You've mastered the art of looking put-together without trying too hard. Your secret? Confidence and comfort are the most stylish combination. You prioritize living over looking.",
    icon: "😎",
    pieces: ["Soft oversized tee", "Comfortable jeans or joggers", "Versatile sneakers", "Simple hoodie", "Crossbody bag"],
    celebrities: ["Off-duty models", "Jennifer Aniston casual", "Hailey Bieber OOTD"],
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
