/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API.ts";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateBacklogItem = /* GraphQL */ `subscription OnCreateBacklogItem(
  $filter: ModelSubscriptionBacklogItemFilterInput
  $owner: String
) {
  onCreateBacklogItem(filter: $filter, owner: $owner) {
    id
    title
    type
    rating
    createdAt
    owner
    status
    image
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateBacklogItemSubscriptionVariables,
  APITypes.OnCreateBacklogItemSubscription
>;
export const onUpdateBacklogItem = /* GraphQL */ `subscription OnUpdateBacklogItem(
  $filter: ModelSubscriptionBacklogItemFilterInput
  $owner: String
) {
  onUpdateBacklogItem(filter: $filter, owner: $owner) {
    id
    title
    type
    rating
    createdAt
    owner
    status
    image
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateBacklogItemSubscriptionVariables,
  APITypes.OnUpdateBacklogItemSubscription
>;
export const onDeleteBacklogItem = /* GraphQL */ `subscription OnDeleteBacklogItem(
  $filter: ModelSubscriptionBacklogItemFilterInput
  $owner: String
) {
  onDeleteBacklogItem(filter: $filter, owner: $owner) {
    id
    title
    type
    rating
    createdAt
    owner
    status
    image
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteBacklogItemSubscriptionVariables,
  APITypes.OnDeleteBacklogItemSubscription
>;
