import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Mail, User, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignatureData {
  closing: string;
  name: string;
  position: string;
  company: string;
  description: string;
  whatsappNumber: string;
  email: string;
  enabled: {
    closing: boolean;
    name: boolean;
    position: boolean;
    company: boolean;
    description: boolean;
    whatsappNumber: boolean;
    email: boolean;
  };
}

const EmailSignature = () => {
  const [copied, setCopied] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [desktopHTML, setDesktopHTML] = useState("");
  const [tabletHTML, setTabletHTML] = useState("");
  const [mobileHTML, setMobileHTML] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { toast } = useToast();

  const [formData, setFormData] = useState<SignatureData>({
    closing: "Kind regards,",
    name: "Maison Azdari",
    position: "Director",
    company: "OWNER INSPECTIONS PTY. LTD.",
    description: `Executive Committee Member, ASBC NSW | Member, SCA NSW
Accredited SBBIS Inspector, NSW Fair Trading | Building Consultant & Expert Witness, NSW, VIC, QLD
B.Eng Civil Engineering | Licensed Builder (NSW: 366172C | VIC: DBU-41642 | QLD: 15151453)
Registered Building Inspector (QLD: 15151453) | Certified Termite Inspector`,
    whatsappNumber: "+61 888 888 888",
    email: "maison.a@ownerinspections.com.au",
    enabled: {
      closing: true,
      name: true,
      position: true,
      company: true,
      description: true,
      whatsappNumber: true,
      email: true,
    }
  });

  const handleInputChange = (field: keyof Omit<SignatureData, 'enabled'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggle = (field: keyof SignatureData['enabled']) => {
    setFormData(prev => ({
      ...prev,
      enabled: {
        ...prev.enabled,
        [field]: !prev.enabled[field]
      }
    }));
  };

  const generateEmailSignature = () => {
    const { closing, name, position, company, description, whatsappNumber, email, enabled } = formData;
    
    const emailSignatureHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Owner Inspections - Email Signature</title>
</head>
<body>
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #333333;">
  <p style="margin: 0 0 10px 0;">
    <strong>${enabled.closing ? closing : ''}</strong><br>
    &nbsp;
  </p>
  
  <!-- Desktop Layout -->
  <div style="display: inline-block; vertical-align: top; margin-right: 20px;">
    <div style="margin-bottom: 5px;">
      <strong style="font-size: 24px; color: #0b487b; margin: 0;">${enabled.name ? name : ''}</strong>
    </div>
    <div style="margin-bottom: 15px;">
      <strong style="font-size: 14px; margin: 0;">${enabled.position ? position : ''}</strong>
    </div>
    <div style="margin-top: 8px;">
      <a href="https://linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Linkedin.png" style="height: 24px; width: 24px; border: none;" alt="LinkedIn">
      </a>
      <a href="https://youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Youtube.png" style="height: 24px; width: 24px; border: none;" alt="YouTube">
      </a>
      <a href="https://facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Facebook.png" style="height: 24px; width: 24px; border: none;" alt="Facebook">
      </a>
      <a href="https://instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Instagram.png" style="height: 24px; width: 24px; border: none;" alt="Instagram">
      </a>
      <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Medium.png" style="height: 24px; width: 24px; border: none;" alt="Medium">
      </a>
      <a href="https://reddit.com/user/ownerinspections" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Reddit.png" style="height: 24px; width: 24px; border: none;" alt="Reddit">
      </a>
    </div>
  </div>
  
  <div style="display: inline-block; width: 1px; height: 80px; background-color: #0b487b; margin: 0 20px; vertical-align: top;"></div>
  
  <div style="display: inline-block; vertical-align: top;">
    <div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Phone.png" style="height: 16px; width: 16px; margin-right: 8px; vertical-align: middle; border: none;" alt="Phone">
      1300 471 805${enabled.whatsappNumber ? ` | 
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Whatsapp.png" style="height: 16px; width: 16px; margin-left: 8px; margin-right: 8px; vertical-align: middle; border: none;" alt="WhatsApp">
      ${whatsappNumber}` : ''}
    </div>
    ${enabled.email ? `<div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Massage.png" style="height: 16px; width: 16px; margin-right: 8px; vertical-align: middle; border: none;" alt="Email">
      <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" style="color: #333333; text-decoration: none;">${email}</a>
    </div>` : ''}
    <div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Web.png" style="height: 16px; width: 16px; margin-right: 8px; vertical-align: middle; border: none;" alt="Website">
      <a href="https://ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color: #333333; text-decoration: none;">www.ownerinspections.com.au</a>
    </div>
    <div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Pin.png" style="height: 16px; width: 16px; margin-right: 8px; vertical-align: middle; border: none;" alt="Address">
      Level 8, 97 Pacific Hwy, North Sydney, NSW 2065
    </div>
  </div>
  
  <hr style="border: none; height: 1px; background-color: #0b487b; margin: 15px 0 10px 0; width: 100%;">
  
  ${enabled.description ? `<div style="margin-top: 10px; line-height: 1.2; color: #2c9bd6;">
    ${description.split('\n').map(line => `<div style="margin-bottom: 2px; font-size: 11px;">${line}</div>`).join('')}
  </div>` : ''}
  
  <div style="margin-top: 10px;">
    <div style="margin-bottom: 5px;">
      <a href="https://verify.licence.nsw.gov.au/details/Contractor%20Licence/1-3N7CE4X" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/nsw-gov.png" alt="NSW Government Licence" style="height: 60px; width: auto; border: none;">
      </a>
      <a href="https://www.onlineservices.qbcc.qld.gov.au/OnlineLicenceSearch/VisualElements/ShowDetailResultContent.aspx?LicNO=15249792&name=&firstName=&licCat=LIC&searchType=Contractor" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/qbcc.png" alt="QBCC Licence" style="height: 60px; width: auto; border: none;">
      </a>
      <a href="https://bams.vba.vic.gov.au/bams/s/practitioner-detail?inputParams=zcTxTUWVcpMyC5oukumULdqpYzjywoorAYPb19uGLRZLvYJjzfh9fMlAvwbNGRpB" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/bpc.png" alt="Building Practitioners Board" style="height: 60px; width: auto; border: none;">
      </a>
    </div>
    <div>
      <a href="https://asbc.com.au/members/maison-azdari/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/au-society.png" alt="Australian Society of Building Consultants" style="height: 60px; width: auto; border: none;">
      </a>
      <a href="https://www.google.com/maps/search/owner+inspections/@-32.5397158,143.7071653,6z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/google-reviews.png" alt="Google Reviews" style="height: 60px; width: auto; border: none;">
      </a>
      <a href="https://www.productreview.com.au/listings/owner-inspections" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/product-review.png" alt="Product Review" style="height: 60px; width: auto; border: none;">
      </a>
    </div>
  </div>
</div>
</body>
</html>`;

    const desktopHTML = emailSignatureHTML;
    const tabletHTML = generateTabletHTML();
    const mobileHTML = generateMobileHTML();
    
    setDesktopHTML(desktopHTML);
    setTabletHTML(tabletHTML);
    setMobileHTML(mobileHTML);
    setGeneratedHTML(desktopHTML); // Default to desktop
    setShowPreview(true);
    
    toast({
      title: "Email signatures generated!",
      description: "Your custom email signatures have been created for all devices.",
    });
  };

  const generateMobileHTML = () => {
    const { closing, name, position, company, description, whatsappNumber, email, enabled } = formData;
    
    const mobileHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Owner Inspections - Email Signature (Mobile)</title>
</head>
<body>
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #333333;">
  <p style="margin: 0 0 10px 0;">
    <strong>${enabled.closing ? closing : ''}</strong><br>
    &nbsp;
  </p>
  
  <!-- Mobile Layout - Stacked -->
  <div style="margin-bottom: 15px;">
    <div style="margin-bottom: 5px;">
      <strong style="font-size: 18px; color: #0b487b; margin: 0;">${enabled.name ? name : ''}</strong>
    </div>
    <div style="margin-bottom: 15px;">
      <strong style="font-size: 11px; margin: 0;">${enabled.position ? position : ''}</strong>
    </div>
  </div>
  
  <div style="margin-bottom: 15px;">
    <div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Phone.png" style="height: 12px; width: 12px; margin-right: 8px; vertical-align: middle; border: none;" alt="Phone">
      1300 471 805${enabled.whatsappNumber ? ` | 
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Whatsapp.png" style="height: 12px; width: 12px; margin-left: 8px; margin-right: 8px; vertical-align: middle; border: none;" alt="WhatsApp">
      ${whatsappNumber}` : ''}
    </div>
    ${enabled.email ? `<div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Massage.png" style="height: 12px; width: 12px; margin-right: 8px; vertical-align: middle; border: none;" alt="Email">
      <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" style="color: #333333; text-decoration: none;">${email}</a>
    </div>` : ''}
    <div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Web.png" style="height: 12px; width: 12px; margin-right: 8px; vertical-align: middle; border: none;" alt="Website">
      <a href="https://ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color: #333333; text-decoration: none;">www.ownerinspections.com.au</a>
    </div>
    <div style="margin-bottom: 15px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Pin.png" style="height: 12px; width: 12px; margin-right: 8px; vertical-align: middle; border: none;" alt="Address">
      Level 8, 97 Pacific Hwy, North Sydney, NSW 2065
    </div>
    
    <!-- Social Media Icons Under Address -->
    <div style="margin-top: 10px;">
      <a href="https://linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Linkedin.png" style="height: 24px; width: 24px; border: none;" alt="LinkedIn">
      </a>
      <a href="https://youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Youtube.png" style="height: 24px; width: 24px; border: none;" alt="YouTube">
      </a>
      <a href="https://facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Facebook.png" style="height: 24px; width: 24px; border: none;" alt="Facebook">
      </a>
      <a href="https://instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Instagram.png" style="height: 24px; width: 24px; border: none;" alt="Instagram">
      </a>
      <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Medium.png" style="height: 24px; width: 24px; border: none;" alt="Medium">
      </a>
      <a href="https://reddit.com/user/ownerinspections" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Reddit.png" style="height: 24px; width: 24px; border: none;" alt="Reddit">
      </a>
    </div>
  </div>
  
  <hr style="border: none; height: 1px; background-color: #0b487b; margin: 15px 0 10px 0; width: 100%;">
  
  ${enabled.description ? `<div style="margin-top: 10px; line-height: 1.2; color: #2c9bd6;">
    ${description.split('\n').map(line => `<div style="margin-bottom: 2px; font-size: 8px;">${line}</div>`).join('')}
  </div>` : ''}
  
  <div style="margin-top: 10px;">
    <div style="margin-bottom: 5px;">
      <a href="https://verify.licence.nsw.gov.au/details/Contractor%20Licence/1-3N7CE4X" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/nsw-gov.png" alt="NSW Government Licence" style="height: 40px; width: auto; border: none;">
      </a>
      <a href="https://www.onlineservices.qbcc.qld.gov.au/OnlineLicenceSearch/VisualElements/ShowDetailResultContent.aspx?LicNO=15249792&name=&firstName=&licCat=LIC&searchType=Contractor" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/qbcc.png" alt="QBCC Licence" style="height: 40px; width: auto; border: none;">
      </a>
      <a href="https://bams.vba.vic.gov.au/bams/s/practitioner-detail?inputParams=zcTxTUWVcpMyC5oukumULdqpYzjywoorAYPb19uGLRZLvYJjzfh9fMlAvwbNGRpB" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/bpc.png" alt="Building Practitioners Board" style="height: 40px; width: auto; border: none;">
      </a>
    </div>
    <div>
      <a href="https://asbc.com.au/members/maison-azdari/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/au-society.png" alt="Australian Society of Building Consultants" style="height: 40px; width: auto; border: none;">
      </a>
      <a href="https://www.google.com/maps/search/owner+inspections/@-32.5397158,143.7071653,6z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/google-reviews.png" alt="Google Reviews" style="height: 40px; width: auto; border: none;">
      </a>
      <a href="https://www.productreview.com.au/listings/owner-inspections" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/product-review.png" alt="Product Review" style="height: 40px; width: auto; border: none;">
      </a>
    </div>
  </div>
</div>
</body>
</html>`;

    return mobileHTML;
  };

  const generateTabletHTML = () => {
    const { closing, name, position, company, description, whatsappNumber, email, enabled } = formData;
    
    const tabletHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Owner Inspections - Email Signature (Tablet)</title>
</head>
<body>
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #333333;">
  <p style="margin: 0 0 10px 0;">
    <strong>${enabled.closing ? closing : ''}</strong><br>
    &nbsp;
  </p>
  
  <!-- Tablet Layout - Side by Side -->
  <div style="display: inline-block; vertical-align: top; margin-right: 20px;">
    <div style="margin-bottom: 5px;">
      <strong style="font-size: 20px; color: #0b487b; margin: 0;">${enabled.name ? name : ''}</strong>
    </div>
    <div style="margin-bottom: 15px;">
      <strong style="font-size: 12px; margin: 0;">${enabled.position ? position : ''}</strong>
    </div>
    <div style="margin-top: 8px;">
      <a href="https://linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Linkedin.png" style="height: 20px; width: 20px; border: none;" alt="LinkedIn">
      </a>
      <a href="https://youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Youtube.png" style="height: 20px; width: 20px; border: none;" alt="YouTube">
      </a>
      <a href="https://facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Facebook.png" style="height: 20px; width: 20px; border: none;" alt="Facebook">
      </a>
      <a href="https://instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Instagram.png" style="height: 20px; width: 20px; border: none;" alt="Instagram">
      </a>
      <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right: 12px; text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Medium.png" style="height: 20px; width: 20px; border: none;" alt="Medium">
      </a>
      <a href="https://reddit.com/user/ownerinspections" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Reddit.png" style="height: 20px; width: 20px; border: none;" alt="Reddit">
      </a>
    </div>
  </div>
  
  <div style="display: inline-block; width: 1px; height: 80px; background-color: #0b487b; margin: 0 20px; vertical-align: top;"></div>
  
  <div style="display: inline-block; vertical-align: top;">
    <div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Phone.png" style="height: 14px; width: 14px; margin-right: 8px; vertical-align: middle; border: none;" alt="Phone">
      1300 471 805${enabled.whatsappNumber ? ` | 
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Whatsapp.png" style="height: 14px; width: 14px; margin-left: 8px; margin-right: 8px; vertical-align: middle; border: none;" alt="WhatsApp">
      ${whatsappNumber}` : ''}
    </div>
    ${enabled.email ? `<div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Massage.png" style="height: 14px; width: 14px; margin-right: 8px; vertical-align: middle; border: none;" alt="Email">
      <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" style="color: #333333; text-decoration: none;">${email}</a>
    </div>` : ''}
    <div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Web.png" style="height: 14px; width: 14px; margin-right: 8px; vertical-align: middle; border: none;" alt="Website">
      <a href="https://ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color: #333333; text-decoration: none;">www.ownerinspections.com.au</a>
    </div>
    <div style="margin-bottom: 8px; line-height: 1.4;">
      <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Pin.png" style="height: 14px; width: 14px; margin-right: 8px; vertical-align: middle; border: none;" alt="Address">
      Level 8, 97 Pacific Hwy, North Sydney, NSW 2065
    </div>
  </div>
  
  <hr style="border: none; height: 1px; background-color: #0b487b; margin: 15px 0 10px 0; width: 50%;">
  
  ${enabled.description ? `<div style="margin-top: 10px; line-height: 1.2; color: #2c9bd6;">
    ${description.split('\n').map(line => `<div style="margin-bottom: 2px; font-size: 10px;">${line}</div>`).join('')}
  </div>` : ''}
  
  <div style="margin-top: 10px;">
    <div style="margin-bottom: 5px;">
      <a href="https://verify.licence.nsw.gov.au/details/Contractor%20Licence/1-3N7CE4X" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/nsw-gov.png" alt="NSW Government Licence" style="height: 60px; width: auto; border: none;">
      </a>
      <a href="https://www.onlineservices.qbcc.qld.gov.au/OnlineLicenceSearch/VisualElements/ShowDetailResultContent.aspx?LicNO=15249792&name=&firstName=&licCat=LIC&searchType=Contractor" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/qbcc.png" alt="QBCC Licence" style="height: 60px; width: auto; border: none;">
      </a>
      <a href="https://bams.vba.vic.gov.au/bams/s/practitioner-detail?inputParams=zcTxTUWVcpMyC5oukumULdqpYzjywoorAYPb19uGLRZLvYJjzfh9fMlAvwbNGRpB" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/bpc.png" alt="Building Practitioners Board" style="height: 60px; width: auto; border: none;">
      </a>
    </div>
    <div>
      <a href="https://asbc.com.au/members/maison-azdari/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/au-society.png" alt="Australian Society of Building Consultants" style="height: 60px; width: auto; border: none;">
      </a>
      <a href="https://www.google.com/maps/search/owner+inspections/@-32.5397158,143.7071653,6z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/google-reviews.png" alt="Google Reviews" style="height: 60px; width: auto; border: none;">
      </a>
      <a href="https://www.productreview.com.au/listings/owner-inspections" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/product-review.png" alt="Product Review" style="height: 60px; width: auto; border: none;">
      </a>
    </div>
  </div>
</div>
</body>
</html>`;

    return tabletHTML;
  };

  const copyToClipboard = async () => {
    if (!generatedHTML) {
      toast({
        title: "No signature to copy",
        description: "Please generate a signature first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedHTML);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Email signature HTML has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyDesktopHTML = async () => {
    if (!desktopHTML) {
      toast({
        title: "No desktop signature to copy",
        description: "Please generate signatures first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(desktopHTML);
      toast({
        title: "Desktop HTML copied!",
        description: "Desktop email signature HTML has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy desktop HTML to clipboard.",
        variant: "destructive",
      });
    }
  };

  const copyTabletHTML = async () => {
    if (!tabletHTML) {
      toast({
        title: "No tablet signature to copy",
        description: "Please generate signatures first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(tabletHTML);
      toast({
        title: "Tablet HTML copied!",
        description: "Tablet email signature HTML has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy tablet HTML to clipboard.",
        variant: "destructive",
      });
    }
  };

  const copyMobileHTML = async () => {
    if (!mobileHTML) {
      toast({
        title: "No mobile signature to copy",
        description: "Please generate signatures first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(mobileHTML);
      toast({
        title: "Mobile HTML copied!",
        description: "Mobile email signature HTML has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy mobile HTML to clipboard.",
        variant: "destructive",
      });
    }
  };

  const renderPreview = () => {
    const { closing, name, position, company, description, whatsappNumber, email, enabled } = formData;
    
    const previewHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Owner Inspections - Email Signature</title>
  <style>
    @media screen and (min-width: 769px) {
      .certificate-container { max-width: 50% !important; }
      .certificate-container img { max-height: 80px !important; }
    }
    @media screen and (max-width: 768px) {
      .certificate-container { max-width: 50% !important; gap: 0px !important; }
      .certificate-container img { max-height: 60px !important; }
      .hr-line { width: 50% !important; }
      .signature { font-size: 12px !important; }
      .name-text { font-size: 20px !important; }
      .position-text { font-size: 12px !important; }
      .social-icons img { height: 20px !important; width: 20px !important; }
      .contact-info img { height: 14px !important; width: 14px !important; }
      .description-text { font-size: 10px !important; }
    }
    @media screen and (max-width: 480px) {
      .certificate-container { max-width: 95% !important; gap: 0.5px !important; }
      .hr-line { width: 95% !important; }
      .signature { font-size: 11px !important; }
      .name-text { font-size: 18px !important; }
      .position-text { font-size: 11px !important; }
      .social-icons img { height: 18px !important; width: 18px !important; }
      .contact-info img { height: 12px !important; width: 12px !important; }
      .description-text { font-size: 8px !important; }
      .main-container { flex-direction: column !important; gap: 15px !important; align-items: flex-start !important; }
      .main-container > div:first-child { order: 1 !important; width: 100% !important; }
      .main-container > div:last-child { order: 2 !important; width: 100% !important; }
      .main-container > div:nth-child(2) { display: none !important; }
      .main-container .social-icons { display: none !important; }
      .social-icons-mobile { display: flex !important; }
      .social-icons-mobile img { height: 24px !important; width: 24px !important; }
    }
  </style>
</head>
<body>
<div class="signature" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px;">
  <div class="contact">
      <p>
          <strong>${enabled.closing ? closing : ''}</strong><br>
          &nbsp;
      </p>
      <div class="main-container" style="align-items:center;display:flex;gap:15px;">
                      <div style="display:flex;flex-direction:column;justify-content:center;">            
              <strong class="name-text" style="margin-bottom:2px; font-size:24px; color: #0b487b;">${enabled.name ? name : ''}</strong>
              <div class="position-text" style="margin-bottom:22px; font-size:14px;"><strong>${enabled.position ? position : ''}</strong></div>
              <div class="social-icons" style="align-items:center;display:flex;margin-top:8px;">
                <a href="https://linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Linkedin.png" style="height:24px;width:24px;" alt="LinkedIn">
                </a>
                <a href="https://youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Youtube.png" style="height:24px;width:24px;" alt="YouTube">
                </a>
                <a href="https://facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Facebook.png" style="height:24px;width:24px;" alt="Facebook">
                </a>
                <a href="https://instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Instagram.png" style="height:24px;width:24px;" alt="Instagram">
                </a>
                <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Medium.png" style="height:24px;width:24px;" alt="Medium">
                </a>
                <a href="https://reddit.com/user/ownerinspections" target="_blank" rel="noopener noreferrer">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Reddit.png" style="height:24px;width:24px;" alt="Reddit">
                </a>
            </div>
          </div>
          <div style="width:1px;height:80px;background-color:#0b487b;margin:0 4px;"></div>
          <div class="contact-info" style="display:flex;flex-direction:column;gap:8px;justify-content:center;">
              <div style="align-items:center;display:flex;">
                  <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Phone.png" style="height:16px;width:16px;margin-right:8px;" alt="Phone">
                  1300 471 805${enabled.whatsappNumber ? ` | 
                  <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Whatsapp.png" style="height:16px;width:16px;margin-left:8px;margin-right:8px;" alt="WhatsApp">
                  ${whatsappNumber}` : ''}
              </div>
              ${enabled.email ? `<div style="align-items:center;display:flex;">
                  <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Massage.png" style="height:16px;width:16px;margin-right:8px;" alt="Email">
                  <a style="border-bottom:2px solid transparent;color:#333333;padding-bottom:1px;text-decoration:none;transition:all 0.3s ease;" href="mailto:${email}" target="_blank" rel="noopener noreferrer">${email}</a>
              </div>` : ''}
              <div style="align-items:center;display:flex;">
                  <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Web.png" style="height:16px;width:16px;margin-right:8px;" alt="Website">
                  <a target="_blank" rel="noopener noreferrer" href="https://ownerinspections.com.au">www.ownerinspections.com.au</a>
              </div>
              <div style="align-items:center;display:flex;">
                  <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Pin.png" style="height:16px;width:16px;margin-right:8px;" alt="Address">
                  Level 8, 97 Pacific Hwy, North Sydney, NSW 2065
              </div>
              <div class="social-icons-mobile" style="align-items:center;display:flex;margin-top:8px;display:none;">
                <a href="https://linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Linkedin.png" style="height:20px;width:20px;" alt="LinkedIn">
                </a>
                <a href="https://youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Youtube.png" style="height:20px;width:20px;" alt="YouTube">
                </a>
                <a href="https://facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Facebook.png" style="height:20px;width:20px;" alt="Facebook">
                </a>
                <a href="https://instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Instagram.png" style="height:20px;width:20px;" alt="Instagram">
                </a>
                <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="margin-right:12px;">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Medium.png" style="height:20px;width:20px;" alt="Medium">
                </a>
                <a href="https://reddit.com/user/ownerinspections" target="_blank" rel="noopener noreferrer">
                    <img src="https://bb.owner-inspections.com.au/lovable-uploads/socialmedia-icons/Reddit.png" style="height:20px;width:20px;" alt="Reddit">
                </a>
            </div>
          </div>
      </div>
      <hr class="hr-line" style="border: none; height: 1px; background-color: #0b487b; margin-top: 4px; margin-left: 0; width: 50%; max-width: 300px;">
      ${enabled.description ? `<div class="description-text" style="margin-top: 1px; line-height: 1.2; color: #2c9bd6;">
          ${description.split('\n').map(line => `<div style="margin-bottom: 1px; font-size:11px;">${line}</div>`).join('')}
      </div>` : ''}
      
      <!-- Certificate Images Row 1 -->
      <div class="certificate-container" style="display: flex; justify-content: flex-start; margin-top: 2px; gap: 2px; max-width: 50%; overflow-x: hidden;">
          <a href="https://verify.licence.nsw.gov.au/details/Contractor%20Licence/1-3N7CE4X" target="_blank" rel="noopener noreferrer" style="text-align: center; flex: 1; max-width: calc(33.33% - 1.33px);">
              <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/nsw-gov.png" alt="NSW Government Licence" style="width: 100%; height: auto; max-height: 80px; object-fit: contain;">
          </a>
          <a href="https://www.onlineservices.qbcc.qld.gov.au/OnlineLicenceSearch/VisualElements/ShowDetailResultContent.aspx?LicNO=15249792&name=&firstName=&licCat=LIC&searchType=Contractor" target="_blank" rel="noopener noreferrer" style="text-align: center; flex: 1; max-width: calc(33.33% - 1.33px);">
              <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/qbcc.png" alt="QBCC Licence" style="width: 100%; height: auto; max-height: 80px; object-fit: contain;">
          </a>
          <a href="https://bams.vba.vic.gov.au/bams/s/practitioner-detail?inputParams=zcTxTUWVcpMyC5oukumULdqpYzjywoorAYPb19uGLRZLvYJjzfh9fMlAvwbNGRpB" target="_blank" rel="noopener noreferrer" style="text-align: center; flex: 1; max-width: calc(33.33% - 1.33px);">
              <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/bpc.png" alt="Building Practitioners Board" style="width: 100%; height: auto; max-height: 80px; object-fit: contain;">
          </a>
      </div>
      
      <!-- Certificate Images Row 2 -->
      <div class="certificate-container" style="display: flex; justify-content: flex-start; margin-top: -10px; gap: 2px; max-width: 50%; overflow-x: hidden;">
          <a href="https://asbc.com.au/members/maison-azdari/" target="_blank" rel="noopener noreferrer" style="text-align: center; flex: 1; max-width: calc(33.33% - 1.33px);">
              <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/au-society.png" alt="Australian Society of Building Consultants" style="width: 100%; height: auto; max-height: 80px; object-fit: contain;">
          </a>
          <a href="https://www.google.com/maps/search/owner+inspections/@-32.5397158,143.7071653,6z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style="text-align: center; flex: 1; max-width: calc(33.33% - 1.33px);">
              <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/google-reviews.png" alt="Google Reviews" style="width: 100%; height: auto; max-height: 80px; object-fit: contain;">
          </a>
          <a href="https://www.productreview.com.au/listings/owner-inspections" target="_blank" rel="noopener noreferrer" style="text-align: center; flex: 1; max-width: calc(33.33% - 1.33px);">
              <img src="https://bb.owner-inspections.com.au/lovable-uploads/certificates/png/product-review.png" alt="Product Review" style="width: 100%; height: auto; max-height: 80px; object-fit: contain;">
          </a>
      </div>
  </div>
</div>
</body>
</html>`;

    const getPreviewContainerStyle = () => {
      switch (previewMode) {
        case 'desktop':
          return { width: '100%', maxWidth: '800px', margin: '0 auto' };
        case 'tablet':
          return { width: '768px', maxWidth: '768px', margin: '0 auto', border: '2px solid #e5e7eb', borderRadius: '8px' };
        case 'mobile':
          return { width: '375px', maxWidth: '375px', margin: '0 auto', border: '2px solid #e5e7eb', borderRadius: '8px' };
        default:
          return { width: '100%', maxWidth: '800px', margin: '0 auto' };
      }
    };

    return (
      <div className="space-y-4">
        {/* Preview Mode Toggle */}
        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={previewMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('desktop')}
            className="font-inter"
          >
            Desktop
          </Button>
          <Button
            variant={previewMode === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('tablet')}
            className="font-inter"
          >
            Tablet
          </Button>
          <Button
            variant={previewMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('mobile')}
            className="font-inter"
          >
            Mobile
          </Button>
        </div>

        {/* Preview Container */}
        <div className="flex justify-center">
          <div style={getPreviewContainerStyle()}>
            <iframe
              srcDoc={previewHTML}
              style={{
                width: '100%',
                height: previewMode === 'mobile' ? '600px' : previewMode === 'tablet' ? '500px' : '400px',
                border: 'none',
                backgroundColor: 'white'
              }}
              title="Email Signature Preview"
            />
          </div>
        </div>

        {/* Device Info */}
        <div className="text-center text-sm text-slate-500 font-inter">
          {previewMode === 'desktop' && 'Desktop view (800px+)'}
          {previewMode === 'tablet' && 'Tablet view (768px)'}
          {previewMode === 'mobile' && 'Mobile view (375px)'}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mail className="w-8 h-8 text-[#0b487b]" />
          <h1 className="text-4xl font-bold text-slate-800 font-inter">Email Signature Generator</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
          Fill out the form below with your credentials to generate a professional email signature for Owner Inspections team members.
        </p>
      </div>

      {/* Form Section */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-[#0b487b]" />
            <div>
              <CardTitle className="font-inter">Personal Information</CardTitle>
              <CardDescription className="font-inter">
                Enter your details below. Use the toggle switches to enable/disable specific fields.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Closing */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="closing" className="font-semibold">Closing</Label>
                <Switch
                  checked={formData.enabled.closing}
                  onCheckedChange={() => handleToggle('closing')}
                />
              </div>
              <Input
                id="closing"
                value={formData.closing}
                onChange={(e) => handleInputChange('closing', e.target.value)}
                placeholder="Kind regards,"
                disabled={!formData.enabled.closing}
                className="mt-2"
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="name" className="font-semibold">Full Name</Label>
                <Switch
                  checked={formData.enabled.name}
                  onCheckedChange={() => handleToggle('name')}
                />
              </div>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Maison Azdari"
                disabled={!formData.enabled.name}
                className="mt-2"
              />
            </div>
          </div>

          {/* Position */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="position" className="font-semibold">Position</Label>
                <Switch
                  checked={formData.enabled.position}
                  onCheckedChange={() => handleToggle('position')}
                />
              </div>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Director"
                disabled={!formData.enabled.position}
                className="mt-2"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="description" className="font-semibold">Professional Description</Label>
                <Switch
                  checked={formData.enabled.description}
                  onCheckedChange={() => handleToggle('description')}
                />
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Executive Committee Member, ASBC NSW | Member, SCA NSW&#10;Accredited SBBIS Inspector, NSW Fair Trading | Building Consultant & Expert Witness, NSW, VIC, QLD&#10;B.Eng Civil Engineering | Licensed Builder (NSW: 366172C | VIC: DBU-41642 | QLD: 15151453)&#10;Registered Building Inspector (QLD: 15151453) | Certified Termite Inspector"
                disabled={!formData.enabled.description}
                rows={4}
                className="mt-2"
              />
            </div>
          </div>

          {/* WhatsApp Number */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="whatsapp" className="font-semibold">WhatsApp Number</Label>
                <Switch
                  checked={formData.enabled.whatsappNumber}
                  onCheckedChange={() => handleToggle('whatsappNumber')}
                />
              </div>
              <Input
                id="whatsapp"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                placeholder="+61 888 888 888"
                disabled={!formData.enabled.whatsappNumber}
                className="mt-2"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="email" className="font-semibold">Email Address</Label>
                <Switch
                  checked={formData.enabled.email}
                  onCheckedChange={() => handleToggle('email')}
                />
              </div>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="maison.a@ownerinspections.com.au"
                disabled={!formData.enabled.email}
                className="mt-2"
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={generateEmailSignature}
              size="lg"
              className="bg-[#0b487b] hover:bg-[#2c9bd6] text-white px-8 py-3 text-lg font-inter"
            >
              <Settings className="w-5 h-5 mr-2" />
              Generate Email Signature
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {showPreview && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-inter">Email Signature Preview</CardTitle>
                <CardDescription className="font-inter">
                  This is how your email signature will appear to recipients
                </CardDescription>
              </div>
              <Badge variant="secondary" className="font-inter">
                Custom Generated
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {renderPreview()}
          </CardContent>
        </Card>
      )}

      {/* Copy HTML Section */}
      {generatedHTML && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-inter">HTML Code</CardTitle>
                <CardDescription className="font-inter">
                  Copy the HTML code for your preferred device view
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Desktop HTML */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 font-inter">Desktop Version</h3>
                <Button
                  onClick={copyDesktopHTML}
                  variant="outline"
                  size="sm"
                  className="font-inter"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Desktop HTML
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto border-2 border-slate-200 font-mono max-h-48 overflow-y-auto">
                  <code>{desktopHTML}</code>
                </pre>
              </div>
            </div>

            {/* Tablet HTML */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 font-inter">Tablet Version</h3>
                <Button
                  onClick={copyTabletHTML}
                  variant="outline"
                  size="sm"
                  className="font-inter"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Tablet HTML
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto border-2 border-slate-200 font-mono max-h-48 overflow-y-auto">
                  <code>{tabletHTML}</code>
                </pre>
              </div>
            </div>

            {/* Mobile HTML */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 font-inter">Mobile Version</h3>
                <Button
                  onClick={copyMobileHTML}
                  variant="outline"
                  size="sm"
                  className="font-inter"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Mobile HTML
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto border-2 border-slate-200 font-mono max-h-48 overflow-y-auto">
                  <code>{mobileHTML}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Instructions */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-inter">How to Use</CardTitle>
          <CardDescription className="font-inter">
            Instructions for setting up your email signature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 font-inter">Gmail</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 font-inter">
                <li>Go to Gmail Settings (gear icon → See all settings)</li>
                <li>Scroll down to "Signature" section</li>
                <li>Create a new signature</li>
                <li>Click the "Insert HTML" icon (&lt;&gt;)</li>
                <li>Paste the copied HTML code</li>
                <li>Save changes</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 font-inter">Outlook</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 font-inter">
                <li>Go to File → Options → Mail → Signatures</li>
                <li>Create a new signature</li>
                <li>In the editor, switch to HTML mode</li>
                <li>Paste the copied HTML code</li>
                <li>Set as default for new messages</li>
                <li>Click OK to save</li>
              </ol>
            </div>
          </div>
        
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 font-inter">Important Notes</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 font-inter">
              <li>Test your signature by sending yourself an email first</li>
              <li>Some email clients may strip certain CSS styles</li>
              <li>The signature is optimized for professional email communication</li>
              <li>Social media links will open in recipient's default browser</li>
              <li>Use the form above to create your custom email signature</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSignature; 