import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Entity()
@ObjectType()
export class ContactInfo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column()
  email: string;

  @Field(() => Employee) //must provide the type(objectType Employee)
  @OneToOne(() => Employee, (employee) => employee.contactInfo, {
    onDelete: "CASCADE",
    // nullable: false,
  })
  @JoinColumn()
  employee: Employee;
}
