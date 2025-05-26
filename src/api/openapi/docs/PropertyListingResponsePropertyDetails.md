# PropertyListingResponsePropertyDetails

Basic details about the property

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | **string** | Property address | [default to undefined]
**beds** | **any** | Number of bedrooms | [optional] [default to undefined]
**baths** | **any** | Number of bathrooms | [optional] [default to undefined]
**property_type** | **string** | Type of property (apartment, house, condo, etc.) | [default to undefined]
**price** | **any** | Listing price of the property (optional) | [optional] [default to undefined]
**square_footage** | **any** | Square footage of the property (optional) | [optional] [default to undefined]

## Example

```typescript
import { PropertyListingResponsePropertyDetails } from './api';

const instance: PropertyListingResponsePropertyDetails = {
    address,
    beds,
    baths,
    property_type,
    price,
    square_footage,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
