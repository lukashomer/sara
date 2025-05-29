import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface QuickAction {
  id: string;
  label: string;
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onQuickActionClick: (action: QuickAction) => void;
  isLoading?: boolean;
  quickActions?: QuickAction[];
  onFocusMessage?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const ChatInput = ({
  onSendMessage,
  onQuickActionClick,
  isLoading = false,
  quickActions = [
    { id: "search", label: "Search Available Properties" },
    { id: "market", label: "Generate Market Analysis" },
    { id: "valuation", label: "Request Property Valuation" },
  ],
  onFocusMessage,
}: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="pt-3 pb-6 px-4 sm:px-5 w-full max-w-[100vw] box-border shadow-sm">
      <div className="flex overflow-x-auto scroll-container pb-3 gap-3 sm:gap-4 mb-3 sm:mb-4 no-scrollbar">
        {quickActions.map((action) => (
          <Badge
            key={action.id}
            variant="outline"
            className="cursor-pointer hover:bg-primary-light hover:text-primary transition-all duration-200 bg-secondary text-muted-foreground rounded-full py-2.5 sm:py-3 px-5 sm:px-6 text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 shadow-sm"
            onClick={() => onQuickActionClick(action)}
          >
            {action.label}
          </Badge>
        ))}
      </div>

      {/* Composer */}
      <form onSubmit={handleSubmit} className="w-full max-w-full">
        <div className="flex flex-col w-full max-w-[100vw] bg-secondary chat-input-shadow rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="relative w-full">
            <input
              onFocus={onFocusMessage}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full rounded-full px-4 sm:px-5 py-3.5 sm:py-4 bg-transparent border-0 font-normal text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 text-sm sm:text-base break-words"
            />
          </div>
          <div className="flex justify-end px-3 sm:px-4 pb-3 sm:pb-4">
            <Button
              type="submit"
              size="icon"
              className="send-button bg-brand-blue hover:bg-brand-darkBlue rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center mt-2 sm:mt-3"
              disabled={!inputValue.trim() || isLoading}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-[18px] sm:h-[18px]"
              >
                <path
                  d="M12 4L12 20M12 4L6 10M12 4L18 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
