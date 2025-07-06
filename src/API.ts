/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBacklogItemInput = {
  id?: string | null,
  title: string,
  type: ItemType,
  rating?: number | null,
  createdAt?: string | null,
  owner: string,
  status?: ItemStatus | null,
};

export enum ItemType {
  GAME = "GAME",
  MANGA = "MANGA",
  ANIME = "ANIME",
}


export enum ItemStatus {
  COMPLETED = "COMPLETED",
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
}


export type ModelBacklogItemConditionInput = {
  title?: ModelStringInput | null,
  type?: ModelItemTypeInput | null,
  rating?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  status?: ModelItemStatusInput | null,
  and?: Array< ModelBacklogItemConditionInput | null > | null,
  or?: Array< ModelBacklogItemConditionInput | null > | null,
  not?: ModelBacklogItemConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelItemTypeInput = {
  eq?: ItemType | null,
  ne?: ItemType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelItemStatusInput = {
  eq?: ItemStatus | null,
  ne?: ItemStatus | null,
};

export type BacklogItem = {
  __typename: "BacklogItem",
  id: string,
  title: string,
  type: ItemType,
  rating?: number | null,
  createdAt: string,
  owner: string,
  status?: ItemStatus | null,
  updatedAt: string,
};

export type UpdateBacklogItemInput = {
  id: string,
  title?: string | null,
  type?: ItemType | null,
  rating?: number | null,
  createdAt?: string | null,
  owner?: string | null,
  status?: ItemStatus | null,
};

export type DeleteBacklogItemInput = {
  id: string,
};

export type ModelBacklogItemFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  type?: ModelItemTypeInput | null,
  rating?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  status?: ModelItemStatusInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBacklogItemFilterInput | null > | null,
  or?: Array< ModelBacklogItemFilterInput | null > | null,
  not?: ModelBacklogItemFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBacklogItemConnection = {
  __typename: "ModelBacklogItemConnection",
  items:  Array<BacklogItem | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionBacklogItemFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  rating?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBacklogItemFilterInput | null > | null,
  or?: Array< ModelSubscriptionBacklogItemFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateBacklogItemMutationVariables = {
  input: CreateBacklogItemInput,
  condition?: ModelBacklogItemConditionInput | null,
};

export type CreateBacklogItemMutation = {
  createBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating?: number | null,
    createdAt: string,
    owner: string,
    status?: ItemStatus | null,
    updatedAt: string,
  } | null,
};

export type UpdateBacklogItemMutationVariables = {
  input: UpdateBacklogItemInput,
  condition?: ModelBacklogItemConditionInput | null,
};

export type UpdateBacklogItemMutation = {
  updateBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating?: number | null,
    createdAt: string,
    owner: string,
    status?: ItemStatus | null,
    updatedAt: string,
  } | null,
};

export type DeleteBacklogItemMutationVariables = {
  input: DeleteBacklogItemInput,
  condition?: ModelBacklogItemConditionInput | null,
};

export type DeleteBacklogItemMutation = {
  deleteBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating?: number | null,
    createdAt: string,
    owner: string,
    status?: ItemStatus | null,
    updatedAt: string,
  } | null,
};

export type GetBacklogItemQueryVariables = {
  id: string,
};

export type GetBacklogItemQuery = {
  getBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating?: number | null,
    createdAt: string,
    owner: string,
    status?: ItemStatus | null,
    updatedAt: string,
  } | null,
};

export type ListBacklogItemsQueryVariables = {
  filter?: ModelBacklogItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBacklogItemsQuery = {
  listBacklogItems?:  {
    __typename: "ModelBacklogItemConnection",
    items:  Array< {
      __typename: "BacklogItem",
      id: string,
      title: string,
      type: ItemType,
      rating?: number | null,
      createdAt: string,
      owner: string,
      status?: ItemStatus | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateBacklogItemSubscriptionVariables = {
  filter?: ModelSubscriptionBacklogItemFilterInput | null,
  owner?: string | null,
};

export type OnCreateBacklogItemSubscription = {
  onCreateBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating?: number | null,
    createdAt: string,
    owner: string,
    status?: ItemStatus | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateBacklogItemSubscriptionVariables = {
  filter?: ModelSubscriptionBacklogItemFilterInput | null,
  owner?: string | null,
};

export type OnUpdateBacklogItemSubscription = {
  onUpdateBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating?: number | null,
    createdAt: string,
    owner: string,
    status?: ItemStatus | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteBacklogItemSubscriptionVariables = {
  filter?: ModelSubscriptionBacklogItemFilterInput | null,
  owner?: string | null,
};

export type OnDeleteBacklogItemSubscription = {
  onDeleteBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating?: number | null,
    createdAt: string,
    owner: string,
    status?: ItemStatus | null,
    updatedAt: string,
  } | null,
};
