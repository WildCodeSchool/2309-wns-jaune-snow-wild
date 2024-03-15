import { ReservationMaterial } from "./../entities/reservation_material.entity";
import { Query, Resolver } from "type-graphql";
import ReservationMaterialService from "../services/reservation_material.service";

@Resolver()
export default class ReservationMaterialResolver {
  @Query(() => [ReservationMaterial])
  async reservations() {
    return await new ReservationMaterialService().listReservationsMaterial();
  }

  // Create Query to get One Reaservation by ID

  // Create Query to get One Reaservation by ID user

  // Create Mutaion add one reseervation
}
