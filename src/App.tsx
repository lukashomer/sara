import React, { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/LoginPage";
import AuthGuard from "./components/AuthGuard";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import ReactQueryProvider from "./contexts/ReactQueryContext";

export const WorkspacePaneContext = React.createContext({
  isWorkspacePaneVisible: true,
  setIsWorkspacePaneVisible: (visible: boolean) => {},
  toggleWorkspacePane: () => {},
  isWorkspaceSheetOpen: false,
  setIsWorkspaceSheetOpen: (open: boolean) => {},
});

function App() {
  const [isWorkspacePaneVisible, setIsWorkspacePaneVisible] = useState(true);
  const [isWorkspaceSheetOpen, setIsWorkspaceSheetOpen] = useState(false);

  const toggleWorkspacePane = () => {
    setIsWorkspacePaneVisible((prev) => !prev);
  };

  return (
    <ReactQueryProvider>
      <AuthProvider>
        <WorkspacePaneContext.Provider
          value={{
            isWorkspacePaneVisible,
            setIsWorkspacePaneVisible,
            toggleWorkspacePane,
            isWorkspaceSheetOpen,
            setIsWorkspaceSheetOpen,
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
                path="/:topicId?"
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
    </ReactQueryProvider>
  );
}

export default App;
