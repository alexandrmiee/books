import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookDto } from './book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(@Query('limit') limit = 0): Promise<BookDto[]> {
    return this.booksService.getAll(limit);
  }

  @Get('/:bookId')
  getById(@Param('bookId') bookId: string): Promise<BookDto> {
    return this.booksService.getById(bookId);
  }
}
