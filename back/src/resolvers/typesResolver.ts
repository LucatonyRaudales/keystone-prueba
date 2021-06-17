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
@InputType()
class TypeInput{
  @Field()
  name!: string;

  @Field()
  color!: string;
}

@InputType()
class TypeUpdateInput {
  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => String, {nullable: true})
  color?: string;
}

@Resolver()
export class TypeResolver{
    //@Mutation(() => Type)
  @Mutation(() => Boolean)
  async createType(
    @Arg("data", () => TypeInput) variables: TypeInput
  )  {
    const res = await Type.find({
  where: {
    $or: [
        {name : variables.name},
        {color : variables.color}
      ]
    }
  });

    if(res.length > 0) return false 
    const newType = Type.create(variables);
    //return await newType.save();
    await newType.save();
    return true;
  }

    @Mutation(() => Boolean)
  async updateType(
    @Arg("id") id: string,
    @Arg("fields", () => TypeUpdateInput) fields: TypeUpdateInput
  ) {
    const res = await Type.find({
  where: {
    $or: [
        {name : fields.name},
        {color : fields.color}
      ]
    }
  });

    console.log(fields, res.length);
    if(res.length > 0) return false 
    const newType = Type.create(fields);
    //return await newType.save()
    await Type.update(id , fields);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteType( @Arg("id") id: string,  @Arg("typeColor") typeColor: string) {

    var data = await Employees.find({where:{
     "typeColor":typeColor
      
    }});
    console.log(data);
    
    if(data.length > 0)return false;
    await Type.delete(id);
    return true;

  }

  @Query(() => [Type])
  typesList() {
    return Type.find();
  }
}