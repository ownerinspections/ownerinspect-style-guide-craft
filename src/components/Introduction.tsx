
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Compass, Lightbulb, Users, BookOpen, Crown } from "lucide-react";

const Introduction = () => {
  const sections = [
    {
      id: "vision",
      title: "Vision",
      icon: Target,
      content: "To be Australia's most trusted property inspection service, empowering property owners with comprehensive insights and peace of mind.",
      color: "bg-blue-800"
    },
    {
      id: "mission",
      title: "Mission",
      icon: Heart,
      content: "We provide thorough, professional property inspections using cutting-edge technology and expertise to help property owners make informed decisions.",
      color: "bg-orange-500"
    },
    {
      id: "values",
      title: "Core Values",
      icon: Compass,
      content: "Integrity, Excellence, Reliability, Innovation, Customer Focus",
      color: "bg-blue-600"
    },
    {
      id: "strategy",
      title: "Brand Strategy",
      icon: Lightbulb,
      content: "Position Owner Inspections as the premium choice for property inspections through expertise, technology, and exceptional service delivery.",
      color: "bg-orange-600"
    },
    {
      id: "personality",
      title: "Brand Personality",
      icon: Users,
      content: "Professional, Trustworthy, Innovative, Approachable, Detail-oriented, Reliable",
      color: "bg-slate-700"
    },
    {
      id: "story",
      title: "Brand Story",
      icon: BookOpen,
      content: "Founded on the principle that every property owner deserves complete transparency and professional expertise when making important property decisions.",
      color: "bg-blue-700"
    },
    {
      id: "archetype",
      title: "Brand Archetype",
      icon: Crown,
      content: "The Expert - Authoritative, knowledgeable, and dedicated to providing the highest quality professional services.",
      color: "bg-orange-700"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-800 to-orange-500 bg-clip-text text-transparent mb-6">
            Owner Inspections
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-600 mb-8">
            Brand Guidelines & Identity
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            A comprehensive guide to maintaining consistency and excellence in the Owner Inspections brand identity across all touchpoints.
          </p>
          <div className="mt-8 flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Version 1.0 • 2024
            </Badge>
          </div>
        </div>
      </section>

      {/* Introduction Sections */}
      <div className="grid gap-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.id} className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 ${section.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Brand Essence Summary */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-dashed border-blue-200">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Brand Essence</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">What We Do</h4>
            <p className="text-slate-600">Professional Property Inspections</p>
          </div>
          <div>
            <h4 className="font-semibold text-orange-600 mb-2">How We Do It</h4>
            <p className="text-slate-600">With Expertise & Technology</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">Why It Matters</h4>
            <p className="text-slate-600">Peace of Mind for Property Owners</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Introduction;
