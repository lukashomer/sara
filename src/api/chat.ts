import { API_URL, axiosService } from "@/services/axiosService";
import type { components, operations } from "@/api/openapi/api";

type GetChatHistoryResponse =
  | components["schemas"]["ChatHistorySingleTopicResponse"]
  | components["schemas"]["ChatHistoryAllTopicsResponse"];

type GetChatHistoryOperation = operations["getChatHistory"];

export const getChatHistory = async (
  params: GetChatHistoryOperation["parameters"]
): Promise<GetChatHistoryResponse> => {
  const response = await axiosService.get<
    GetChatHistoryOperation["responses"]["200"]["content"]["application/json"]
  >(`${API_URL}`, {
    params,
  });
  return response.data;
};
