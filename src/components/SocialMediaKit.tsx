
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Youtube, Instagram, Linkedin, Hash, Play, Image as ImageIcon } from "lucide-react";

const SocialMediaKit = () => {
  const socialPlatforms = [
    {
      title: "Profile Logo",
      description: "Optimized logo for profile pictures",
      icon: ImageIcon,
      specs: "400×400px • PNG • Transparent BG",
      platforms: "All Platforms"
    },
    {
      title: "YouTube",
      description: "Channel art, thumbnails, and video assets",
      icon: Youtube,
      specs: "2560×1440px Channel Art • 1280×720px Thumbnails",
      platforms: "YouTube Specific"
    },
    {
      title: "Instagram",
      description: "Stories, posts, and highlight covers",
      icon: Instagram,
      specs: "1080×1080px Posts • 1080×1920px Stories",
      platforms: "Instagram Specific"
    },
    {
      title: "LinkedIn",
      description: "Company page and post templates",
      icon: Linkedin,
      specs: "1128×191px Cover • 1200×627px Posts",
      platforms: "LinkedIn Specific"
    }
  ];

  const motionAssets = [
    {
      title: "Instagram Story Subscribe Motion",
      description: "Animated logo for YouTube subscription calls",
      format: "MP4 • 1080×1920px • 15 seconds",
      type: "Video Animation"
    },
    {
      title: "YouTube Clips Branding",
      description: "Logo motion with social handles display",
      format: "MP4 • 1920×1080px • 10 seconds",
      type: "Video Animation"
    }
  ];

  const hashtags = [
    { category: "Primary", tags: ["#OwnerInspections", "#PropertyInspection", "#AustralianProperty"] },
    { category: "Service", tags: ["#PropertyInspector", "#HomeInspection", "#BuildingInspection"] },
    { category: "Location", tags: ["#Australia", "#PropertyAustralia", "#RealEstateAU"] },
    { category: "Industry", tags: ["#PropertyExpert", "#RealEstate", "#PropertyAdvice"] }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Social Media Kit</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Comprehensive social media assets to maintain brand consistency across all digital platforms and social channels.
        </p>
      </div>

      {/* Platform Assets */}
      <div className="grid lg:grid-cols-2 gap-8">
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-orange-500 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{platform.title}</h3>
                  <p className="text-slate-600 mb-3">{platform.description}</p>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="text-xs">{platform.specs}</Badge>
                    <Badge className="bg-blue-800 text-xs">{platform.platforms}</Badge>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 mb-4">
                <div className="bg-white rounded border aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-orange-500 rounded-full mx-auto mb-2"></div>
                    <div className="text-sm font-semibold text-slate-700">OI</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Assets
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Motion Graphics */}
      <div>
        <h3 className="text-2xl font-semibold text-slate-800 mb-6">Motion Graphics</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {motionAssets.map((asset, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-800 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-2">{asset.title}</h4>
                  <p className="text-sm text-slate-600 mb-2">{asset.description}</p>
                  <Badge variant="outline" className="text-xs">{asset.format}</Badge>
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-8 mb-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-orange-500 rounded-lg mx-auto flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-slate-500 mt-2">Motion Preview</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Video
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Hashtags */}
      <Card className="p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Hash className="w-6 h-6 text-blue-800" />
          <h3 className="text-2xl font-semibold text-slate-800">Hashtag Strategy</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hashtags.map((group, index) => (
            <div key={index}>
              <h4 className="font-semibold text-slate-700 mb-3">{group.category}</h4>
              <div className="space-y-2">
                {group.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="block text-center text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Usage Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use 3-5 hashtags per post for optimal engagement</li>
            <li>• Mix primary brand hashtags with service-specific tags</li>
            <li>• Include location tags for local reach</li>
            <li>• Monitor hashtag performance and adjust strategy</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default SocialMediaKit;
