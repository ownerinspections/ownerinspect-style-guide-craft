
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Presentation, FileText, Image as ImageIcon, Palette } from "lucide-react";

const OperationAssets = () => {
  const templateFeatures = [
    {
      title: "Master Slides",
      description: "Pre-designed master layouts with brand elements",
      icon: Presentation
    },
    {
      title: "Title Slides",
      description: "Professional title and section divider templates",
      icon: FileText
    },
    {
      title: "Content Layouts",
      description: "Various layouts for different content types",
      icon: ImageIcon
    },
    {
      title: "Brand Elements",
      description: "Integrated logo, colors, and typography",
      icon: Palette
    }
  ];

  const slideTypes = [
    "Title Slide",
    "Agenda",
    "Content with Image",
    "Two Column Layout",
    "Bullet Points",
    "Charts & Graphs",
    "Team Introduction",
    "Contact Information",
    "Thank You",
    "Q&A Section"
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Operation Assets</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
          Professional presentation templates and operational assets to maintain brand consistency in business communications and client presentations.
        </p>
      </div>

      {/* PowerPoint Template Overview */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-800 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Presentation className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">PowerPoint Template</h3>
          <p className="text-slate-600 max-w-2xl mx-auto font-inter">
            Comprehensive presentation template designed for client presentations, training materials, and business communications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {templateFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Icon className="w-6 h-6 text-blue-800" />
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600 font-inter">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button className="bg-[#0b487b] hover:bg-[#094071] font-inter">
            <Download className="w-4 h-4 mr-2" />
            Download PowerPoint Template
          </Button>
        </div>
      </Card>

      {/* Slide Types Available */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6">Available Slide Templates</h3>
        <p className="text-slate-600 mb-6 font-inter">
          The PowerPoint template includes a comprehensive set of pre-designed slides for various presentation needs.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {slideTypes.map((slideType, index) => (
            <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="w-8 h-6 bg-gradient-to-r from-blue-800 to-orange-500 rounded mx-auto mb-2"></div>
              <p className="text-sm font-medium text-slate-700 font-inter">{slideType}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Usage Guidelines */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6">Presentation Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Brand Consistency</h4>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• Always use the provided master slides</li>
              <li>• Maintain consistent color palette throughout</li>
              <li>• Use approved fonts and typography hierarchy</li>
              <li>• Include logo on every slide</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Content Best Practices</h4>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• Keep text concise and readable</li>
              <li>• Use high-quality images and graphics</li>
              <li>• Maintain consistent spacing and alignment</li>
              <li>• Follow the 6x6 rule (max 6 bullets, 6 words each)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OperationAssets;
