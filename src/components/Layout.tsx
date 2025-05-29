import { PropsWithChildren } from "react";
import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import VerticalToolbar from "./chat/VerticalToolbar";
import { Button } from "./ui/button";
import { removeUndefinedParams } from "../lib/utils";
import ChatHistorySidebar from "./chat/ChatHistory";
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
  useCreateConversation,
  useGetUserConversations,
  useSearchChatHistory,
} from "@/api/saraComponents";
import { CreateConversationRequest } from "@/api/saraSchemas";
import { WorkspacePaneContext } from "@/App";

interface ChatHistory {
  id: string;
  topicId: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread?: boolean;
}

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [clientName, setClientName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [comment, setComment] = useState("");

  const {
    isHistorySidebarOpen,
    setIsHistorySidebarOpen,
    toggleHistorySidebar,
    setIsNewConversationDialogOpen,
    isNewConversationDialogOpen,
  } = useContext(WorkspacePaneContext);

  const { mutateAsync: postNewConversation } = useCreateConversation();

  const { data, refetch: refetchConversations } = useGetUserConversations({});

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
    navigate(`/chat/${res.topic_id}`);
  };

  const handleSelectChat = (newTopicId: string) => {
    // Handle selecting a chat from history
    setIsHistorySidebarOpen(false);
    // Find the selected chat
    const selectedChat = conversations.find(
      (chat) => chat.topicId === newTopicId
    );
    if (selectedChat) {
      // Mark as read
      setConversations(
        conversations.map((chat) =>
          chat.topicId === newTopicId ? { ...chat, unread: false } : chat
        )
      );
      navigate(`/chat/${newTopicId}`);
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
      {/* Children */}
      {children}
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

export default Layout;
