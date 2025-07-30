
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const StationaryKit = () => {
  const handleDownloadLetterheadZip = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/owner-letter-head.zip';
    link.download = 'owner-letter-head.zip';
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
      thumbnailUrl: "/lovable-uploads/letter-head-thumnail.png"
    },
    {
      title: "Letterhead A5",
      description: "Compact letterhead for notes and quick correspondence",
      icon: FileText,
      specs: "148mm × 210mm • 300 DPI • CMYK",
      mockup: "letterhead-a5-mockup.jpg",
      thumbnailUrl: "/lovable-uploads/letter-head-thumnail.png"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Stationary Kit</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
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
                  <p className="text-slate-600 mb-3 font-inter">{item.description}</p>
                  <Badge variant="outline" className="text-xs font-inter">{item.specs}</Badge>
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
                      <div className="text-xs text-slate-600 font-inter">Owner Inspections</div>
                      <div className="text-xs text-slate-400 mt-1 font-inter">{item.title} Preview</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Download Section */}
      <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-dashed border-blue-200">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Letterhead Templates</h3>
        <p className="text-slate-600 mb-6 font-inter">Download professional letterhead templates for all your business correspondence</p>
        <div className="flex justify-center">
          <Button variant="default" onClick={handleDownloadLetterheadZip} className="bg-[#0b487b] hover:bg-[#094071] font-inter">
            <Download className="w-4 h-4 mr-2" />
            Download All Letterheads (ZIP)
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StationaryKit;
