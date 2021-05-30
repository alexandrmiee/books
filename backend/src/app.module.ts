import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigService } from './config/appConfig.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { CoreModule } from './core.module';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (appConfig: AppConfigService) => ({
        type: 'postgres',
        ...appConfig.db,
        ...appConfig.typeOrm,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
      imports: [CoreModule],
      inject: [AppConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
