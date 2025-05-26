import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import ChatPane, { Message } from "./ChatPane";
import WorkspacePane from "./WorkspacePane";
import { useAuth } from "@/contexts/AuthContext";
import { useGetChatHistory } from "@/api/saraComponents";
import { isMultipleTopics, isSingleTopic } from "@/api/TApi";

// Component interfaces moved to their respective component files

const Home = () => {
  const { topicId } = useParams();
  const {
    user: { id: userId },
  } = useAuth();
  const { data } = useGetChatHistory({
    queryParams: {
      userId,
      ...(topicId && topicId !== "undefined" ? { topicId } : {}),
    },
  });

  const messages: Message[] | undefined = useMemo(() => {
    if (isMultipleTopics(data)) {
      return undefined;
    }
    return data?.messages?.map((message) => ({
      id: message.sequence?.toString() ?? "",
      content: message.content,
      sender: message?.role === "user" ? "user" : "ai",
      timestamp: message.timestamp ? new Date(message.timestamp) : new Date(),
    }));
  }, [data]);

  const [properties, setProperties] = React.useState([
    {
      id: "1",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      title: "Modern Family Home",
      address: "123 Maple Street, Anytown, USA",
    },
    {
      id: "2",
      category: "Commercial",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      title: "Downtown Office Space",
      address: "456 Business Ave, Metropolis, USA",
    },
    {
      id: "3",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      title: "Cozy Suburban Cottage",
      address: "789 Oak Lane, Pleasantville, USA",
    },
  ]);

  const [workspaceTitle] = React.useState("Your workspace");
  const [workspaceSubtitle] = React.useState("Lifestyle Map for a family of 5");

  const handleSendMessage = (message: string) => {
    // Add user message
    // const newUserMessage = {
    //   id: Date.now().toString(),
    //   sender: "user" as const,
    //   content: message,
    //   timestamp: new Date(),
    // };
    // setMessages([...messages, newUserMessage]);
    // // Simulate AI response (in a real app, this would be an API call)
    // setTimeout(() => {
    //   const aiResponse = {
    //     id: (Date.now() + 1).toString(),
    //     sender: "ai" as const,
    //     content:
    //       "I found some properties that might interest you. Take a look at the workspace panel.",
    //     timestamp: new Date(),
    //   };
    //   setMessages((prev) => [...prev, aiResponse]);
    // }, 1000);
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
        <div className="w-full md:w-[65%] h-full">
          <ChatPane
            messages={messages}
            quickActions={quickActions}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Workspace Pane (Right) */}
        <div className="hidden md:block md:w-[35%] h-full">
          <WorkspacePane
            title={workspaceTitle}
            subtitle={workspaceSubtitle}
            properties={properties}
            className="shadow-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
