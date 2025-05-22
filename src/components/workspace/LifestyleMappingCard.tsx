import React, { useState } from "react";
import { Button } from "@/components/ui/cup-button";
import {
  Download,
  Share,
  Printer,
  MapPin,
  School,
  Coffee,
  Dumbbell,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { Badge } from "@/components/ui/cup-badge";
import { Card, CardContent } from "@/components/ui/cup-card";
import { motion } from "framer-motion";

interface MapPoint {
  id: string;
  type: string;
  name: string;
  address: string;
  distance: string;
  icon: string;
  coordinates: [number, number]; // [latitude, longitude]
}

interface LifestyleMappingCardProps {
  title?: string;
  subtitle?: string;
  mapData?: MapPoint[];
  filters?: string[];
  isVisible?: boolean;
}

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case "school":
      return <School className="h-4 w-4" />;
    case "cafe":
      return <Coffee className="h-4 w-4" />;
    case "gym":
      return <Dumbbell className="h-4 w-4" />;
    case "restaurant":
      return <Utensils className="h-4 w-4" />;
    case "shopping":
      return <ShoppingBag className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

const LifestyleMappingCard: React.FC<LifestyleMappingCardProps> = ({
  title = "Lifestyle Mapping",
  subtitle = "Points of interest near your property",
  mapData = [
    {
      id: "1",
      type: "School",
      name: "Lincoln Elementary School",
      address: "123 Education Ave, Anytown, CA",
      distance: "0.5 miles",
      icon: "school",
      coordinates: [37.7749, -122.4194],
    },
    {
      id: "2",
      type: "Cafe",
      name: "Morning Brew Coffee",
      address: "456 Caffeine St, Anytown, CA",
      distance: "0.3 miles",
      icon: "cafe",
      coordinates: [37.7749, -122.4294],
    },
    {
      id: "3",
      type: "Gym",
      name: "FitLife Fitness Center",
      address: "789 Workout Blvd, Anytown, CA",
      distance: "0.7 miles",
      icon: "gym",
      coordinates: [37.7849, -122.4194],
    },
    {
      id: "4",
      type: "Restaurant",
      name: "Taste of Italy",
      address: "321 Pasta Lane, Anytown, CA",
      distance: "0.4 miles",
      icon: "restaurant",
      coordinates: [37.7739, -122.4184],
    },
    {
      id: "5",
      type: "Shopping",
      name: "Central Mall",
      address: "555 Retail Road, Anytown, CA",
      distance: "1.2 miles",
      icon: "shopping",
      coordinates: [37.7759, -122.4294],
    },
  ],
  filters = ["All", "School", "Cafe", "Gym", "Restaurant", "Shopping"],
  isVisible = true,
}) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [mapLoaded, setMapLoaded] = useState(false);

  const filteredMapData =
    activeFilter === "All"
      ? mapData
      : mapData.filter((point) => point.type === activeFilter);

  // Simulate map loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
                Showing {filteredMapData.length} points of interest
              </p>
            </div>
            {/* Map pins would be positioned absolutely here */}
            {filteredMapData.map((point, index) => (
              <div
                key={point.id}
                className="absolute w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white text-xs"
                style={{
                  top: `${30 + index * 30}px`,
                  left: `${50 + index * 50}px`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {getIconForType(point.type)}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Points of Interest List */}
      <div className="flex-1 overflow-y-auto p-4 scroll-container">
        <h3 className="text-sm font-medium mb-3">
          {activeFilter === "All"
            ? "All Points of Interest"
            : `${activeFilter} Locations`}{" "}
          ({filteredMapData.length})
        </h3>
        <div className="space-y-3">
          {filteredMapData.map((point) => (
            <Card
              key={point.id}
              className="overflow-hidden bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-3 flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                  {getIconForType(point.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-1">
                    {point.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {point.address}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0.5 bg-secondary-light"
                    >
                      {point.distance}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0.5 border-gray-200"
                    >
                      {point.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LifestyleMappingCard;
