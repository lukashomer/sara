import React, { useState, useContext, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerticalToolbar from "./chat/VerticalToolbar";
import {
  PanelLeft,
  Plus,
  LayoutPanelLeft,
  Send,
  PanelRightOpen,
  X,
  LayoutDashboard as DashboardIcon,
  LayoutGrid,
  FileText,
  Rows4,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import ChatHistorySidebar from "./chat/ChatHistory";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";
import { WorkspacePaneContext } from "../App";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import WorkspacePane from "./WorkspacePane";
import { useGetUserConversations } from "@/api/saraComponents";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread?: boolean;
}

interface QuickAction {
  id: string;
  label: string;
}

interface ChatPaneProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onQuickActionClick?: (action: QuickAction) => void;
  onNewConversation?: (data?: {
    clientName: string;
    purpose: string;
    comment: string;
  }) => void;
  onViewHistory?: () => void;
  isLoading?: boolean;
}

const ChatPane = ({
  messages = [],
  onSendMessage = () => {},
  onQuickActionClick = () => {},
  onNewConversation = () => {},
  onViewHistory = () => {},
  isLoading = false,
}: ChatPaneProps) => {
  const { toggleWorkspacePane, isWorkspacePaneVisible } =
    useContext(WorkspacePaneContext);
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isWorkspaceSheetOpen, setIsWorkspaceSheetOpen] = useState(false);
  const navigate = useNavigate();

  // Handle window resize to detect mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] =
    useState(false);
  const [clientName, setClientName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [comment, setComment] = useState("");

  const quickActions: QuickAction[] = [
    { id: "search", label: "Search Available Properties" },
    { id: "market", label: "Generate Market Analysis" },
    { id: "valuation", label: "Request Property Valuation" },
  ];

  const { data } = useGetUserConversations({});

  const initialConversations: ChatHistory[] = useMemo(() => {
    return data?.conversations?.map((conversation) => ({
      id: conversation.topic_id,
      title: conversation.title,
      lastMessage: conversation.preview,
      timestamp: new Date(conversation.updated_at),
    }));
  }, [data]);

  const [conversations, setConversations] =
    useState<ChatHistory[]>(initialConversations);

  useEffect(() => {
    setConversations(initialConversations);
  }, [initialConversations]);

  const toggleHistorySidebar = () => {
    setIsHistorySidebarOpen(!isHistorySidebarOpen);
  };

  const handleNewChat = () => {
    setIsNewConversationDialogOpen(true);
    setIsHistorySidebarOpen(false);
  };

  const handleCreateNewConversation = () => {
    // Create a new chat history item
    const newChatId = `new-${Date.now()}`;
    const purposeLabel =
      {
        "property-search": "Property Search",
        "market-analysis": "Market Analysis",
        valuation: "Property Valuation",
        investment: "Investment Advice",
        other: "Other",
      }[purpose] || purpose;

    const newChat = {
      id: newChatId,
      title: clientName
        ? `${clientName}: ${purposeLabel}`
        : purposeLabel || "New Conversation",
      lastMessage: comment || "Conversation started",
      timestamp: new Date(),
      unread: false,
    };

    // Add to chat history
    setConversations([newChat, ...conversations]);

    onNewConversation({
      clientName,
      purpose,
      comment,
    });
    setIsNewConversationDialogOpen(false);
    // Reset form fields
    setClientName("");
    setPurpose("");
    setComment("");
  };

  const handleSelectChat = (chatId: string) => {
    // Handle selecting a chat from history
    setIsHistorySidebarOpen(false);
    // Find the selected chat
    const selectedChat = conversations.find((chat) => chat.id === chatId);
    if (selectedChat) {
      // Mark as read
      setConversations(
        conversations.map((chat) =>
          chat.id === chatId ? { ...chat, unread: false } : chat
        )
      );
      navigate(`/${chatId}`);
    }
  };

  return (
    <div className="flex h-full w-full bg-white border-r border-gray-200 border-0 rounded-2xl">
      {/* Vertical Toolbar - Hidden on mobile */}
      <div className="vertical-toolbar hidden md:block rounded-tr-lg">
        <VerticalToolbar
          isHistorySidebarOpen={isHistorySidebarOpen}
          onToggleHistory={toggleHistorySidebar}
          onNewChat={handleNewChat}
          onToggleWorkspace={toggleWorkspacePane}
          className="rounded-tr-md"
        />
      </div>
      {/* Chat History Sidebar - Shows when history button is clicked */}
      <div
        className={`fixed inset-0 z-20 md:static md:z-auto md:h-full ${!isHistorySidebarOpen ? "hidden" : "block"}`}
        style={{ display: isHistorySidebarOpen ? "block" : "none" }}
      >
        <ChatHistorySidebar
          isOpen={isHistorySidebarOpen}
          onClose={toggleHistorySidebar}
          onNewChat={handleNewChat}
          chatHistory={conversations}
          onSelectChat={handleSelectChat}
          className="rounded-tr-2xl flex"
        />
      </div>
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
              <span className="text-xl font-bold text-primary">Tempo</span>
            </Link>
          </div>

          <button
            onClick={() => setIsWorkspaceSheetOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
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
      {/* New Conversation Dialog */}
      <Dialog
        open={isNewConversationDialogOpen}
        onOpenChange={setIsNewConversationDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Conversation</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="client-name"
                className="text-right text-sm font-medium"
              >
                Name of client:
              </label>
              <Input
                id="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="purpose"
                className="text-right text-sm font-medium"
              >
                Purpose:
              </label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="property-search">
                    Property Search
                  </SelectItem>
                  <SelectItem value="market-analysis">
                    Market Analysis
                  </SelectItem>
                  <SelectItem value="valuation">Property Valuation</SelectItem>
                  <SelectItem value="investment">Investment Advice</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="comment"
                className="text-right text-sm font-medium"
              >
                Comment:
              </label>
              <Input
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsNewConversationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateNewConversation}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Mobile Workspace Sheet */}
      <Sheet open={isWorkspaceSheetOpen} onOpenChange={setIsWorkspaceSheetOpen}>
        <SheetContent
          side="right"
          className="sm:w-[350px] p-0 border-l w-[85vw] max-w-[400px]"
        >
          <SheetHeader className="p-4 flex justify-end border-b">
            <SheetClose className="rounded-full p-2 hover:bg-gray-100">
              <X size={20} />
            </SheetClose>
          </SheetHeader>
          <div className="h-full overflow-hidden">
            <WorkspacePane />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatPane;
