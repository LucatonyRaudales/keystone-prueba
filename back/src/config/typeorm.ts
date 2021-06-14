/*import {createConnection} from 'typeorm';

export async function connect(){
  await createConnection({
      "type": "mongodb", 
      "url": "mongodb+srv://Tony:elpassword@keystone.nyhel.mongodb.net/Keystone?retryWrites=true&w=majority",
      "useNewUrlParser": true,
      "synchronize": true,
      "logging": true,
      //"entities": ["src/entity/*.*"]
      "entities": ["src/entity/**//**.ts"]
  });
  console.log('base de datos conectado');
}*/

import mongoose from 'mongoose';

export async function connect(){
  await mongoose.connect('mongodb+srv://Tony:elpassword@keystone.nyhel.mongodb.net/Keystone?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true/*, dbName: 'test'*/ });

  console.log('base de datos conectado');
}