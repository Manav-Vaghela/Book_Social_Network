import { Component, OnInit } from '@angular/core';
import { BookResponse, BorrowedBookResponse, FeedBackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { Router, RouterLink } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { findAllBooksBorrowedBooks, returnBorrowBook, saveFeedBack } from '../../../../services/functions';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from "../../components/rating/rating.component";

@Component({
  selector: 'app-borrowed-book-list',
  imports: [FormsModule, RatingComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{

  borrowedBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  feedBackRequest: FeedBackRequest = {

    bookId: 0,
    comment: '',
    note: 0
  };
  selectedBook: BorrowedBookResponse | undefined = undefined;

  constructor(
    private router: Router,
    private apiConfig: ApiConfiguration,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
      
    this.findAllBorrowedBooks();
  }

  private findAllBorrowedBooks(){

    findAllBooksBorrowedBooks(this.httpClient , this.apiConfig.rootUrl , { page: this.page , size: this.size }).subscribe({

      next:(result)=>{

        this.borrowedBooks = result.body;
      }
    })
  }

  private giveFeedBack(){

    saveFeedBack(this.httpClient , this.apiConfig.rootUrl , {body: this.feedBackRequest}).subscribe({

      next:()=>{

      }
    })
  }

  returnBook(withFeedBack: boolean){

    returnBorrowBook(this.httpClient , this.apiConfig.rootUrl , {'book-id': this.selectedBook?.id as number}).subscribe({

      next:()=>{

        if(withFeedBack){

          this.giveFeedBack();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    })
  }

  returnBorrowedBook(book: BorrowedBookResponse){

    this.selectedBook = book;
    this.feedBackRequest.bookId = book.id as number;
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
    this.page = (this.borrowedBooks.totalPages as number) - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.page == (this.borrowedBooks.totalPages as number) - 1;
  }
}
