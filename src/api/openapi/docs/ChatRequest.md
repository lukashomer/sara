# ChatRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** | External user ID to track conversation history | [default to undefined]
**topicId** | **string** | Conversation topic ID to organize messages | [default to undefined]
**message** | **string** | User message content | [default to undefined]
**title** | **string** | Optional title for the conversation | [optional] [default to undefined]
**image** | **File** | Optional single image to analyze as part of the message | [optional] [default to undefined]
**images** | **Array&lt;File&gt;** | Optional multiple images to analyze as part of the message (for property listings, etc.) | [optional] [default to undefined]

## Example

```typescript
import { ChatRequest } from './api';

const instance: ChatRequest = {
    userId,
    topicId,
    message,
    title,
    image,
    images,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
