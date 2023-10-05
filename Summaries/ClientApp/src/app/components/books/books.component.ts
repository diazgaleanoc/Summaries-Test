import { Component } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookDataService } from '../../Services/book-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  public books: Book[] = [];

  constructor(private service: BookDataService, private router: Router) {
    this.service.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }

  showBook(id: number) {
    this.router.navigate(['/show-book/' + id]);
  }

  updateBook(id: number) {
    this.router.navigate(['/update-book/' + id]);
  }

  deleteBook(id: number) {
    this.router.navigate(['/delete-book/' + id]);
  }
}
