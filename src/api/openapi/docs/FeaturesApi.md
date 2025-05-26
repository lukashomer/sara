# FeaturesApi

All URIs are relative to *https://sara-ai-be.replit.app*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**chat**](#chat) | **POST** /chat | Chat with AI|
|[**getChatHistory**](#getchathistory) | **GET** /chat-history | Get chat history|
|[**getUserConversations**](#getuserconversations) | **GET** /conversations | Get user conversations|
|[**searchChatHistory**](#searchchathistory) | **GET** /search-chat | Search chat history|

# **chat**
> ChatResponse chat()

Process chat request with OpenAI GPT 4 Omni model with web search capability

### Example

```typescript
import {
    FeaturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FeaturesApi(configuration);

let userId: string; //External user ID to track conversation history (default to undefined)
let topicId: string; //Conversation topic ID to organize messages (default to undefined)
let message: string; //User message content (default to undefined)
let title: string; //Optional title for the conversation (optional) (default to undefined)
let image: File; //Optional single image to analyze as part of the message (optional) (default to undefined)
let images: Array<File>; //Optional multiple images to analyze as part of the message (for property listings, etc.) (optional) (default to undefined)

const { status, data } = await apiInstance.chat(
    userId,
    topicId,
    message,
    title,
    image,
    images
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | External user ID to track conversation history | defaults to undefined|
| **topicId** | [**string**] | Conversation topic ID to organize messages | defaults to undefined|
| **message** | [**string**] | User message content | defaults to undefined|
| **title** | [**string**] | Optional title for the conversation | (optional) defaults to undefined|
| **image** | [**File**] | Optional single image to analyze as part of the message | (optional) defaults to undefined|
| **images** | **Array&lt;File&gt;** | Optional multiple images to analyze as part of the message (for property listings, etc.) | (optional) defaults to undefined|


### Return type

**ChatResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data, application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Chat response generated successfully |  -  |
|**401** | Not authenticated |  -  |
|**500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getChatHistory**
> GetChatHistory200Response getChatHistory()

Retrieve chat history for a user, either for all topics or for a specific topic

### Example

```typescript
import {
    FeaturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FeaturesApi(configuration);

let userId: string; //External user ID to get chat history for (default to undefined)
let topicId: string; //Optional topic ID to get history for a specific conversation (optional) (default to undefined)

const { status, data } = await apiInstance.getChatHistory(
    userId,
    topicId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | External user ID to get chat history for | defaults to undefined|
| **topicId** | [**string**] | Optional topic ID to get history for a specific conversation | (optional) defaults to undefined|


### Return type

**GetChatHistory200Response**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Chat history retrieved successfully |  -  |
|**400** | Missing required userId parameter |  -  |
|**401** | Not authenticated |  -  |
|**404** | No conversation found for the specified topic |  -  |
|**500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserConversations**
> UserConversationsResponse getUserConversations()

Retrieve all chat conversations for the currently authenticated user with pagination and sorting options

### Example

```typescript
import {
    FeaturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FeaturesApi(configuration);

let limit: number; //Maximum number of conversations to return (default: 50) (optional) (default to 50)
let offset: number; //Number of conversations to skip (for pagination, default: 0) (optional) (default to 0)
let sortBy: 'created_at' | 'updated_at' | 'title'; //Field to sort by (default: \'updated_at\') (optional) (default to 'updated_at')
let sortOrder: 'asc' | 'desc'; //Sort order (default: \'desc\') (optional) (default to 'desc')

const { status, data } = await apiInstance.getUserConversations(
    limit,
    offset,
    sortBy,
    sortOrder
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] | Maximum number of conversations to return (default: 50) | (optional) defaults to 50|
| **offset** | [**number**] | Number of conversations to skip (for pagination, default: 0) | (optional) defaults to 0|
| **sortBy** | [**&#39;created_at&#39; | &#39;updated_at&#39; | &#39;title&#39;**]**Array<&#39;created_at&#39; &#124; &#39;updated_at&#39; &#124; &#39;title&#39;>** | Field to sort by (default: \&#39;updated_at\&#39;) | (optional) defaults to 'updated_at'|
| **sortOrder** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** | Sort order (default: \&#39;desc\&#39;) | (optional) defaults to 'desc'|


### Return type

**UserConversationsResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of conversations retrieved successfully |  -  |
|**401** | Unauthorized - Invalid or missing token |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchChatHistory**
> SearchChatResponse searchChatHistory()

Search in chat history for the currently authenticated user

### Example

```typescript
import {
    FeaturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FeaturesApi(configuration);

let query: string; //Search query (default to undefined)
let limit: number; //Maximum number of results to return (optional) (default to 10)

const { status, data } = await apiInstance.searchChatHistory(
    query,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **query** | [**string**] | Search query | defaults to undefined|
| **limit** | [**number**] | Maximum number of results to return | (optional) defaults to 10|


### Return type

**SearchChatResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Search results retrieved successfully |  -  |
|**400** | Missing required query parameter |  -  |
|**401** | Not authenticated |  -  |
|**500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

