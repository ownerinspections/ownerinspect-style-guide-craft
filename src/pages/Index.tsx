
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import LogoSection from "@/components/LogoSection";
import ColorPalette from "@/components/ColorPalette";
import Typography from "@/components/Typography";
import Applications from "@/components/Applications";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-800 to-orange-500 bg-clip-text text-transparent mb-6">
              Owner Inspections
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-600 mb-8">
              Brand Guidelines
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              A comprehensive guide to maintaining consistency and excellence in the Owner Inspections brand identity across all touchpoints.
            </p>
            <div className="mt-8 flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Version 1.0 • 2024
              </Badge>
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Logo Section */}
        <LogoSection />

        <Separator className="my-16" />

        {/* Color Palette */}
        <ColorPalette />

        <Separator className="my-16" />

        {/* Typography */}
        <Typography />

        <Separator className="my-16" />

        {/* Brand Applications */}
        <Applications />

        {/* Footer */}
        <footer className="text-center py-16 text-slate-400">
          <p>© 2024 Owner Inspections Brand Guidelines</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
