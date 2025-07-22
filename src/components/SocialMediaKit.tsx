
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Instagram, Facebook, Twitter, Linkedin, Youtube, Hash, MessageSquare, FileText, Check } from "lucide-react";
import { useState } from "react";

const SocialMediaKit = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const platforms = [
    {
      name: "Facebook",
      icon: Facebook,
      formats: ["Profile Picture (180×180)", "Cover Photo (1200×630)", "Post Image (1200×630)"],
      color: "bg-blue-600"
    },
    {
      name: "Instagram", 
      icon: Instagram,
      formats: ["Profile Picture (320×320)", "Story (1080×1920)", "Post Square (1080×1080)", "Post Portrait (1080×1350)"],
      color: "bg-pink-600"
    },
    {
      name: "Twitter",
      icon: Twitter,
      formats: ["Profile Picture (400×400)", "Header (1500×500)", "Post Image (1200×675)"],
      color: "bg-sky-500"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      formats: ["Profile Picture (400×400)", "Cover Photo (1128×191)", "Post Image (1200×627)"],
      color: "bg-blue-700"
    },
    {
      name: "YouTube",
      icon: Youtube,
      formats: ["Profile Picture (800×800)", "Channel Banner (2560×1440)", "Thumbnail (1280×720)"],
      color: "bg-red-600"
    }
  ];

  const hashtags = [
    { category: "Primary", tags: ["#OwnerInspections", "#PropertyInspection", "#AustralianProperty"] },
    { category: "Service", tags: ["#PropertyInspector", "#HomeInspection", "#BuildingInspection"] },
    { category: "Location", tags: ["#Australia", "#PropertyAustralia", "#RealEstateAU"] },
    { category: "Industry", tags: ["#PropertyExpert", "#RealEstate", "#PropertyAdvice"] }
  ];

  const captions = {
    youtubeLong: `🏠 Welcome to Owner Inspections! In today's comprehensive guide, we'll walk you through the essential steps of a professional property inspection. Whether you're buying your first home or investing in property, understanding what to look for can save you thousands in unexpected repairs.

In this video, you'll discover:
✅ Critical structural elements to examine
✅ Common red flags that indicate major issues
✅ How to read and understand inspection reports
✅ Questions to ask your inspector

Our certified inspectors have years of experience helping Australian property owners make informed decisions. Don't let hidden issues turn your dream property into a nightmare.

📞 Ready for your inspection? Contact us today!
🌐 Visit our website for more resources

#PropertyInspection #OwnerInspections #AustralianProperty #RealEstate #PropertyExpert #HomeInspection #PropertyAdvice`,

    youtubeShort: `🚨 RED FLAG Alert! This one thing could cost you $50K+ 

See that crack? It's not just cosmetic...

Professional inspections catch what you miss!

📞 Book your inspection today

#PropertyInspection #OwnerInspections #PropertyTips #RealEstate`,

    linkedinPost: `The Australian property market demands expertise and attention to detail. As property values continue to rise, professional inspections have become more critical than ever.

At Owner Inspections, we've helped thousands of property investors and homeowners make informed decisions through comprehensive inspection services. Our certified inspectors use the latest technology and industry best practices to identify potential issues before they become costly problems.

Key insights from our recent market analysis:
• 87% of properties have at least one maintenance issue
• Early detection saves an average of $15,000 in repairs
• Professional reports increase buyer confidence by 73%

Whether you're expanding your property portfolio or buying your first home, don't underestimate the value of professional due diligence.

What's your experience with property inspections? Share your thoughts below.

#PropertyInvestment #RealEstateAustralia #PropertyInspection #DueDiligence #PropertyExpert`,

    linkedinShort: `Smart property investors know: inspect before you invest.

💡 Professional inspections reveal what's hidden
📊 Data-driven reports for confident decisions
🎯 Prevent costly surprises down the track

Your property investment deserves professional expertise.

#PropertyInvestment #OwnerInspections #RealEstate`,

    instagram: `🏠✨ Your dream home deserves a professional inspection!

Don't let hidden issues turn into expensive nightmares 😱

Our certified inspectors catch what others miss:
🔍 Structural integrity checks
💧 Plumbing and electrical systems
🌿 Pest and moisture detection
📋 Comprehensive detailed reports

Swipe to see what we found in this week's inspections! 👆

Ready to inspect with confidence? DM us or click the link in bio! 📞

#PropertyInspection #OwnerInspections #DreamHome #PropertyExpert #AustralianProperty #RealEstate #HomeInspection #PropertyAdvice #InspectionExperts #PropertySafety`,

    reddit: `PSA: Just saved a client $45K with a simple property inspection

Property looked perfect from the outside. Modern kitchen, fresh paint, great location. But our inspection revealed:

- Major structural issues in the foundation
- Electrical wiring that hadn't been updated since the 80s
- Hidden water damage behind bathroom tiles
- Termite activity in the subfloor

Total estimated repairs: $45,000+

The seller had no idea about most of these issues. Client walked away and found a better property the next month.

Moral of the story: ALWAYS get a professional inspection, even if the property looks perfect. It's a few hundred dollars that can save you tens of thousands.

Anyone else have inspection horror stories? Or better yet - success stories where an inspection saved the day?`,

    medium: `The Hidden Cost of Skipping Property Inspections: A $50,000 Lesson

Introduction:
Property investment in Australia has never been more competitive. With median house prices reaching record highs across major cities, buyers are under pressure to make quick decisions. However, as a certified property inspector with over 15 years of experience, I've witnessed firsthand how skipping professional inspections can lead to financial disaster.

The Real Cost of 'Minor' Issues:
Last month, I inspected a seemingly pristine property in Melbourne's eastern suburbs. The buyer was ready to settle within days, confident in their 'bargain' purchase. What we uncovered changed everything...

[Continue reading to learn about the critical inspection checklist that every property buyer needs, the most commonly overlooked issues that cost thousands in repairs, and how to protect your investment with professional expertise.]

Ready to make informed property decisions? Contact Owner Inspections for comprehensive inspection services across Australia.

#PropertyInvestment #RealEstate #PropertyInspection #Australia`
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4 font-degular">Social Media Kit</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
          Comprehensive social media assets to maintain brand consistency across all digital platforms and social channels.
        </p>
      </div>

      {/* Platform Assets */}
      <div className="grid lg:grid-cols-2 gap-8">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 font-degular">{platform.name}</h3>
                  <div className="space-y-2">
                    {platform.formats.map((format, idx) => (
                      <Badge key={idx} variant="outline" className="mr-2 mb-2 text-xs font-inter">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full font-inter">
                <Download className="w-4 h-4 mr-2" />
                Download {platform.name} Assets
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Content Guidelines */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6 font-degular">Content Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 font-degular">Brand Voice</h4>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• Professional yet approachable tone</li>
              <li>• Educational and informative content</li>
              <li>• Trustworthy and expert positioning</li>
              <li>• Customer-focused messaging</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 font-degular">Visual Standards</h4>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• Use consistent brand colors and fonts</li>
              <li>• High-quality professional imagery</li>
              <li>• Include logo in all branded content</li>
              <li>• Maintain clean, uncluttered designs</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Hashtag Guidelines */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6 font-degular">Hashtag Strategy</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hashtags.map((group, index) => (
            <div key={index}>
              <h4 className="font-semibold text-slate-700 mb-3 flex items-center font-degular">
                <Hash className="w-4 h-4 mr-2" />
                {group.category}
              </h4>
              <div className="space-y-2">
                {group.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="mr-2 mb-2 text-xs font-inter">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-inter">
            <strong className="font-degular">Tip:</strong> Use 3-5 hashtags per post for optimal engagement. Mix primary brand hashtags with relevant industry and location tags.
          </p>
        </div>
      </Card>

      {/* Social Media Captions */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6 font-degular">Social Media Captions</h3>
        <div className="space-y-6">
          
                     {/* YouTube Long */}
           <div className="p-4 border rounded-lg bg-red-50">
             <div className="flex items-center mb-3">
               <Youtube className="w-5 h-5 text-red-600 mr-2" />
               <h4 className="font-semibold text-slate-800 font-degular">YouTube Long</h4>
             </div>
             <div className="space-y-3">
               <div className="p-3 bg-white rounded border-l-4 border-red-500">
                 <p className="text-sm text-slate-700 font-inter leading-relaxed whitespace-pre-line">
                   {captions.youtubeLong}
                 </p>
               </div>
               <Button 
                 size="sm" 
                 variant={copiedItem === 'youtube-long' ? "default" : "outline"} 
                 className="w-full font-inter" 
                 onClick={() => copyToClipboard(captions.youtubeLong, 'youtube-long')}
               >
                 {copiedItem === 'youtube-long' ? (
                   <>
                     <Check className="w-4 h-4 mr-2" />
                     Copied!
                   </>
                 ) : (
                   <>
                     <FileText className="w-4 h-4 mr-2" />
                     Copy Caption
                   </>
                 )}
               </Button>
             </div>
           </div>

                     {/* YouTube Short */}
           <div className="p-4 border rounded-lg bg-red-50">
             <div className="flex items-center mb-3">
               <Youtube className="w-5 h-5 text-red-600 mr-2" />
               <h4 className="font-semibold text-slate-800 font-degular">YouTube Short</h4>
             </div>
             <div className="space-y-3">
               <div className="p-3 bg-white rounded border-l-4 border-red-500">
                 <p className="text-sm text-slate-700 font-inter whitespace-pre-line">
                   {captions.youtubeShort}
                 </p>
               </div>
               <Button 
                 size="sm" 
                 variant={copiedItem === 'youtube-short' ? "default" : "outline"} 
                 className="w-full font-inter" 
                 onClick={() => copyToClipboard(captions.youtubeShort, 'youtube-short')}
               >
                 {copiedItem === 'youtube-short' ? (
                   <>
                     <Check className="w-4 h-4 mr-2" />
                     Copied!
                   </>
                 ) : (
                   <>
                     <FileText className="w-4 h-4 mr-2" />
                     Copy Caption
                   </>
                 )}
               </Button>
             </div>
           </div>

                     {/* LinkedIn Post */}
           <div className="p-4 border rounded-lg bg-blue-50">
             <div className="flex items-center mb-3">
               <Linkedin className="w-5 h-5 text-blue-700 mr-2" />
               <h4 className="font-semibold text-slate-800 font-degular">LinkedIn Post</h4>
             </div>
             <div className="space-y-3">
               <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                 <p className="text-sm text-slate-700 font-inter whitespace-pre-line">
                   {captions.linkedinPost}
                 </p>
               </div>
               <Button 
                 size="sm" 
                 variant={copiedItem === 'linkedin-post' ? "default" : "outline"} 
                 className="w-full font-inter" 
                 onClick={() => copyToClipboard(captions.linkedinPost, 'linkedin-post')}
               >
                 {copiedItem === 'linkedin-post' ? (
                   <>
                     <Check className="w-4 h-4 mr-2" />
                     Copied!
                   </>
                 ) : (
                   <>
                     <FileText className="w-4 h-4 mr-2" />
                     Copy Caption
                   </>
                 )}
               </Button>
             </div>
           </div>

                     {/* LinkedIn Short */}
           <div className="p-4 border rounded-lg bg-blue-50">
             <div className="flex items-center mb-3">
               <Linkedin className="w-5 h-5 text-blue-700 mr-2" />
               <h4 className="font-semibold text-slate-800 font-degular">LinkedIn Short</h4>
             </div>
             <div className="space-y-3">
               <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                 <p className="text-sm text-slate-700 font-inter whitespace-pre-line">
                   {captions.linkedinShort}
                 </p>
               </div>
               <Button 
                 size="sm" 
                 variant={copiedItem === 'linkedin-short' ? "default" : "outline"} 
                 className="w-full font-inter" 
                 onClick={() => copyToClipboard(captions.linkedinShort, 'linkedin-short')}
               >
                 {copiedItem === 'linkedin-short' ? (
                   <>
                     <Check className="w-4 h-4 mr-2" />
                     Copied!
                   </>
                 ) : (
                   <>
                     <FileText className="w-4 h-4 mr-2" />
                     Copy Caption
                   </>
                 )}
               </Button>
             </div>
           </div>

                     {/* Instagram Posts and Reels */}
           <div className="p-4 border rounded-lg bg-pink-50">
             <div className="flex items-center mb-3">
               <Instagram className="w-5 h-5 text-pink-600 mr-2" />
               <h4 className="font-semibold text-slate-800 font-degular">Instagram Posts & Reels</h4>
             </div>
             <div className="space-y-3">
               <div className="p-3 bg-white rounded border-l-4 border-pink-500">
                 <p className="text-sm text-slate-700 font-inter whitespace-pre-line">
                   {captions.instagram}
                 </p>
               </div>
               <Button 
                 size="sm" 
                 variant={copiedItem === 'instagram' ? "default" : "outline"} 
                 className="w-full font-inter" 
                 onClick={() => copyToClipboard(captions.instagram, 'instagram')}
               >
                 {copiedItem === 'instagram' ? (
                   <>
                     <Check className="w-4 h-4 mr-2" />
                     Copied!
                   </>
                 ) : (
                   <>
                     <FileText className="w-4 h-4 mr-2" />
                     Copy Caption
                   </>
                 )}
               </Button>
             </div>
           </div>

                     {/* Reddit */}
           <div className="p-4 border rounded-lg bg-orange-50">
             <div className="flex items-center mb-3">
               <MessageSquare className="w-5 h-5 text-orange-600 mr-2" />
               <h4 className="font-semibold text-slate-800 font-degular">Reddit</h4>
             </div>
             <div className="space-y-3">
               <div className="p-3 bg-white rounded border-l-4 border-orange-500">
                 <p className="text-sm text-slate-700 font-inter whitespace-pre-line">
                   {captions.reddit}
                 </p>
               </div>
               <Button 
                 size="sm" 
                 variant={copiedItem === 'reddit' ? "default" : "outline"} 
                 className="w-full font-inter" 
                 onClick={() => copyToClipboard(captions.reddit, 'reddit')}
               >
                 {copiedItem === 'reddit' ? (
                   <>
                     <Check className="w-4 h-4 mr-2" />
                     Copied!
                   </>
                 ) : (
                   <>
                     <FileText className="w-4 h-4 mr-2" />
                     Copy Caption
                   </>
                 )}
               </Button>
             </div>
           </div>

                     {/* Medium */}
           <div className="p-4 border rounded-lg bg-slate-50">
             <div className="flex items-center mb-3">
               <FileText className="w-5 h-5 text-slate-700 mr-2" />
               <h4 className="font-semibold text-slate-800 font-degular">Medium</h4>
             </div>
             <div className="space-y-3">
               <div className="p-3 bg-white rounded border-l-4 border-slate-500">
                 <p className="text-sm text-slate-700 font-inter whitespace-pre-line">
                   {captions.medium}
                 </p>
               </div>
               <Button 
                 size="sm" 
                 variant={copiedItem === 'medium' ? "default" : "outline"} 
                 className="w-full font-inter" 
                 onClick={() => copyToClipboard(captions.medium, 'medium')}
               >
                 {copiedItem === 'medium' ? (
                   <>
                     <Check className="w-4 h-4 mr-2" />
                     Copied!
                   </>
                 ) : (
                   <>
                     <FileText className="w-4 h-4 mr-2" />
                     Copy Caption
                   </>
                 )}
               </Button>
             </div>
           </div>

        </div>
        
        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-800 font-inter">
            <strong className="font-degular">Note:</strong> These captions are templates that should be customized for specific content, current events, or seasonal campaigns. Always include relevant calls-to-action and ensure compliance with each platform's guidelines.
          </p>
        </div>
      </Card>


    </div>
  );
};

export default SocialMediaKit;
