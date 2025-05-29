import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  History,
  Plus,
  X,
  MessageSquare,
  LogIn,
  LogOut,
  User,
  UserRound,
  PanelLeft,
  Settings2,
  Rows4,
} from "lucide-react";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread?: boolean;
  searchValue?: string;
  onSearch?: (value: string) => void;
  isSearchLoading?: boolean;
}

interface ChatHistorySidebarProps {
  isOpen: boolean;
  searchValue?: string;
  onSearch: (value: string) => void;
  onClose: () => void;
  onNewChat: () => void;
  chatHistory?: ChatHistoryItem[];
  onSelectChat?: (chatId: string) => void;
}

const ChatHistorySidebar = ({
  isOpen,
  searchValue,
  onSearch,
  onClose,
  onNewChat,
  chatHistory = [],
  onSelectChat = () => {},
}: ChatHistorySidebarProps) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div
      className={
        cn(
          "flex flex-col w-[80%] sm:w-[70%] md:w-72 h-full shadow-md transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100" : "translate-x-[-100%] opacity-0"
        ) + " bg-[#f9f9f9]  rounded-tr-2xl"
      }
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-sm sm:text-base md:text-lg">
          Conversations
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
      <div className="sm:px-3 md:px-4 md:pb-3 pb-[3] pt-4 pb-[3] px-4">
        <div className="relative bg-transparent">
          <input
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            placeholder="Search conversations..."
            className="w-full py-1.5 md:py-2 px-2 md:px-3 pr-8 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary h-10 sm:h-12 rounded-lg sm:rounded-xl bg-white shadow-sm"
          />
        </div>
      </div>
      <ScrollArea className="flex-1 scroll-container">
        <div className="p-2 w-11/12 sm:w-10/12">
          <Button
            variant="soft"
            className="justify-start mb-2 md:mb-3 gap-1 md:gap-2 bg-gray-100 hover:bg-gray-200 py-1 md:py-1.5 text-xs md:text-sm px-2 md:px-3 w-max h-8 sm:h-9"
            onClick={onNewChat}
          >
            <Plus className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <span>New Conversation</span>
          </Button>

          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="flex flex-col p-2 md:p-3 mb-1.5 md:mb-2 rounded-lg hover:bg-gray-100 cursor-pointer w-full overflow-hidden max-w-full"
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex justify-between items-start flex-col">
                <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">
                  {formatTime(chat.timestamp)}
                </span>
                <h3 className="font-medium truncate max-w-[65%] sm:max-w-[70%] md:max-w-[80%] flex-1 text-xs md:text-sm text-right">
                  {chat.title}
                </h3>
              </div>
              <div className="flex items-center mt-0.5 md:mt-1">
                <MessageSquare className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 text-gray-400 mr-1 flex-shrink-0" />
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate max-w-[80%] sm:max-w-[85%] md:max-w-[90%]">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-blue rounded-full absolute right-3 mt-1"></div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      {/* User Profile Section */}
      <div className="mt-auto shadow-sm p-2 md:p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:bg-gray-100 p-1.5 md:p-2 rounded-[18px]">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs md:text-sm">
                <span>{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium truncate">
                  {user.name}
                </p>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-44 sm:w-48 md:w-56 p-1"
          >
            <>
              <DropdownMenuItem className="cursor-pointer py-1.5 sm:py-2 md:py-2.5 text-xs md:text-sm h-9 sm:h-10 md:h-11">
                <Link to="/" className="w-full flex items-center">
                  <UserRound className="mr-1.5 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  <span>My Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-1.5 sm:py-2 md:py-2.5 text-xs md:text-sm h-9 sm:h-10 md:h-11"
                onClick={handleLogout}
              >
                <div className="w-full flex items-center">
                  <LogOut className="mr-1.5 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer py-1.5 sm:py-2 md:py-2.5 text-xs md:text-sm h-9 sm:h-10 md:h-11">
              <Settings2 className="mr-1.5 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer py-1.5 sm:py-2 md:py-2.5 text-xs md:text-sm h-9 sm:h-10 md:h-11">
              About
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer py-1.5 sm:py-2 md:py-2.5 text-xs md:text-sm h-9 sm:h-10 md:h-11">
              Contact
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer py-1.5 sm:py-2 md:py-2.5 text-xs md:text-sm h-9 sm:h-10 md:h-11">
              Terms of service
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHistorySidebar;
