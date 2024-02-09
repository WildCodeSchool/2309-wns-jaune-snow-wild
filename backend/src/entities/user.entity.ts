import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import * as argon2 from "argon2";

// on définit les 2 rôles
// enum UserRole {
//   ADMIN = "admin",
//   USER = "user",
// }

type UserRole = "ADMIN" | "USER"

@ObjectType()
@Entity()
export default class User {

  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    if (!this.password.startsWith("$argon2")){
      this.password = await argon2.hash(this.password);
    }
  }
  
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  phone: string; //c'est pas int mais number

  @Field()
  @Column({
    type: "text",
    enum: ["ADMIN", "USER"],
    nullable: true, 
    default: "USER"
  })
  role: UserRole
}

@ObjectType()
export class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@InputType()
export class InputRegister extends User {

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;

}

@InputType()
export class InputRegisterWithoutPassword {
  @Field()
  email: string;

}

@ObjectType()
export class UserWithoutPassword implements Omit<User, "password" | "lastName" | "firstName" | "phone"> {
   
  @Field()
  id: string;


  @Field()
  email: string;

  @Field(() => String)
  role: UserRole;
}

@InputType()
export class InputLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class InputChangePassword {
  @Field()
  token: string;

  @Field()
  password: string;
}