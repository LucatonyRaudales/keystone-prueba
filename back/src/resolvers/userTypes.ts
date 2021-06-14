import Model from '../entity/userTypes';
import {Resolver, Query, Mutation, Arg} from 'type-graphql';

@Resolver()
export class UserTypeResolver{
  @Mutation(()=> Boolean)
  async createUserType(
    @Arg("name") name: string,
    @Arg("color") color: string,
    @Arg("employeeName") eName: string
    ){
      const {_id : id} = await Model.create(
        {
          name : name,
          color: color,
          employees : [
            {
              name: eName
            }
          ]
        }
      );
      console.log(id);
      return true;
    }

   /* @Query(()=> [Model])
    types(){
      return Model.find();
    }*/
}