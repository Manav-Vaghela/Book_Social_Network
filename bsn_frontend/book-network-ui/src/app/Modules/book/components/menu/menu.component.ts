import { Component, OnInit } from '@angular/core';
import { BookRoutingModule } from '../../book-routing.module';

@Component({
  selector: 'app-menu',
  imports: [BookRoutingModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent{

  logout() {}
}
