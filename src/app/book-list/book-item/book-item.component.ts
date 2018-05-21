import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book;
  @Input() index: number;

  constructor() {
  }

  ngOnInit() {
  }

}