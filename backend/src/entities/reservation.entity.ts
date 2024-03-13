import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import User from "./user.entity";
import Material from "./material.entity";
import { ReservationMaterial } from "./reservation_material.entity";

enum StatutReservation {
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
  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

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
}

@InputType()
export class InputReservation extends Reservation {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  start_date: Date;

  @Field({ nullable: false })
  end_date: Date;
}
