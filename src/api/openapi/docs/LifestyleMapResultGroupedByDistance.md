# LifestyleMapResultGroupedByDistance

Points of interest grouped by distance range

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**walking_distance** | [**Array&lt;PointOfInterest&gt;**](PointOfInterest.md) | Places within walking distance (0-1.5km) | [optional] [default to undefined]
**biking_distance** | [**Array&lt;PointOfInterest&gt;**](PointOfInterest.md) | Places within biking distance (1.5-5km) | [optional] [default to undefined]
**short_drive** | [**Array&lt;PointOfInterest&gt;**](PointOfInterest.md) | Places within a short drive (5-10km) | [optional] [default to undefined]
**further_away** | [**Array&lt;PointOfInterest&gt;**](PointOfInterest.md) | Places further away (10-20km) | [optional] [default to undefined]

## Example

```typescript
import { LifestyleMapResultGroupedByDistance } from './api';

const instance: LifestyleMapResultGroupedByDistance = {
    walking_distance,
    biking_distance,
    short_drive,
    further_away,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
