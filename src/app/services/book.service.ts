import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from '../models/Book';
import { Observable } from 'rxjs/Observable';
import { NonAsciPipe } from '../pipes/non-asci.pipe';
import { CapitalizePipe } from 'angular-pipes/src/string/capitalize.pipe';

@Injectable()
export class BookService {
  private _BookSource = new BehaviorSubject<Book[]>(null);

  book$ = this._BookSource.asObservable();
  constructor(private httpService: Http) {
  }
  get BookSource(): Book[] {
    return this._BookSource.getValue();
  }

  updateBooks(books: Book[]) {
    this._BookSource.next(books);
  }

  fetchBooks() {
    return this.httpService.get('assets/books.mock.json')
      .map(this.extractData.bind(this))
      .catch(this.handleError);
  }

  TitlExist(title: string) {
    const books = this.BookSource;
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      book.title = new NonAsciPipe().transform(book.title);
      book.title = new CapitalizePipe().transform(book.title);
      if (book.title.toLowerCase() === title.toLowerCase()) {
        return true
      }
    }
    return false;
  }

  addBook(book: Book) {
    const books = this.BookSource;
    books.push(book);
    this.updateBooks(books);
  }

  remove(index: number) {
    const books = this.BookSource;
    books.splice(index, 1);
    this.updateBooks(books);
  }

  updateBookValues(book: Book, index: number) {
    const books = this.BookSource;
    books[index] = book;
    this.updateBooks(books);
  }

  private extractData(res: Response) {
    const body: Book[] = res.json();
    this.updateBooks(body);
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = `${body.status} - ${body.message || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
