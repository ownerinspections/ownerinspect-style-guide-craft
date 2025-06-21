
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const LogoSection = () => {
  const handleDownloadPNG = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/dcff9bfb-7797-430e-a70f-6f436306ca6d.png';
    link.download = 'owner-inspections-logo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSVG = () => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3869.04 1315.36">
  <defs>
    <style>
      .cls-1 {
        fill: #0f497b;
      }

      .cls-2 {
        fill: #0a4978;
      }

      .cls-3 {
        fill: #2d9bd6;
      }

      .cls-4 {
        fill: none;
        stroke: #898b8e;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 34.02px;
      }
    </style>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g>
      <path class="cls-3" d="M363.63,0C162.8,0,0,158.11,0,353.14s162.8,353.14,363.63,353.14,363.64-158.1,363.64-353.14S564.47,0,363.63,0Zm0,555.93c-101.2,0-183.25-90.79-183.25-202.79s82.05-202.78,183.25-202.78,183.26,90.79,183.26,202.78-82.05,202.79-183.26,202.79Z"/>
      <path class="cls-1" d="M1976.99,1125.43l83.95,50.21c-36.42,56.42-101.02,93.93-174.64,93.93-113.76,0-205.98-89.56-205.98-200.03s92.22-200.03,205.98-200.03c77.24,0,144.55,41.29,179.8,102.38l-84.92,51.01c-16.15-40.19-52.56-68.22-94.88-68.22-57.33,0-103.8,51.42-103.8,114.86s46.47,114.86,103.8,114.86c38.99,0,72.96-23.79,90.69-58.97Z"/>
      <polygon class="cls-3" points="1709.61 14.78 1518.89 690.36 1331.61 690.36 1227.63 276.74 1135.14 690.36 944.42 690.36 745.66 14.78 946.72 14.78 1045.53 457.12 1155.83 14.78 1300.59 14.78 1415.49 457.12 1514.29 14.78 1709.61 14.78"/>
      <polygon class="cls-3" points="2386.34 14.78 2386.34 685.76 2220.89 685.76 1937.8 303.16 1937.8 690.36 1768.21 690.36 1768.21 14.78 1947.44 14.78 2218.59 382.44 2218.59 14.78 2386.34 14.78"/>
      <polygon class="cls-3" points="2687.74 164.14 2687.74 266.78 3011.63 266.78 3011.63 421.5 2686.21 421.5 2686.21 533.33 3011.63 533.33 3011.63 690.36 2517.7 690.36 2517.7 14.78 3011.63 14.78 3011.63 164.14 2687.74 164.14"/>
      <path class="cls-1" d="M3619.72,490.44c4.34,5.06,68.35-33.52,75.29-37.92,23.5-14.9,45.33-32.63,63.2-54.05,85.49-102.48,45.61-258.1-53.19-336.24-55.56-43.93-126.17-62.23-196.17-62.23h-409.02V570.87l174.63-197.62h226.34v26.42h-214.85l-318.25,369.96,13.91,13.92,312.96-368.94,309.64,361.93h264.83s-249.29-286.06-249.32-286.1Zm-134.43-160.28h-211.97V158.97h214.85c45.38,0,76.97,49.98,76.97,88.47s-25.85,82.72-79.85,82.72Z"/>
      <polygon class="cls-3" points="3329.61 480.67 3073.97 784.55 3007.34 784.55 3294.23 440.06 3329.61 480.67"/>
      <rect class="cls-3" x="3273.32" y="621.42" width="56.3" height="51.7"/>
      <rect class="cls-3" x="3343.97" y="621.42" width="56.3" height="51.7"/>
      <rect class="cls-3" x="3273.32" y="683.46" width="56.3" height="51.7"/>
      <rect class="cls-3" x="3343.97" y="683.46" width="56.3" height="51.7"/>
      <rect class="cls-1" x="1.31" y="878.78" width="102.66" height="399.26"/>
      <polygon class="cls-1" points="167.74 878.78 284.36 878.78 432.57 1082.72 432.57 878.78 542.87 878.78 542.87 1278.04 442.34 1278.04 275.17 1045.95 275.17 1278.04 167.74 1278.04 167.74 878.78"/>
      <path class="cls-1" d="M916.27,930.48s-67.79,57.79-67.79,57.79c-31.53-29.48-78.4-48.72-121.07-33.18-14.6,5.32-32.16,20.98-29,38.36,3.44,18.9,26.79,25.72,42.55,30.27,24.67,7.13,50.32,10.33,75.21,16.62,25.79,6.52,52.12,15.99,71.79,34.6,22.83,21.6,31.18,52.37,31.18,83.05,0,83.3-87.35,119.16-158.82,120.91-24.07,.59-48.72-1.9-72.08-7.63-17.51-4.3-34.43-10.86-50.26-19.51-5.45-2.98-39.02-26.02-53.19-40.34,0,0,50.15-63.23,50.15-63.23,28.87,29.34,62.6,40.88,99.61,44.31,24.4,2.26,86.92,.62,86.92-35.65,0-74.68-224.62-8.62-224.62-152.81s212.55-180.38,319.4-73.53Z"/>
      <path class="cls-1" d="M1188,878.78h-215.24v399.26h108.77v-142.66s35.23,0,108,0c45.66,0,81.1-36.6,101.07-74.4,22.27-42.16,20.9-93.96-8.09-132.82-22.45-30.09-56.58-49.38-94.52-49.38Zm-9.2,174.07h-105.12v-87.9h102.83c21.83,0,36.76,23.55,36.76,43.95s-12.64,43.95-34.47,43.95Z"/>
      <polygon class="cls-1" points="1638.38 878.78 1358.04 878.78 1358.04 1264.82 1642.21 1264.82 1642.21 1182.1 1462.21 1182.1 1462.21 1116.23 1642.21 1116.23 1642.21 1028.14 1458.38 1028.14 1458.38 964.95 1642.21 964.95 1638.38 878.78"/>
      <polygon class="cls-1" points="2094.89 878.78 2418.12 878.78 2418.12 966.1 2307.06 966.1 2307.06 1270.19 2204.42 1270.19 2204.42 966.87 2094.89 966.87 2094.89 878.78"/>
      <rect class="cls-1" x="2465.61" y="878.78" width="99.96" height="391.4"/>
      <path class="cls-3" d="M3029.17,966.67h-74.11c-103.4-108-356.17-36.96-276.09,194.17l-53.66,52.85c-147.06-361.34,281.49-473.94,403.85-247.02Z"/>
      <path class="cls-3" d="M2980,1163.72h65.83c-57.45,152.81-215.45,186.89-348.89,116.81l47.49-52.72c99.19,49.66,192.51,15.83,235.57-64.09Z"/>
      <line class="cls-4" x1="2628.63" y1="1277.46" x2="2737.21" y2="1168.89"/>
      <circle class="cls-4" cx="2830.38" cy="1083.13" r="124.82"/>
      <polygon class="cls-2" points="3096 881.85 3096 1277.46 3193.27 1277.46 3193.27 1045.76 3358.72 1277.46 3460.59 1277.46 3460.59 881.85 3358.72 881.85 3358.72 1088.65 3203.23 881.85 3096 881.85"/>
      <path class="cls-1" d="M3835.48,928.98s-67.79,57.79-67.79,57.79c-31.53-29.48-78.4-48.72-121.07-33.18-14.6,5.32-32.16,20.98-29,38.36,3.44,18.9,26.79,25.72,42.55,30.27,24.67,7.13,50.32,10.33,75.21,16.62,25.79,6.52,52.12,15.99,71.79,34.6,22.83,21.6,31.18,52.37,31.18,83.05,0,83.3-87.35,119.16-158.82,120.91-24.07,.59-48.72-1.9-72.08-7.63-17.51-4.3-34.43-10.86-50.26-19.51-5.45-2.98-39.02-26.02-53.19-40.34,0,0,50.15-63.23,50.15-63.23,28.87,29.34,62.6,40.88,99.61,44.31,24.4,2.26,86.92,.62,86.92-35.65,0-74.68-224.62-8.62-224.62-152.81s212.55-180.38,319.4-73.53Z"/>
    </g>
  </g>
</svg>`;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'owner-inspections-logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFaviconPNG = () => {
    // Create a canvas to generate the favicon PNG based on the actual logo style
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw the circular background in primary blue
      ctx.fillStyle = '#0b487b';
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw the outer magnifying glass circle (larger)
      ctx.strokeStyle = '#898b8e';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(28, 28, 16, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw the inner magnifying glass circle (smaller, concentric)
      ctx.strokeStyle = '#898b8e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(28, 28, 10, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw the magnifying glass handle
      ctx.strokeStyle = '#898b8e';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(40, 40);
      ctx.lineTo(50, 50);
      ctx.stroke();
    }
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'owner-inspections-favicon.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleDownloadFaviconSVG = () => {
    const faviconSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <style>
      .favicon-bg { fill: #0b487b; }
      .favicon-glass-outer { fill: none; stroke: #898b8e; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
      .favicon-glass-inner { fill: none; stroke: #898b8e; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .favicon-handle { fill: none; stroke: #898b8e; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
    </style>
  </defs>
  <circle class="favicon-bg" cx="32" cy="32" r="32"/>
  <circle class="favicon-glass-outer" cx="28" cy="28" r="16"/>
  <circle class="favicon-glass-inner" cx="28" cy="28" r="10"/>
  <line class="favicon-handle" x1="40" y1="40" x2="50" y2="50"/>
</svg>`;
    
    const blob = new Blob([faviconSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'owner-inspections-favicon.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Logo & Identity</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          The Owner Inspections logo combines professional trust with modern accessibility. 
          Use these guidelines to maintain brand consistency.
        </p>
      </div>

      {/* Primary Logo */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8 text-center bg-gradient-to-br from-white to-slate-50">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex justify-center">
              <img 
                src="/lovable-uploads/dcff9bfb-7797-430e-a70f-6f436306ca6d.png" 
                alt="Owner Inspections Logo" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-slate-500 mt-2">Professional Property Inspections</p>
          </div>
          <Badge variant="default" className="bg-[#0b487b]">Primary Logo</Badge>
        </Card>

        <Card className="p-8 text-center bg-slate-900">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex justify-center bg-white p-4 rounded-lg">
              <img 
                src="/lovable-uploads/dcff9bfb-7797-430e-a70f-6f436306ca6d.png" 
                alt="Owner Inspections Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-slate-300 mt-2">Professional Property Inspections</p>
          </div>
          <Badge variant="secondary">On Dark Backgrounds</Badge>
        </Card>
      </div>

      {/* Logo Usage Guidelines */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Do's */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-slate-800">Do</h3>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li>• Use the logo with sufficient clear space</li>
            <li>• Maintain the original proportions</li>
            <li>• Use on high contrast backgrounds</li>
            <li>• Scale proportionally when resizing</li>
            <li>• Use approved color variations only</li>
          </ul>
        </Card>

        {/* Don'ts */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-xl font-semibold text-slate-800">Don't</h3>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li>• Stretch or distort the logo</li>
            <li>• Change the colors or gradients</li>
            <li>• Add effects or shadows</li>
            <li>• Place on busy backgrounds</li>
            <li>• Use below minimum size (60px width)</li>
          </ul>
        </Card>
      </div>

      {/* Download Section */}
      <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-dashed border-blue-200">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Logo Assets</h3>
        <p className="text-slate-600 mb-6">Download high-resolution logo files for various applications</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" onClick={handleDownloadPNG}>
            <Download className="w-4 h-4 mr-2" />
            PNG File
          </Button>
          <Button variant="outline" onClick={handleDownloadSVG}>
            <Download className="w-4 h-4 mr-2" />
            SVG Vector
          </Button>
        </div>
      </Card>

      {/* Favicon Section */}
      <Card className="p-8 text-center bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-dashed border-slate-200">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Favicon</h3>
        <p className="text-slate-600 mb-6">The magnifying glass icon from our logo, perfect for browser tabs and bookmarks</p>
        
        {/* Favicon Preview */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto">
              <circle fill="#0b487b" cx="32" cy="32" r="32"/>
              <circle fill="none" stroke="#898b8e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" cx="28" cy="28" r="16"/>
              <circle fill="none" stroke="#898b8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" cx="28" cy="28" r="10"/>
              <line stroke="#898b8e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" x1="40" y1="40" x2="50" y2="50"/>
            </svg>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" onClick={handleDownloadFaviconPNG}>
            <Download className="w-4 h-4 mr-2" />
            Favicon PNG
          </Button>
          <Button variant="outline" onClick={handleDownloadFaviconSVG}>
            <Download className="w-4 h-4 mr-2" />
            Favicon SVG
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default LogoSection;
