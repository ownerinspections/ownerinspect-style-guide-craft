import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const MarketingAssets = () => {
  const marketingAssets = [
    {
      category: "Brochures & Flyers",
      items: [
        { name: "Company Overview Brochure", format: "PDF", size: "2.1 MB" },
        { name: "Service Flyer", format: "PDF", size: "1.8 MB" },
        { name: "Property Inspection Brochure", format: "PDF", size: "3.2 MB" }
      ]
    },
    {
      category: "Presentations",
      items: [
        { name: "Company Pitch Deck", format: "PPTX", size: "5.4 MB" },
        { name: "Services Overview", format: "PPTX", size: "4.1 MB" },
        { name: "Client Onboarding Presentation", format: "PPTX", size: "3.8 MB" }
      ]
    },
    {
      category: "Digital Banners",
      items: [
        { name: "Website Hero Banner", format: "PNG", size: "850 KB" },
        { name: "Social Media Banner", format: "PNG", size: "420 KB" },
        { name: "Email Header Banner", format: "PNG", size: "380 KB" }
      ]
    },
    {
      category: "Print Advertisements",
      items: [
        { name: "Newspaper Ad - Full Page", format: "PDF", size: "2.8 MB" },
        { name: "Magazine Ad - Half Page", format: "PDF", size: "1.9 MB" },
        { name: "Directory Listing Ad", format: "PDF", size: "1.2 MB" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4 font-degular">Marketing Assets</h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto font-inter">
          Ready-to-use marketing materials designed to maintain brand consistency across all promotional activities.
        </p>
      </div>

      {marketingAssets.map((category) => (
        <Card key={category.category} className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 font-degular">{category.category}</h2>
            <p className="text-slate-600 font-inter">
              Professional marketing materials for {category.category.toLowerCase()}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <Card key={item.name} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-slate-800 leading-tight font-degular">{item.name}</h3>
                  <Badge variant="secondary" className="ml-2 text-xs font-inter">
                    {item.format}
                  </Badge>
                </div>
                
                <p className="text-sm text-slate-500 mb-4 font-inter">Size: {item.size}</p>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 font-inter">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="font-inter">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      ))}

      {/* Marketing Guidelines */}
      <Card className="p-8 mt-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 font-degular">Marketing Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3 font-degular">Brand Message Consistency</h3>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• Always emphasize trust and professionalism</li>
              <li>• Highlight expertise and technology</li>
              <li>• Focus on customer peace of mind</li>
              <li>• Maintain consistent tone across all materials</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-3 font-degular">Visual Standards</h3>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• Use approved color palette and fonts</li>
              <li>• Ensure logo is prominently displayed</li>
              <li>• Maintain consistent layout and spacing</li>
              <li>• Use high-quality professional imagery</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketingAssets; 