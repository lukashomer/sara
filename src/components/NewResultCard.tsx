import { Badge } from "./ui/cup-badge";
import { Button } from "./ui/cup-button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/cup-card";
import { AspectRatio } from "./ui/aspect-ratio";

interface PropertyDetails {
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  imageUrl: string;
}

interface ResultCardProps {
  property: PropertyDetails;
}

export default function NewResultCard({ property }: ResultCardProps) {
  const { title, address, beds, baths, sqft, type, imageUrl } = property;

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg sm:rounded-xl bg-white">
      <div className="flex flex-col h-full">
        <div className="p-3 sm:p-4 flex-grow">
          <div className="mb-1.5 sm:mb-2">
            <Badge
              variant="secondary"
              className="rounded-full text-[10px] xs:text-xs font-medium py-0.5 px-2 sm:py-1 sm:px-2.5"
            >
              {type}
            </Badge>
          </div>

          <CardHeader className="p-0 pb-1.5 sm:pb-2">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm line-clamp-1">
              {address}
            </p>
          </CardHeader>

          <CardContent className="p-0 py-1.5 sm:py-2">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <span className="font-medium">{beds}</span> beds
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <span className="font-medium">{baths}</span> baths
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <span className="font-medium">{sqft.toLocaleString()}</span>{" "}
                sqft
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-0 pt-1.5 sm:pt-2 flex justify-end">
            <Button className="rounded-full px-4 sm:px-6 md:px-8 h-8 sm:h-9 md:h-10 text-xs sm:text-sm md:text-base">
              View
            </Button>
          </CardFooter>
        </div>

        {/* Image at the bottom */}
        <div className="w-full">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </AspectRatio>
        </div>
      </div>
    </Card>
  );
}
