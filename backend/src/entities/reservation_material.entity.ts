import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

import Material from "./material.entity";
import Reservation from "./reservation.entity";

@ObjectType()
@Entity()
export class ReservationMaterial extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Reservation)
  @JoinColumn()
  @ManyToOne(() => Reservation, (reservation) => reservation.id)
  reservation: Reservation;

  @Field(() => Material)
  @JoinColumn()
  @ManyToOne(() => Material, (material) => material.id)
  material: Material;
}

@InputType()
export class CreateReservationMaterialInput {
  @Field(() => ID)
  reservationId: string; // Identifiant de la réservation

  @Field(() => ID)
  materialId: string; // Identifiant du matériau

  @Field()
  quantity: number; // Quantité de matériel réservée
}
