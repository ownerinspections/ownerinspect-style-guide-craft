
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Smartphone, Monitor, Printer, Mail, CreditCard } from "lucide-react";

const Applications = () => {
  const applications = [
    {
      icon: Monitor,
      title: "Website & Digital",
      description: "Responsive web design, social media, and digital marketing materials",
      examples: ["Homepage design", "Service pages", "Contact forms", "Social media posts"],
      color: "bg-blue-800"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Mobile application interface and user experience design",
      examples: ["App interface", "Booking system", "Report viewing", "Push notifications"],
      color: "bg-orange-500"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Reports, proposals, and official documentation",
      examples: ["Inspection reports", "Service proposals", "Contracts", "Certificates"],
      color: "bg-slate-700"
    },
    {
      icon: Printer,
      title: "Print Materials",
      description: "Business cards, brochures, and marketing collateral",
      examples: ["Business cards", "Service brochures", "Letterheads", "Vehicle signage"],
      color: "bg-blue-600"
    },
    {
      icon: Mail,
      title: "Email & Communications",
      description: "Email templates, newsletters, and automated communications",
      examples: ["Email signatures", "Newsletter templates", "Booking confirmations", "Follow-up emails"],
      color: "bg-orange-600"
    },
    {
      icon: CreditCard,
      title: "Marketing Materials",
      description: "Advertising, promotional items, and brand merchandise",
      examples: ["Google Ads", "Facebook campaigns", "Promotional flyers", "Branded merchandise"],
      color: "bg-slate-600"
    }
  ];

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4 font-degular">Brand Applications</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
          Consistent application of the Owner Inspections brand across all touchpoints 
          ensures recognition and builds trust with our customers.
        </p>
      </div>

      {/* Application Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <app.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-degular">{app.title}</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed font-inter">{app.description}</p>
                <div className="space-y-1">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="text-xs text-slate-500 flex items-center font-inter">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Brand Standards */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-orange-50">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6 font-degular">Application Standards</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 font-degular">Core Requirements</h4>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• Logo must be visible and properly sized</li>
              <li>• Use approved color palette consistently</li>
              <li>• Maintain typography hierarchy</li>
              <li>• Ensure brand message clarity</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 font-degular">Quality Standards</h4>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• High-resolution images and graphics</li>
              <li>• Professional tone and language</li>
              <li>• Consistent spacing and alignment</li>
              <li>• Review process before publication</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Usage Examples */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center font-degular">Brand in Action</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Website Example */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-xl mb-4 min-h-[200px] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-800 to-orange-500 rounded-lg"></div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-800 rounded w-3/4 mx-auto"></div>
                <div className="h-2 bg-slate-300 rounded w-full"></div>
                <div className="h-2 bg-slate-300 rounded w-2/3 mx-auto"></div>
              </div>
              <Button size="sm" className="mt-4 bg-orange-500 hover:bg-orange-600">
                Book Inspection
              </Button>
            </div>
            <h4 className="font-semibold text-slate-800 font-degular">Website Header</h4>
            <p className="text-sm text-slate-500 font-inter">Clean, professional web presence</p>
          </div>

          {/* Business Card Example */}
          <div className="text-center">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-xl mb-4 min-h-[200px] flex flex-col justify-between shadow-lg">
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-800 to-orange-500 rounded"></div>
              </div>
              <div className="text-left space-y-1">
                <div className="text-xs font-bold text-slate-800 font-degular">Owner Inspections</div>
                <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                <div className="h-1 bg-slate-200 rounded w-1/2"></div>
                <div className="h-1 bg-orange-500 rounded w-2/3"></div>
              </div>
            </div>
            <h4 className="font-semibold text-slate-800 font-degular">Business Card</h4>
            <p className="text-sm text-slate-500 font-inter">Professional networking tool</p>
          </div>

          {/* Report Example */}
          <div className="text-center">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-xl mb-4 min-h-[200px] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-800 to-orange-500 rounded"></div>
                <div className="text-xs text-slate-500">Report #001</div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-blue-800 rounded w-2/3"></div>
                <div className="h-1 bg-slate-200 rounded w-full"></div>
                <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                <div className="h-1 bg-slate-200 rounded w-5/6"></div>
                <div className="flex justify-between mt-2">
                  <div className="w-8 h-6 bg-orange-500 rounded text-[8px] text-white flex items-center justify-center">PASS</div>
                  <div className="w-8 h-6 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>
            <h4 className="font-semibold text-slate-800 font-degular">Inspection Report</h4>
            <p className="text-sm text-slate-500 font-inter">Branded documentation</p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Applications;
