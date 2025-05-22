import React from "react";
import { Button } from "../ui/button";
import { PanelLeft, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

interface VerticalToolbarProps {
  isHistorySidebarOpen: boolean;
  onToggleHistory: () => void;
  onNewChat: () => void;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

const VerticalToolbar = ({
  isHistorySidebarOpen,
  onToggleHistory,
  onNewChat,
  onMenuClick,
  isMenuOpen = false,
}: VerticalToolbarProps) => {
  return (
    <div className="flex flex-col items-center w-10 sm:w-12 py-3 sm:py-4 bg-[#f9f9f9] shadow-sm h-full rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleHistory}
        className={cn(
          "mb-3 sm:mb-4 hover:bg-gray-200 h-9 w-9 sm:h-10 sm:w-10",
          isHistorySidebarOpen && "bg-gray-200 text-primary",
        )}
        aria-label="View conversation history"
      >
        <PanelLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNewChat}
        aria-label="Start new conversation"
        className="hover:bg-[#9CCAF8] hover:text-[#0D80F2] h-9 w-9 sm:h-10 sm:w-10"
      >
        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};

export default VerticalToolbar;
