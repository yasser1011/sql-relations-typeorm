import { ContactInfo } from "../entity/ContactInfo";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class ContactInfoRsolver {
  @Query(() => [ContactInfo])
  async contacts(): Promise<ContactInfo[]> {
    const contacts = await ContactInfo.find({
      relations: ["employee", "employee.meetings"],
    });
    console.log(contacts);
    return await ContactInfo.createQueryBuilder("contactInfo")
      .leftJoinAndSelect("contactInfo.employee", "employee")
      .getMany();
  }
}
