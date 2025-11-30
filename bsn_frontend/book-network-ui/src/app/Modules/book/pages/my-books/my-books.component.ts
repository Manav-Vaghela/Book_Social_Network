import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { borrowBook, findAllBooks, findAllBooksByOwner, updateArchivedStatus, updateShareableStatus } from '../../../../services/functions';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-my-books',
  imports: [BookCardComponent, RouterLink],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit{

  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;

  constructor(
    private router: Router,
    private apiConfig: ApiConfiguration,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {

    findAllBooksByOwner(this.httpClient, this.apiConfig.rootUrl, {
      page: this.page,
      size: this.size,
    }).subscribe({
      next: async (result) => {

        if(result.body instanceof Blob){

          const text = await result.body.text();
          this.bookResponse = JSON.parse(text);
        }
        else{

          this.bookResponse = result.body;
        }
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

  archieveBook(book : BookResponse){
    
    updateArchivedStatus(this.httpClient , this.apiConfig.rootUrl , {'book-id': book.id as number}).subscribe({

      next:()=>{

        book.archived = !book.archived;
      }
    })
  }

  shareBook(book : BookResponse){

    updateShareableStatus(this.httpClient , this.apiConfig.rootUrl , {'book-id': book.id as number}).subscribe({

      next: ()=>{

        book.shareable = !book.shareable;
      }
    })
  }

  editBook(book : BookResponse){

    this.router.navigate(['books','manage', book.id]);
  }
}
