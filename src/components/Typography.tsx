
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Typography = () => {
  const handleDownloadFontsZip = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/fonts.zip';
    link.download = 'fonts.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Typography</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
          Clean, professional typography that ensures excellent readability across all platforms and materials.
        </p>
      </div>

      {/* Font Families */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-center mb-6">
            <Badge className="bg-blue-800 text-white mr-3">PRIMARY FONT</Badge>
            <span className="text-sm text-blue-700 font-medium">Must Use</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 font-inter">Inter</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-slate-800 font-inter">Inter</div>
            <p className="text-slate-600 font-inter">
              Inter is designed for optimal legibility and clarity, making it perfect for user interfaces and body text.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 font-inter">✅ Use Inter for:</h4>
              <ul className="text-sm text-green-700 space-y-1 font-inter">
                <li>• All body text and paragraphs</li>
                <li>• Buttons & form inputs</li>
                <li>• Navigation menus</li>
                <li>• Labels & descriptions</li>
                <li>• Data tables and lists</li>
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

        <Card className="p-8 border-2 border-orange-200 bg-orange-50">
          <div className="flex items-center mb-6">
            <Badge className="bg-orange-600 text-white mr-3">SECONDARY FONT</Badge>
            <span className="text-sm text-orange-700 font-medium">Headers Only</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 font-inter">Degular Display</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-slate-800">Inter</div>
            <p className="text-slate-600 font-inter">
              Degular Display adds modern elegance and distinction — reserved exclusively for headlines and section titles.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg mb-4 border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2 font-inter">✅ Use Degular Display for:</h4>
              <ul className="text-sm text-orange-700 space-y-1 font-inter">
                <li>• Main page titles and hero headlines</li>
                <li>• Section headers (H1, H2, H3)</li>
                <li>• Brand taglines and callouts</li>
                <li>• Service category titles</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg mb-4 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2 font-inter">⛔ Never use Degular for:</h4>
              <ul className="text-sm text-red-700 space-y-1 font-inter">
                <li>• Body text or paragraphs</li>
                <li>• Buttons or form elements</li>
                <li>• Small text or captions</li>
                <li>• Navigation menus</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-light text-2xl">Light - Aa</div>
              <div className="font-normal text-2xl">Regular - Aa</div>
              <div className="font-medium text-2xl">Medium - Aa</div>
              <div className="font-semibold text-2xl">Semibold - Aa</div>
              <div className="font-bold text-2xl">Bold - Aa</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Download Section */}
      <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-dashed border-blue-200">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Font Assets</h3>
        <p className="text-slate-600 mb-6 font-inter">Download both Inter and Degular Display font families for consistent brand typography</p>
        <div className="flex justify-center">
          <Button variant="default" onClick={handleDownloadFontsZip} className="bg-[#0b487b] hover:bg-[#094071]">
            <Download className="w-4 h-4 mr-2" />
            Download All Fonts (ZIP)
          </Button>
        </div>
      </Card>

      {/* Typography Hierarchy - MANDATORY USAGE */}
      <Card className="p-8 border-2 border-slate-800">
        <div className="flex items-center mb-8">
          <h3 className="text-2xl font-semibold text-slate-800 mr-4">Typography Hierarchy</h3>
          <Badge className="bg-red-600 text-white">MANDATORY USAGE</Badge>
        </div>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-800 pl-6 bg-blue-50 p-4 rounded-r-lg">
            <h1 className="text-5xl font-bold text-slate-800 mb-2">Hero Headline</h1>
            <p className="text-slate-500 font-inter font-medium">48px / 60px line height • Degular Display Bold</p>
          </div>
          <div className="border-l-4 border-blue-600 pl-6 bg-blue-50 p-4 rounded-r-lg">
            <h2 className="text-4xl font-semibold text-slate-800 mb-2">Section Headline</h2>
            <p className="text-slate-500 font-inter font-medium">36px / 44px line height • Degular Display Semibold</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-6 bg-blue-50 p-4 rounded-r-lg">
            <h3 className="text-2xl font-medium text-slate-800 mb-2">Subsection Title</h3>
            <p className="text-slate-500 font-inter font-medium">24px / 32px line height • Degular Display Medium</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-6 bg-orange-50 p-4 rounded-r-lg">
            <h4 className="text-xl font-medium text-slate-800 mb-2">Card Title</h4>
            <p className="text-slate-500 font-inter font-medium">20px / 28px line height • Degular Display Medium</p>
          </div>
          <div className="border-l-4 border-slate-400 pl-6 bg-slate-50 p-4 rounded-r-lg">
            <p className="text-base text-slate-700 mb-2 font-inter">Body Text</p>
            <p className="text-slate-500 font-inter font-medium">16px / 24px line height • Inter Regular</p>
          </div>
          <div className="border-l-4 border-slate-300 pl-6 bg-slate-50 p-4 rounded-r-lg">
            <p className="text-sm text-slate-600 mb-2 font-inter">Small Text / Captions</p>
            <p className="text-slate-500 font-inter font-medium">14px / 20px line height • Inter Regular</p>
          </div>
        </div>
      </Card>

      {/* Typography Examples */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <Badge className="mb-4 bg-blue-800">Correct Usage Example</Badge>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-800">Professional Property Inspections</h3>
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
            <h3 className="text-2xl font-bold text-orange-400">Expert Inspection Services</h3>
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
