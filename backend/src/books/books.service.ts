import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './model/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  public async getAll(limit: number): Promise<Book[]> {
    return this.booksRepository.findAll(limit);
  }

  public async getById(bookId: string): Promise<Book> {
    return this.booksRepository.findOne(bookId);
  }
}
