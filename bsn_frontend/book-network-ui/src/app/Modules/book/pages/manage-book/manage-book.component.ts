import { Component } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { BookRoutingModule } from '../../book-routing.module';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { saveBook, uploadBookCover } from '../../../../services/functions';

@Component({
  selector: 'app-manage-book',
  imports: [FormsModule, BookRoutingModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent {
  constructor(
    private router: Router,
    private apiConfig: ApiConfiguration,
    private httpClient: HttpClient
  ) {}

  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
  };
  errorMsg: Array<string> = [];
  selectedBookCover!: File;
  selectedPicture: string | undefined = '';

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);

    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    saveBook(this.httpClient, this.apiConfig.rootUrl, {
      body: this.bookRequest,
    }).subscribe({
      next: (response) => {
        console.log('Response body:', response);
        const bookId = Number(response.body);

        const formData = new FormData();
        formData.append('file', this.selectedBookCover);

        uploadBookCover(this.httpClient, this.apiConfig.rootUrl, {
          'book-id': bookId,
          body: { file: formData as any},
        }).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          },
        });
      },
      error: async (err) => {
        try {
          // If the backend returned JSON as text, parse it
          const json = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
          this.errorMsg = json?.validationErrors || ['Unknown error'];
        } catch (e) {
          this.errorMsg = ['Unknown error'];
        }
      },
    });
  }
}
