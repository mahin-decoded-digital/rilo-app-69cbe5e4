import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Search, Image as ImageIcon } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-6">
      <div className="max-w-3xl text-center space-y-8">
        <div className="flex justify-center mb-6">
          <Globe className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Discover the World of Stamps
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore a vast collection of the world's most fascinating stamps, or scan your own to get instant details and history.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button size="lg" className="w-full sm:w-auto gap-2" onClick={() => navigate('/stamps')}>
            <Search className="w-5 h-5" />
            Explore Catalog
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" onClick={() => navigate('/scan')}>
            <ImageIcon className="w-5 h-5" />
            Scan a Stamp
          </Button>
        </div>
      </div>
    </div>
  );
}