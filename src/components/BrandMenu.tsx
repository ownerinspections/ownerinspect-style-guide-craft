
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  BookOpen, 
  Palette, 
  Type, 
  FileText, 
  Monitor, 
  Share2, 
  Briefcase,
  Image,
  Menu,
  Target,
  Wrench,
  Mail,
  Download
} from "lucide-react";

interface BrandMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile?: boolean;
}

const BrandMenu = ({ activeSection, onSectionChange, isMobile = false }: BrandMenuProps) => {
  const menuItems = [
    {
      id: "introduction",
      title: "Introduction",
      icon: BookOpen
    },
    {
      id: "logo",
      title: "Logo",
      icon: Image
    },
    {
      id: "colors",
      title: "Color Palette",
      icon: Palette
    },
    {
      id: "typography",
      title: "Typography",
      icon: Type
    },
    {
      id: "stationary",
      title: "Stationary Kit",
      icon: FileText
    },
    {
      id: "social",
      title: "Social Media Kit",
      icon: Share2
    },
    {
      id: "digital-assets",
      title: "Digital Assets",
      icon: Download
    },
    {
      id: "services",
      title: "Services",
      icon: Wrench
    },
    {
      id: "email-signature",
      title: "Email Signature",
      icon: Mail
    }
  ];

  const MenuContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="p-6 space-y-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Brand Guidelines</h2>
      </div>

      {menuItems.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;
        
        return (
          <Button
            key={section.id}
            variant={isActive ? "default" : "ghost"}
            className={`w-full justify-start h-auto p-4 ${
              isActive 
                ? "bg-[#0b487b] hover:bg-[#094071]" 
                : "hover:bg-slate-100"
            } font-inter`}
            onClick={() => {
              onSectionChange(section.id);
              onItemClick?.();
            }}
          >
            <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-slate-600"}`} />
            <span className={isActive ? "text-white" : "text-slate-700"}>
              {section.title}
            </span>
          </Button>
        );
      })}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="font-inter">
            <Menu className="w-4 h-4 mr-2" />
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription className="font-inter">
              Access all brand guideline sections
            </SheetDescription>
          </SheetHeader>
          <MenuContent onItemClick={() => {}} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Card className="h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        <MenuContent />
      </div>
    </Card>
  );
};

export default BrandMenu;
