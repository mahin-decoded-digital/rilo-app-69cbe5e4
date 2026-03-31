import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Stamp } from "@/types/stamps";

interface StampCardProps {
  stamp: Stamp;
}

export default function StampCard({ stamp }: StampCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer overflow-hidden transition-all hover:shadow-md hover:border-primary/50 flex flex-col h-full"
      onClick={() => navigate(`/stamps/${stamp.id}`)}
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-muted relative">
        <img 
          src={stamp.imageUrl} 
          alt={stamp.name} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg line-clamp-1" title={stamp.name}>
          {stamp.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm text-muted-foreground flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between mt-1">
          <span className="truncate pr-2 font-medium text-foreground/80">
            {stamp.country}
          </span>
          <span className="shrink-0 bg-secondary px-2 py-0.5 rounded-md text-xs font-semibold text-secondary-foreground">
            {stamp.year}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}