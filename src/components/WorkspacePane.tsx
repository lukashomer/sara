import React, { useContext, useMemo } from "react";
import { WorkspacePaneContext } from "../App";
import WorkspaceSidebar from "./workspace/WorkspaceSidebar";
import { WorkspaceFeature } from "./workspace/WorkspaceSidebar";
import {
  isMLSSearchResult,
  isRealtimeMarketPulseResult,
  isFamilyExpensesResult,
  isWebSearchResult,
  TChatToolResult,
} from "@/lib/apiUtils";

interface WorkspacePaneProps {
  title?: string;
  subtitle?: string;
  toolResult?: TChatToolResult;
}

const WorkspacePane: React.FC<WorkspacePaneProps> = ({ toolResult }) => {
  const { isWorkspacePaneVisible } = useContext(WorkspacePaneContext);

  const activeFeature: WorkspaceFeature | undefined = useMemo(() => {
    if (isWebSearchResult(toolResult)) {
      return "webSearch";
    }
    return undefined;
  }, [toolResult]);

  return (
    <div
      className={`flex flex-col h-full rounded-tl-xl sm:rounded-tl-2xl transition-all duration-300 ${isWorkspacePaneVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full md:opacity-0 md:translate-x-full hidden md:hidden"} shadow-none bg-[#fbfbfb]`}
    >
      <WorkspaceSidebar
        isVisible={isWorkspacePaneVisible}
        toolResult={toolResult}
      />
    </div>
  );
};

export default WorkspacePane;
