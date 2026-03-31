import { create } from 'zustand';
import type { Stamp } from '@/types/stamps';

export interface ScannerState {
  uploadedImageUrl: string;
  isScanning: boolean;
  scannedStampId: string;
  isDialogOpen: boolean;
  setUploadedImageUrl: (url: string) => void;
  performSimulatedScan: (stampStore: { stamps: Stamp[] }) => Promise<void>;
  resetScanState: () => void;
  setDialogOpen: (isOpen: boolean) => void;
}

export const useScannerStore = create<ScannerState>((set) => ({
  uploadedImageUrl: "",
  isScanning: false,
  scannedStampId: "",
  isDialogOpen: false,

  setUploadedImageUrl: (url: string) => set({ uploadedImageUrl: url }),

  performSimulatedScan: async (stampStore: { stamps: Stamp[] }) => {
    // Reset state before scanning
    set({ isScanning: true, isDialogOpen: false, scannedStampId: "" });

    // Simulate an artificial delay for the scan process (e.g., 2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const stamps = stampStore?.stamps ?? [];
    if (stamps.length > 0) {
      // Randomly pick a stamp from the catalog to simulate an identification
      const randomIndex = Math.floor(Math.random() * stamps.length);
      const randomStamp = stamps[randomIndex];
      
      set({
        isScanning: false,
        scannedStampId: randomStamp.id,
        isDialogOpen: true,
      });
    } else {
      // Fallback if no stamps are currently loaded in the store
      set({
        isScanning: false,
        scannedStampId: "",
        isDialogOpen: true,
      });
    }
  },

  resetScanState: () =>
    set({
      uploadedImageUrl: "",
      isScanning: false,
      scannedStampId: "",
      isDialogOpen: false,
    }),

  setDialogOpen: (isOpen: boolean) => set({ isDialogOpen: isOpen }),
}));