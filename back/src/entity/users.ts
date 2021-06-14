/*import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, BaseEntity} from "typeorm"; 

@Entity() 
export class User extends BaseEntity{  

    @ObjectIdColumn() 
    _id!: ObjectID; 
    
    @Column() 
    fName!: string; 
    
    @Column() 
    lName!: string; 

    @CreateDateColumn()
    created_at!: string;
}*/

import { prop, getModelForClass } from '@typegoose/typegoose';

class User {
  @prop()
  public name?: string;

  @prop()
  public job?: string;
}

export default  getModelForClass(User); // UserModel is a regular Mongoose Model with correct types
