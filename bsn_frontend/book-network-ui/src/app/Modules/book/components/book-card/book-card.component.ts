import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { RatingComponent } from "../rating/rating.component";

@Component({
  selector: 'app-book-card',
  imports: [RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {


    private _book: BookResponse = {};
    private _bookCover: string | undefined;
    private _manage:boolean = false;

    get bookCover(): string | undefined{

      if(this._book.cover){
          return 'data:image/jpg;base64,' + this._book.cover;
      }
      return 'https://picsum.photos/1900/800';
    }

    get book(): BookResponse{

      return this._book;
    }

    get manage(): boolean{

      return this._manage;
    }

    @Input()
    set manage(value:boolean){

      this._manage = value;
    }

    @Input()
    set book(value : BookResponse){

      this._book = value;
    }

    @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private archieve: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

    onArchieve() {  

      this.archieve.emit(this._book);
    }
    onShare() {

      this.share.emit(this._book);
    }
    onEdit() {

      this.edit.emit(this._book);
    }
    onAddToWaitingList() {

      this.addToWaitingList.emit(this._book);
    }
    onBorrow() {
      this.borrow.emit(this._book);
    }
    onShowDetails() {
      this.details.emit(this._book);
    }
}