import React from "react";
import { Badge } from "@/components/ui/cup-badge";
import { Button } from "@/components/ui/cup-button";
import { Card, CardContent, CardFooter } from "@/components/ui/cup-card";

interface ResultCardProps {
  category?: string;
  imageUrl?: string;
  title?: string;
  address?: string;
  onView?: () => void;
}

const ResultCard = ({
  category = "Residential",
  imageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  title = "Modern Family Home",
  address = "123 Main Street, Anytown, USA",
  onView = () => console.log("View property details"),
}: ResultCardProps) => {
  return (
    <Card className="w-full mb-5 sm:mb-6 overflow-hidden bg-white rounded-2xl sm:rounded-3xl flex shadow-md hover:shadow-lg transition-shadow flex-row h-[160px] xs:h-[180px] sm:h-[200px] md:h-[260px]">
      <div className="relative w-[40%] h-full">
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
          <Badge
            variant="secondary"
            className="font-medium rounded-full text-[10px] xs:text-xs sm:text-sm py-0.5 px-2 sm:py-1 sm:px-2.5"
          >
            {category}
          </Badge>
        </div>
        <div className="h-[160px] xs:h-[180px] sm:h-[200px] md:h-[260px] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6">
        <CardContent className="p-0 flex flex-col">
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold mb-0 sm:mb-0.5 md:mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-0.5 xs:mb-1 sm:mb-1.5 md:mb-2 line-clamp-1">
            {address}
          </p>
          <div className="flex gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
            <span className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
              4 beds
            </span>
            <span className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
              •
            </span>
            <span className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
              2 baths
            </span>
            <span className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
              •
            </span>
            <span className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
              2,100 sqft
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center p-0 mt-1 sm:mt-2 md:mt-4">
          <Button
            onClick={onView}
            size="default"
            variant="primary"
            className="h-8 sm:h-9 md:h-10 w-[100px] sm:w-[120px] md:w-[140px] text-sm sm:text-base rounded-lg sm:rounded-xl md:rounded-2xl text-white bg-brand-blue"
          >
            View
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ResultCard;
