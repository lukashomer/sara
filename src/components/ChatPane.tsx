import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerticalToolbar from "./chat/VerticalToolbar";
import { PanelLeft, Rows4 } from "lucide-react";
import { Button } from "./ui/button";
import { removeUndefinedParams } from "../lib/utils";
import ChatHistorySidebar from "./chat/ChatHistory";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";
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
import { Sheet, SheetContent, SheetHeader, SheetClose } from "./ui/sheet";
import WorkspacePane from "./WorkspacePane";
import {
  useCreateConversation,
  useGetUserConversations,
  useSearchChatHistory,
} from "@/api/saraComponents";
import { CreateConversationRequest } from "@/api/saraSchemas";
import { WorkspacePaneContext } from "@/App";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  toolCalls?: any;
  toolResults?: any;
}

interface ChatHistory {
  id: string;
  topicId: string;
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
  topicId?: string;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onQuickActionClick?: (action: QuickAction) => void;
  isLoading?: boolean;
}

const ChatPane = ({
  topicId,
  messages = [],
  onSendMessage = () => {},
  onQuickActionClick = () => {},
  isLoading = false,
}: ChatPaneProps) => {
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsWorkspaceSheetOpen, isWorkspacePaneVisible } =
    useContext(WorkspacePaneContext);

  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] =
    useState(false);
  const [clientName, setClientName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [comment, setComment] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue("");
  }, [isHistorySidebarOpen]);

  const isSearchEnabled =
    !!searchValue && searchValue.length > 2 && isHistorySidebarOpen;

  const { data: searchChatHistoryData } = useSearchChatHistory(
    {
      queryParams: {
        query: searchValue,
        limit: 50,
      },
    },
    {
      enabled: isSearchEnabled,
    }
  );

  const quickActions: QuickAction[] = [
    { id: "search", label: "Search Available Properties" },
    { id: "market", label: "Generate Market Analysis" },
    { id: "valuation", label: "Request Property Valuation" },
  ];

  const { mutateAsync: postNewConversation } = useCreateConversation();

  const { data, refetch: refetchConversations } = useGetUserConversations({});

  const initialConversations: ChatHistory[] = useMemo(() => {
    if (isSearchEnabled) {
      return (
        searchChatHistoryData?.matches.map((match) => ({
          id: `${match.topic_id}-${match.message_id}`,
          topicId: match.topic_id,
          title: match.title,
          lastMessage: match.preview,
          timestamp: new Date(match.created_at),
        })) || []
      );
    }

    return data?.conversations?.map((conversation) => ({
      id: conversation.topic_id,
      topicId: conversation.topic_id,
      title: conversation.title,
      lastMessage: conversation.preview,
      timestamp: new Date(conversation.updated_at),
    }));
  }, [data, isSearchEnabled, searchChatHistoryData]);

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

  const handleResetNewConversation = () => {
    setIsNewConversationDialogOpen(false);
    setClientName("");
    setPurpose("");
    setComment("");
  };

  const handleCreateNewConversation = async () => {
    // Create a new chat history item
    const purposeMap: Record<string, CreateConversationRequest["purpose"]> = {
      "property-search": "Property Search",
      "market-analysis": "Market Analysis",
      valuation: "Property Valuation",
      investment: "Investment Advice",
      other: "Other",
    };

    const purposeLabel: CreateConversationRequest["purpose"] =
      purposeMap[purpose] || "Other";

    const title = clientName
      ? `${clientName}: ${purposeLabel}`
      : purposeLabel || "New Conversation";

    const mockId = `new-${Date.now()}`;
    const newChat = {
      id: mockId,
      title,
      topicId: mockId,
      lastMessage: comment || "Conversation started",
      timestamp: new Date(),
      unread: false,
    };

    // Add to chat history
    setConversations([newChat, ...conversations]);
    // Invalidate conversations query

    const res = await postNewConversation({
      body: removeUndefinedParams({
        title,
        comment,
        purpose: purposeLabel,
      }),
    });

    if (!res.topic_id) {
      return;
    }
    refetchConversations();
    handleResetNewConversation();
    navigate(`/${res.topic_id}`);
  };

  const onFocusMessage = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!topicId) {
      setIsNewConversationDialogOpen(true);
      e.preventDefault();
      return;
    }
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

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="flex h-full w-full bg-white border-r border-gray-200 border-0 rounded-2xl">
      {/* Vertical Toolbar - Hidden on mobile */}
      <div className="vertical-toolbar hidden md:block rounded-tr-lg">
        <VerticalToolbar
          isHistorySidebarOpen={isHistorySidebarOpen}
          onToggleHistory={toggleHistorySidebar}
          onNewChat={handleNewChat}
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
          onSearch={handleSearch}
          searchValue={searchValue}
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
          onFocusMessage={onFocusMessage}
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
            <Button variant="ghost" onClick={handleResetNewConversation}>
              Cancel
            </Button>
            <Button onClick={handleCreateNewConversation}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatPane;
