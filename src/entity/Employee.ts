import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContactInfo } from "./ContactInfo";
import { Meeting } from "./Meeting";
import { Task } from "./Task";

@Entity()
@ObjectType()
export class Employee extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    onDelete: "SET NULL",
  })
  manager: Employee;

  @Field(() => [Employee])
  @OneToMany(() => Employee, (employee) => employee.manager)
  directReports: Employee[];

  @Field()
  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  contactInfo: ContactInfo;

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.employee)
  tasks: Task[];

  @Field(() => [Meeting])
  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Meeting[];
}
