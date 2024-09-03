import { gql } from "@apollo/client";

export const GET_RESERVATIONS_BY_USER_ID = gql`
  query ReservationsByUserId($reservationsByUserIdId: String!) {
    reservationsByUserId(id: $reservationsByUserIdId) {
      id
      start_date
      end_date
      status
      reservationMaterials {
        id
        price
        quantity
        size
        material {
          id
          name
          picture
        }
      }
    }
  }
`;

export const IS_DISPONIBLE_BETWEEN_TWO_DATES = gql`
  query CheckAvailability($data: FindReservationMaterialsBetweenTwoDateInput!) {
    reservationMaterialBetweenDates(data: $data)
  }
`;
