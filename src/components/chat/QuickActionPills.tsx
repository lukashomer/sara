import React from "react";
import { Button } from "@/components/ui/button";

interface QuickActionPillsProps {
  onActionClick?: (action: string) => void;
  actions?: Array<{
    id: string;
    label: string;
  }>;
}

const QuickActionPills = ({
  onActionClick = () => {},
  actions = [
    { id: "search", label: "Search Available Properties" },
    { id: "market", label: "Generate Market Analysis" },
    { id: "valuation", label: "Request Property Valuation" },
  ],
}: QuickActionPillsProps) => {
  return (
    <div className="flex overflow-x-auto scroll-container py-2 px-2 sm:px-0 gap-2 bg-background no-scrollbar">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="soft"
          size="pill"
          className="text-xs whitespace-nowrap flex-shrink-0 h-8 sm:h-10 px-4 sm:px-6"
          onClick={() => onActionClick(action.id)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickActionPills;
