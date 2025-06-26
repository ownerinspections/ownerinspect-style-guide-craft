
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Mail, CreditCard } from "lucide-react";

const StationaryKit = () => {
  const handleDownloadDocument = (fileName: string, filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stationaryItems = [
    {
      title: "Letterhead A4",
      description: "Official letterhead for standard correspondence",
      icon: FileText,
      specs: "210mm × 297mm • 300 DPI • CMYK",
      mockup: "letterhead-a4-mockup.jpg",
      downloadFile: "Owner_inspection_letter_head_A4.docx",
      downloadPath: "/lovable-uploads/Owner_inspection_letter_head_A4.docx",
      thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    },
    {
      title: "Letterhead A5",
      description: "Compact letterhead for notes and quick correspondence",
      icon: FileText,
      specs: "148mm × 210mm • 300 DPI • CMYK",
      mockup: "letterhead-a5-mockup.jpg",
      downloadFile: "Owner_inspection_letter_head_A5.docx",
      downloadPath: "/lovable-uploads/Owner_inspection_letter_head_A5.docx",
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    },
    {
      title: "Envelope",
      description: "Standard business envelope with brand identity",
      icon: Mail,
      specs: "DL Size (110mm × 220mm) • 300 DPI • CMYK",
      mockup: "envelope-mockup.jpg",
      thumbnailUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
    },
    {
      title: "Business Card",
      description: "Professional business cards for networking",
      icon: CreditCard,
      specs: "85mm × 55mm • 300 DPI • CMYK • Matte Finish",
      mockup: "business-card-mockup.jpg",
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Stationary Kit</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Professional print materials that maintain brand consistency across all business communications and touchpoints.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {stationaryItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-orange-500 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-3">{item.description}</p>
                  <Badge variant="outline" className="text-xs">{item.specs}</Badge>
                </div>
              </div>

              {/* Document Thumbnail or Mockup Preview */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-8 mb-4 text-center">
                {item.thumbnailUrl ? (
                  <div className="w-full h-32 rounded shadow-md overflow-hidden">
                    <img 
                      src={item.thumbnailUrl} 
                      alt={`${item.title} preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-white rounded shadow-md flex items-center justify-center border">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-800 to-orange-500 rounded mx-auto mb-2"></div>
                      <div className="text-xs text-slate-600">Owner Inspections</div>
                      <div className="text-xs text-slate-400 mt-1">{item.title} Preview</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                {item.downloadPath ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownloadDocument(item.downloadFile!, item.downloadPath)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Document
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Design Guidelines */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6">Design Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Layout Principles</h4>
            <ul className="space-y-2 text-slate-600">
              <li>• Maintain consistent margins and spacing</li>
              <li>• Use the brand color palette appropriately</li>
              <li>• Ensure logo placement follows clear space rules</li>
              <li>• Keep typography hierarchy consistent</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Print Specifications</h4>
            <ul className="space-y-2 text-slate-600">
              <li>• Resolution: 300 DPI minimum</li>
              <li>• Color Mode: CMYK for print</li>
              <li>• Bleed: 3mm on all sides</li>
              <li>• Paper: High-quality matte or gloss finish</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StationaryKit;
