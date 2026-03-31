import { useEffect, useRef, useState } from 'react';
import { useScannerStore } from '@/store/scannerStore';
import { useStampStore } from '@/store/stampStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Upload, Search, Image as ImageIcon } from 'lucide-react';
import ScanResultDialog from '@/components/ScanResultDialog';

export default function ScanPage() {
  const uploadedImageUrl = useScannerStore((state) => state.uploadedImageUrl);
  const isScanning = useScannerStore((state) => state.isScanning);
  const setUploadedImageUrl = useScannerStore((state) => state.setUploadedImageUrl);
  const performSimulatedScan = useScannerStore((state) => state.performSimulatedScan);
  
  const stamps = useStampStore((state) => state.stamps);
  const loadStamps = useStampStore((state) => state.loadStamps);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadStamps();
  }, [loadStamps]);

  useEffect(() => {
    if (isScanning) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((p) => Math.min(p + 15, 95));
      }, 300);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [isScanning]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (uploadedImageUrl && !isScanning) {
      performSimulatedScan({ stamps });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Scan Your Stamp</h1>
        <p className="text-muted-foreground">
          Upload an image of a stamp to instantly identify it and discover its history.
        </p>
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-8">
        <div className="space-y-4">
          <Label htmlFor="stamp-image" className="text-base font-semibold">
            Upload Stamp Image
          </Label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 bg-muted/10 transition-colors hover:bg-muted/20">
            {uploadedImageUrl ? (
              <div className="relative w-full max-w-md flex flex-col items-center gap-4">
                <img 
                  src={uploadedImageUrl} 
                  alt="Uploaded stamp" 
                  className="max-h-64 object-contain rounded-md shadow-sm"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                >
                  <Upload className="w-4 h-4 mr-2" /> Change Image
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-8 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="p-3 bg-secondary rounded-full mb-2">
                  <ImageIcon className="w-8 h-8 text-secondary-foreground" />
                </div>
                <p className="font-medium text-foreground">Click to select an image</p>
                <p className="text-sm text-muted-foreground">PNG, JPG or WEBP (max 5MB)</p>
              </div>
            )}
            <Input
              id="stamp-image"
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
              disabled={isScanning}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full gap-2" 
            size="lg" 
            disabled={!uploadedImageUrl || isScanning}
            onClick={handleScan}
          >
            {isScanning ? (
              <>
                <Search className="w-5 h-5 animate-pulse" />
                Scanning Stamp...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Scan Stamp
              </>
            )}
          </Button>

          {isScanning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Analyzing features...</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </div>

      <ScanResultDialog />
    </div>
  );
}