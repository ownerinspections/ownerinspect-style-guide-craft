
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/logo/Owner-logo-png.png" 
            alt="Owner Inspections Logo" 
            className="h-8 sm:h-10 w-auto"
          />
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="sm" className="sm:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
