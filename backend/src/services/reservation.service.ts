import { Repository } from "typeorm";
import datasource from "../db";
import Reservation, {
  StatutReservation,
  CreateReservationInput,
} from "../entities/reservation.entity";

export default class ReservationService {
  db: Repository<Reservation>;
  constructor() {
    this.db = datasource.getRepository(Reservation);
  }

  async listReservations() {
    return this.db.find();
  }

  async createReservation(data: CreateReservationInput) {
    const total_price_by_row = data.materials.map((material) => {
      return material.unit_price * material.quantity;
    });

    function sum(accumulator: any, currentValue: any) {
      return accumulator + currentValue;
    }

    const final_price = total_price_by_row.reduce(sum);
    const dataIntermediaire = {
      ...data,
      final_price,
      statut: StatutReservation.AWAITING,
    };
    const newReservation = this.db.create({ ...dataIntermediaire });

    const creatResa = await this.db.save(newReservation);

    console.log(creatResa);
    return creatResa;
  }
}
