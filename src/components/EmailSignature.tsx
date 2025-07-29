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
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<SignatureData>({
    closing: "Kind regards,",
    name: "MAISON AZDARI",
    position: "Director",
    company: "Owner Inspections",
    description: `Executive Committee Member, ASBC NSW | Member, SCA NSW
Accredited SBBIS Inspector, NSW Fair Trading | Building Consultant & Expert Witness, NSW, VIC, QLD
B.Eng Civil Engineering | Licensed Builder (NSW: 366172C | VIC: DBU-41642 | QLD: 15151453)
Registered Building Inspector (QLD: 15151453) | Certified Termite Inspector`,
    whatsappNumber: "+61 456 111 000",
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
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }

    .signature {
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0 0 0 20px;
    }

    .contact {
      margin-bottom: 15px;
    }

    .contact strong {
      font-weight: bold;
      background: linear-gradient(135deg, #0b487b, #2c9bd6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 18px;
      text-shadow: 0 1px 2px rgba(11, 72, 123, 0.1);
    }

    .locations {
      margin-bottom: 15px;
      line-height: 1.8;
    }

    .label {
      font-weight: bold;
      color: #0b487b;
      display: inline-block;
      min-width: 25px;
      text-shadow: 0 1px 1px rgba(44, 155, 214, 0.2);
    }

    .contact a {
      color: #0b487b;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
      padding-bottom: 1px;
    }

    .contact a:hover {
      color: #2c9bd6;
      border-bottom: 2px solid #2c9bd6;
      transform: translateY(-1px);
    }

    .logo-row {
      margin-top: 20px;
      text-align: left;
    }

    .logo-row img {
      max-width: 200px;
      height: auto;
      display: block;
    }

    .social-media {
      margin-top: 15px;
      margin-bottom: 15px;
    }

    .social-links {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .social-links a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #0b487b, #2c9bd6);
      border-radius: 50%;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(11, 72, 123, 0.2);
      position: relative;
      overflow: hidden;
    }

    .social-links a::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.6s ease;
    }

    .social-links a:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 4px 15px rgba(11, 72, 123, 0.3);
    }

    .social-links a:hover::before {
      left: 100%;
    }

    .social-links a svg {
      width: 18px;
      height: 18px;
      fill: white;
    }

    /* Responsive Design */
    @media (max-width: 600px) {
      .signature {
        padding: 15px;
        font-size: 13px;
      }
      
      .contact strong {
        font-size: 15px;
      }
      
      .locations {
        line-height: 1.6;
      }
      
      .logo-row img {
        max-width: 150px;
      }
    }

    @media (max-width: 480px) {
      .signature {
        padding: 12px;
        font-size: 12px;
      }
      
      .contact strong {
        font-size: 14px;
      }
      
      .logo-row img {
        max-width: 120px;
      }
    }

    /* Email client compatibility */
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    .signature-table {
      width: 100%;
      max-width: 600px;
    }

    .signature-table td {
      padding: 0;
      vertical-align: top;
    }
  </style>
