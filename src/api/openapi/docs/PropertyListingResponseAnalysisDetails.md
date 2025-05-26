# PropertyListingResponseAnalysisDetails

Details about how the listing was generated

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**style_used** | **string** | Style of the listing description (professional, casual, luxury, etc.) | [optional] [default to undefined]
**included_highlights** | **boolean** | Whether key highlights were included | [optional] [default to undefined]
**included_neighborhood** | **boolean** | Whether neighborhood details were included | [optional] [default to undefined]
**images_analyzed** | **number** | Number of images analyzed | [optional] [default to undefined]

## Example

```typescript
import { PropertyListingResponseAnalysisDetails } from './api';

const instance: PropertyListingResponseAnalysisDetails = {
    style_used,
    included_highlights,
    included_neighborhood,
    images_analyzed,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
