import React from "react";

interface MannequinProps {
  top?: { label: string; color?: string };
  bottom?: { label: string; color?: string };
  shoes?: { label: string; color?: string };
  outer?: { label: string; color?: string };
  accessory?: { label: string; color?: string };
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

function toHex(colorStr?: string): string {
  if (!colorStr) return "transparent";
  const map: Record<string, string> = {
    black: "#1a1a1a", white: "#f5f5f0", navy: "#1b2a5e", red: "#c0392b",
    blue: "#1976d2", green: "#2e7d32", pink: "#e91e8c", beige: "#d5b99c",
    burgundy: "#7b1f3a", olive: "#6d7c2b", grey: "#757575", gray: "#757575",
    camel: "#c4a882", brown: "#795548", cream: "#fdf6e3", yellow: "#f9c74f",
    orange: "#e65100", purple: "#6a0dad", teal: "#00796b", maroon: "#800000",
    gold: "#d4a017", "royal blue": "#4169e1", "peacock blue": "#005f6b",
    saffron: "#ff7722", "zari gold": "#d4a017", "khadi white": "#f5f0e4",
    "dark green": "#1b5e20", lavender: "#b57bee", mustard: "#e3a50a",
    ivory: "#fffff0", charcoal: "#333333", indigo: "#3f51b5",
  };
  const key = colorStr.toLowerCase().trim();
  return map[key] || "#6b7280";
}

function luminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function textColor(bg: string): string {
  return luminance(bg) > 0.45 ? "#111" : "#fff";
}

export default function Mannequin({
  top, bottom, shoes, outer, accessory,
  size = "md", animate = true, className = "",
}: MannequinProps) {
  const sizeMap = { sm: 160, md: 220, lg: 300 };
  const w = sizeMap[size];
  const h = Math.round(w * 2.4);

  const topColor = toHex(top?.color);
  const bottomColor = toHex(bottom?.color);
  const shoesColor = toHex(shoes?.color);
  const outerColor = toHex(outer?.color);
  const skinColor = "#d4a574";
  const hairColor = "#2c1810";

  const hasOuter = outer && outer.label && outer.label !== "None";

  // Scale all coords by w/100
  const s = (n: number) => (n / 100) * w;
  const sh = (n: number) => (n / 240) * h;

  return (
    <div
      className={`flex flex-col items-center gap-2 ${animate ? "animate-float" : ""} ${className}`}
      style={{ width: w }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 100 240`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* ── Hair ── */}
        <ellipse cx="50" cy="16" rx="14" ry="16" fill={hairColor} />
        <rect x="36" y="16" width="28" height="8" fill={hairColor} />

        {/* ── Head ── */}
        <ellipse cx="50" cy="24" rx="13" ry="14" fill={skinColor} />

        {/* ── Neck ── */}
        <rect x="46" y="36" width="8" height="7" fill={skinColor} />

        {/* ── Outer layer (jacket/shawl) drawn first behind body ── */}
        {hasOuter && (
          <path
            d={`M28 44 Q50 40 72 44 L76 95 Q70 98 50 99 Q30 98 24 95 Z`}
            fill={outerColor}
            opacity="0.92"
          />
        )}

        {/* ── Torso / Top ── */}
        <path
          d={`M35 43 Q50 40 65 43 L70 90 Q60 93 50 93 Q40 93 30 90 Z`}
          fill={top ? topColor : "hsl(220 15% 25%)"}
        />

        {/* ── Shoulders & Arms ── */}
        {/* Left arm */}
        <path
          d={`M35 45 Q22 55 20 80 Q22 85 26 84 Q28 65 37 55 Z`}
          fill={hasOuter ? outerColor : (top ? topColor : "hsl(220 15% 25%)")}
        />
        {/* Right arm */}
        <path
          d={`M65 45 Q78 55 80 80 Q78 85 74 84 Q72 65 63 55 Z`}
          fill={hasOuter ? outerColor : (top ? topColor : "hsl(220 15% 25%)")}
        />

        {/* ── Hands ── */}
        <ellipse cx="23" cy="86" rx="4" ry="5" fill={skinColor} />
        <ellipse cx="77" cy="86" rx="4" ry="5" fill={skinColor} />

        {/* ── Bottom / Kurta / Saree drape ── */}
        <path
          d={`M30 90 Q50 93 70 90 L73 160 Q61 165 50 165 Q39 165 27 160 Z`}
          fill={bottom ? bottomColor : "hsl(220 20% 20%)"}
        />

        {/* Saree/dupatta accent drape if accessory */}
        {accessory && (
          <path
            d={`M30 90 Q38 120 28 160 Q32 162 36 158 Q42 120 38 90 Z`}
            fill={toHex(accessory?.color || "gold")}
            opacity="0.55"
          />
        )}

        {/* ── Legs ── */}
        <rect x="36" y="160" width="12" height="55" rx="4" fill={bottom ? bottomColor : "hsl(220 20% 20%)"} />
        <rect x="52" y="160" width="12" height="55" rx="4" fill={bottom ? bottomColor : "hsl(220 20% 20%)"} />

        {/* ── Shoes / Footwear ── */}
        <ellipse cx="42" cy="217" rx="10" ry="5" fill={shoes ? shoesColor : "#3a3a3a"} />
        <ellipse cx="58" cy="217" rx="10" ry="5" fill={shoes ? shoesColor : "#3a3a3a"} />

        {/* ── Face details ── */}
        {/* Eyes */}
        <circle cx="46" cy="22" r="1.5" fill="#2c1810" />
        <circle cx="54" cy="22" r="1.5" fill="#2c1810" />
        {/* Eye whites */}
        <circle cx="46" cy="22" r="2" fill="white" opacity="0.3" />
        <circle cx="54" cy="22" r="2" fill="white" opacity="0.3" />
        {/* Nose */}
        <ellipse cx="50" cy="26" rx="1.2" ry="1" fill={skinColor} stroke="#b8835a" strokeWidth="0.4" />
        {/* Smile */}
        <path d="M47 29 Q50 31.5 53 29" stroke="#b8835a" strokeWidth="0.7" fill="none" strokeLinecap="round" />

        {/* ── Bindi (Indian touch) ── */}
        <circle cx="50" cy="17.5" r="1.2" fill="#c0392b" />

        {/* ── Outfit labels on mannequin ── */}
        {top && (
          <foreignObject x="30" y="58" width="40" height="18">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                fontSize: "4.5px",
                fontWeight: 700,
                color: textColor(topColor !== "transparent" ? topColor : "#333"),
                textAlign: "center",
                lineHeight: "1.1",
                wordBreak: "break-word",
                padding: "1px",
              }}
            >
              {top.label.length > 18 ? top.label.slice(0, 18) + "…" : top.label}
            </div>
          </foreignObject>
        )}

        {bottom && (
          <foreignObject x="30" y="118" width="40" height="18">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                fontSize: "4.5px",
                fontWeight: 700,
                color: textColor(bottomColor !== "transparent" ? bottomColor : "#333"),
                textAlign: "center",
                lineHeight: "1.1",
                wordBreak: "break-word",
              }}
            >
              {bottom.label.length > 18 ? bottom.label.slice(0, 18) + "…" : bottom.label}
            </div>
          </foreignObject>
        )}
      </svg>

      {/* Legend pills */}
      <div className="flex flex-wrap justify-center gap-1 mt-1 px-1" style={{ maxWidth: w }}>
        {[
          hasOuter ? { label: outer!.label, color: outerColor, prefix: "🧥" } : null,
          top ? { label: top.label, color: topColor, prefix: "👕" } : null,
          bottom ? { label: bottom.label, color: bottomColor, prefix: "👖" } : null,
          shoes ? { label: shoes.label, color: shoesColor, prefix: "👟" } : null,
          accessory ? { label: accessory.label, color: toHex(accessory?.color), prefix: "✨" } : null,
        ]
          .filter(Boolean)
          .map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border border-border/50"
              style={{
                backgroundColor: item!.color !== "transparent" ? item!.color + "33" : undefined,
                color: "hsl(var(--foreground))",
                maxWidth: "100%",
              }}
            >
              {item!.prefix}{" "}
              <span className="truncate" style={{ maxWidth: 60 }}>
                {item!.label}
              </span>
            </span>
          ))}
      </div>
    </div>
  );
}
