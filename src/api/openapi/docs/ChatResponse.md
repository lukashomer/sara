# ChatResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | The assistant\&#39;s response message | [default to undefined]
**tool_calls** | [**Array&lt;ChatResponseToolCallsInner&gt;**](ChatResponseToolCallsInner.md) | List of tool calls made by the assistant | [optional] [default to undefined]
**tool_results** | [**Array&lt;ChatResponseToolResultsInner&gt;**](ChatResponseToolResultsInner.md) | Results of the tool calls | [optional] [default to undefined]
**map_description** | **string** | Description of a map (if lifestyle map was requested) | [optional] [default to undefined]
**filtered_map_data** | **{ [key: string]: any; }** | Filtered map data (if provided) | [optional] [default to undefined]
**web_search_results** | [**Array&lt;WebSearchResultSearchResultsInner&gt;**](WebSearchResultSearchResultsInner.md) | Results from web search | [optional] [default to undefined]
**error** | **string** | Error message if something went wrong | [optional] [default to undefined]

## Example

```typescript
import { ChatResponse } from './api';

const instance: ChatResponse = {
    message,
    tool_calls,
    tool_results,
    map_description,
    filtered_map_data,
    web_search_results,
    error,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
