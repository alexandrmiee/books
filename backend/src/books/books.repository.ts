import { Injectable } from '@nestjs/common';
import {
  AbstractRepository,
  EntityRepository,
  SelectQueryBuilder,
} from 'typeorm';
import { Book } from './model/book.entity';

@Injectable()
@EntityRepository(Book)
export class BooksRepository extends AbstractRepository<Book> {
  private q(): SelectQueryBuilder<Book> {
    return this.createQueryBuilder('Book');
  }

  public async findAll(limit: number): Promise<Book[]> {
    return this.q()
      .select(['Book.id', 'Book.title', 'Book.logo', 'Book.shortDescription'])
      .orderBy('title')
      .limit(limit)
      .getMany();
  }

  public async findOne(id: string): Promise<Book> {
    return this.q()
      .select([
        'Book.id',
        'Book.title',
        'Book.logo',
        'Book.fullDescription',
        'Book.year',
      ])
      .where('id = :id', { id })
      .getOne();
  }

  public async save(entity: Book) {
    console.log(entity);
    return this.manager.save(entity);
  }
}
