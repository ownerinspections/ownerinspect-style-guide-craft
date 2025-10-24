import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Image, Award } from "lucide-react";

const DigitalAssets = () => {
  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/lovable-uploads/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4 font-degular">
            Digital Assets
          </h1>
          <p className="text-lg text-slate-600 font-inter">
            Download our complete digital asset collections for easy integration into your projects.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Social Media Icons */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Image className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-degular">Social Media Icons</CardTitle>
                <CardDescription className="font-inter">
                  Complete collection of social media icons in multiple formats
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-2 p-4 bg-slate-50 rounded-lg">
              <img 
                src="/lovable-uploads/socialmedia-icons/Facebook.png" 
                alt="Facebook" 
                className="w-8 h-8 object-contain"
              />
              <img 
                src="/lovable-uploads/socialmedia-icons/Instagram.png" 
                alt="Instagram" 
                className="w-8 h-8 object-contain"
              />
              <img 
                src="/lovable-uploads/socialmedia-icons/Twitter.png" 
                alt="Twitter" 
                className="w-8 h-8 object-contain"
              />
              <img 
                src="/lovable-uploads/socialmedia-icons/Linkedin.png" 
                alt="LinkedIn" 
                className="w-8 h-8 object-contain"
              />
              <img 
                src="/lovable-uploads/socialmedia-icons/Youtube.png" 
                alt="YouTube" 
                className="w-8 h-8 object-contain"
              />
              <img 
                src="/lovable-uploads/socialmedia-icons/Tiktok.png" 
                alt="TikTok" 
                className="w-8 h-8 object-contain"
              />
              <img 
                src="/lovable-uploads/socialmedia-icons/Whatsapp.png" 
                alt="WhatsApp" 
                className="w-8 h-8 object-contain"
              />
              <img 
                src="/lovable-uploads/socialmedia-icons/Telegram.png" 
                alt="Telegram" 
                className="w-8 h-8 object-contain"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-700 font-inter">
                  socialmedia-icons.zip
                </p>
                <p className="text-xs text-slate-500 font-inter">
                  PNG format • 17 icons included
                </p>
              </div>
              <Button 
                onClick={() => handleDownload('socialmedia-icons.zip')}
                className="bg-[#0b487b] hover:bg-[#094071] font-inter"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-degular">Certificates</CardTitle>
                <CardDescription className="font-inter">
                  Official certificates and accreditations in high resolution
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-lg">
              <img 
                src="https://ownerinspections.com.au/wp-content/uploads/qld-qbcc-300x133.jpg" 
                alt="QBCC Certificate" 
                className="w-12 h-8 object-contain"
              />
              <img 
                src="https://ownerinspections.com.au/wp-content/uploads/nsw-fair-trading-300x133.jpg" 
                alt="NSW Government" 
                className="w-12 h-8 object-contain"
              />
              <img 
                src="https://ownerinspections.com.au/wp-content/uploads/asbc-sip-1-300x133.jpg" 
                alt="AU Society" 
                className="w-12 h-8 object-contain"
              />
              <img 
                src="https://ownerinspections.com.au/wp-content/uploads/vic-bpc-300x133.jpg" 
                alt="BPC Certificate" 
                className="w-12 h-8 object-contain"
              />
              <img 
                src="https://ownerinspections.com.au/wp-content/uploads/Google-Reviews-300x133.jpg" 
                alt="Google Reviews" 
                className="w-12 h-8 object-contain"
              />
              <img 
                src="https://ownerinspections.com.au/wp-content/uploads/ProductReview-300x133.jpg" 
                alt="Product Review" 
                className="w-12 h-8 object-contain"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-700 font-inter">
                  certificates.zip
                </p>
                <p className="text-xs text-slate-500 font-inter">
                  Multiple formats • 6 certificates included
                </p>
              </div>
              <Button 
                onClick={() => handleDownload('certificates.zip')}
                className="bg-[#0b487b] hover:bg-[#094071] font-inter"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 font-degular">
            Usage Guidelines
          </h3>
          <div className="space-y-2 text-sm text-slate-600 font-inter">
            <p>• All assets are provided in high-resolution formats suitable for both digital and print use</p>
            <p>• Social media icons are optimized for various platform requirements</p>
            <p>• Certificates include multiple format options (PNG, JPG, SVG, WebP)</p>
            <p>• Maintain aspect ratios when resizing to preserve quality</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalAssets; 