</head>
<body>
  <div class="signature">
    <div class="contact">
      ${enabled.closing ? `${closing}<br /><br />` : ''}
      ${enabled.name || enabled.position || enabled.company ? `<strong>${[
        enabled.name ? name : '',
        enabled.position ? position : '',
        enabled.company ? company : ''
      ].filter(Boolean).join(' | ')}</strong><br />` : ''}
      ${enabled.description ? `<div style="font-size: 12px; color: #555555; line-height: 1.5; margin: 12px 0 15px 0;">
        ${description.split('\n').map(line => `<div style="margin-bottom: 4px;">${line}</div>`).join('')}
      </div>` : ''}
      <a href="https://abr.business.gov.au/ABN/View/67600802533" target="_blank" rel="noopener noreferrer" style="color:#333333; text-decoration:none; font-weight:bold;">OWNER INSPECTIONS</a><span style="color:#333333; font-weight:bold;"> PTY. LTD.</span>
    </div>
    <div class="contact-info" style="margin-bottom: 15px;">
      <!-- 📞 Phone number (Primary direct contact method) -->
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <a href="tel:1300471805" target="_blank" rel="noopener noreferrer" style="color:#333333; text-decoration:none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 1px;">1300 471 805</a>
      </div>
      
      ${enabled.whatsappNumber ? `<!-- 💬 WhatsApp (For chat convenience) -->
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
        </svg>
        <a href="https://api.whatsapp.com/send/?phone=${whatsappNumber.replace(/[^0-9]/g, '')}&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" style="color:#333333; text-decoration:none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 1px;">${whatsappNumber}</a>
      </div>` : ''}
      
      ${enabled.email ? `<!-- ✉️ Email (For replies to specific address) -->
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" style="color:#333333; text-decoration:none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 1px;">${email}</a>
      </div>` : ''}
      
      <!-- 🌐 Website URL (Business/portfolio guide) -->
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
        <a href="https://www.ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color:#0b487b; text-decoration:none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 1px;">OwnerInspections.com.au</a>
      </div>
      
      <!-- 🏢 Address (Office locations for regulated profession) -->
      <div style="display: flex; align-items: flex-start;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div style="line-height: 1.4;">
          <div style="margin-bottom: 4px;"><strong style="color: #0b487b;">VIC:</strong> Level 14, 380 St Kilda Rd, Melbourne, VIC 3000</div>
          <div style="margin-bottom: 4px;"><strong style="color: #0b487b;">QLD:</strong> Level 22, 69 Ann St, Brisbane, QLD 4000</div>
          <div><strong style="color: #0b487b;">NSW:</strong> Level 1, 995 Victoria Rd, West Ryde</div>
        </div>
      </div>
    </div>
    <div class="social-media">
      <div class="social-links">
        <a href="https://www.linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="https://www.youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" title="YouTube">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a href="https://www.facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" title="Facebook">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" title="Instagram">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://www.reddit.com/u/ownerinspections" target="_blank" rel="noopener noreferrer" title="Reddit">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        </a>
        <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" title="Medium">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
        </a>
      </div>
    </div>
    
    <!-- Additional Images Row -->
    <div class="additional-images" style="margin-top: 15px; margin-bottom: 15px;">
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/Lisence/SVG/NSW-government.svg" alt="NSW Government" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://bb.owne-inspections.com.au/lovable-uploads/Lisence/SVG/Au-society.svg" alt="Australian Society" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/Lisence/SVG/BPC.svg" alt="BPC" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://bb.owner-inspections.com.au/lovable-uploads/Lisence/SVG/Google-Reviews.svg" alt="Google Reviews" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://bb.ownerinspections.com.au/lovable-uploads/Lisence/SVG/ProductReview.svg" alt="Product Review" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://bb.ownerinspections.com.au/lovable-uploads/Lisence/SVG/qbcc.svg" alt="QBCC" style="height: 50px; width: auto; object-fit: contain;" />
      </div>
    </div>  </div>
