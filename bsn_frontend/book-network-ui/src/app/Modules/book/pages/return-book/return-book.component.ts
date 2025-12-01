import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse, PageResponseFeedBackResponse } from '../../../../services/models';
import { approveReturnBorrowBook, findAllBooksBorrowedBooks, findAllBooksReturnedBooks } from '../../../../services/functions';

@Component({
  selector: 'app-return-book',
  imports: [],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.scss',
})
export class ReturnBookComponent implements OnInit{

  returnBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  message: string = '';
  level: string = 'success';

  constructor(
    private router: Router,
    private apiConfig: ApiConfiguration,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  private findAllBorrowedBooks(){

    findAllBooksReturnedBooks(this.httpClient , this.apiConfig.rootUrl , { page: this.page , size: this.size }).subscribe({

      next:(result)=>{

        this.returnBooks = result.body;
      }
    })
  }

  approveBookReturn(book: BorrowedBookResponse){

    if(!book.returned){

      this.level = 'error';
      this.message = 'The book is not yet returned.';
      return;
    }
    approveReturnBorrowBook(this.httpClient , this.apiConfig.rootUrl , {'book-id': book.id as number}).subscribe({

      next:()=>{

        this.level = 'success';
        this.message = 'Book return approved.';
        this.findAllBorrowedBooks();
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = (this.returnBooks.totalPages as number) - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.page == (this.returnBooks.totalPages as number) - 1;
  }
}
