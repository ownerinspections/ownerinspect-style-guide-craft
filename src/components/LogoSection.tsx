
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const LogoSection = () => {


  const handleDownloadLogoZip = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/logo.zip';
    link.download = 'owner-inspections-logo.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4 font-degular">Logo & Identity</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
          The Owner Inspections logo combines professional trust with modern accessibility. 
          Use these guidelines to maintain brand consistency.
        </p>
      </div>

      {/* Primary Logo */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8 text-center bg-gradient-to-br from-white to-slate-50">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex justify-center">
              <img 
                src="/lovable-uploads/ownerlogo.png" 
                alt="Owner Inspections Logo" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-slate-500 mt-2 font-inter">Professional Property Inspections</p>
          </div>
          <Badge variant="default" className="bg-[#0b487b] font-inter">Primary Logo</Badge>
        </Card>

        <Card className="p-8 text-center bg-slate-900">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex justify-center bg-white p-4 rounded-lg">
              <img 
                src="/lovable-uploads/ownerlogo.png" 
                alt="Owner Inspections Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-slate-300 mt-2 font-inter">Professional Property Inspections</p>
          </div>
          <Badge variant="secondary" className="font-inter">On Dark Backgrounds</Badge>
        </Card>
      </div>

      {/* Logo Usage Guidelines */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Do's */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-slate-800 font-degular">Do</h3>
          </div>
          <ul className="space-y-3 text-slate-600 font-inter">
            <li>• Use the logo with sufficient clear space</li>
            <li>• Maintain the original proportions</li>
            <li>• Use on high contrast backgrounds</li>
            <li>• Scale proportionally when resizing</li>
            <li>• Use approved color variations only</li>
          </ul>
        </Card>

        {/* Don'ts */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-xl font-semibold text-slate-800 font-degular">Don't</h3>
          </div>
          <ul className="space-y-3 text-slate-600 font-inter">
            <li>• Stretch or distort the logo</li>
            <li>• Change the colors or gradients</li>
            <li>• Add effects or shadows</li>
            <li>• Place on busy backgrounds</li>
            <li>• Use below minimum size (60px width)</li>
          </ul>
        </Card>
      </div>

      {/* Download Section */}
      <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-dashed border-blue-200">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4 font-degular">Logo Assets</h3>
        <p className="text-slate-600 mb-6 font-inter">Download high-resolution logo files for various applications</p>
        <div className="flex justify-center">
          <Button variant="default" onClick={handleDownloadLogoZip} className="bg-[#0b487b] hover:bg-[#094071] font-inter">
            <Download className="w-4 h-4 mr-2" />
            Download All Logos (ZIP)
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default LogoSection;
