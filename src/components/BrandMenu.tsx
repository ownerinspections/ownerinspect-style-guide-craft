
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Palette, 
  Type, 
  FileText, 
  Monitor, 
  Share2, 
  Briefcase,
  Image
} from "lucide-react";

interface BrandMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const BrandMenu = ({ activeSection, onSectionChange }: BrandMenuProps) => {
  const menuItems = [
    {
      id: "introduction",
      title: "Introduction",
      icon: BookOpen,
      items: ["Vision", "Mission", "Core Values", "Brand Strategy", "Brand Personality", "Brand Story", "Brand Archetype"]
    },
    {
      id: "logo",
      title: "Logo",
      icon: Image,
      items: ["Logo", "Logo Variations", "Favicon", "Favicon Variation", "Logo Properties", "Logo Clear Space", "Logo Minimum Size", "Logo Misuse"]
    },
    {
      id: "colors",
      title: "Color Palette",
      icon: Palette,
      items: ["Brand Colors", "Supporting Colors", "Neutral Colors", "Text Colors"]
    },
    {
      id: "typography",
      title: "Typography",
      icon: Type,
      items: ["Primary Font", "Secondary Font"]
    },
    {
      id: "stationary",
      title: "Stationary Kit",
      icon: FileText,
      items: ["Letterheads A4", "Letterhead A3", "Envelope", "Business Card"]
    },
    {
      id: "digital",
      title: "Digital Kit",
      icon: Monitor,
      items: ["Vcard", "Email Signature", "General Email Template", "Payment Receipt Email Template", "Quote Email Templates", "Invoice Email Template"]
    },
    {
      id: "social",
      title: "Social Media Kit",
      icon: Share2,
      items: ["Profile Logo", "YouTube", "Instagram", "LinkedIn", "Medium", "Reddit", "Logo Motion for Instagram Story", "Logo Motion for YouTube Clips", "Hashtags"]
    },
    {
      id: "operations",
      title: "Operation Assets",
      icon: Briefcase,
      items: ["PowerPoint Template"]
    }
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Brand Guidelines</h2>
        <p className="text-sm text-slate-600">Navigate through sections</p>
      </div>

      {menuItems.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;
        
        return (
          <Card 
            key={section.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              isActive ? 'border-blue-800 bg-blue-50' : 'hover:border-blue-200'
            }`}
            onClick={() => onSectionChange(section.id)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-800' : 'text-slate-600'}`} />
              <h3 className={`font-semibold ${isActive ? 'text-blue-800' : 'text-slate-800'}`}>
                {section.title}
              </h3>
              {isActive && <Badge className="bg-blue-800 text-xs">Active</Badge>}
            </div>
            <div className="space-y-1">
              {section.items.map((item, index) => (
                <p key={index} className="text-xs text-slate-500 ml-8">
                  • {item}
                </p>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default BrandMenu;
