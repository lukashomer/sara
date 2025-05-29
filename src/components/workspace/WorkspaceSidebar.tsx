import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LifestyleMappingCard from "./LifestyleMappingCard";
import CompsAnalyticsCard from "./CompsAnalyticsCard";
import ListingDescriptionCard from "./ListingDescriptionCard";
import {
  isLifeStyleMapResult,
  isMLSSearchResult,
  isRealtimeMarketPulseResult,
  isFamilyExpensesResult,
  isWebSearchResult,
  isPropertyListingResponse,
  TChatToolResult,
} from "@/lib/apiUtils";
import RealtimeMarketPulseCard from "./RealtimeMarketPulseCard";
import VisualMarketDataCard from "./VisualMarketDataCard";
import WebSearchCard from "./WebSearchCard";

interface WorkspaceSidebarProps {
  isVisible?: boolean;
  toolResult?: TChatToolResult;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  isVisible = true,
  toolResult,
}) => {
  if (!isVisible || !toolResult) return null;
  console.log(toolResult);
  return (
    <div className="h-full w-full overflow-hidden rounded-tl-xl sm:rounded-tl-2xl shadow-none bg-[#050404]">
      <AnimatePresence mode="wait">
        {isLifeStyleMapResult(toolResult) && (
          <LifestyleMappingCard lifestyleMapResult={toolResult} />
        )}
        {isMLSSearchResult(toolResult) && (
          <CompsAnalyticsCard mlsSearchResult={toolResult} />
        )}
        {isPropertyListingResponse(toolResult) && (
          <ListingDescriptionCard propertyListingResponse={toolResult} />
        )}
        {isRealtimeMarketPulseResult(toolResult) && (
          <RealtimeMarketPulseCard realtimeMarketPulseResult={toolResult} />
        )}
        {isFamilyExpensesResult(toolResult) && (
          <VisualMarketDataCard familyExpensesResult={toolResult} />
        )}
        {isWebSearchResult(toolResult) && (
          <WebSearchCard webSearchResult={toolResult} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkspaceSidebar;
