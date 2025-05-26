# ChatHistorySingleTopicResponseMessagesInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**role** | **string** | Message role (user, assistant, system, tool) | [optional] [default to undefined]
**content** | **string** | Message content | [optional] [default to undefined]
**sequence** | **number** | Message sequence number | [optional] [default to undefined]
**timestamp** | **string** | Message timestamp | [optional] [default to undefined]
**tool_calls** | **object** | Tool calls if any | [optional] [default to undefined]
**tool_results** | **object** | Tool results if any | [optional] [default to undefined]

## Example

```typescript
import { ChatHistorySingleTopicResponseMessagesInner } from './api';

const instance: ChatHistorySingleTopicResponseMessagesInner = {
    role,
    content,
    sequence,
    timestamp,
    tool_calls,
    tool_results,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
