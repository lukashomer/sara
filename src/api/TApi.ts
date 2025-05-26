import {
  ChatHistoryAllTopicsResponse,
  ChatHistorySingleTopicResponse,
} from "./saraSchemas";

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
