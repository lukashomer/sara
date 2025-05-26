# UserConversationsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_id** | **string** | The ID of the authenticated user | [optional] [default to undefined]
**total_count** | **number** | Total number of conversations available | [optional] [default to undefined]
**limit** | **number** | Maximum number of conversations returned in this response | [optional] [default to undefined]
**offset** | **number** | Number of conversations skipped for pagination | [optional] [default to undefined]
**conversations** | [**Array&lt;UserConversationsResponseConversationsInner&gt;**](UserConversationsResponseConversationsInner.md) | List of conversations for the user | [optional] [default to undefined]

## Example

```typescript
import { UserConversationsResponse } from './api';

const instance: UserConversationsResponse = {
    user_id,
    total_count,
    limit,
    offset,
    conversations,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
