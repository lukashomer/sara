import React, { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/Chat";
import LoginPage from "./components/LoginPage";
import AuthGuard from "./components/AuthGuard";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import ReactQueryProvider from "./contexts/ReactQueryContext";
import Home from "./components/home";

export const WorkspacePaneContext = React.createContext({
  isWorkspacePaneVisible: true,
  setIsWorkspacePaneVisible: (visible: boolean) => {},
  toggleWorkspacePane: () => {},
  isWorkspaceSheetOpen: false,
  setIsWorkspaceSheetOpen: (open: boolean) => {},
  isHistorySidebarOpen: false,
  setIsHistorySidebarOpen: (open: boolean) => {},
  toggleHistorySidebar: () => {},
  isNewConversationDialogOpen: false,
  setIsNewConversationDialogOpen: (open: boolean) => {},
});

function App() {
  const [isWorkspacePaneVisible, setIsWorkspacePaneVisible] = useState(true);
  const [isWorkspaceSheetOpen, setIsWorkspaceSheetOpen] = useState(false);
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false);
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] =
    useState(false);

  const toggleWorkspacePane = () => {
    setIsWorkspacePaneVisible((prev) => !prev);
  };

  const toggleHistorySidebar = () => {
    setIsHistorySidebarOpen((prev) => !prev);
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
            isHistorySidebarOpen,
            setIsHistorySidebarOpen,
            toggleHistorySidebar,
            isNewConversationDialogOpen,
            setIsNewConversationDialogOpen,
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
              <Route
                path="/chat/:topicId?"
                element={
                  <AuthGuard>
                    <Chat />
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
