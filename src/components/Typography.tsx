
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Typography = () => {
  const handleDownloadFont = (fontName: string, zipPath: string) => {
    const link = document.createElement('a');
    link.href = zipPath;
    link.download = `${fontName}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Degular Display, serif' }}>Typography</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
          Clean, professional typography that ensures excellent readability across all platforms and materials.
        </p>
      </div>

      {/* Font Families */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Degular Display, serif' }}>Primary Font</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-slate-800 font-inter">Inter</div>
            <p className="text-slate-600 font-inter">
              Inter is designed for optimal legibility and clarity, making it perfect for user interfaces and body text.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-green-800 mb-2 font-inter">✅ Use Inter for:</h4>
              <ul className="text-sm text-green-700 space-y-1 font-inter">
                <li>• Paragraphs / Body copy (e.g. about your services, inspection details)</li>
                <li>• Buttons & form inputs</li>
                <li>• Navigation menus</li>
                <li>• Labels & descriptions</li>
              </ul>
            </div>
            <div className="space-y-2 font-inter">
              <div className="font-light text-2xl">Light - Aa</div>
              <div className="font-normal text-2xl">Regular - Aa</div>
              <div className="font-medium text-2xl">Medium - Aa</div>
              <div className="font-semibold text-2xl">Semibold - Aa</div>
              <div className="font-bold text-2xl">Bold - Aa</div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Degular Display, serif' }}>Secondary Font</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-slate-800" style={{ fontFamily: 'Degular Display, serif' }}>Degular Display</div>
            <p className="text-slate-600 font-inter">
              Degular Display adds elegance and distinction — perfect for headlines and drawing attention to key sections.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-800 mb-2 font-inter">✅ Use Degular Display for:</h4>
              <ul className="text-sm text-blue-700 space-y-1 font-inter">
                <li>• Main page titles (e.g. "Building Inspection Services")</li>
                <li>• Section headers (e.g. "Why Choose Us", "Our Process")</li>
                <li>• Callout titles or service categories</li>
                <li>• Hero section headline (paired with Inter subtext)</li>
              </ul>
            </div>
            <div className="space-y-2" style={{ fontFamily: 'Degular Display, serif' }}>
              <div className="font-light text-2xl">Light - Aa</div>
              <div className="font-normal text-2xl">Regular - Aa</div>
              <div className="font-medium text-2xl">Medium - Aa</div>
              <div className="font-semibold text-2xl">Semibold - Aa</div>
              <div className="font-bold text-2xl">Bold - Aa</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Download Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <Button 
          onClick={() => handleDownloadFont('Inter', '/lovable-uploads/Inter.zip')}
          className="w-full"
          variant="outline"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Inter Font Package
        </Button>
        <Button 
          onClick={() => handleDownloadFont('Degular', '/lovable-uploads/Degular.zip')}
          className="w-full"
          variant="outline"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Degular Font Package
        </Button>
      </div>

      {/* Type Scale */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-8" style={{ fontFamily: 'Degular Display, serif' }}>Typography Scale</h3>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-800 pl-6">
            <h1 className="text-5xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Degular Display, serif' }}>Hero Headline</h1>
            <p className="text-slate-500 font-inter">48px / 60px line height • Degular Display Bold</p>
          </div>
          <div className="border-l-4 border-blue-600 pl-6">
            <h2 className="text-4xl font-semibold text-slate-800 mb-2" style={{ fontFamily: 'Degular Display, serif' }}>Section Headline</h2>
            <p className="text-slate-500 font-inter">36px / 44px line height • Degular Display Semibold</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-6">
            <h3 className="text-2xl font-medium text-slate-800 mb-2" style={{ fontFamily: 'Degular Display, serif' }}>Subsection Title</h3>
            <p className="text-slate-500 font-inter">24px / 32px line height • Degular Display Medium</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-6">
            <h4 className="text-xl font-medium text-slate-800 mb-2" style={{ fontFamily: 'Degular Display, serif' }}>Card Title</h4>
            <p className="text-slate-500 font-inter">20px / 28px line height • Degular Display Medium</p>
          </div>
          <div className="border-l-4 border-slate-400 pl-6">
            <p className="text-base text-slate-700 mb-2 font-inter">Body Text</p>
            <p className="text-slate-500 font-inter">16px / 24px line height • Inter Regular</p>
          </div>
          <div className="border-l-4 border-slate-300 pl-6">
            <p className="text-sm text-slate-600 mb-2 font-inter">Small Text / Captions</p>
            <p className="text-slate-500 font-inter">14px / 20px line height • Inter Regular</p>
          </div>
        </div>
      </Card>

      {/* Typography Examples */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <Badge className="mb-4 bg-blue-800">Digital Example</Badge>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-800" style={{ fontFamily: 'Degular Display, serif' }}>Professional Property Inspections</h3>
            <p className="text-slate-700 leading-relaxed font-inter">
              Trust Owner Inspections for comprehensive property assessments. Our certified 
              inspectors provide detailed reports that help you make informed decisions about 
              your property investment.
            </p>
            <p className="text-sm text-slate-500 font-inter">
              Schedule your inspection today and receive your report within 24 hours.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 text-white">
          <Badge className="mb-4 bg-orange-500">Dark Theme Example</Badge>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-400" style={{ fontFamily: 'Degular Display, serif' }}>Expert Inspection Services</h3>
            <p className="text-slate-300 leading-relaxed font-inter">
              Our team of qualified inspectors uses the latest technology and techniques 
              to provide thorough property evaluations. From structural assessments to 
              pest inspections, we've got you covered.
            </p>
            <p className="text-sm text-slate-400 font-inter">
              Available across Australia with same-day booking options.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Typography;
