import { gql } from '@apollo/client';

export const CreateUser = gql(
  `mutation CreateUser($userInput: CreateUserInput!, $travelerInput: CreateTravelerInput!) {
      createUser(userInput: $userInput, travelerInput: $travelerInput) {
        id
      }
    }`,
);
