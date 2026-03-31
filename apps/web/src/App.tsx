import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import StampDetailPage from "@/pages/StampDetailPage";
import ScanPage from "@/pages/ScanPage";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stamps" element={<CatalogPage />} />
          <Route path="/stamps/:id" element={<StampDetailPage />} />
          <Route path="/scan" element={<ScanPage />} />
        </Routes>
      </main>
    </div>
  );
}