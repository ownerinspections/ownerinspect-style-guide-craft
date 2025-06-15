
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
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
          <p className="text-slate-600 max-w-2xl mx-auto">
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
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <Button className="bg-blue-800 hover:bg-blue-900">
            <Download className="w-4 h-4 mr-2" />
            Download Template (.PPTX)
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Guidelines (.PDF)
          </Button>
        </div>
      </Card>

      {/* Template Preview */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Template Preview</h3>
          <Card className="p-6">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-8">
              <div className="bg-white rounded shadow-lg aspect-video flex flex-col">
                {/* Slide Header */}
                <div className="bg-gradient-to-r from-blue-800 to-orange-500 p-4 rounded-t text-white">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold">Owner Inspections</div>
                    <div className="w-8 h-8 bg-white/20 rounded"></div>
                  </div>
                </div>
                
                {/* Slide Content */}
                <div className="flex-1 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">Sample Title Slide</h4>
                    <p className="text-slate-600">Professional Property Inspections</p>
                  </div>
                </div>
                
                {/* Slide Footer */}
                <div className="border-t p-3 text-center">
                  <div className="text-xs text-slate-400">ownerinspections.com.au</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Available Slide Types</h3>
          <Card className="p-6">
            <div className="space-y-3">
              {slideTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
                  <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                  <span className="text-sm text-slate-700">{type}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Design Guidelines</h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
              <span>Use consistent typography throughout presentation</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span>Maintain brand colors in all visual elements</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-slate-600 rounded-full mt-2"></div>
              <span>Ensure logo placement follows clear space rules</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Keep slides clean and professional</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Best Practices</h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span>Limit text to key points for better readability</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span>Use high-quality images and graphics</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span>Maintain consistent slide transitions</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span>Include contact information on final slide</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default OperationAssets;
