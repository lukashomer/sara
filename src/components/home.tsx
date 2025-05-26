import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import ChatPane, { Message } from "./ChatPane";
import WorkspacePane from "./WorkspacePane";
import { useAuth } from "@/contexts/AuthContext";
import { useChat, useGetChatHistory } from "@/api/saraComponents";
import { removeUndefinedParams } from "@/lib/utils";
import { isMultipleTopics, transformChatMessage } from "@/lib/apiUtils";
import { Sheet, SheetContent, SheetHeader, SheetClose } from "./ui/sheet";
import { X } from "lucide-react";
import { WorkspacePaneContext } from "@/App";

// Component interfaces moved to their respective component files

const Home = () => {
  const { topicId } = useParams();
  const {
    user: { id: userId },
  } = useAuth();
  const {
    isWorkspaceSheetOpen,
    setIsWorkspaceSheetOpen,
    isWorkspacePaneVisible,
    setIsWorkspacePaneVisible,
  } = useContext(WorkspacePaneContext);

  const { data, refetch: refetchChatHistory } = useGetChatHistory({
    queryParams: removeUndefinedParams({
      userId,
      topicId,
    }),
  });

  const { mutateAsync: postMessage } = useChat();

  const initialMessages: Message[] | undefined = useMemo(() => {
    if (isMultipleTopics(data)) {
      return undefined;
    }
    return data?.messages?.map(transformChatMessage);
  }, [data]);

  const [messages, setMessages] = useState<Message[]>(initialMessages ?? []);

  // Sync messages with useGetChatHistory query
  useEffect(() => {
    setMessages(initialMessages ?? []);
  }, [initialMessages]);

  // extract last message and its tool results
  const { lastMessageToolResult, lastUserMessage } = useMemo(() => {
    const lastMessage = messages[messages.length - 1];
    // get last user message
    const lastUserMessage = messages.findLast(
      (message) => message.sender === "user"
    );

    return {
      lastUserMessage,
      lastMessageToolResult: lastMessage?.toolResults?.[0]?.result,
    };
  }, [messages]);

  useEffect(() => {
    setIsWorkspacePaneVisible(!!lastMessageToolResult);
  }, [lastMessageToolResult]);

  const [workspaceTitle] = React.useState("Your workspace");
  const [workspaceSubtitle] = React.useState("Lifestyle Map for a family of 5");

  const handleSendMessage = async (message: string) => {
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      sender: "user" as const,
      content: message,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    // API call
    const response = await postMessage({
      body: removeUndefinedParams({
        topicId,
        message,
        userId,
      }),
    });
    // Add response to messages
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        sender: "ai" as const,
        content: response.message ?? "",
        timestamp: new Date(),
        toolCalls: response.tool_calls,
        toolResults: response.tool_results,
      },
    ]);
    // Invalidate chat-history query
    refetchChatHistory();
  };

  const quickActions = [
    "Search Available Properties",
    "Generate Market Analysis",
    "Request Property Valuation",
  ];

  // Use useEffect to handle resize events and adjust height
  React.useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 64; // 16 * 4 = 64px (h-16)
      const vh = window.innerHeight;
      const contentHeight = vh - headerHeight;
      document.documentElement.style.setProperty(
        "--content-height",
        `${contentHeight}px`
      );
    };

    // Initial calculation
    updateHeight();

    // Add event listener for window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 sm:h-16 border-b hidden md:flex sm:px-6 justify-start items-center">
        <Link to="/" className="flex items-center">
          <img
            src="https://i0.wp.com/www.reso.org/wp-content/uploads/2020/05/Douglas-Elliman-Logo.png?fit=1024%2C194&ssl=1"
            alt="Douglas Elliman Logo"
            className="h-8"
          />
        </Link>
      </header>
      {/* Main Content */}
      <div className="flex h-[var(--content-height)] overflow-hidden">
        {/* Chat Pane (Left) */}
        <div
          className={`w-full md:w-[${
            isWorkspacePaneVisible ? "65%" : "100%"
          }] h-full`}
        >
          <ChatPane
            messages={messages}
            quickActions={quickActions}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Workspace Pane (Right) */}
        <div
          className={`hidden md:block md:w-[${
            isWorkspacePaneVisible ? "35%" : "0%"
          }] h-full`}
        >
          <WorkspacePane
            title={workspaceTitle}
            subtitle={workspaceSubtitle}
            toolResult={lastMessageToolResult}
          />
        </div>

        {/* Mobile Workspace Sheet */}
        <Sheet
          open={isWorkspaceSheetOpen}
          onOpenChange={setIsWorkspaceSheetOpen}
        >
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
              <WorkspacePane toolResult={lastMessageToolResult} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Home;
