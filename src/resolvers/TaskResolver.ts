import { Task } from "../entity/Task";
import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { Employee } from "../entity/Employee";

@InputType()
class TaskInput {
  @Field()
  name: string;

  @Field(() => Int)
  employeeId: number;
}

@Resolver()
export class TaskResolver {
  @Mutation(() => Task)
  async createTask(
    @Arg("input", () => TaskInput) input: TaskInput
  ): Promise<Task> {
    const employee = await Employee.findOne(input.employeeId);
    if (!employee) throw Error;
    return await Task.create({ name: input.name, employee }).save();
  }
}
