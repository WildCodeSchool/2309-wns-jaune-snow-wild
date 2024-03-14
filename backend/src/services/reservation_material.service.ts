import {
  ReservationMaterial,
  CreateReservationMaterialInput,
} from "./../entities/reservation_material.entity";
import { Repository } from "typeorm";
import datasource from "../db";
import Reservation from "../entities/reservation.entity";

export default class ReservationMaterialService {
  db: Repository<ReservationMaterial>;
  constructor() {
    this.db = datasource.getRepository(ReservationMaterial);
  }

  async listReservationsMaterial() {
    return this.db.find();
  }

  async findReservationMaterial(id: string) {
    return this.db.findOne({
      where: { id },
      relations: { material: true, reservation: true },
    });
  }
  async createResMat(data: {
    reservation: Reservation;
    quantity: number;
    material: {
      id: string;
    };
  }) {
    const newReservationMaterial = this.db.create({ ...data });

    const reservationmaterial = await this.db.save(newReservationMaterial);

    return this.findReservationMaterial(reservationmaterial.id);
  }
}
