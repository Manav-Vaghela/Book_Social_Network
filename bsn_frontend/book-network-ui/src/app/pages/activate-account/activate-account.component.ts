import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { CodeInputModule } from 'angular-code-input';
import { activateAccount } from '../../services/functions';

@Component({
  selector: 'app-activate-account',
  imports: [FormsModule, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent {
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private apiConfig: ApiConfiguration,
    private http: HttpClient
  ) {}

  onCodeComplete(token: string) {
    this.confirmAccount(token);
  }

  redirectTologin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    activateAccount(this.http, this.apiConfig.rootUrl, { token }).subscribe({
      next: (result) => {
        this.message = 'Your account has been successfully activated.';
        this.submitted = true;
        this.isOkay = true;
      },
      error: (err) => {
        this.message = 'Token has been expire or invalid.';
        this.submitted = true;
        this.isOkay = false;
      },
    });
  }
}
