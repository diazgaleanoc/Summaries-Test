import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDataService } from 'src/app/Services/book-data.service';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css'],
})
export class DeleteBookComponent {
  public book: Book = {} as Book;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookDataService
  ) {
    this.service
      .getBookById(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.book = data;
      });
  }

  deleteBook(id: number) {
    this.service.deleteBook(id).subscribe((data) => {
      this.router.navigate(['/books']);
    });
  }
}
