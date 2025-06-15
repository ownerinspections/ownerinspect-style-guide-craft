
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
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
                  <p className="text-slate-600 mb-3">{item.description}</p>
                  <Badge variant="outline" className="text-xs">{item.format}</Badge>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 mb-4">
                <div className="bg-white rounded border p-4 text-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-800 to-orange-500 rounded mx-auto mb-2"></div>
                  <div className="text-sm text-slate-600 mb-2">Owner Inspections</div>
                  <div className="text-xs text-slate-400">{item.preview}</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download HTML
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  View Demo
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Email Guidelines */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Email Design Guidelines</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">Header Logo</span>
              <Badge style={{ backgroundColor: "#1e40af", color: "white" }}>Required</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm">Brand Colors</span>
              <Badge style={{ backgroundColor: "#ea580c", color: "white" }}>Primary</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm">Professional Tone</span>
              <Badge variant="outline">Essential</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Technical Specifications</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm">Max Width</span>
              <Badge variant="outline">600px</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm">Mobile Responsive</span>
              <Badge variant="outline">Required</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm">Image Format</span>
              <Badge variant="outline">PNG/JPG</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DigitalKit;
