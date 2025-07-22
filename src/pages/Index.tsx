
import { useState } from "react";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import LogoSection from "@/components/LogoSection";
import ColorPalette from "@/components/ColorPalette";
import Typography from "@/components/Typography";
import StationaryKit from "@/components/StationaryKit";
import DigitalKit from "@/components/DigitalKit";
import SocialMediaKit from "@/components/SocialMediaKit";
import OperationAssets from "@/components/OperationAssets";
import MarketingAssets from "@/components/MarketingAssets";
import Services from "@/components/Services";
import BrandMenu from "@/components/BrandMenu";

const Index = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "introduction":
        return <Introduction />;
      case "logo":
        return <LogoSection />;
      case "colors":
        return <ColorPalette />;
      case "typography":
        return <Typography />;
      case "stationary":
        return <StationaryKit />;
      case "digital":
        return <DigitalKit />;
      case "social":
        return <SocialMediaKit />;
      case "operations":
        return <OperationAssets />;
      case "marketing":
        return <MarketingAssets />;
      case "services":
        return <Services />;
      default:
        return <Introduction />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      
      <div className="flex max-w-7xl mx-auto">
        {/* Desktop Sidebar Menu */}
        <div className="hidden lg:block w-80 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <BrandMenu activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 lg:px-6 py-8 lg:py-12">
          {/* Mobile Menu */}
          <div className="lg:hidden mb-6">
            <BrandMenu activeSection={activeSection} onSectionChange={setActiveSection} isMobile />
          </div>
          
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;
