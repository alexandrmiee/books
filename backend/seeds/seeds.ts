import { NestFactory } from "@nestjs/core";
import { Connection } from 'typeorm';

import { AppModule } from "../src/app.module";
import { booksSeed } from './books.seed';

async function seed() {
  try{
    const app = await NestFactory.create(AppModule, {
      logger: true,
    });
  
    const db = app.get<Connection>(Connection);
    await booksSeed(db);
  } catch (e) {
    console.log(e)
  }
  
}

seed().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);