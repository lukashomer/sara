# LoginResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**success** | **boolean** |  | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]
**user** | [**LoginResponseUser**](LoginResponseUser.md) |  | [optional] [default to undefined]
**token** | **string** | JWT access token | [optional] [default to undefined]
**refresh_token** | **string** | JWT refresh token used to obtain new access tokens | [optional] [default to undefined]
**expires_in** | **number** | Token expiration time in seconds | [optional] [default to undefined]

## Example

```typescript
import { LoginResponse } from './api';

const instance: LoginResponse = {
    success,
    message,
    user,
    token,
    refresh_token,
    expires_in,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
