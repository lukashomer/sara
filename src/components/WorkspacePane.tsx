import React, { useContext } from "react";
import { WorkspacePaneContext } from "../App";
import WorkspaceSidebar from "./workspace/WorkspaceSidebar";
import { WorkspaceFeature } from "./workspace/WorkspaceSidebar";

interface WorkspacePaneProps {
  title?: string;
  subtitle?: string;
}

const WorkspacePane: React.FC<WorkspacePaneProps> = () => {
  const { isWorkspacePaneVisible, activeFeature } =
    useContext(WorkspacePaneContext);

  return (
    <div
      className={`flex flex-col h-full rounded-tl-xl sm:rounded-tl-2xl transition-all duration-300 ${isWorkspacePaneVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full md:opacity-0 md:translate-x-full hidden md:hidden"} shadow-none bg-[#fbfbfb]`}
    >
      <WorkspaceSidebar
        activeFeature={activeFeature}
        isVisible={isWorkspacePaneVisible}
        className=""
      />
    </div>
  );
};

export default WorkspacePane;
