# PropertyListingResponse

Response schema for property listing description generator

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** | Catchy title for the property listing | [default to undefined]
**description** | **string** | Detailed description of the property | [default to undefined]
**key_features** | **Array&lt;string&gt;** | List of key features or highlights of the property | [default to undefined]
**property_details** | [**PropertyListingResponsePropertyDetails**](PropertyListingResponsePropertyDetails.md) |  | [default to undefined]
**analysis_details** | [**PropertyListingResponseAnalysisDetails**](PropertyListingResponseAnalysisDetails.md) |  | [default to undefined]

## Example

```typescript
import { PropertyListingResponse } from './api';

const instance: PropertyListingResponse = {
    title,
    description,
    key_features,
    property_details,
    analysis_details,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
