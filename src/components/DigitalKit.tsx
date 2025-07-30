
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, CreditCard, FileText, Receipt, Calculator, User } from "lucide-react";

const DigitalKit = () => {
  const digitalItems = [
    {
      title: "Vcard",
      description: "Digital business card for easy contact sharing",
      icon: User,
      format: "VCF Format • QR Code Included",
      preview: "Digital contact card with logo and contact information"
    },
    {
      title: "Email Signature",
      description: "Professional email signature template",
      icon: Mail,
      format: "HTML Format • Multiple Layouts",
      preview: "Branded signature with contact details and social links"
    },
    {
      title: "General Email Template",
      description: "Standard email template for communications",
      icon: Mail,
      format: "HTML • Responsive Design",
      preview: "Clean layout with header, content area, and footer"
    },
    {
      title: "Payment Receipt Email",
      description: "Automated payment confirmation template",
      icon: Receipt,
      format: "HTML • Variable Content",
      preview: "Receipt details with branding and payment information"
    },
    {
      title: "Quote Email Template",
      description: "Professional quote delivery template",
      icon: Calculator,
      format: "HTML • PDF Attachment Ready",
      preview: "Quote presentation with terms and conditions"
    },
    {
      title: "Invoice Email Template",
      description: "Invoice delivery and reminder template",
      icon: FileText,
      format: "HTML • Payment Link Integration",
      preview: "Invoice details with payment instructions"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Digital Kit</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
          Digital assets and templates for online communications, ensuring brand consistency across all digital touchpoints.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {digitalItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-orange-500 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-3 font-inter">{item.description}</p>
                  <Badge variant="outline" className="text-xs font-inter">{item.format}</Badge>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 mb-4">
                <div className="bg-white rounded border p-4 text-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-800 to-orange-500 rounded mx-auto mb-2"></div>
                  <div className="text-sm text-slate-600 mb-2 font-inter">Owner Inspections</div>
                  <div className="text-xs text-slate-400 font-inter">{item.preview}</div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full font-inter">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Usage Guidelines */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6">Digital Asset Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Email Best Practices</h4>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• Use consistent branding across all email communications</li>
              <li>• Maintain professional tone and language</li>
              <li>• Include clear call-to-action buttons</li>
              <li>• Ensure templates are mobile-responsive</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Technical Requirements</h4>
            <ul className="space-y-2 text-slate-600 font-inter">
              <li>• HTML templates compatible with major email clients</li>
              <li>• Optimized file sizes for quick loading</li>
              <li>• Variable content areas for customization</li>
              <li>• Fallback fonts for maximum compatibility</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DigitalKit;
