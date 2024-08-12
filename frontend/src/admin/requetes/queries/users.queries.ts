import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      email
      id
      role
      firstName
      lastName
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query FindOneUserById($findOneUserByIdId: String!) {
    findOneUserById(id: $findOneUserByIdId) {
      email
      firstName
      id
      lastName
      phone
      role
    }
  }
`;