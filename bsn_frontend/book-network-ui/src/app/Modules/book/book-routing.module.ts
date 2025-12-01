import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../services/guard/auth.guard';

const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent),
    canActivate: [authGuard],
    
    children : [
      {
      path: '',
      loadComponent: ()=> import('./pages/book-list/book-list.component').then(c => c.BookListComponent),
      canActivate: [authGuard]
      },
      {
      path: 'my-books',
      loadComponent: ()=> import('./pages/my-books/my-books.component').then(c => c.MyBooksComponent),
      canActivate: [authGuard]
      },
      {
      path: 'manage',
      loadComponent: ()=> import('./pages/manage-book/manage-book.component').then(c => c.ManageBookComponent),
      canActivate: [authGuard]
      },
      {
      path: 'manage/:bookId',
      loadComponent: ()=> import('./pages/manage-book/manage-book.component').then(c => c.ManageBookComponent),
      canActivate: [authGuard]
      },
      {
        path: 'my-borrowed-books',
        loadComponent: ()=> import('./pages/borrowed-book-list/borrowed-book-list.component').then(c => c.BorrowedBookListComponent),
        canActivate: [authGuard]
      },
      {
        path: 'my-returned-book',
        loadChildren: ()=> import('./pages/return-book/return-book.component').then(c => c.ReturnBookComponent),
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
