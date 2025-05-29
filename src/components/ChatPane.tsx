import { useContext } from "react";
import { Link } from "react-router-dom";
import { PanelLeft, Rows4 } from "lucide-react";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";
import { WorkspacePaneContext } from "@/App";
import Layout from "./Layout";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  toolCalls?: any;
  toolResults?: any;
}

interface QuickAction {
  id: string;
  label: string;
}

interface ChatPaneProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onQuickActionClick?: (action: QuickAction) => void;
  isLoading?: boolean;
}

const ChatPane = ({
  messages = [],
  onSendMessage = () => {},
  onQuickActionClick = () => {},
  isLoading = false,
}: ChatPaneProps) => {
  const {
    setIsWorkspaceSheetOpen,
    isWorkspacePaneVisible,
    toggleHistorySidebar,
  } = useContext(WorkspacePaneContext);

  const quickActions: QuickAction[] = [
    { id: "search", label: "Search Available Properties" },
    { id: "market", label: "Generate Market Analysis" },
    { id: "valuation", label: "Request Property Valuation" },
  ];

  return (
    <Layout>
      {/* Chat Interface */}
      <div className="flex flex-col flex-1 h-full">
        {/* Mobile Header - Only visible on small screens */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <button
            onClick={toggleHistorySidebar}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle chat history"
          >
            <PanelLeft size={20} />
          </button>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center">
              <img
                src="https://i0.wp.com/www.reso.org/wp-content/uploads/2020/05/Douglas-Elliman-Logo.png?fit=1024%2C194&ssl=1"
                alt="Douglas Elliman Logo"
                className="h-8"
              />
            </Link>
          </div>

          <button
            onClick={() => setIsWorkspaceSheetOpen(true)}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isWorkspacePaneVisible ? "" : "hidden"
            }`}
            aria-label="Toggle workspace"
          >
            <Rows4 size={20} />
          </button>
        </div>
        {/* Conversation Area */}
        <MessageList messages={messages} isLoading={isLoading} />

        {/* Quick Actions and Chat Input */}
        <ChatInput
          onSendMessage={onSendMessage}
          onQuickActionClick={onQuickActionClick}
          isLoading={isLoading}
          quickActions={quickActions}
        />
      </div>
    </Layout>
  );
};

export default ChatPane;
