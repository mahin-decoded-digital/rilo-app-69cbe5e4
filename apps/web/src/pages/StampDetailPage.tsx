import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStampStore } from '@/store/stampStore';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, MapPin, Calendar, CreditCard } from 'lucide-react';

export default function StampDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const loadStamps = useStampStore((state) => state.loadStamps);
  const isLoading = useStampStore((state) => state.isLoading);
  const stamps = useStampStore((state) => state.stamps);
  
  const stamp = useStampStore((state) => state.getStampById(id ?? ''));

  useEffect(() => {
    loadStamps();
  }, [loadStamps]);

  if (isLoading && stamps.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" className="mb-6 gap-2" disabled>
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Button>
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="w-full aspect-[4/5] rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!stamp) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Stamp not found</h2>
        <p className="text-muted-foreground mb-8">The stamp you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/stamps')} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate('/stamps')} className="mb-6 gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-card rounded-xl border p-6 md:p-8 shadow-sm">
        <div className="flex justify-center items-start bg-muted/30 rounded-lg p-4">
          <img 
            src={stamp.imageUrl} 
            alt={stamp.name} 
            className="max-w-full h-auto object-contain rounded-md shadow-sm"
            style={{ maxHeight: '600px' }}
          />
        </div>
        
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              {stamp.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-4">
              <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full text-sm font-medium text-secondary-foreground">
                <MapPin className="w-4 h-4" />
                {stamp.country}
              </div>
              <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full text-sm font-medium text-secondary-foreground">
                <Calendar className="w-4 h-4" />
                {stamp.year}
              </div>
              <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full text-sm font-medium text-secondary-foreground">
                <CreditCard className="w-4 h-4" />
                {stamp.value}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {stamp.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}