import {
  ReservationMaterial,
  CreateReservationMaterialInput,
} from "./../entities/reservation_material.entity";
import { Repository } from "typeorm";
import datasource from "../db";

export default class ReservationMaterialService {
  db: Repository<ReservationMaterial>;
  constructor() {
    this.db = datasource.getRepository(ReservationMaterial);
  }

  async listReservationsMaterial() {
    return this.db.find();
  }

  async createResMat(data: CreateReservationMaterialInput) {
    console.log("DATA: ===>", data);
    const newReservationMaterial = this.db.create(data);

    return await this.db.save(newReservationMaterial);
  }
}
