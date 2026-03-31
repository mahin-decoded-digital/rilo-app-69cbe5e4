import React, { useEffect } from 'react';
import { useStampStore } from '@/store/stampStore';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import StampCard from './StampCard';

export default function StampList() {
  const isLoading = useStampStore((state) => state.isLoading);
  const error = useStampStore((state) => state.error);
  const loadStamps = useStampStore((state) => state.loadStamps);
  const stamps = useStampStore((state) => state.stamps);
  const searchQuery = useStampStore((state) => state.searchQuery);
  const getFilteredStamps = useStampStore((state) => state.getFilteredStamps);

  useEffect(() => {
    loadStamps();
  }, [loadStamps]);

  // Calling getFilteredStamps during render is safe because we've subscribed
  // to stamps and searchQuery above, ensuring this component re-renders when they change.
  const filteredStamps = getFilteredStamps();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-destructive/10 border-destructive/20 text-destructive">
        <AlertCircle className="h-8 w-8 mb-3" />
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!filteredStamps || filteredStamps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg bg-muted/30 border-dashed">
        <p className="text-xl font-medium text-muted-foreground mb-2">No stamps found.</p>
        <p className="text-sm text-muted-foreground">
          {searchQuery ? "Try adjusting your search query to find what you're looking for." : "Add some stamps to your catalog."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {(filteredStamps ?? []).map((stamp) => (
        <StampCard key={stamp.id} stamp={stamp} />
      ))}
    </div>
  );
}