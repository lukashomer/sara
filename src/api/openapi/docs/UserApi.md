# UserApi

All URIs are relative to *https://sara-ai-be.replit.app*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getUserProfile**](#getuserprofile) | **GET** /profile | Get user profile|

# **getUserProfile**
> UserProfileResponse getUserProfile()

Get profile data for the currently logged-in user

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.getUserProfile();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserProfileResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User profile retrieved successfully |  -  |
|**401** | Not authenticated |  -  |
|**404** | User not found |  -  |
|**500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

