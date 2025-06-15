
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const ColorPalette = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const primaryColors = [
    { name: "Primary Blue", hex: "#1e40af", rgb: "30, 64, 175", usage: "Primary brand color, headers, CTAs" },
    { name: "Primary Orange", hex: "#ea580c", rgb: "234, 88, 12", usage: "Accent color, highlights, interactive elements" },
  ];

  const secondaryColors = [
    { name: "Dark Blue", hex: "#1e3a8a", rgb: "30, 58, 138", usage: "Text, navigation, dark themes" },
    { name: "Light Blue", hex: "#3b82f6", rgb: "59, 130, 246", usage: "Hover states, light accents" },
    { name: "Light Orange", hex: "#fb923c", rgb: "251, 146, 60", usage: "Subtle highlights, backgrounds" },
    { name: "Warm Orange", hex: "#fed7aa", rgb: "254, 215, 170", usage: "Very light backgrounds, tints" },
  ];

  const neutralColors = [
    { name: "Charcoal", hex: "#1f2937", rgb: "31, 41, 55", usage: "Primary text, headings" },
    { name: "Slate", hex: "#64748b", rgb: "100, 116, 139", usage: "Secondary text, captions" },
    { name: "Light Gray", hex: "#f1f5f9", rgb: "241, 245, 249", usage: "Backgrounds, dividers" },
    { name: "White", hex: "#ffffff", rgb: "255, 255, 255", usage: "Cards, primary backgrounds" },
  ];

  const ColorCard = ({ colors, title }: { colors: any[], title: string }) => (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-slate-800">{title}</h3>
      <div className="grid gap-4">
        {colors.map((color, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-xl shadow-inner border-2 border-white"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{color.name}</h4>
                <p className="text-sm text-slate-500 mb-2">{color.usage}</p>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => copyToClipboard(color.hex)}
                    className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    {copiedColor === color.hex ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="font-mono">{color.hex}</span>
                  </button>
                  <span className="text-sm text-slate-400 font-mono">RGB {color.rgb}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Color Palette</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Our color palette reflects trust, professionalism, and warmth. 
          The primary blue conveys reliability while the orange adds energy and approachability.
        </p>
      </div>

      {/* Brand Colors Showcase */}
      <Card className="p-8 bg-gradient-to-r from-blue-800 to-orange-500 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Brand Color Combination</h3>
        <p className="text-blue-100 mb-6">The perfect balance of trust and energy</p>
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-2" />
            <p className="text-sm">Professional Blue</p>
            <p className="text-xs text-blue-200">#1e40af</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-2" />
            <p className="text-sm">Vibrant Orange</p>
            <p className="text-xs text-orange-200">#ea580c</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <ColorCard colors={primaryColors} title="Primary Colors" />
        <ColorCard colors={secondaryColors} title="Secondary Colors" />
        <ColorCard colors={neutralColors} title="Neutral Colors" />
      </div>

      {/* Color Applications */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Digital Applications</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span>Website Headers</span>
              <Badge style={{ backgroundColor: "#1e40af", color: "white" }}>Primary Blue</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span>Call-to-Action Buttons</span>
              <Badge style={{ backgroundColor: "#ea580c", color: "white" }}>Primary Orange</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Body Text</span>
              <Badge variant="outline">Charcoal</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Print Applications</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span>Business Cards</span>
              <Badge style={{ backgroundColor: "#1e40af", color: "white" }}>Primary Blue</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span>Report Highlights</span>
              <Badge style={{ backgroundColor: "#ea580c", color: "white" }}>Primary Orange</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Document Text</span>
              <Badge variant="outline">Charcoal</Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ColorPalette;
