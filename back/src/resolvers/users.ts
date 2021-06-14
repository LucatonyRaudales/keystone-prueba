import User from '../entity/users';
import {Resolver, Query, Mutation, Arg} from 'type-graphql';
/*
@Resolver()
export class UserResolver{

  @Mutation(()=> Boolean)
  async createUser(
    @Arg("fName") fName: string,
    @Arg("lName") lName: String
  ){
   // const user = new User({});
    await User.create({fName : "fName", lName : "fName"});
    console.log(fName, lName);
    return true;
  }
}*/

@Resolver()
export class UserResolver{

  @Mutation(()=> Boolean)
  async createUser(
    @Arg("fName") fName: string,
    @Arg("lName") lName: String
  ){
   // const user = new User({});
    const {_id : id} = await User.create({name : "fName", jobs :"fName"});
    console.log(fName, lName, id);
    return true;
  }
}