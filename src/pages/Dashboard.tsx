import React from "react";
import ChatPane from "../components/ChatPane";
import WorkspacePane from "../components/WorkspacePane";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="h-14 sm:h-16 shadow-sm flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-xl sm:text-2xl font-bold">Tempo Dashboard</div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Chat Pane (30% on desktop, full width on mobile) */}
        <div className="w-full md:w-[35%] lg:w-[30%] shadow-sm">
          <ChatPane />
        </div>

        {/* Workspace Pane (70% on desktop, full width on mobile) */}
        <div className="w-full md:w-[65%] lg:w-[70%] overflow-hidden">
          <WorkspacePane />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
