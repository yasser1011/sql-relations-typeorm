import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Entity()
@ObjectType()
export class Meeting extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  zoomUrl: string;

  @Field(() => [Employee])
  @ManyToMany(() => Employee, (employee) => employee.meetings)
  attendees: Employee[];
}
