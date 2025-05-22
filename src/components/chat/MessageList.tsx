import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageList = ({ messages, isLoading = false }: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-3 sm:p-4 md:p-5 scroll-container">
      <div className="flex flex-col space-y-4 sm:space-y-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-[85%] box-border ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 mr-2 sm:mr-3 flex-shrink-0">
                  <AvatarImage
                    src="https://storage.googleapis.com/tempo-public-assets/uploaded-avatar.png"
                    alt="AI Assistant"
                  />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 sm:p-4 text-sm sm:text-base break-words max-w-[100%] overflow-hidden shadow-sm ${message.sender === "user" ? "bg-brand-blue text-white" : "bg-secondary text-foreground"}`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 mr-1.5 sm:mr-2 flex-shrink-0">
                <AvatarImage
                  src="https://storage.googleapis.com/tempo-public-assets/real-estate-ai-avatar.png"
                  alt="AI Assistant"
                />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-2.5 sm:p-3 bg-secondary text-foreground max-w-[100%] overflow-hidden shadow-sm">
                <div className="flex space-x-2">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
