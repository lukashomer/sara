import React, { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/LoginPage";
import AuthGuard from "./components/AuthGuard";
import routes from "tempo-routes";
import { WorkspaceFeature } from "./components/workspace/WorkspaceSidebar";
import { AuthProvider } from "./contexts/AuthContext";

export const WorkspacePaneContext = React.createContext({
  isWorkspacePaneVisible: true,
  toggleWorkspacePane: () => {},
  activeFeature: "compsAnalytics" as WorkspaceFeature,
  setActiveFeature: (feature: WorkspaceFeature) => {},
});

function App() {
  const [isWorkspacePaneVisible, setIsWorkspacePaneVisible] = useState(true);
  const [activeFeature, setActiveFeature] =
    useState<WorkspaceFeature>("compsAnalytics");

  const toggleWorkspacePane = () => {
    setIsWorkspacePaneVisible((prev) => !prev);
  };

  return (
    <AuthProvider>
      <WorkspacePaneContext.Provider
        value={{
          isWorkspacePaneVisible,
          toggleWorkspacePane,
          activeFeature,
          setActiveFeature,
        }}
      >
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              path="/login"
              element={
                <AuthGuard requireAuth={false}>
                  <LoginPage />
                </AuthGuard>
              }
            />
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Home />
                </AuthGuard>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </Suspense>
      </WorkspacePaneContext.Provider>
    </AuthProvider>
  );
}

export default App;
