# UserConversationsResponseConversationsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique database ID of the conversation | [optional] [default to undefined]
**topic_id** | **string** | Topic ID of the conversation | [optional] [default to undefined]
**title** | **string** | Title of the conversation (derived from content if not set) | [optional] [default to undefined]
**message_count** | **number** | Number of messages in this conversation | [optional] [default to undefined]
**preview** | **string** | Preview text from the first user message | [optional] [default to undefined]
**created_at** | **string** | Creation timestamp | [optional] [default to undefined]
**updated_at** | **string** | Last update timestamp | [optional] [default to undefined]

## Example

```typescript
import { UserConversationsResponseConversationsInner } from './api';

const instance: UserConversationsResponseConversationsInner = {
    id,
    topic_id,
    title,
    message_count,
    preview,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
