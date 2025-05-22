import React, { useState } from "react";
import { Button } from "@/components/ui/cup-button";
import { Copy, Edit, RefreshCw, Download, Share } from "lucide-react";
import { Card, CardContent } from "@/components/ui/cup-card";
import { motion } from "framer-motion";

interface ListingDescriptionCardProps {
  title?: string;
  subtitle?: string;
  photo?: string;
  listingTitle?: string;
  description?: string;
  isVisible?: boolean;
}

const ListingDescriptionCard: React.FC<ListingDescriptionCardProps> = ({
  title = "Listing Description",
  subtitle = "AI-generated description for your property",
  photo = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  listingTitle = "Modern Family Home with Stunning Views",
  description = "This beautiful modern family home offers an exceptional living experience with stunning views of the surrounding landscape. The property features an open floor plan with abundant natural light, high ceilings, and premium finishes throughout. The gourmet kitchen includes stainless steel appliances, quartz countertops, and a spacious island perfect for entertaining. The primary suite boasts a luxurious bathroom with dual vanities and a walk-in closet. Additional features include a private backyard, two-car garage, and energy-efficient systems. Located in a desirable neighborhood with excellent schools and convenient access to shopping, dining, and recreation.",
  isVisible = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDescription);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleEdit = () => {
    // In a real app, this would open an editor
    console.log("Edit description");
  };

  const handleRegenerate = () => {
    setIsLoading(true);
    // Simulate API call to regenerate description
    setTimeout(() => {
      setCurrentDescription(
        "Newly regenerated: This stunning modern family home showcases contemporary design with exceptional attention to detail. Featuring an open concept layout, the home welcomes you with soaring ceilings and walls of windows that frame picturesque views. The chef's kitchen is equipped with high-end appliances, custom cabinetry, and a large center island. The primary retreat offers a spa-like bathroom and generous closet space. Outside, find a beautifully landscaped yard perfect for relaxation and entertainment. Situated in a prime location with top-rated schools and easy access to amenities.",
      );
      setIsLoading(false);
    }, 1500);
  };

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
          </div>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Property Image */}
      <div className="p-4 border-b">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={photo}
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

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
          <Button
            variant="secondary"
            size="sm"
            icon={<Edit className="h-4 w-4" />}
            iconPosition="left"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="tertiary"
            size="sm"
            icon={<RefreshCw className="h-4 w-4" />}
            iconPosition="left"
            isLoading={isLoading}
            onClick={handleRegenerate}
          >
            Regenerate
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingDescriptionCard;
