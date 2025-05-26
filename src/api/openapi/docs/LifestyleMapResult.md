# LifestyleMapResult


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**grouped_by_distance** | [**LifestyleMapResultGroupedByDistance**](LifestyleMapResultGroupedByDistance.md) |  | [optional] [default to undefined]
**location** | [**LifestyleMapResultLocation**](LifestyleMapResultLocation.md) |  | [optional] [default to undefined]
**map_url** | **string** | URL to Google Maps view of the location | [optional] [default to undefined]
**points_of_interest** | **{ [key: string]: Array&lt;PointOfInterest&gt;; }** | Points of interest grouped by category | [optional] [default to undefined]
**search_params** | **object** | Parameters used for the search | [optional] [default to undefined]

## Example

```typescript
import { LifestyleMapResult } from './api';

const instance: LifestyleMapResult = {
    grouped_by_distance,
    location,
    map_url,
    points_of_interest,
    search_params,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
