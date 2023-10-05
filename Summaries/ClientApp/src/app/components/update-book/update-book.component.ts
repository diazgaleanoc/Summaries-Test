import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDataService } from 'src/app/Services/book-data.service';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
  @Input()
  updateBookForm: FormGroup = {} as FormGroup;
  public book: Book = {} as Book;
  constructor(
    private service: BookDataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.service
      .getBookById(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.book = data;

        this.updateBookForm = this.fb.group({
          id: [data.id],
          title: [data.title, Validators.required],
          author: [data.author, Validators.required],
          description: [
            data.description,
            Validators.compose([Validators.required, Validators.minLength(30)]),
          ],
          rate: [data.rate],
          dateStart: [this.formatDate(data.dateStart)],
          dateRead: [this.formatDate(data.dateRead)],
        });
      });
  }

  formatDate(date?: Date) {
    if (date) {
      return new Date(date).toISOString().substring(0, 10);
    }
    return null;
  }

  onSubmit() {
    this.service.updateBook(this.updateBookForm.value).subscribe((data) => {
      this.router.navigate(['/books']);
    });
  }
}
