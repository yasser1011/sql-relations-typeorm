import { Employee } from "../entity/Employee";
import { Arg, Field, InputType, Mutation, Query } from "type-graphql";
import { ContactInfo } from "../entity/ContactInfo";

@InputType()
class EmployeeInput {
  @Field(() => String)
  name: string;
}

export class EmployeeResolver {
  //   @Mutation(() => Boolean)
  @Mutation(() => Employee)
  async createEmployee(
    @Arg("input", () => EmployeeInput) input: { name: string }
  ): Promise<Employee> {
    const ceoContactInfo = await ContactInfo.create({
      email: "ceo2@mail.com",
    }).save();
    const ceo = await Employee.create({
      name: input.name,
      contactInfo: ceoContactInfo,
    }).save();
    console.log(ceo);
    // const ceoContactInfo = ContactInfo.create({ email: "ceo@mail.com" });
    // ceoContactInfo.employee = ceo;
    // await ceoContactInfo.save();
    return ceo;
  }

  @Query(() => [Employee])
  async employees(): Promise<Employee[]> {
    return await Employee.createQueryBuilder("employee")
      .leftJoinAndSelect("employee.contactInfo", "contactInfo")
      .leftJoinAndSelect("employee.tasks", "tasks")
      .leftJoinAndSelect("employee.meetings", "meetings")
      .getMany();
  }
}
