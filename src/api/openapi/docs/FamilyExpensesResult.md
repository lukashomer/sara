# FamilyExpensesResult


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**location** | **string** | Location for the expense data (address, city, or neighborhood) | [optional] [default to undefined]
**family_size** | **number** | Number of people in the family | [optional] [default to undefined]
**currency** | **string** | Currency code for the expense amounts | [optional] [default to undefined]
**expense_data** | [**FamilyExpensesResultExpenseData**](FamilyExpensesResultExpenseData.md) |  | [optional] [default to undefined]

## Example

```typescript
import { FamilyExpensesResult } from './api';

const instance: FamilyExpensesResult = {
    location,
    family_size,
    currency,
    expense_data,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
