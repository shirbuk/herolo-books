export class Book {
  title: string;
  date: Date;
  author: string;
  link: string;

  constructor(title: string, date: Date, author: string, link: string) {
    this.title = title;
    this.date = date;
    this.author = author;
    this.link = link;
  }
}
