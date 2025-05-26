# GeneralApi

All URIs are relative to *https://sara-ai-be.replit.app*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getRoot**](#getroot) | **GET** / | Home page|

# **getRoot**
> getRoot()

Serves the home page of the API

### Example

```typescript
import {
    GeneralApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GeneralApi(configuration);

const { status, data } = await apiInstance.getRoot();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Home page served successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

