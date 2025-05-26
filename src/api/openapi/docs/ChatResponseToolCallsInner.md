# ChatResponseToolCallsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique identifier for the tool call | [default to undefined]
**type** | **string** | Type of tool call, currently only \&#39;function\&#39; is supported | [default to undefined]
**_function** | [**ChatResponseToolCallsInnerFunction**](ChatResponseToolCallsInnerFunction.md) |  | [default to undefined]

## Example

```typescript
import { ChatResponseToolCallsInner } from './api';

const instance: ChatResponseToolCallsInner = {
    id,
    type,
    _function,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
