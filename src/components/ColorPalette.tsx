
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

  const brandColors = [
    { name: "Primary Blue", hex: "#0b487b", rgb: "11, 72, 123", usage: "Primary brand color, headers, CTAs" },
    { name: "Secondary Blue", hex: "#2c9bd6", rgb: "44, 155, 214", usage: "Secondary brand color, accents, links" },
  ];

  const supportingColors = [
    { name: "Success Green", hex: "#10b981", rgb: "16, 185, 129", usage: "Success states, confirmations, positive feedback" },
    { name: "Warning Orange", hex: "#f59e0b", rgb: "245, 158, 11", usage: "Warning states, cautions, important notices" },
    { name: "Error Red", hex: "#ef4444", rgb: "239, 68, 68", usage: "Error states, urgent alerts, critical issues" },
    { name: "Info Blue", hex: "#3b82f6", rgb: "59, 130, 246", usage: "Information states, tips, neutral notifications" },
  ];

  const neutralColors = [
    { name: "Charcoal", hex: "#262626", rgb: "38, 38, 38", usage: "Primary text, headings" },
    { name: "Dark Gray", hex: "#595959", rgb: "89, 89, 89", usage: "Secondary text, subheadings" },
    { name: "Medium Gray", hex: "#8c8c8c", rgb: "140, 140, 140", usage: "Placeholder text, captions" },
    { name: "Light Gray", hex: "#d9d9d9", rgb: "217, 217, 217", usage: "Borders, dividers" },
    { name: "Pale Gray", hex: "#f5f5f5", rgb: "245, 245, 245", usage: "Backgrounds, cards" },
    { name: "White", hex: "#ffffff", rgb: "255, 255, 255", usage: "Primary backgrounds, cards" },
  ];

  const textColors = [
    { name: "Primary Text", hex: "#262626", rgb: "38, 38, 38", usage: "Main content, headlines" },
    { name: "Secondary Text", hex: "#595959", rgb: "89, 89, 89", usage: "Subtext, descriptions" },
    { name: "Muted Text", hex: "#8c8c8c", rgb: "140, 140, 140", usage: "Captions, metadata" },
    { name: "Link Text", hex: "#2c9bd6", rgb: "44, 155, 214", usage: "Links, interactive text" },
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
          Our color palette reflects trust, professionalism, and reliability. 
          The primary blue conveys stability while the secondary blue adds clarity and approachability.
        </p>
      </div>

      {/* Brand Colors Showcase */}
      <Card className="p-8 text-white text-center" style={{ background: "linear-gradient(135deg, #0b487b 0%, #2c9bd6 100%)" }}>
        <h3 className="text-3xl font-bold mb-4">Brand Color Combination</h3>
        <p className="text-blue-100 mb-6">The perfect balance of trust and clarity</p>
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-2" style={{ backgroundColor: "#0b487b" }} />
            <p className="text-sm">Primary Blue</p>
            <p className="text-xs text-blue-200">#0b487b</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-2" style={{ backgroundColor: "#2c9bd6" }} />
            <p className="text-sm">Secondary Blue</p>
            <p className="text-xs text-blue-200">#2c9bd6</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <ColorCard colors={brandColors} title="Brand Colors" />
        <ColorCard colors={supportingColors} title="Feedback Colors (Semantic)" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <ColorCard colors={neutralColors} title="Neutral Colors" />
        <ColorCard colors={textColors} title="Text Colors" />
      </div>

      {/* Color Applications */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Digital Applications</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgba(11, 72, 123, 0.1)" }}>
              <span>Website Headers</span>
              <Badge style={{ backgroundColor: "#0b487b", color: "white" }}>Primary Blue</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgba(44, 155, 214, 0.1)" }}>
              <span>Links & CTAs</span>
              <Badge style={{ backgroundColor: "#2c9bd6", color: "white" }}>Secondary Blue</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Body Text</span>
              <Badge variant="outline">Charcoal</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Feedback States</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}>
              <span>✅ Success Messages</span>
              <Badge style={{ backgroundColor: "#10b981", color: "white" }}>Success Green</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}>
              <span>⚠️ Warning Alerts</span>
              <Badge style={{ backgroundColor: "#f59e0b", color: "white" }}>Warning Orange</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
              <span>❌ Error States</span>
              <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>Error Red</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
              <span>ℹ️ Info Notices</span>
              <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>Info Blue</Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ColorPalette;
