import React, { useMemo, useState } from "react";
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
import { LifestyleMapResult } from "@/api/saraSchemas";
import { capitalize, decapitalize } from "@/lib/utils";
import { COLORS } from "@/lib/themeUtils";
import GoogleMap from "../GoogleMap";

interface LifestyleMappingCardProps {
  title?: string;
  subtitle?: string;
  lifestyleMapResult?: LifestyleMapResult;
}

const getIconForType = (type: string) => {
  const lowerType = type.toLowerCase();

  if (lowerType.includes("school")) {
    return <School className="h-4 w-4" />;
  }
  if (lowerType.includes("cafe")) {
    return <Coffee className="h-4 w-4" />;
  }
  if (lowerType.includes("gym")) {
    return <Dumbbell className="h-4 w-4" />;
  }
  if (lowerType.includes("restaurant")) {
    return <Utensils className="h-4 w-4" />;
  }
  if (lowerType.includes("shopping")) {
    return <ShoppingBag className="h-4 w-4" />;
  }

  return <MapPin className="h-4 w-4" />;
};

const LifestyleMappingCard: React.FC<LifestyleMappingCardProps> = ({
  title = "Lifestyle Mapping",
  subtitle = "Points of interest near your property",
  lifestyleMapResult,
}) => {
  const { location, points_of_interest, search_params } =
    lifestyleMapResult || {};
  const coordinates = location?.coordinates;
  const categories = search_params?.categories;

  const filters: string[] = useMemo(
    () => [
      "All",
      ...(categories
        ?.map((category) =>
          typeof category === "string" ? capitalize(category) : null
        )
        .filter(Boolean) || []),
    ],
    [categories]
  );

  const filtersColors = useMemo(
    () =>
      categories?.reduce((acc, category, index) => {
        // not random color but based on index
        acc[category] = COLORS[index % COLORS.length];
        return acc;
      }, {}),
    [categories]
  );

  const allPointsOfInterest = useMemo(
    () =>
      Object.values(points_of_interest || {})
        .flat()
        .sort((a, b) => a.distance_km - b.distance_km),
    [points_of_interest]
  );

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredMapData =
    activeFilter === "All"
      ? allPointsOfInterest
      : points_of_interest?.[decapitalize(activeFilter)] || [];

  const mapPoints = useMemo(() => {
    return filteredMapData.map((point) => ({
      name: point.name,
      category: point.category,
      coordinates: point.geometry?.location,
    }));
  }, [filteredMapData]);

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
          <div className="flex flex-wrap gap-3">
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
              aria-label="Print"
              title="Print"
            >
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto scroll-container gap-4">
        {/* Filter Pills */}
        <div className="p-4 border-b overflow-x-auto no-scrollbar flex-shrink-0">
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
        <GoogleMap
          coordinates={coordinates}
          points={mapPoints}
          colors={filtersColors}
        />
        {/* Points of Interest List */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium mb-3">
            {activeFilter === "All"
              ? "All Points of Interest"
              : `${activeFilter} Locations`}{" "}
            ({filteredMapData.length})
          </h3>
          <div className="space-y-3">
            {filteredMapData.map((point, index) => (
              <Card
                key={`${point.name}-${index}`}
                className="overflow-hidden bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3 flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    {getIconForType(point.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-1">
                      {point.name}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      <a
                        href={point.place_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {point.address}
                      </a>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0.5 bg-secondary-light"
                      >
                        {point.distance_km}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0.5 border-gray-200"
                      >
                        {capitalize(point.category)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LifestyleMappingCard;
