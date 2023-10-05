using Summaries.Data.Models;
using Summaries.Data.Services;

namespace Summaries.Data
{
    public class BookService : IBookService
    {
        public void AddBook(Book newBook)
        {
            Data.Books.Add(newBook);
        }

        public void DeleteBook(int id)
        {
            var book = GetBookById(id);
            Data.Books.Remove(book);
        }

        public List<Book> GetAllBooks()
        {
            return Data.Books.ToList();
        }

        public Book GetBookById(int id)
        {
            return Data.Books.FirstOrDefault(n => n.Id == id);
        }

        public void UpdateBook(int id, Book newBook)
        {
            var oldBook = GetBookById(id);
            if (oldBook != null && newBook != null)
            {
                oldBook.Title = newBook.Title;
                oldBook.Author = newBook.Author;
                oldBook.Description = newBook.Description;
                oldBook.Rate = newBook.Rate;
                oldBook.DateStart = newBook.DateStart;
                oldBook.DateRead = newBook.DateRead;
            }
        }
    }
}
