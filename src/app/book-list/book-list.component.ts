import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  public books: Book[];
  bsModalRef: BsModalRef;
  query: string;
  public alerts: any = [];
  private isUpdated;
  private booksSubscription: Subscription;

  constructor(private bookService: BookService, private modalService: BsModalService,
    private dialogService: DialogService) {
  }

  ngOnInit() {
    this.isUpdated = false;
    this.booksSubscription = this.bookService.book$.subscribe(this.onBooksUpdate.bind(this))
  }

  onBooksUpdate(books: Book[]) {
    this.books = books;
    if (this.isUpdated) {
      this.addAlert('Book added');
    }
    this.isUpdated = true;
  }

  openModal(index) {
    this.bsModalRef = this.modalService.show(BookEditComponent);
    const component = <BookEditComponent>this.bsModalRef.content;
    component.book = this.books[index];
    component.index = index;
    component.addMode = false;
    component.flush();
  }

  public addAlert(alert: string): void {
    this.alerts.push({
      type: 'success',
      alert: alert,
    });
  }

  remove(index: number) {
    this.isUpdated = false;
    this.dialogService.addDialog(ConfirmComponent, {})
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.bookService.remove(index);
        }
      });
  }

  AddNewBook() {
    this.bsModalRef = this.modalService.show(BookEditComponent);
    const component = <BookEditComponent>this.bsModalRef.content;
    component.addMode = true;
    component.flush();
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}
