import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDataService } from 'src/app/Services/book-data.service';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css'],
})
export class ShowBookComponent {
  // Creating a public property of type Book and initializing it to an empty object.
  public book: Book = {} as Book;

  constructor(private service: BookDataService, private route: ActivatedRoute) {
    // The id in this.route.snapshot.params.id is the same as the id in the path in app.module.ts for 'show-book/:id'
    this.service
      .getBookById(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.book = data;
      });
  }
}
