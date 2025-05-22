import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LifestyleMappingCard from "./LifestyleMappingCard";
import CompsAnalyticsCard from "./CompsAnalyticsCard";
import ListingDescriptionCard from "./ListingDescriptionCard";

export type WorkspaceFeature =
  | "lifestyleMapping"
  | "compsAnalytics"
  | "propertyDetails"
  | "none";

interface WorkspaceSidebarProps {
  activeFeature?: WorkspaceFeature;
  isVisible?: boolean;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  activeFeature = "lifestyleMapping",
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <div className="h-full w-full overflow-hidden rounded-tl-xl sm:rounded-tl-2xl shadow-none bg-[#fbfbfb]">
      <AnimatePresence mode="wait">
        {activeFeature === "lifestyleMapping" && (
          <LifestyleMappingCard isVisible={true} />
        )}
        {activeFeature === "compsAnalytics" && (
          <CompsAnalyticsCard isVisible={true} />
        )}
        {activeFeature === "propertyDetails" && (
          <div className="p-4">Property Details content will go here</div>
        )}
        {activeFeature === "listingDescription" && (
          <ListingDescriptionCard isVisible={true} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkspaceSidebar;
