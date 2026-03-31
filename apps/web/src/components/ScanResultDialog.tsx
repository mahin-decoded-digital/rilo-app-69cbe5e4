import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useScannerStore } from "@/store/scannerStore";
import { useStampStore } from "@/store/stampStore";

export default function ScanResultDialog() {
  const navigate = useNavigate();
  
  // Accessing scanner store with individual selectors to prevent unnecessary re-renders
  const isDialogOpen = useScannerStore((s) => s.isDialogOpen);
  const scannedStampId = useScannerStore((s) => s.scannedStampId);
  const resetScanState = useScannerStore((s) => s.resetScanState);
  const setDialogOpen = useScannerStore((s) => s.setDialogOpen);

  // Accessing stamp store safely
  const stamps = useStampStore((s) => s.stamps);
  
  const stamp = useMemo(() => {
    if (!scannedStampId) return null;
    return (stamps ?? []).find((s) => s.id === scannedStampId) || null;
  }, [stamps, scannedStampId]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetScanState();
    } else {
      setDialogOpen(open);
    }
  };

  const handleViewDetails = () => {
    resetScanState();
    if (scannedStampId) {
      navigate(`/stamps/${scannedStampId}`);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {stamp ? "Stamp Identified!" : "Scan Complete"}
          </DialogTitle>
          <DialogDescription>
            {stamp 
              ? `We believe this is the ${stamp.name} stamp from ${stamp.country}.`
              : "A stamp was detected, but we couldn't load its specific details."}
          </DialogDescription>
        </DialogHeader>
        
        {stamp && (
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="overflow-hidden rounded-md border shadow-sm">
              <img 
                src={stamp.imageUrl} 
                alt={stamp.name} 
                className="max-h-56 w-auto object-contain transition-transform hover:scale-105"
              />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Year: {stamp.year} • Value: {stamp.value}
            </div>
          </div>
        )}
        
        <DialogFooter className="flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={resetScanState}
          >
            Close
          </Button>
          <Button 
            type="button" 
            onClick={handleViewDetails} 
            disabled={!stamp}
          >
            View Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}