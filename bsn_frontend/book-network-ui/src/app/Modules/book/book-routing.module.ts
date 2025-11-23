import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent),
    
    children : [
      {
      path: '',
      loadComponent: ()=> import('./pages/book-list/book-list.component').then(c => c.BookListComponent)
      },
      {
      path: 'my-books',
      loadComponent: ()=> import('./pages/my-books/my-books.component').then(c => c.MyBooksComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
