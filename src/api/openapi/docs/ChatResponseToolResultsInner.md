# ChatResponseToolResultsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tool_call_id** | **string** | ID of the tool call this result is for | [default to undefined]
**function_name** | **string** | Name of the function that was called | [default to undefined]
**result** | **object** | Result object returned by the function with data specific to the function that was called | [default to undefined]

## Example

```typescript
import { ChatResponseToolResultsInner } from './api';

const instance: ChatResponseToolResultsInner = {
    tool_call_id,
    function_name,
    result,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
