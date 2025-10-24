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

  // Optimized HTML generation with minimal size and efficient structure
  const generateEmailSignature = () => {
    const { closing, name, position, company, description, whatsappNumber, email, enabled } = formData;
    
    // Optimized HTML with reduced redundancy and better structure
    const emailSignatureHTML = `<!--[if mso]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"><v:fill type="tile" color="#ffffff"/></v:background><![endif]-->
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:14px;color:#262626;mso-table-lspace:0pt;mso-table-rspace:0pt;mso-line-height-rule:exactly;mso-table-bgcolor:#ffffff;">
    <tbody>
      ${enabled.closing ? `<tr><td style="padding:0 0 10px 0;mso-padding-alt:0pt 0pt 10pt 0pt;"><strong>${closing}</strong><br>&nbsp;</td></tr>` : ''}
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
            <tbody>
              <tr>
                <td valign="top" style="padding-right:20px;">
                  ${enabled.name ? `<div style="padding:0 0 5px 0;mso-padding-alt:0pt 0pt 5pt 0pt;"><strong style="font-size:24px;color:#0b487b;">${name}${enabled.position ? ` | ${position}` : ''} | Owner Inspections</strong></div>` : ''}
                  ${enabled.description ? `<div style="padding:0 0 2px 0;color:#2c9bd6;"><span style="font-size:11px;">${description.split('\n').map(line => line).join('<br>')}</span></div>` : ''}
                  <div style="padding-top:8px;mso-padding-alt:8pt 0pt 0pt 0pt;">
                    <a href="https://linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Linkedin-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="LinkedIn">
                    </a>
                    <a href="https://youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Youtube-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="YouTube">
                    </a>
                    <a href="https://facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Facebook-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="Facebook">
                    </a>
                    <a href="https://instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Instagram-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="Instagram">
                    </a>
                    <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Medium-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="Medium">
                    </a>
                  </div>
                        </td>
                <td valign="top" style="width:1px;background:#0b487b;">&nbsp;</td>
                <td valign="top" style="padding-left:20px;">
                  <div style="margin:0;padding:0;">
                    <div style="display:flex;align-items:center;margin-bottom:8px;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Phone-300x300.png" width="16" height="16" border="0" style="width:16px;height:16px;margin-right:8px;" alt="Phone">
                      <span style="font-size:14px;color:#262626;">1300 471 805</span>
                      ${enabled.whatsappNumber ? `<span style="margin:0 8px;font-size:14px;color:#262626;">|</span><img src="https://ownerinspections.com.au/wp-content/uploads/Whatsapp-300x300.png" width="16" height="16" border="0" style="width:16px;height:16px;margin-right:8px;" alt="WhatsApp"><span style="font-size:14px;color:#262626;">${whatsappNumber}</span>` : ''}
                    </div>
                    ${enabled.email ? `<div style="display:flex;align-items:center;margin-bottom:8px;"><img src="https://ownerinspections.com.au/wp-content/uploads/Massage-300x300.png" width="16" height="16" border="0" style="width:16px;height:16px;margin-right:8px;" alt="Email"><a href="mailto:${email}" style="color:#262626;text-decoration:none;">${email}</a></div>` : ''}
                    <div style="display:flex;align-items:center;margin-bottom:8px;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Web-300x300.png" width="16" height="16" border="0" style="width:16px;height:16px;margin-right:8px;" alt="Website">
                      <a href="https://ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color:#262626;text-decoration:none;">www.ownerinspections.com.au</a>
                    </div>
                    <div style="display:flex;align-items:center;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Pin-300x300.png" width="16" height="16" border="0" style="width:16px;height:16px;margin-right:8px;" alt="Address">
                      <span style="color:#262626;">Level 8, 97 Pacific Hwy, North Sydney, NSW 2065</span>
                    </div>
                  </div>
                </td>
                      </tr>
                    </tbody>
                  </table>
                        </td>
                      </tr>
      <tr>
        <td style="padding-top:10px;">
          <div style="display:flex;gap:5px;">
            <a href="https://verify.licence.nsw.gov.au/details/Contractor%20Licence/1-3N7CE4X" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/nsw-fair-trading-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="NSW Fair Trading Licence">
            </a>
            <a href="https://www.onlineservices.qbcc.qld.gov.au/OnlineLicenceSearch/VisualElements/ShowDetailResultContent.aspx?LicNO=15249792&name=&firstName=&licCat=LIC&searchType=Contractor" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/qld-qbcc-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="QBCC Queensland Licence">
            </a>
            <a href="https://bams.vba.vic.gov.au/bams/s/practitioner-detail?inputParams=zcTxTUWVcpMyC5oukumULdqpYzjywoorAYPb19uGLRZLvYJjzfh9fMlAvwbNGRpB" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/vic-bpc-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="Victorian Building Practitioners Board">
            </a>
          </div>
                </td>
              </tr>
      <tr>
        <td style="padding-top:5px;">
          <div style="display:flex;gap:5px;">
            <a href="https://asbc.com.au/members/maison-azdari/" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/asbc-sip-1-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="ASBC Member">
            </a>
            <a href="https://www.google.com/maps/search/owner+inspections/@-32.5397158,143.7071653,6z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/Google-Reviews-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="Google Reviews">
            </a>
            <a href="https://www.productreview.com.au/listings/owner-inspections" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/ProductReview-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="Product Review">
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
`;

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
    
    // Optimized mobile HTML with minimal nesting and reduced attributes
    const mobileHTML = `<!--[if mso]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"><v:fill type="tile" color="#ffffff"/></v:background><![endif]-->
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#262626;mso-table-lspace:0pt;mso-table-rspace:0pt;mso-line-height-rule:exactly;mso-table-bgcolor:#ffffff;">
    <tbody>
      ${enabled.closing ? `<tr><td style="padding:0 0 10px 0;mso-table-bgcolor:#ffffff;"><strong>${closing}</strong><br>&nbsp;</td></tr>` : ''}
      <tr>
        <td style="mso-table-bgcolor:#ffffff;">
          <div style="margin:0;padding:0;">
            ${enabled.name ? `<div style="padding:0 0 10px 0;mso-table-bgcolor:#ffffff;"><strong style="font-size:18px;color:#0b487b;">${name}${enabled.position ? ` | ${position}` : ''} | Owner Inspections</strong></div>` : ''}
            ${enabled.description ? `<div style="padding:0 0 2px 0;color:#2c9bd6;mso-table-bgcolor:#ffffff;"><span style="font-size:8px;">${description.split('\n').map(line => line).join('<br>')}</span></div>` : ''}
          </div>
        </td>
      </tr>
      <tr><td style="mso-table-bgcolor:#ffffff;">
        <div style="display:flex;align-items:center;margin-bottom:8px;">
          <img src="https://ownerinspections.com.au/wp-content/uploads/Phone-300x300.png" width="12" height="12" border="0" style="width:12px;height:12px;margin-right:8px;" alt="Phone">
          <span style="font-size:11px;color:#262626;">1300 471 805</span>
          ${enabled.whatsappNumber ? `<span style="margin:0 8px;font-size:11px;color:#262626;">|</span><img src="https://ownerinspections.com.au/wp-content/uploads/Whatsapp-300x300.png" width="12" height="12" border="0" style="width:12px;height:12px;margin-right:8px;" alt="WhatsApp"><span style="font-size:11px;color:#262626;">${whatsappNumber}</span>` : ''}
        </div>
      </td></tr>
      ${enabled.email ? `<tr><td style="mso-table-bgcolor:#ffffff;"><div style="display:flex;align-items:center;margin-bottom:8px;"><img src="https://ownerinspections.com.au/wp-content/uploads/Massage-300x300.png" width="12" height="12" border="0" style="width:12px;height:12px;margin-right:8px;" alt="Email"><a href="mailto:${email}" style="color:#262626;text-decoration:none;font-size:11px;">${email}</a></div></td></tr>` : ''}
      <tr><td style="mso-table-bgcolor:#ffffff;">
        <div style="display:flex;align-items:center;margin-bottom:8px;">
          <img src="https://ownerinspections.com.au/wp-content/uploads/Web-300x300.png" width="12" height="12" border="0" style="width:12px;height:12px;margin-right:8px;" alt="Website">
          <a href="https://ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color:#262626;text-decoration:none;font-size:11px;">www.ownerinspections.com.au</a>
        </div>
      </td></tr>
      <tr><td style="mso-table-bgcolor:#ffffff;">
        <div style="display:flex;align-items:center;">
          <img src="https://ownerinspections.com.au/wp-content/uploads/Pin-300x300.png" width="12" height="12" border="0" style="width:12px;height:12px;margin-right:8px;" alt="Address">
          <span style="color:#262626;font-size:11px;">Level 8, 97 Pacific Hwy, North Sydney, NSW 2065</span>
        </div>
      </td></tr>
      <tr>
        <td style="padding-top:10px;mso-table-bgcolor:#ffffff;">
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            <a href="https://linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
              <img src="https://ownerinspections.com.au/wp-content/uploads/Linkedin-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="LinkedIn">
            </a>
            <a href="https://youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
              <img src="https://ownerinspections.com.au/wp-content/uploads/Youtube-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="YouTube">
            </a>
            <a href="https://facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
              <img src="https://ownerinspections.com.au/wp-content/uploads/Facebook-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="Facebook">
            </a>
            <a href="https://instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
              <img src="https://ownerinspections.com.au/wp-content/uploads/Instagram-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="Instagram">
            </a>
            <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
              <img src="https://ownerinspections.com.au/wp-content/uploads/Medium-300x300.png" width="24" height="24" border="0" style="width:24px;height:24px;display:block;border:0;" alt="Medium">
            </a>
          </div>
              </td>
            </tr>
      <tr>
        <td style="padding-top:10px;">
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            <a href="https://verify.licence.nsw.gov.au/details/Contractor%20Licence/1-3N7CE4X" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/nsw-fair-trading-300x133.jpg" width="100" height="40" border="0" style="width:100px;height:40px;display:block;border:0;" alt="NSW Fair Trading Licence">
            </a>
            <a href="https://www.onlineservices.qbcc.qld.gov.au/OnlineLicenceSearch/VisualElements/ShowDetailResultContent.aspx?LicNO=15249792&name=&firstName=&licCat=LIC&searchType=Contractor" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/qld-qbcc-300x133.jpg" width="100" height="40" border="0" style="width:100px;height:40px;display:block;border:0;" alt="QBCC Queensland Licence">
            </a>
            <a href="https://bams.vba.vic.gov.au/bams/s/practitioner-detail?inputParams=zcTxTUWVcpMyC5oukumULdqpYzjywoorAYPb19uGLRZLvYJjzfh9fMlAvwbNGRpB" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/vic-bpc-300x133.jpg" width="100" height="40" border="0" style="width:100px;height:40px;display:block;border:0;" alt="Victorian Building Practitioners Board">
            </a>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding-top:5px;">
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            <a href="https://asbc.com.au/members/maison-azdari/" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/asbc-sip-1-300x133.jpg" width="100" height="40" border="0" style="width:100px;height:40px;display:block;border:0;" alt="ASBC Member">
            </a>
            <a href="https://www.google.com/maps/search/owner+inspections/@-32.5397158,143.7071653,6z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/Google-Reviews-300x133.jpg" width="100" height="40" border="0" style="width:100px;height:40px;display:block;border:0;" alt="Google Reviews">
            </a>
            <a href="https://www.productreview.com.au/listings/owner-inspections" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/ProductReview-300x133.jpg" width="100" height="40" border="0" style="width:100px;height:40px;display:block;border:0;" alt="Product Review">
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
`;

    return mobileHTML;
  };

  const generateTabletHTML = () => {
    const { closing, name, position, company, description, whatsappNumber, email, enabled } = formData;
    
    // Optimized tablet HTML with balanced structure
    const tabletHTML = `<!--[if mso]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"><v:fill type="tile" color="#ffffff"/></v:background><![endif]-->
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#262626;mso-table-lspace:0pt;mso-table-rspace:0pt;mso-line-height-rule:exactly;mso-table-bgcolor:#ffffff;">
    <tbody>
      ${enabled.closing ? `<tr><td style="padding:0 0 10px 0;mso-table-bgcolor:#ffffff;"><strong>${closing}</strong><br>&nbsp;</td></tr>` : ''}
      <tr>
        <td style="mso-table-bgcolor:#ffffff;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
            <tbody>
              <tr>
                <td valign="top" style="padding-right:20px;mso-table-bgcolor:#ffffff;">
                  ${enabled.name ? `<div style="padding:0 0 5px 0;mso-table-bgcolor:#ffffff;"><strong style="font-size:20px;color:#0b487b;">${name}${enabled.position ? ` | ${position}` : ''} | Owner Inspections</strong></div>` : ''}
                  ${enabled.description ? `<div style="padding:0 0 2px 0;color:#2c9bd6;mso-table-bgcolor:#ffffff;"><span style="font-size:10px;">${description.split('\n').map(line => line).join('<br>')}</span></div>` : ''}
                  <div style="padding-top:8px;">
                    <a href="https://linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Linkedin-300x300.png" width="20" height="20" border="0" style="width:20px;height:20px;display:block;border:0;" alt="LinkedIn">
                    </a>
                    <a href="https://youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Youtube-300x300.png" width="20" height="20" border="0" style="width:20px;height:20px;display:block;border:0;" alt="YouTube">
                    </a>
                    <a href="https://facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Facebook-300x300.png" width="20" height="20" border="0" style="width:20px;height:20px;display:block;border:0;" alt="Facebook">
                    </a>
                    <a href="https://instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Instagram-300x300.png" width="20" height="20" border="0" style="width:20px;height:20px;display:block;border:0;" alt="Instagram">
                    </a>
                    <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;text-decoration:none;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Medium-300x300.png" width="20" height="20" border="0" style="width:20px;height:20px;display:block;border:0;" alt="Medium">
                    </a>
                  </div>
            </td>
            <td valign="top" style="width:1px;background:#0b487b;">&nbsp;</td>
            <td valign="top" style="padding-left:20px;">
                  <div style="margin:0;padding:0;">
                    <div style="display:flex;align-items:center;margin-bottom:8px;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Phone-300x300.png" width="14" height="14" border="0" style="width:14px;height:14px;margin-right:8px;" alt="Phone">
                      <span style="font-size:12px;color:#262626;">1300 471 805</span>
                      ${enabled.whatsappNumber ? `<span style="margin:0 8px;font-size:12px;color:#262626;">|</span><img src="https://ownerinspections.com.au/wp-content/uploads/Whatsapp-300x300.png" width="14" height="14" border="0" style="width:14px;height:14px;margin-right:8px;" alt="WhatsApp"><span style="font-size:12px;color:#262626;">${whatsappNumber}</span>` : ''}
                    </div>
                    ${enabled.email ? `<div style="display:flex;align-items:center;margin-bottom:8px;"><img src="https://ownerinspections.com.au/wp-content/uploads/Massage-300x300.png" width="14" height="14" border="0" style="width:14px;height:14px;margin-right:8px;" alt="Email"><a href="mailto:${email}" style="color:#262626;text-decoration:none;font-size:12px;">${email}</a></div>` : ''}
                    <div style="display:flex;align-items:center;margin-bottom:8px;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Web-300x300.png" width="14" height="14" border="0" style="width:14px;height:14px;margin-right:8px;" alt="Website">
                      <a href="https://ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color:#262626;text-decoration:none;font-size:12px;">www.ownerinspections.com.au</a>
                    </div>
                    <div style="display:flex;align-items:center;">
                      <img src="https://ownerinspections.com.au/wp-content/uploads/Pin-300x300.png" width="14" height="14" border="0" style="width:14px;height:14px;margin-right:8px;" alt="Address">
                      <span style="color:#262626;font-size:12px;">Level 8, 97 Pacific Hwy, North Sydney, NSW 2065</span>
                    </div>
                  </div>
            </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top:10px;">
          <div style="display:flex;gap:5px;">
            <a href="https://verify.licence.nsw.gov.au/details/Contractor%20Licence/1-3N7CE4X" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/nsw-fair-trading-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="NSW Fair Trading Licence">
            </a>
            <a href="https://www.onlineservices.qbcc.qld.gov.au/OnlineLicenceSearch/VisualElements/ShowDetailResultContent.aspx?LicNO=15249792&name=&firstName=&licCat=LIC&searchType=Contractor" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/qld-qbcc-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="QBCC Queensland Licence">
            </a>
            <a href="https://bams.vba.vic.gov.au/bams/s/practitioner-detail?inputParams=zcTxTUWVcpMyC5oukumULdqpYzjywoorAYPb19uGLRZLvYJjzfh9fMlAvwbNGRpB" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/vic-bpc-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="Victorian Building Practitioners Board">
            </a>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding-top:5px;">
          <div style="display:flex;gap:5px;">
            <a href="https://asbc.com.au/members/maison-azdari/" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/asbc-sip-1-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="ASBC Member">
            </a>
            <a href="https://www.google.com/maps/search/owner+inspections/@-32.5397158,143.7071653,6z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/Google-Reviews-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="Google Reviews">
            </a>
            <a href="https://www.productreview.com.au/listings/owner-inspections" target="_blank" rel="noopener noreferrer">
              <img src="https://ownerinspections.com.au/wp-content/uploads/ProductReview-300x133.jpg" width="120" height="60" border="0" style="width:120px;height:60px;display:block;border:0;" alt="Product Review">
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
`;

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
    const html = previewMode === 'tablet' ? tabletHTML : previewMode === 'mobile' ? mobileHTML : desktopHTML;
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
        <div className="flex justify-center">
          <div style={getPreviewContainerStyle()}>
            <iframe
              srcDoc={html}
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
        <CardContent className="space-y-6">
          {/* How to Insert HTML in Gmail */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3 font-inter">How to Insert HTML in Gmail</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-green-700 font-inter mb-4">
              <li>You need to download this Google Chrome extension: 
                <a 
                  href="https://chromewebstore.google.com/detail/insert-and-send-html-with/bcflbfdlpegakpncdgmejelcolhmfkjh?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline ml-1"
                >
                  Insert and Send HTML with Gmail
                </a>
              </li>
              <li>An icon appears in the Gmail signature section</li>
              <li>Click on that icon and insert the HTML code</li>
            </ol>
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-700 font-inter">For more information watch this video from minute 1:</span>
              <Button
                onClick={() => window.open('https://www.youtube.com/watch?v=9fOazia83oo', '_blank')}
                variant="outline"
                size="sm"
                className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300 font-inter"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch Video
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 font-inter">Gmail (Alternative Method)</h3>
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