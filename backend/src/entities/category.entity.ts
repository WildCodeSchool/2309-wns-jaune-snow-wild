import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
// import { Ad } from './materiel.entity';
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Category {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  // Decommenter ici et modifier les noms [Ad] pour pouvoir avoir le field du matériel
  // @Field(() => [Materiel])
  //@OneToMany(() => Materiel, (materiel) => materiel.category)
  //materiels: Materiel[];
}

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
}
