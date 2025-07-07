/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API.ts";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getBacklogItem = /* GraphQL */ `query GetBacklogItem($id: ID!) {
  getBacklogItem(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetBacklogItemQueryVariables,
  APITypes.GetBacklogItemQuery
>;
export const listBacklogItems = /* GraphQL */ `query ListBacklogItems(
  $filter: ModelBacklogItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listBacklogItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBacklogItemsQueryVariables,
  APITypes.ListBacklogItemsQuery
>;
