# PointOfInterest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Name of the point of interest | [optional] [default to undefined]
**address** | **string** | Address of the point of interest | [optional] [default to undefined]
**category** | **string** | Category of the point of interest | [optional] [default to undefined]
**original_category** | **string** | Original category from API | [optional] [default to undefined]
**distance_km** | **number** | Distance in kilometers from the center location | [optional] [default to undefined]
**geometry** | [**PointOfInterestGeometry**](PointOfInterestGeometry.md) |  | [optional] [default to undefined]
**rating** | **number** | User rating (if available) | [optional] [default to undefined]
**user_ratings_total** | **number** | Number of user ratings | [optional] [default to undefined]
**place_id** | **string** | Google Places ID for the location | [optional] [default to undefined]
**place_url** | **string** | URL to the Google Maps place | [optional] [default to undefined]
**map_marker_url** | **string** | URL to Google Maps marker location | [optional] [default to undefined]
**icon_url** | **string** | URL to the icon for this place type | [optional] [default to undefined]
**website** | **string** | Website for the place (if available) | [optional] [default to undefined]
**phone** | **string** | Phone number for the place (if available) | [optional] [default to undefined]
**types** | **Array&lt;string&gt;** | Types of place from Google Places API | [optional] [default to undefined]
**display_info** | [**PointOfInterestDisplayInfo**](PointOfInterestDisplayInfo.md) |  | [optional] [default to undefined]
**match_score** | **number** | Relevance score for matching preferences | [optional] [default to undefined]

## Example

```typescript
import { PointOfInterest } from './api';

const instance: PointOfInterest = {
    name,
    address,
    category,
    original_category,
    distance_km,
    geometry,
    rating,
    user_ratings_total,
    place_id,
    place_url,
    map_marker_url,
    icon_url,
    website,
    phone,
    types,
    display_info,
    match_score,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
