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
  query GetUserById($getUserByIdId: String!) {
    getUserById(id: $getUserByIdId) {
      email
      firstName
      id
      lastName
      password
      phone
      reservations {
        id
      }
    }
  }
`;
