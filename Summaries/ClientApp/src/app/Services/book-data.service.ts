import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BookDataService {
  url = 'https://localhost:7169/api/Books/GetBooks';
  _baseURL: string = 'https://localhost:7169/api/Books';

  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<Book[]>(this._baseURL + '/GetBooks');
  }

  addBook(book: Book) {
    return this.http.post(this._baseURL + '/AddBook', book);
  }

  getBookById(id: number) {
    return this.http.get<Book>(this._baseURL + '/SingleBook/' + id);
  }

  updateBook(book: Book) {
    return this.http.put(this._baseURL + '/UpdateBook/' + book.id, book);
  }

  deleteBook(id: number) {
    return this.http.delete(this._baseURL + '/DeleteBook/' + id);
  }
}
