# FamilyExpensesResultExpenseData

Detailed expense data

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**location** | **string** | Location for the expense data | [optional] [default to undefined]
**family_size** | **number** | Number of people in the family | [optional] [default to undefined]
**currency** | **string** | Currency code for amounts | [optional] [default to undefined]
**total** | **number** | Total monthly expenses | [optional] [default to undefined]
**categories** | [**Array&lt;ExpenseCategory&gt;**](ExpenseCategory.md) | List of expense categories | [optional] [default to undefined]
**notes** | **string** | Additional context and explanation of the expense data | [optional] [default to undefined]

## Example

```typescript
import { FamilyExpensesResultExpenseData } from './api';

const instance: FamilyExpensesResultExpenseData = {
    location,
    family_size,
    currency,
    total,
    categories,
    notes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
