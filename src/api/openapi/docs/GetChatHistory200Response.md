# GetChatHistory200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**topic_id** | **string** | Conversation topic ID | [optional] [default to undefined]
**user_id** | **string** | User ID | [optional] [default to undefined]
**created_at** | **string** | Creation timestamp | [optional] [default to undefined]
**updated_at** | **string** | Last update timestamp | [optional] [default to undefined]
**messages** | [**Array&lt;ChatHistorySingleTopicResponseMessagesInner&gt;**](ChatHistorySingleTopicResponseMessagesInner.md) | List of messages in this conversation | [optional] [default to undefined]
**topics** | [**Array&lt;ChatHistoryAllTopicsResponseTopicsInner&gt;**](ChatHistoryAllTopicsResponseTopicsInner.md) | List of conversation topics | [optional] [default to undefined]

## Example

```typescript
import { GetChatHistory200Response } from './api';

const instance: GetChatHistory200Response = {
    topic_id,
    user_id,
    created_at,
    updated_at,
    messages,
    topics,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
