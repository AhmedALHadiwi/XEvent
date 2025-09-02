import { QrCode } from "lucide-react";

interface QRCodeGeneratorProps {
  data: string;
  size?: number;
  className?: string;
}

export default function QRCodeGenerator({ data, size = 160, className = "" }: QRCodeGeneratorProps) {
  // In a real application, you would use a proper QR code library like 'qrcode'
  // For this demo, we'll show a placeholder with the data
  
  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        className="border-2 border-gray-300 bg-white p-4 rounded-lg"
        style={{ width: size, height: size }}
      >
        <QrCode className="w-full h-full text-gray-400" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/95 px-2 py-1 rounded text-xs font-mono text-center max-w-[80%] break-all">
            {data.slice(0, 20)}...
          </div>
        </div>
      </div>
      <div className="text-xs text-center mt-2 text-muted-foreground font-mono">
        QR: {data}
      </div>
    </div>
  );
}