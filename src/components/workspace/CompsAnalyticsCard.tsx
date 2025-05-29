import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/cup-button";
import { Download, Share, Printer, MapPin, Home } from "lucide-react";
import { Badge } from "@/components/ui/cup-badge";
import { motion } from "framer-motion";
import ResultCard from "@/components/ResultCard";
import { Agent, MLSSearchResult, Office } from "@/api/saraSchemas";
import GoogleMap from "../GoogleMap";
import { COLORS_MAP } from "@/lib/themeUtils";

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
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  agent?: Agent;
  office?: Office;
}

interface CompsAnalyticsCardProps {
  title?: string;
  subtitle?: string;
  sourceLink?: string;
  mlsSearchResult?: MLSSearchResult;
}

const CompsAnalyticsCard: React.FC<CompsAnalyticsCardProps> = ({
  title = "Comparable Properties",
  subtitle = "Similar properties in your area",
  mlsSearchResult,
}) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [mapLoaded, setMapLoaded] = useState(false);

  const { properties } = mlsSearchResult ?? {};

  const comps: CompItem[] = useMemo(() => {
    return (
      properties?.map((property) => ({
        id: property.listing?.mlsNumber || "",
        title: property.listing?.publicRemarks || "",
        address: property.listing?.address?.unparsedAddress || "",
        beds: property.listing?.property?.bedroomsTotal || 0,
        baths: property.listing?.property?.bathroomsTotal || 0,
        sqft: property.listing?.property?.livingArea || 0,
        type: property.listing?.property?.propertyType || "Unknown",
        imageUrl:
          property.listing?.media?.primaryListingImageUrl ||
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
        price: property.listing?.listPriceLow || 0,
        status:
          (property.listing?.standardStatus?.toLowerCase() as
            | "sold"
            | "active"
            | "pending") || "active",
        soldDate: property.listing?.listingContractDate,
        coordinates: {
          lat: property.listing?.property?.latitude || undefined,
          lng: property.listing?.property?.longitude || undefined,
        },
        agent: property.listingAgent,
        office: property.listingOffice,
      })) || []
    );
  }, [properties]);

  const [sourceProperty, setSourceProperty] = useState<CompItem | undefined>(
    comps?.[0] || undefined
  );

  const mapPoints = useMemo(() => {
    return comps.map((comp) => ({
      name: comp.title,
      category: "housing",
      coordinates: comp.coordinates,
    }));
  }, [comps]);

  const onPreviewProperty = (property: CompItem) => () => {
    setSourceProperty(property);
  };

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
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto scroll-container gap-4">
        {/* Source Property */}
        {!!sourceProperty && (
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
        )}
        {/* Map Container */}
        <GoogleMap
          coordinates={sourceProperty?.coordinates}
          points={mapPoints}
          colors={{ housing: COLORS_MAP.red }}
        />
        {/* Comparable Properties List */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium mb-3">
            {activeFilter === "All"
              ? "All Comparable Properties"
              : `${activeFilter} Properties`}{" "}
            ({comps.length})
          </h3>
          <div className="space-y-4">
            {comps.map((comp) => (
              <div className="h-3/5" key={comp.id}>
                <ResultCard
                  key={comp.id}
                  title={comp.title}
                  address={comp.address}
                  category={comp.type}
                  imageUrl={comp.imageUrl}
                  onView={onPreviewProperty(comp)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompsAnalyticsCard;
