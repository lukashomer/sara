import { SaraContext } from "./saraContext";
import { axiosService, API_URL } from "../services/axiosService";
import axios from "axios";

export type ErrorWrapper<TError> =
  | TError
  | { status: "unknown"; payload: string };

export type SaraFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
  signal?: AbortSignal;
} & SaraContext["fetcherOptions"];

export async function saraFetch<
  TData,
  TError,
  TBody extends {} | FormData | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {},
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  signal,
}: SaraFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  let error: ErrorWrapper<TError>;
  try {
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    /**
     * As the fetch API is being used, when multipart/form-data is specified
     * the Content-Type header must be deleted so that the browser can set
     * the correct boundary.
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#sending_files_using_a_formdata_object
     */
    if (
      requestHeaders["Content-Type"]
        ?.toLowerCase()
        .includes("multipart/form-data")
    ) {
      delete requestHeaders["Content-Type"];
    }

    const response = await axiosService({
      url: `${API_URL}${resolveUrl(url, queryParams, pathParams)}`,
      method: method.toUpperCase(),
      data: body,
      headers: requestHeaders,
      signal,
    });

    // Axios automatically throws for non-2xx responses, so we only need to handle successful responses
    if (response.headers["content-type"]?.includes("json")) {
      return response.data;
    } else {
      // if it is not a json response, assume it is a blob and cast it to TData
      return response.data as unknown as TData;
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      try {
        error = e.response?.data as TError;
      } catch (err) {
        error = {
          status: "unknown" as const,
          payload:
            err instanceof Error
              ? `Unexpected error (${err.message})`
              : "Unexpected error",
        };
      }
    } else {
      const errorObject: Error = {
        name: "unknown" as const,
        message:
          e instanceof Error ? `Network error (${e.message})` : "Network error",
        stack: e as string,
      };
      throw errorObject;
    }
  }
  throw error;
}

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {}
) => {
  let query = new URLSearchParams(queryParams).toString();
  if (query) query = `?${query}`;
  return (
    url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)] ?? "") + query
  );
};
