// import { ObjectType } from "type-graphql";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Employee)
  @ManyToOne(() => Employee, (employee) => employee.tasks, {
    onDelete: "SET NULL",
  })
  employee: Employee;
}
