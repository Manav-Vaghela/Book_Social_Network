import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { borrowBook, findAllBooks } from '../../../../services/functions';
import {
  BookResponse,
  PageResponseBookResponse,
} from '../../../../services/models';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  message: string = '';
  level = 'success';

  constructor(
    private router: Router,
    private apiConfig: ApiConfiguration,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    findAllBooks(this.httpClient, this.apiConfig.rootUrl, {
      page: this.page,
      size: this.size,
    }).subscribe({
      next: (result) => {
        this.bookResponse = result.body;
      },
    });
  }

  get isLastPage(): boolean {
    return this.page == (this.bookResponse.totalPages as number) - 1;
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = (this.bookResponse.totalPages as number) - 1;
    this.findAllBooks();
  }

  async borrowBook(book: BookResponse): Promise<void> {

    this.message = '';
    borrowBook(this.httpClient, this.apiConfig.rootUrl, {
      'book-id': book.id as number,
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully added to your list';
      },

      error: async (err) => {
        let errorObj: any = err.error;

        console.log(err);
        this.level = 'error';

        if(err.error instanceof Blob) {
          const text = await err.error.text(); // convert Blob → text
          try {
            const json = JSON.parse(text); // convert text → JSON
            this.message = json.error;
          } catch {
            this.message = text; 
          }
        }
        else {
          this.message = err.error?.error || err.message;
        }
      },
    });
  }
}
