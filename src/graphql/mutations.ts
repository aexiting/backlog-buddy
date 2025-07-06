/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createBacklogItem = /* GraphQL */ `mutation CreateBacklogItem(
  $input: CreateBacklogItemInput!
  $condition: ModelBacklogItemConditionInput
) {
  createBacklogItem(input: $input, condition: $condition) {
    id
    title
    type
    rating
    createdAt
    owner
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBacklogItemMutationVariables,
  APITypes.CreateBacklogItemMutation
>;
export const updateBacklogItem = /* GraphQL */ `mutation UpdateBacklogItem(
  $input: UpdateBacklogItemInput!
  $condition: ModelBacklogItemConditionInput
) {
  updateBacklogItem(input: $input, condition: $condition) {
    id
    title
    type
    rating
    createdAt
    owner
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBacklogItemMutationVariables,
  APITypes.UpdateBacklogItemMutation
>;
export const deleteBacklogItem = /* GraphQL */ `mutation DeleteBacklogItem(
  $input: DeleteBacklogItemInput!
  $condition: ModelBacklogItemConditionInput
) {
  deleteBacklogItem(input: $input, condition: $condition) {
    id
    title
    type
    rating
    createdAt
    owner
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBacklogItemMutationVariables,
  APITypes.DeleteBacklogItemMutation
>;
