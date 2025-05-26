import { axiosService } from "@/services/axiosService";
import {
  FeaturesApiFactory,
  FeaturesApiGetChatHistoryRequest,
  GetChatHistory200Response,
} from "./openapi/api";
import { Configuration } from "./openapi/configuration";
import fetcher from "./fetcher";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

// Create an API instance with your axios configuration
const api = FeaturesApiFactory(
  new Configuration({
    baseOptions: {
      axiosInstance: axiosService,
    },
  })
);

export const useChatHistoryQuery = (
  params: FeaturesApiGetChatHistoryRequest,
  options?: UseQueryOptions<GetChatHistory200Response>
) =>
  useQuery<GetChatHistory200Response>(
    ["getChatHistory", params],
    fetcher(api.getChatHistory, params),
    options
  );
