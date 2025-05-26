import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Update the libraries array to include the new marker library
const GOOGLE_MAPS_LIBRARIES: ("marker" | "places")[] = ["marker", "places"];

// Add this helper function to create custom marker icons
const createCustomMarkerIcon = (category: string, iconColor: string) => {
  const iconSize = 30;
  const iconText = category.charAt(0).toUpperCase();

  // Create an SVG string with the circle and icon
  const svg = `
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 ${iconSize} ${iconSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${iconSize / 2}" cy="${iconSize / 2}" r="${iconSize / 2}" fill="${iconColor}"/>
      <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="white" 
        font-size="14" 
        font-weight="bold"
      >
        ${iconText}
      </text>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
  };
};

type MapPoint = {
  name: string;
  category?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
};

type Props = {
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  points: MapPoint[];
  colors?: Record<string, string>;
};

const GoogleMap: React.FC<Props> = ({ coordinates, points, colors }) => {
  return (
    <div className="relative h-[200px] sm:h-[250px] md:h-[300px]">
      {!coordinates ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">No location data available</p>
        </div>
      ) : (
        <div className="w-full h-full rounded-lg overflow-hidden">
          <APIProvider apiKey={MAPS_API_KEY} libraries={GOOGLE_MAPS_LIBRARIES}>
            <Map
              defaultCenter={{ lat: coordinates?.lat, lng: coordinates?.lng }}
              defaultZoom={13}
              gestureHandling="greedy"
              disableDefaultUI={true}
              styles={[
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
                },
              ]}
            >
              {/* Points of interest markers */}
              {points.map((point, index) => (
                <Marker
                  key={`${point.name}-${index}`}
                  position={{
                    lat: point.coordinates?.lat,
                    lng: point.coordinates?.lng,
                  }}
                  title={point.name}
                  icon={createCustomMarkerIcon(
                    point.category,
                    colors?.[point.category]
                  )}
                />
              ))}
            </Map>
          </APIProvider>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
