import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, BookOpen, Search, Home } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-primary" />
          <span className="font-bold tracking-tight text-lg hidden sm:inline-block">
            Global Stamps
          </span>
        </Link>
        
        <div className="flex items-center space-x-1 sm:space-x-4">
          <Button 
            variant={isActive("/") ? "secondary" : "ghost"} 
            size="sm" 
            asChild
          >
            <Link to="/">
              <Home className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline-block">Home</span>
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/stamps") ? "secondary" : "ghost"} 
            size="sm" 
            asChild
          >
            <Link to="/stamps">
              <BookOpen className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline-block">Catalog</span>
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/scan") ? "default" : "outline"} 
            size="sm" 
            asChild
          >
            <Link to="/scan">
              <Search className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline-block">Scan Stamp</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}