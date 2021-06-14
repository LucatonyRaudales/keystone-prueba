import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';

@InputType()
class Employees {

  @Field()
  @prop()
  public name?: string;
}

@ObjectType()
class userType {
  @Field()
  @prop()
  public name?: string;

  @Field()
  @prop()
  public color?: string;

  @Field(()=> [Employees])
  @prop(() => [Employees])
  public employees?: Employees[];
}

export default getModelForClass(userType);