# RefreshTokenResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**success** | **boolean** |  | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]
**token** | **string** | New JWT access token | [optional] [default to undefined]
**expires_in** | **number** | Token expiration time in seconds | [optional] [default to undefined]

## Example

```typescript
import { RefreshTokenResponse } from './api';

const instance: RefreshTokenResponse = {
    success,
    message,
    token,
    expires_in,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