</body>
</html>`;

    setGeneratedHTML(emailSignatureHTML);
    setShowPreview(true);
    
    toast({
      title: "Email signature generated!",
      description: "Your custom email signature has been created successfully.",
    });
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

  const renderPreview = () => {
    const { closing, name, position, company, description, whatsappNumber, email, enabled } = formData;
    
    return (
      <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 bg-white">
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: 1.6, color: '#333333' }}>
          <div style={{ marginBottom: '15px' }}>
            {enabled.closing && <span>{closing}<br /><br /></span>}
            {(enabled.name || enabled.position || enabled.company) && (
              <span>
                <strong style={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #0b487b, #2c9bd6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '18px',
                  textShadow: '0 1px 2px rgba(11, 72, 123, 0.1)'
                }}>
                  {[
                    enabled.name ? name : '',
                    enabled.position ? position : '',
                    enabled.company ? company : ''
                  ].filter(Boolean).join(' | ')}
                </strong>
                <br />
              </span>
            )}
            {enabled.description && (
              <div style={{ fontSize: '12px', color: '#555555', lineHeight: 1.5, margin: '12px 0 15px 0' }}>
                {description.split('\n').map((line, index) => (
                  <div key={index} style={{ marginBottom: '4px' }}>{line}</div>
                ))}
              </div>
            )}
            <a href="https://abr.business.gov.au/ABN/View/67600802533" target="_blank" rel="noopener noreferrer" style={{ color: '#333333', textDecoration: 'none', fontWeight: 'bold' }}>OWNER INSPECTIONS</a><span style={{ color: '#333333', fontWeight: 'bold' }}> PTY. LTD.</span>
          </div>

          {/* Contact Information */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <a href="tel:1300471805" style={{ color: '#333333', textDecoration: 'none' }}>1300 471 805</a>
            </div>
            
            {enabled.whatsappNumber && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
                </svg>
                <a href={`https://api.whatsapp.com/send/?phone=${whatsappNumber.replace(/[^0-9]/g, '')}&text&type=phone_number&app_absent=0`} style={{ color: '#333333', textDecoration: 'none' }}>{whatsappNumber}</a>
              </div>
            )}
            
            {enabled.email && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href={`mailto:${email}`} style={{ color: '#333333', textDecoration: 'none' }}>{email}</a>
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <a href="https://www.ownerinspections.com.au" style={{ color: '#0b487b', textDecoration: 'none' }}>OwnerInspections.com.au</a>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0, marginTop: '2px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div style={{ lineHeight: 1.4 }}>
                <div style={{ marginBottom: '4px' }}><strong style={{ color: '#0b487b' }}>VIC:</strong> Level 14, 380 St Kilda Rd, Melbourne, VIC 3000</div>
                <div style={{ marginBottom: '4px' }}><strong style={{ color: '#0b487b' }}>QLD:</strong> Level 22, 69 Ann St, Brisbane, QLD 4000</div>
                <div><strong style={{ color: '#0b487b' }}>NSW:</strong> Level 1, 995 Victoria Rd, West Ryde</div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div style={{ marginTop: '15px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="https://www.linkedin.com/company/ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="LinkedIn">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="YouTube">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="Facebook">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="Instagram">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.reddit.com/u/ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="Reddit">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </a>
              <a href="https://medium.com/@ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="Medium">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Additional Images Row */}
          <div style={{ marginTop: '15px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/NSW-government.svg" alt="NSW Government" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
              <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/Au-society.svg" alt="Australian Society" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
              <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/BPC.svg" alt="BPC" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
              <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/Google-Reviews.svg" alt="Google Reviews" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
              <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/ProductReview.svg" alt="Product Review" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
              <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/qbcc.svg" alt="QBCC" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
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
                placeholder="MAISON AZDARI"
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

          {/* Company */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="company" className="font-semibold">Company</Label>
                <Switch
                  checked={formData.enabled.company}
                  onCheckedChange={() => handleToggle('company')}
                />
              </div>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Owner Inspections"
                disabled={!formData.enabled.company}
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
                placeholder="+61 456 111 000"
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
                  Copy this HTML code to use the signature in your email client
                </CardDescription>
              </div>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="font-inter"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy HTML
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto border-2 border-slate-200 font-mono max-h-96 overflow-y-auto">
                <code>{generatedHTML}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Default Email Template Section */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-inter">Standard Email Signature Template</CardTitle>
              <CardDescription className="font-inter">
                Default professional email signature template for Owner Inspections team members
              </CardDescription>
            </div>
            <Badge variant="secondary" className="font-inter">
              Standard Template
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Preview of the default signature */}
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 bg-white">
            <div className="signature">
              <div className="contact">
                Kind regards,<br /><br />
                <strong style={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #0b487b, #2c9bd6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '18px',
                  textShadow: '0 1px 2px rgba(11, 72, 123, 0.1)'
                }}>MAISON AZDARI | Director | Owner Inspections</strong><br />
                <div style={{ fontSize: '12px', color: '#555555', lineHeight: 1.5, margin: '12px 0 15px 0' }}>
                  <div style={{ marginBottom: '4px' }}>Executive Committee Member, ASBC NSW | Member, SCA NSW</div>
                  <div style={{ marginBottom: '4px' }}>Accredited SBBIS Inspector, NSW Fair Trading | Building Consultant & Expert Witness, NSW, VIC, QLD</div>
                  <div style={{ marginBottom: '4px' }}>B.Eng Civil Engineering | Licensed Builder (NSW: 366172C | VIC: DBU-41642 | QLD: 15151453)</div>
                  <div>Registered Building Inspector (QLD: 15151453) | Certified Termite Inspector</div>
                </div>
                <a href="https://abr.business.gov.au/ABN/View/67600802533" target="_blank" rel="noopener noreferrer" style={{ color: '#333333', textDecoration: 'none', fontWeight: 'bold' }}>OWNER INSPECTIONS</a><span style={{ color: '#333333', fontWeight: 'bold' }}> PTY. LTD.</span>
              </div>

              {/* Contact Information */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <a href="tel:1300471805" style={{ color: '#333333', textDecoration: 'none' }}>1300 471 805</a>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
                  </svg>
                  <a href="https://api.whatsapp.com/send/?phone=61456111000&text&type=phone_number&app_absent=0" style={{ color: '#333333', textDecoration: 'none' }}>+61 456 111 000</a>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a href="mailto:maison.a@ownerinspections.com.au" style={{ color: '#333333', textDecoration: 'none' }}>maison.a@ownerinspections.com.au</a>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <a href="https://www.ownerinspections.com.au" style={{ color: '#0b487b', textDecoration: 'none' }}>OwnerInspections.com.au</a>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <svg style={{ width: '16px', height: '16px', marginRight: '10px', fill: '#0b487b', flexShrink: 0, marginTop: '2px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div style={{ lineHeight: 1.4 }}>
                    <div style={{ marginBottom: '4px' }}><strong style={{ color: '#0b487b' }}>VIC:</strong> Level 14, 380 St Kilda Rd, Melbourne, VIC 3000</div>
                    <div style={{ marginBottom: '4px' }}><strong style={{ color: '#0b487b' }}>QLD:</strong> Level 22, 69 Ann St, Brisbane, QLD 4000</div>
                    <div><strong style={{ color: '#0b487b' }}>NSW:</strong> Level 1, 995 Victoria Rd, West Ryde</div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <a href="https://www.linkedin.com/company/ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="LinkedIn">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="YouTube">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="Facebook">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="Instagram">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://www.reddit.com/u/ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="Reddit">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                  </a>
                  <a href="https://medium.com/@ownerinspections" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #0b487b, #2c9bd6)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(11, 72, 123, 0.2)', position: 'relative', overflow: 'hidden' }} title="Medium">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', fill: 'white' }}>
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Additional Images Row */}
              <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/NSW-government.svg" alt="NSW Government" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                  <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/Au-society.svg" alt="Australian Society" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                  <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/BPC.svg" alt="BPC" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                  <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/Google-Reviews.svg" alt="Google Reviews" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                  <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/ProductReview.svg" alt="Product Review" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                  <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/qbcc.svg" alt="QBCC" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standard Template HTML Code Section */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-inter">Standard Template HTML Code</CardTitle>
              <CardDescription className="font-inter">
                Copy this HTML code to use the standard signature in your email client
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                const standardHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Owner Inspections - Email Signature</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }

    .signature {
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0 0 0 20px;
    }

    .contact {
      margin-bottom: 15px;
    }

    .contact strong {
      font-weight: bold;
      background: linear-gradient(135deg, #0b487b, #2c9bd6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 18px;
      text-shadow: 0 1px 2px rgba(11, 72, 123, 0.1);
    }

    .locations {
      margin-bottom: 15px;
      line-height: 1.8;
    }

    .label {
      font-weight: bold;
      color: #0b487b;
      display: inline-block;
      min-width: 25px;
      text-shadow: 0 1px 1px rgba(44, 155, 214, 0.2);
    }

    .contact a {
      color: #0b487b;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
      padding-bottom: 1px;
    }

    .contact a:hover {
      color: #2c9bd6;
      border-bottom: 2px solid #2c9bd6;
      transform: translateY(-1px);
    }

    .logo-row {
      margin-top: 20px;
      text-align: left;
    }

    .logo-row img {
      max-width: 200px;
      height: auto;
      display: block;
    }

    .social-media {
      margin-top: 15px;
      margin-bottom: 15px;
    }

    .social-links {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .social-links a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #0b487b, #2c9bd6);
      border-radius: 50%;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(11, 72, 123, 0.2);
      position: relative;
      overflow: hidden;
    }

    .social-links a::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.6s ease;
    }

    .social-links a:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 4px 15px rgba(11, 72, 123, 0.3);
    }

    .social-links a:hover::before {
      left: 100%;
    }

    .social-links a svg {
      width: 18px;
      height: 18px;
      fill: white;
    }

    /* Responsive Design */
    @media (max-width: 600px) {
      .signature {
        padding: 15px;
        font-size: 13px;
      }
      
      .contact strong {
        font-size: 15px;
      }
      
      .locations {
        line-height: 1.6;
      }
      
      .logo-row img {
        max-width: 150px;
      }
    }

    @media (max-width: 480px) {
      .signature {
        padding: 12px;
        font-size: 12px;
      }
      
      .contact strong {
        font-size: 14px;
      }
      
      .logo-row img {
        max-width: 120px;
      }
    }

    /* Email client compatibility */
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    .signature-table {
      width: 100%;
      max-width: 600px;
    }

    .signature-table td {
      padding: 0;
      vertical-align: top;
    }
  </style>
</head>
<body>
  <div class="signature">
    <div class="contact">
      Kind regards,<br /><br />
      <strong>MAISON AZDARI | Director | Owner Inspections</strong><br />
      <div style="font-size: 12px; color: #555555; line-height: 1.5; margin: 12px 0 15px 0;">
        <div style="margin-bottom: 4px;">Executive Committee Member, ASBC NSW | Member, SCA NSW</div>
        <div style="margin-bottom: 4px;">Accredited SBBIS Inspector, NSW Fair Trading | Building Consultant & Expert Witness, NSW, VIC, QLD</div>
        <div style="margin-bottom: 4px;">B.Eng Civil Engineering | Licensed Builder (NSW: 366172C | VIC: DBU-41642 | QLD: 15151453)</div>
        <div>Registered Building Inspector (QLD: 15151453) | Certified Termite Inspector</div>
      </div>
      <a href="https://abr.business.gov.au/ABN/View/67600802533" target="_blank" rel="noopener noreferrer" style="color:#333333; text-decoration:none; font-weight:bold;">OWNER INSPECTIONS</a><span style="color:#333333; font-weight:bold;"> PTY. LTD.</span>
    </div>
    <div class="contact-info" style="margin-bottom: 15px;">
      <!-- 📞 Phone number (Primary direct contact method) -->
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <a href="tel:1300471805" target="_blank" rel="noopener noreferrer" style="color:#333333; text-decoration:none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 1px;">1300 471 805</a>
      </div>
      
      <!-- 💬 WhatsApp (For chat convenience) -->
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
        </svg>
        <a href="https://api.whatsapp.com/send/?phone=61456111000&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" style="color:#333333; text-decoration:none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 1px;">+61 456 111 000</a>
      </div>
      
      <!-- ✉️ Email (For replies to specific address) -->
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        <a href="mailto:maison.a@ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color:#333333; text-decoration:none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 1px;">maison.a@ownerinspections.com.au</a>
      </div>
      
      <!-- 🌐 Website URL (Business/portfolio guide) -->
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
        <a href="https://www.ownerinspections.com.au" target="_blank" rel="noopener noreferrer" style="color:#0b487b; text-decoration:none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 1px;">OwnerInspections.com.au</a>
      </div>
      
      <!-- 🏢 Address (Office locations for regulated profession) -->
      <div style="display: flex; align-items: flex-start;">
        <svg style="width: 16px; height: 16px; margin-right: 10px; fill: #0b487b; flex-shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div style="line-height: 1.4;">
          <div style="margin-bottom: 4px;"><strong style="color: #0b487b;">VIC:</strong> Level 14, 380 St Kilda Rd, Melbourne, VIC 3000</div>
          <div style="margin-bottom: 4px;"><strong style="color: #0b487b;">QLD:</strong> Level 22, 69 Ann St, Brisbane, QLD 4000</div>
          <div><strong style="color: #0b487b;">NSW:</strong> Level 1, 995 Victoria Rd, West Ryde</div>
        </div>
      </div>
    </div>
    <div class="social-media">
      <div class="social-links">
        <a href="https://www.linkedin.com/company/ownerinspections" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="https://www.youtube.com/@ownerinspections" target="_blank" rel="noopener noreferrer" title="YouTube">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a href="https://www.facebook.com/ownerinspections" target="_blank" rel="noopener noreferrer" title="Facebook">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/ownerinspections" target="_blank" rel="noopener noreferrer" title="Instagram">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://www.reddit.com/u/ownerinspections" target="_blank" rel="noopener noreferrer" title="Reddit">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        </a>
        <a href="https://medium.com/@ownerinspections" target="_blank" rel="noopener noreferrer" title="Medium">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
        </a>
      </div>
    </div>
    
    <!-- Additional Images Row -->
    <div class="additional-images" style="margin-top: 15px; margin-bottom: 15px;">
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/NSW-government.svg" alt="NSW Government" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/Au-society.svg" alt="Australian Society" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/BPC.svg" alt="BPC" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/Google-Reviews.svg" alt="Google Reviews" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/ProductReview.svg" alt="Product Review" style="height: 50px; width: auto; object-fit: contain;" />
        <img src="https://www.ownerinspections.com.au/lovable-uploads/Lisence/SVG/qbcc.svg" alt="QBCC" style="height: 50px; width: auto; object-fit: contain;" />
      </div>
    </div>
  </div>
</body>
</html>`;
                
                navigator.clipboard.writeText(standardHTML).then(() => {
                  toast({
                    title: "Standard template copied!",
                    description: "Standard email signature HTML has been copied to your clipboard.",
                  });
                }).catch(() => {
                  toast({
                    title: "Copy failed",
                    description: "Failed to copy to clipboard. Please try again.",
                    variant: "destructive",
                  });
                });
              }}
              variant="outline"
              className="font-inter"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Standard HTML
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto border-2 border-slate-200 font-mono max-h-96 overflow-y-auto">
              <code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Owner Inspections - Email Signature</title>
  <style>
    /* ... complete CSS styles ... */
  </style>
</head>
<body>
  <div class="signature">
    <div class="contact">
      Kind regards,<br /><br />
      <strong>MAISON AZDARI | Director | Owner Inspections</strong><br />
      <!-- ... complete HTML structure ... -->
    </div>
  </div>
</body>
</html>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

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
              <li>You can use either the standard template or create a custom one with the form above</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSignature; 