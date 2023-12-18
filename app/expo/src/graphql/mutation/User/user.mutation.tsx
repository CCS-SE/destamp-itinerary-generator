import { gql } from '@apollo/client';

export const CreateUser = gql(
  `mutation CreateUser($type: String! $input: CreateUserInput!) {
    createUser(type:$type, input: $input) {
      id
    }
  }`,
);

export const EditUser = gql(
  `mutation EditUser($userId: String!, $input: EditUserInput!) {
    editUser(userId: $userId, input: $input) {
      id
    }
  }`,
);

export const ClaimStamp = gql(
  `mutation ClaimStamp($userId: String!, $stampId: Int!) {
    claimStamp(userId: $userId, stampId: $stampId) {
      id
    }
  }`,
);

export const SubscribeToPremium = gql(
  `mutation SubscribeToPremium($userId: String!, $input: CreateSubscriptionInput!) {
    subscribeToPremium(userId: $userId, input: $input) {
      id
    }
  }`,
);

export const CancelSubscription = gql(
  `mutation CancelSubscription($userId: String!) {
    cancelSubscription(userId: $userId) {
      id
    }
  }`,
);
