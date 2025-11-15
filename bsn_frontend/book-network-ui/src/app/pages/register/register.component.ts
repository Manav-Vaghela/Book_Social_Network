import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { authenticate, register } from '../../services/functions';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private apiConfig: ApiConfiguration,
    private http: HttpClient
  ) {}

  registrationRequest: RegistrationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  errorMsg: Array<string> = [];

  async register(): Promise<void> {
    this.errorMsg = [];

    register(this.http, this.apiConfig.rootUrl, {
      body: this.registrationRequest,
    }).subscribe({
      next: (result) => {
        this.router.navigate(['activate-account']);
      },
      error: async (err) => {
        let errorObj: any = err.error;

        if (errorObj instanceof Blob) {
          const text = await err.error.text();

          try {
            errorObj = JSON.parse(text); // Convert Blob → real JSON
          } catch (e) {
            this.errorMsg.push('Something went wrong');
            return;
          }
        }

        this.errorMsg = errorObj.validationErrors;
      },
    });
  }

  login() {
    this.router.navigate(['login']);
  }
}
