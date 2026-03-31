import { useEffect } from 'react';
import { useStampStore } from '@/store/stampStore';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import StampList from '@/components/StampList';

export default function CatalogPage() {
  const searchQuery = useStampStore((state) => state.searchQuery);
  const setSearchQuery = useStampStore((state) => state.setSearchQuery);
  const loadStamps = useStampStore((state) => state.loadStamps);
  const isLoading = useStampStore((state) => state.isLoading);

  useEffect(() => {
    loadStamps();
  }, [loadStamps]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Stamp Catalog</h1>
          <p className="text-muted-foreground mt-1">Browse and search through our extensive collection.</p>
        </div>
        <div className="relative w-full md:w-72">
          {isLoading ? (
             <Skeleton className="h-10 w-full rounded-md" />
          ) : (
            <>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or country..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </>
          )}
        </div>
      </div>
      
      <StampList />
    </div>
  );
}