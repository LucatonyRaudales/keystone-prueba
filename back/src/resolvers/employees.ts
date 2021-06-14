import User, { IUser } from '../entity/employees';
import {Resolver, Query, Mutation, Arg} from 'type-graphql';

@Resolver()
export class EmployeeResolver{

  @Mutation(()=> Boolean)
  async createEmployee(
    @Arg("fName") fName: string,
    @Arg("lName") lName: String
  ){
    await User.create(
      "hkas",
      "holas",
      "hokas",
      "male",
    );
    return true;
  }
}
