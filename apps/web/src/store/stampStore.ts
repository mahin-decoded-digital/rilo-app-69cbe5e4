import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Stamp } from '@/types/stamps';
import { STAMP_DATA } from '@/data/stamps';

export interface StampState {
  stamps: Stamp[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  loadStamps: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  getFilteredStamps: () => Stamp[];
  getStampById: (id: string) => Stamp | undefined;
}

export const useStampStore = create<StampState>()(
  persist(
    (set, get) => ({
      stamps: [],
      searchQuery: '',
      isLoading: false,
      error: null,

      loadStamps: async () => {
        const { stamps } = get();
        
        // Prevent reloading if we already have data in persistence
        if (stamps && stamps.length > 0) return;

        set({ isLoading: true, error: null });
        try {
          // Simulate network delay for realistic loading states
          await new Promise((resolve) => setTimeout(resolve, 800));
          set({ stamps: STAMP_DATA, isLoading: false });
        } catch (error) {
          set({ 
            error: 'Failed to load stamps. Please try again later.', 
            isLoading: false 
          });
        }
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      getFilteredStamps: () => {
        const { stamps, searchQuery } = get();
        if (!searchQuery.trim()) return stamps;

        const lowerQuery = searchQuery.toLowerCase();
        return (stamps ?? []).filter(
          (stamp) =>
            stamp.name.toLowerCase().includes(lowerQuery) ||
            stamp.country.toLowerCase().includes(lowerQuery)
        );
      },

      getStampById: (id: string) => {
        const { stamps } = get();
        return (stamps ?? []).find((stamp) => stamp.id === id);
      },
    }),
    {
      name: 'stamp-catalog-storage-v2',
      // Only persist the stamps data, let UI state like loading/searchQuery reset
      partialize: (state) => ({ stamps: state.stamps }),
    }
  )
);