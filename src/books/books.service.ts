import { HttpException, Injectable } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }

  getBook(bookId): Promise<any> {
    let id = Number(bookId);

    return new Promise((resolve) => {
      const book = this.books.find((book) => book.id === id);

      // if ID is not valide
      if (!book) {
        throw new HttpException('ID is not exist', 404);
      }
      resolve(book);
    });
  }

  addBook(book): Promise<any> {
    const id = Number(book.id);
    const oldBook = this.books.find((book) => book.id === id);
    // if ID same another ID
    if (oldBook) {
      throw new HttpException('ID is not valid', 400);
    }
    return new Promise((resolve) => {
      this.books.push(book);
      resolve(this.books);
    });
  }

  deleteBook(bookId): Promise<any> {
    const id = Number(bookId);
    const book = this.books.find((book) => book.id === id);
    // if ID is not valide
    if (!book) {
      throw new HttpException('ID is not exist', 404);
    }
    return new Promise((resolve) => {
      this.books = this.books.filter((book) => book.id !== id);
      resolve(this.books);
    });
  }
}
