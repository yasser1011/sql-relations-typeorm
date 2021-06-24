import { Meeting } from "../entity/Meeting";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Employee } from "../entity/Employee";

@InputType()
class MeetingInput {
  @Field()
  url: string;

  @Field(() => [Int])
  attendees: number[];
}

@Resolver()
export class MeetingResolver {
  @Mutation(() => Meeting)
  async createMeeting(
    @Arg("input", () => MeetingInput) input: MeetingInput
  ): Promise<Meeting | undefined> {
    const attendees: Employee[] = [];
    for (const num of input.attendees) {
      //   let employee = await Employee.findOne(num);
      let employee = await Employee.createQueryBuilder("employee")
        .leftJoinAndSelect("employee.contactInfo", "contactInfo")
        .where("employee.id = :id", { id: num })
        .getOne();
      if (!employee) {
        throw new Error("employee not found with this ID");
      }
      attendees.push(employee);
    }
    console.log(attendees);

    const newMeeting = await Meeting.create({
      zoomUrl: input.url,
      attendees: attendees,
    }).save();
    return newMeeting;
  }

  @Query(() => [Meeting])
  async meetings(): Promise<Meeting[]> {
    return await Meeting.createQueryBuilder("meeting")
      .leftJoinAndSelect("meeting.attendees", "attendees")
      .getMany();
  }
}
