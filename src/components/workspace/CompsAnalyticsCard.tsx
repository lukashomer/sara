import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/cup-button";
import { Download, Share, Printer, MapPin, Home } from "lucide-react";
import { Badge } from "@/components/ui/cup-badge";
import { Card, CardContent } from "@/components/ui/cup-card";
import { motion } from "framer-motion";
import ResultCard from "@/components/ResultCard";

interface CompItem {
  id: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  imageUrl: string;
  price: number;
  status: "sold" | "active" | "pending";
  soldDate?: string;
  coordinates: [number, number]; // [latitude, longitude]
}

interface CompsAnalyticsCardProps {
  title?: string;
  subtitle?: string;
  sourceLink?: string;
  comps?: CompItem[];
  filters?: string[];
  isVisible?: boolean;
}

const CompsAnalyticsCard: React.FC<CompsAnalyticsCardProps> = ({
  title = "Comparable Properties",
  subtitle = "Similar properties in your area",
  sourceLink = "https://example.com/property/123",
  comps = [
    {
      id: "1",
      title: "Modern Townhouse",
      address: "123 Main St, Anytown, CA",
      beds: 3,
      baths: 2,
      sqft: 1850,
      type: "Townhouse",
      imageUrl:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      price: 750000,
      status: "sold",
      soldDate: "2023-09-15",
      coordinates: [37.7749, -122.4194],
    },
    {
      id: "2",
      title: "Luxury Condo",
      address: "456 Park Ave, Anytown, CA",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "Condo",
      imageUrl:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      price: 620000,
      status: "sold",
      soldDate: "2023-10-02",
      coordinates: [37.7749, -122.4294],
    },
    {
      id: "3",
      title: "Family Home",
      address: "789 Oak St, Anytown, CA",
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: "Single Family",
      imageUrl:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      price: 980000,
      status: "sold",
      soldDate: "2023-08-28",
      coordinates: [37.7849, -122.4194],
    },
    {
      id: "4",
      title: "Downtown Loft",
      address: "321 Urban Way, Anytown, CA",
      beds: 1,
      baths: 1,
      sqft: 950,
      type: "Loft",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      price: 550000,
      status: "sold",
      soldDate: "2023-11-05",
      coordinates: [37.7739, -122.4184],
    },
  ],
  filters = ["All", "Townhouse", "Condo", "Single Family", "Loft"],
  isVisible = true,
}) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [sourceProperty, setSourceProperty] = useState<CompItem>({
    id: "source",
    title: "Your Property",
    address: "100 Home St, Anytown, CA",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Single Family",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    price: 850000,
    status: "active",
    coordinates: [37.7749, -122.4194],
  });

  const filteredComps =
    activeFilter === "All"
      ? comps
      : comps.filter((comp) => comp.type === activeFilter);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate fetching source property
  useEffect(() => {
    // In a real app, you would fetch the source property data here
    // based on the sourceLink
    console.log("Source link:", sourceLink);
  }, [sourceLink]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full rounded-lg overflow-hidden bg-[#fbfbfb]"
    >
      <div className="p-4 sm:p-5 border-b bg-[#fbfbfb]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-2 justify-start sm:justify-between">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">
            {title}
          </h1>
          <div className="flex flex-wrap gap-3 ml-auto">
            <Button
              variant="highlight"
              size="sm"
              className="h-9 w-9 p-0 flex items-center justify-center"
              aria-label="Download PDF"
              title="Download PDF"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="highlight"
              size="sm"
              className="h-9 w-9 p-0 flex items-center justify-center"
              aria-label="Share"
              title="Share"
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button
              variant="highlight"
              size="sm"
              className="h-9 w-9 p-0 flex items-center justify-center"
              aria-label="Print"
              title="Print"
            >
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      {/* Source Property */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium mb-3">Source Property</h3>
        <div className="bg-white rounded-lg shadow-sm p-3 flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
            <Home className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium line-clamp-1">
              {sourceProperty.title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-1">
              {sourceProperty.address}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0.5 bg-secondary-light"
              >
                ${sourceProperty.price.toLocaleString()}
              </Badge>
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0.5 border-gray-200"
              >
                {sourceProperty.type}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      {/* Filter Pills */}
      <div className="p-4 border-b overflow-x-auto">
        <div className="flex gap-3 flex-nowrap min-w-max">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={
                `cursor-pointer rounded-full px-4 py-2 ${activeFilter === filter ? "bg-brand-blue text-white" : "bg-white text-gray-700 border-gray-300"}` +
                " text-sm font-medium "
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] bg-secondary-light">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="w-full h-full bg-[#e8f0f7] flex items-center justify-center">
            <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
              <p className="text-sm font-medium">
                Map would render here with react-leaflet
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Showing {filteredComps.length} comparable properties
              </p>
            </div>
            {/* Map pins would be positioned absolutely here */}
            {filteredComps.map((comp, index) => (
              <div
                key={comp.id}
                className="absolute w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white text-xs"
                style={{
                  top: `${30 + index * 30}px`,
                  left: `${50 + index * 50}px`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <MapPin className="h-3 w-3" />
              </div>
            ))}
            {/* Source property pin */}
            <div
              className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs"
              style={{
                top: "150px",
                left: "150px",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                zIndex: 10,
              }}
            >
              <Home className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
      {/* Comparable Properties List */}
      <div className="flex-1 overflow-y-auto p-4 scroll-container">
        <h3 className="text-sm font-medium mb-3">
          {activeFilter === "All"
            ? "All Comparable Properties"
            : `${activeFilter} Properties`}{" "}
          ({filteredComps.length})
        </h3>
        <div className="space-y-4">
          {filteredComps.map((comp) => (
            <div className="h-3/5" key={comp.id}>
              <ResultCard
                key={comp.id}
                title={comp.title}
                address={comp.address}
                category={comp.type}
                imageUrl={comp.imageUrl}
                onView={() => console.log(`View property: ${comp.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CompsAnalyticsCard;
