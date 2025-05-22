import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Printer } from "lucide-react";
import { SFSymbol } from "react-sf-symbols";

interface WorkspaceHeaderProps {
  title?: string;
  subtitle?: string;
}

const WorkspaceHeader = ({
  title = "Your workspace",
  subtitle = "Lifestyle Map for a family of 5",
}: WorkspaceHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 sm:p-4 border-b bg-white">
      <div className="mb-2 md:mb-0 w-full md:w-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
          {subtitle}
        </p>
      </div>

      <div className="flex gap-2 w-full md:w-auto justify-end mt-2 md:mt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
        >
          <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Download PDF</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
        >
          <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
        >
          <Printer className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Print</span>
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
