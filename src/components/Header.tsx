
import { Menu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-800 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-lg">OI</span>
          </div>
          <div>
            <h1 className="font-bold text-lg sm:text-xl text-slate-800">Owner Inspections</h1>
            <p className="text-xs sm:text-sm text-slate-500">Brand Guidelines</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Download Assets
          </Button>
          <Button variant="ghost" size="sm" className="sm:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
