import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksRepository } from './books/books.repository';
import { AppConfigModule } from './config/appConfig.module';

@Module({
  imports: [TypeOrmModule.forFeature([BooksRepository]), AppConfigModule],
  exports: [AppConfigModule],
})
export class CoreModule {}
