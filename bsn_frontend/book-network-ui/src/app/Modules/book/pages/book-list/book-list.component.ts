import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { findAllBooks } from '../../../../services/functions';
import { PageResponseBookResponse } from '../../../../services/models';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-book-list',
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{

    bookResponse: PageResponseBookResponse = {};
    page = 0;
    size = 5;

    constructor(
      private router: Router,
      private apiConfig: ApiConfiguration,
      private httpClient: HttpClient
    ){}

    ngOnInit(): void {
        
      this.findAllBooks();
    }

    private findAllBooks(){

      findAllBooks(this.httpClient , this.apiConfig.rootUrl , {page: this.page ,size: this.size }).subscribe({

          next: (result)=>{

              this.bookResponse = result.body;
          }
      })
    }
}
