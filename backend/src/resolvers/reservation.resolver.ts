import { Arg, Mutation, Query, Resolver } from "type-graphql";
import ReservationService from "../services/reservation.service";
import Reservation, {
  CreateReservationInput,
} from "../entities/reservation.entity";
import ReservationMaterialService from "../services/reservation_material.service";
import { resolveReadonlyArrayThunk } from "graphql";

@Resolver()
export default class ReservationResolver {
  @Query(() => [Reservation])
  async reservations() {
    return await new ReservationService().listReservations();
  }

  // Create Query to get One Reaservation by ID

  // Create Query to get One Reaservation by ID user

  // Create Mutaion add one reseervation

  @Mutation(() => Reservation) //prévoir un object type de retour
  async createReservation(
    @Arg("data") data: CreateReservationInput
  ): Promise<Reservation> {
    const newReservation = await new ReservationService().createReservation(
      data
    );
    console.log(newReservation);
    const reservationMaterial = data.materials.map(async (material) => {
      const dataToResMat = {
        reservationId: newReservation.id,
        quantity: material.quantity,
        materialId: material.materialId,
      };

      const res = await new ReservationMaterialService().createResMat(
        dataToResMat
      );
      console.log("RES: ", res);
      console.log("DATA2RES: ", dataToResMat);
      if (!res) {
        throw new Error("La ReservationMateriel n'a pas pu etre faite");
      }
    });
    await Promise.all(reservationMaterial);
    console.log(reservationMaterial);

    return newReservation;
  }
}
