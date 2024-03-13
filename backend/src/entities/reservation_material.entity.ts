import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from "typeorm";
import { Field } from "type-graphql";

import Material from "./material.entity";
import Reservation from "./reservation.entity";

@Entity()
export class ReservationMaterial extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Reservation)
  @ManyToOne(() => Reservation, (reservation) => reservation.id)
  reservation: Reservation;

  @Field(() => Material)
  @ManyToOne(() => Material, (material) => material.id)
  materials: Material;
}
