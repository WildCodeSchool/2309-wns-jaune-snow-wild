import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import User from "./user.entity";
import Material from "./material.entity";
import {
  ReservationMaterial,
  CreateReservationMaterialInput,
} from "./reservation_material.entity";

export enum StatutReservation {
  AWAITING = "en_attente",
  CONFIRMATION = "confirmée",
  PAID = "payée",
  CANCEL = "annulée",
  FINISHED = "terminée",
}

@ObjectType()
@Entity()
export default class Reservation {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field()
  @Column()
  final_price: number;

  @Field()
  @Column({
    type: "enum",
    enum: StatutReservation,
    default: StatutReservation.AWAITING,
  })
  status: StatutReservation;

  @Field(() => [ReservationMaterial])
  @JoinColumn()
  @OneToMany(() => ReservationMaterial, (r) => r.material)
  reservationMaterials: ReservationMaterial[];
}

@InputType()
export class ReservationMaterialInput {
  @Field()
  quantity: number;

  @Field()
  materialId: string;

  @Field()
  unit_price: number;
}

@InputType()
export class CreateReservationInput {
  @Field()
  userId: string; // Identifiant de l'utilisateur qui effectue la réservation

  @Field(() => [ReservationMaterialInput])
  materials: ReservationMaterialInput[]; // Liste des matériels réservés avec leur quantité

  @Field()
  start_date: Date;

  @Field()
  end_date: Date;
}
