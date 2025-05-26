# SearchChatResponseMatchesInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**topic_id** | **string** | Topic ID of the conversation | [optional] [default to undefined]
**title** | **string** | Title of the conversation (if available) | [optional] [default to undefined]
**match_type** | **string** | Type of match: topic_or_title or content | [optional] [default to undefined]
**message_id** | **number** | ID of the message where content match was found (only for content matches) | [optional] [default to undefined]
**preview** | **string** | Preview of the matched content (only for content matches) | [optional] [default to undefined]
**created_at** | **string** | Creation timestamp | [optional] [default to undefined]
**role** | **string** | Role of the message sender (only for content matches) | [optional] [default to undefined]

## Example

```typescript
import { SearchChatResponseMatchesInner } from './api';

const instance: SearchChatResponseMatchesInner = {
    topic_id,
    title,
    match_type,
    message_id,
    preview,
    created_at,
    role,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
