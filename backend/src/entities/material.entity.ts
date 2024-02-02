import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";

@ObjectType()
@Entity()
 export default class Material {
    @Field()
    @PrimaryGeneratedColumn()
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

//     @Field(() => Category)
//     @ManyToOne(() => Category, (c) => c.material, {
//     cascade: true,
//      })
//     category: Category;

//     @Field()
//     @ManyToMany(() => Reservation, (r) => r.material, {
//     cascade: true,
//   })

 }