import { Message } from "@/components/ChatPane";
import type * as Schemas from "@/api/saraSchemas";
import {
  ChatHistorySingleTopicResponse,
  ChatHistoryAllTopicsResponse,
  LifestyleMapResult,
  FamilyExpensesResult,
  WebSearchResult,
  PropertyListingResponse,
  MLSSearchResult,
  RealtimeMarketPulseResult,
} from "@/api/saraSchemas";

type TChatHistoryToolResult = NonNullable<
  Schemas.ChatHistorySingleTopicResponse["messages"][number]["tool_results"]
>[number];

export type TChatToolResult = NonNullable<
  Schemas.ChatResponse["tool_results"]
>[number]["result"];

export const transformChatMessage = (
  message: Schemas.ChatHistorySingleTopicResponse["messages"][number]
): Message => {
  return {
    id: message.sequence?.toString() ?? "",
    content: message.content,
    sender: message?.role === "user" ? "user" : "ai",
    timestamp: message.timestamp ? new Date(message.timestamp) : new Date(),
    toolCalls: message.tool_calls,
    toolResults: message.tool_results,
  };
};

export const isSingleTopic = (
  data?: ChatHistorySingleTopicResponse | ChatHistoryAllTopicsResponse
): data is ChatHistorySingleTopicResponse => {
  return data && "topic_id" in data;
};

export const isMultipleTopics = (
  data?: ChatHistorySingleTopicResponse | ChatHistoryAllTopicsResponse
): data is ChatHistoryAllTopicsResponse => {
  return data && "topics" in data;
};

export const isLifeStyleMapResult = (
  result: TChatToolResult | TChatHistoryToolResult
): result is LifestyleMapResult => {
  return result && "grouped_by_distance" in result;
};

export const isMLSSearchResult = (
  result: TChatToolResult | TChatHistoryToolResult
): result is MLSSearchResult => {
  return result && "properties" in result;
};

export const isRealtimeMarketPulseResult = (
  result: TChatToolResult | TChatHistoryToolResult
): result is RealtimeMarketPulseResult => {
  return result.data && "metrics" in result.data;
};

export const isFamilyExpensesResult = (
  result: TChatToolResult | TChatHistoryToolResult
): result is FamilyExpensesResult => {
  return result && "family_size" in result;
};

export const isWebSearchResult = (
  result: TChatToolResult | TChatHistoryToolResult
): result is WebSearchResult => {
  return result && "search_results" in result;
};

export const isPropertyListingResponse = (
  result: TChatToolResult | TChatHistoryToolResult
): result is PropertyListingResponse => {
  return result && "property_details" in result;
};
