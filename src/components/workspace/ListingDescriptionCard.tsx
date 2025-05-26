import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/cup-button";
import { Copy, Download, Share } from "lucide-react";
import { Card, CardContent } from "@/components/ui/cup-card";
import { motion } from "framer-motion";
import { PropertyListingResponse } from "@/api/saraSchemas";

interface ListingDescriptionCardProps {
  title?: string;
  subtitle?: string;
  // base64 image
  image?: string;
  propertyListingResponse?: PropertyListingResponse;
}

const ListingDescriptionCard: React.FC<ListingDescriptionCardProps> = ({
  title = "Listing Description",
  subtitle = "AI-generated description for your property",
  image,
  propertyListingResponse,
}) => {
  const listingTitle = propertyListingResponse?.title;
  const description = propertyListingResponse?.description;

  const [currentDescription, setCurrentDescription] = useState(description);
  useEffect(() => {
    setCurrentDescription(description);
  }, [description]);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDescription);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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

      {/* Property Image */}
      {!!image && (
        <div className="p-4 border-b">
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={image}
              alt="Property"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Listing Title and Description */}
      <div className="flex-1 overflow-y-auto p-4 scroll-container">
        <Card className="overflow-hidden bg-white border rounded-lg shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">{listingTitle}</h2>
            <div className="prose prose-sm text-gray-700">
              <p className="whitespace-pre-line">{currentDescription}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="sm"
            icon={<Copy className="h-4 w-4" />}
            iconPosition="left"
            onClick={handleCopy}
          >
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingDescriptionCard;
