
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Typography = () => {
  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Typography</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Clean, professional typography that ensures excellent readability across all platforms and materials.
        </p>
      </div>

      {/* Font Families */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Primary Font</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-slate-800">Inter</div>
            <p className="text-slate-600">
              Inter is our primary typeface for digital applications. It offers excellent readability 
              and modern aesthetics across all screen sizes.
            </p>
            <div className="space-y-2">
              <div className="font-light text-2xl">Light - Aa</div>
              <div className="font-normal text-2xl">Regular - Aa</div>
              <div className="font-medium text-2xl">Medium - Aa</div>
              <div className="font-semibold text-2xl">Semibold - Aa</div>
              <div className="font-bold text-2xl">Bold - Aa</div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Secondary Font</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-slate-800 font-serif">Georgia</div>
            <p className="text-slate-600">
              Georgia is used sparingly for headlines and special emphasis, adding warmth 
              and personality to our communications.
            </p>
            <div className="space-y-2 font-serif">
              <div className="font-normal text-2xl">Regular - Aa</div>
              <div className="font-semibold text-2xl">Semibold - Aa</div>
              <div className="font-bold text-2xl">Bold - Aa</div>
              <div className="italic text-2xl">Italic - Aa</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Type Scale */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-8">Typography Scale</h3>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-800 pl-6">
            <h1 className="text-5xl font-bold text-slate-800 mb-2">Hero Headline</h1>
            <p className="text-slate-500">48px / 60px line height • Font weight: 700</p>
          </div>
          <div className="border-l-4 border-blue-600 pl-6">
            <h2 className="text-4xl font-semibold text-slate-800 mb-2">Section Headline</h2>
            <p className="text-slate-500">36px / 44px line height • Font weight: 600</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-6">
            <h3 className="text-2xl font-medium text-slate-800 mb-2">Subsection Title</h3>
            <p className="text-slate-500">24px / 32px line height • Font weight: 500</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-6">
            <h4 className="text-xl font-medium text-slate-800 mb-2">Card Title</h4>
            <p className="text-slate-500">20px / 28px line height • Font weight: 500</p>
          </div>
          <div className="border-l-4 border-slate-400 pl-6">
            <p className="text-base text-slate-700 mb-2">Body Text</p>
            <p className="text-slate-500">16px / 24px line height • Font weight: 400</p>
          </div>
          <div className="border-l-4 border-slate-300 pl-6">
            <p className="text-sm text-slate-600 mb-2">Small Text / Captions</p>
            <p className="text-slate-500">14px / 20px line height • Font weight: 400</p>
          </div>
        </div>
      </Card>

      {/* Typography Examples */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <Badge className="mb-4 bg-blue-800">Digital Example</Badge>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-800">Professional Property Inspections</h3>
            <p className="text-slate-700 leading-relaxed">
              Trust Owner Inspections for comprehensive property assessments. Our certified 
              inspectors provide detailed reports that help you make informed decisions about 
              your property investment.
            </p>
            <p className="text-sm text-slate-500">
              Schedule your inspection today and receive your report within 24 hours.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 text-white">
          <Badge className="mb-4 bg-orange-500">Dark Theme Example</Badge>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-400">Expert Inspection Services</h3>
            <p className="text-slate-300 leading-relaxed">
              Our team of qualified inspectors uses the latest technology and techniques 
              to provide thorough property evaluations. From structural assessments to 
              pest inspections, we've got you covered.
            </p>
            <p className="text-sm text-slate-400">
              Available across Australia with same-day booking options.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Typography;
