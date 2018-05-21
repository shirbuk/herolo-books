import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Book } from '../models/Book';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BookService } from './book.service';

@Injectable()
export class BookResolver implements Resolve<Book[]> {

  constructor(private bookService: BookService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> | Promise<Book[]> | Book[] {
    return this.bookService.fetchBooks();
  }
}
