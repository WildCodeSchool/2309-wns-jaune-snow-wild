import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import User from "./user.entity";

enum StatutReservation {
    AWAITING = 'en_attente',
    CONFIRMATION = 'confirmée',
    PAID = 'payée',
    CANCEL = 'annulée',
    FINISHED = 'terminée'
}

@ObjectType()
@Entity()
export default class Reservation {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @ManyToOne(() => User, (user) => user.id)
    user: User

  @Field()
  @Column()
  debut_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field()
  @Column()
  final_price: number;

  @Field()
  @Column({ type: 'enum', enum: StatutReservation, default: StatutReservation.AWAITING })
  status: StatutReservation;
}
