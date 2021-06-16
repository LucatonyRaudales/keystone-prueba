import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Type } from "../entity/types";
import { Employees } from "../entity/Employees";

@Resolver()
export class DropResolver{

  @Mutation(() => Boolean)
  async reset() {

    await Employees.delete({});
    await Type.delete({});
    return true;

  }
}