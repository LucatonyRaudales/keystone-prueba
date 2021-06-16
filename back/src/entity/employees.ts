import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    ObjectIdColumn,     
    ObjectID,
    Timestamp,
  } from "typeorm";
  import { Field, ID, ObjectType } from "type-graphql";
import { Type } from "./types";
  
  @ObjectType()
  @Entity({name: "employees"})
  export class Employees extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id!: ObjectID;
  
    @Field()
    @Column()
    name!: string;
    
    @Field(()=>Date)
    @CreateDateColumn({type:"timestamp with time zone"})
    createdAt!: Date;

    @Field(() => Type)
    @Column(()=>Type)
    type!: Type;

  }
  