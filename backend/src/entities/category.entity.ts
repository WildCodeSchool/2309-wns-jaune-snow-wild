import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Field, ID, InputType, ObjectType } from "type-graphql";
import Material from "./material.entity";

@ObjectType()
@Entity()
export class Category {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Material])
  @OneToMany(() => Material, (m) => m.category)
  material: Material[];
}

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
}
