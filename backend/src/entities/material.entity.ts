import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";
import { Category } from "./category.entity";
import Reservation from "./reservation.entity";

@ObjectType()
@Entity()
export default class Material {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column({ length: 50 })
  name: string;

  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  disponibility: boolean;

  @Field(() => Category)
  @ManyToOne(() => Category, (c) => c.material, {
    cascade: true,
  })
  category: Category;

  @ManyToMany(() => Reservation, (r) => r.material, {
    cascade: true,
  })
  reservation: Reservation[];
}
