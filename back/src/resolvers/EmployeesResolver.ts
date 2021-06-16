import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field,
    ID
  } from "type-graphql";
  import { Employees } from "../entity/Employees";

  @InputType()
  class EmployeesInput {
    @Field()
    name!: string;
    
    @Field(() => Date)
    createdAt!: Date;
    
    @Field(() => TypeInputEmployees,)
    type!: TypeInputEmployees;
  }
  
  @InputType()
  class TypeInputEmployees{
    @Field(() => String)
    _id?: string;

    @Field()
    name?: string;

    @Field()
    color?: string;
    
  }
  
  @InputType()
  class EmployeesUpdateInput {
    @Field(() => String, {nullable: true})
    name?: string;
  
    @Field(() => Date, {nullable: true})
    createdAt!: Date;

    @Field(() => TypeInputEmployees, {nullable: true})
    type?: TypeInputEmployees;
  }
  
  @Resolver()
  export class EmployeesResolver {
    @Mutation(() => Boolean)
    async createEmployees(
      // @Arg("name") name: string,
      // @Arg("quantity", () => Int) quantity: number
      @Arg("variables", () => EmployeesInput) variables: EmployeesInput
    ) {
      console.log(variables);
      const data = await Employees.find({where:{
          "$or":[
            { "name":variables.name,},
            {"type._id":variables.type._id}
          ]
        }
      })
      if(data.length>0)return false;
      const newEmployees = Employees.create(variables);
      await newEmployees.save();
      return true;
    }
  
    @Mutation(() => Boolean)
    async deleteEmployees(@Arg("id", () => String) id: string) {
      await Employees.delete(id);
      return true;
    }
  
    @Mutation(() => Boolean)
    async updateEmployees(
      @Arg("id", () => String) id: string,
      @Arg("fields", () => EmployeesUpdateInput) fields: EmployeesUpdateInput
    ) {
      await Employees.update(id, fields);
      return true;
    }
  
    @Query(() => [Employees])
    Employees() {
      return Employees.find();
    }
  }