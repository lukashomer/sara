# ChatHistoryRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** | External user ID | [default to undefined]
**topicId** | **string** | Conversation topic ID | [default to undefined]
**role** | **string** | Message role (user, assistant, system, tool) | [default to undefined]
**content** | **string** | Message content | [default to undefined]
**tool_calls** | **string** | Optional JSON string of tool calls | [optional] [default to undefined]
**tool_results** | **string** | Optional JSON string of tool results | [optional] [default to undefined]
**panel_data** | **string** | Optional JSON string of panel data for UI display | [optional] [default to undefined]

## Example

```typescript
import { ChatHistoryRequest } from './api';

const instance: ChatHistoryRequest = {
    userId,
    topicId,
    role,
    content,
    tool_calls,
    tool_results,
    panel_data,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
