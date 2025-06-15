
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
      default:
        return <Introduction />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Menu */}
        <div className="w-80 sticky top-20 h-screen overflow-y-auto">
          <BrandMenu activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-6 py-12">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;
