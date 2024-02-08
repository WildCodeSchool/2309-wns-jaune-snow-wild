import { Repository } from "typeorm";
import datasource from "../db";
import Reservation from "../entities/reservation.entity";

export default class BookService {
  db: Repository<Reservation>;
  constructor() {
    this.db = datasource.getRepository(Reservation);
  }

  async listBooks() {
    return this.db.find();
  }

}