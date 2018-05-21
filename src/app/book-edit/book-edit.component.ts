import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomValidators } from 'ng2-validation';
import { NonAsciPipe } from '../pipes/non-asci.pipe';
import { CapitalizePipe } from 'angular-pipes/src/string/capitalize.pipe';


@Component({
  selector: 'app-book-edit',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{book?.title | nonasci | capitalize: true}}</h4>

    </div>
    <div class="modal-body">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-group p-3" [ngClass]="{
              'has-danger': inValid('title'),
              'has-success': isValid('title')
            }">
          <label class="col-form-label mr-3" for="title">Title</label>
          <input #inp class="form-control p-2" autofocus="autofocus" id="title" formControlName="title">
          <small class="form-text text-muted"></small>
          <div class="form-control-feedback" *ngIf="isTouched('title')">
            <p *ngIf="form.controls['title'].errors.required">Required</p>
            <p *ngIf="form.controls['title'].errors.titleIsForbidden">Title already exists </p>
          </div>

        </div>
        <div class="form-group p-3" [ngClass]="{
              'has-danger': inValid('date'),
              'has-success': isValid('date')
            }">
          <label class="col-form-label mr-3 ml-1" for="date">Date</label>
          <input class="form-control p-2" id="date" placeholder="1900/01/01" formControlName="date">
          <small class="form-text text-muted">  1900/1/1</small>
          <div class="form-control-feedback" *ngIf="isTouched('date')">
            <p *ngIf="form.controls['date'].errors.required">Required</p>
            <p *ngIf="form.controls['date'].errors.dateISO">Date format: YYYY/MM/DD </p>
          </div>
        </div>
        <div class="form-group p-3" [ngClass]="{
              'has-danger': inValid('author'),
              'has-success': isValid('author')
            }">
          <label class="col-form-label mr-3 ml-1" for="author">Author</label>
          <input class="form-control p-2" id="author" formControlName="author">
          <div class="form-control-feedback" *ngIf="isTouched('author')">Required</div>
        </div>
        <div class="form-group p-3">
          <label class="col-form-label mr-3 ml-1" for="link">Link</label>
          <input class="form-control p-2" id="link" formControlName="link">
          <small class="form-text text-muted">Optional</small>
        </div>


      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-success" *ngIf="!addMode"
              [disabled]="!form.valid"
              (click)="onSubmit()"
              (keyup.enter)="onSubmit()">Update
      </button>
      <button class="btn btn-success" *ngIf="addMode"
              [disabled]="!form.valid"
              (click)="onSubmit()"
              (keyup.enter)="onSubmit()">Add
      </button>
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>

    </div>
  `,

})
export class BookEditComponent implements OnInit {
  public book: Book;
  public index: number;
  public addMode = false;
  form: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder, public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.createForm();
    this.form.valueChanges.subscribe(() => {
      this.cd.detectChanges();
    });
    this.form.controls['title'].statusChanges.subscribe(() => {
      this.form.controls['title'].setValidators([Validators.required, this.forbiddenTitles.bind(this)])
    });
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required, CustomValidators.dateISO]],
      author: ['', Validators.required],
      link: ['']
    });
  }

  onSubmit() {
    if (this.form.valid && !this.addMode) {
      this.bookService.updateBookValues(this.form.value, this.index);
    }
    if (this.form.valid && this.addMode) {
      this.bookService.addBook(this.form.value);
    }
    this.bsModalRef.hide();
  }

  inValid(controlName: string) {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].dirty
  }

  isValid(controlName: string) {
    return this.form.controls[controlName].valid && this.form.controls[controlName].dirty
  }

  isTouched(controlName: string) {
    return this.form.controls[controlName].errors &&
      (this.form.controls[controlName].dirty || this.form.controls[controlName].touched)
  }

  forbiddenTitles(control: FormControl): { [s: string]: boolean } {
    if (this.bookService.TitlExist(control.value)) {
      return { 'titleIsForbidden': true }
    }
    return null;
  }


  flush() {
    if (!this.addMode) {
      this.book.title = new NonAsciPipe().transform(this.book.title);
      this.book.title = new CapitalizePipe().transform(this.book.title);
      this.form.reset(this.book);
    }
    this.cd.detectChanges();
  }
}
