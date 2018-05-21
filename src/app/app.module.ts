import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BooksComponent } from './books/books.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from './services/book.service';
import { BookResolver } from './services/BookResolver';
import { AlertModule, DatepickerModule, ModalModule } from 'ngx-bootstrap';
import { BookEditComponent } from './book-edit/book-edit.component';
import { NgStringPipesModule } from 'angular-pipes';
import { NonAsciPipe } from './pipes/non-asci.pipe';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './confirm/confirm.component';
import { SearchPipe } from './pipes/search.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookItemComponent,
    BooksComponent,
    BookEditComponent,
    NonAsciPipe,
    ConfirmComponent,
    SearchPipe
  ],
  entryComponents: [
    BookEditComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    NgStringPipesModule,
    AlertModule.forRoot(),
    BootstrapModalModule,
    AngularFontAwesomeModule
  ],
  providers: [BookService, BookResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
