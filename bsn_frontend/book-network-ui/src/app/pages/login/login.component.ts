import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { authenticate } from '../../services/functions';
import { ApiConfiguration } from '../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(
    private router: Router,
    private apiConfig: ApiConfiguration,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  authRequest: AuthenticationRequest = {
    email: '',
    password: '',
  };

  errorMsg: Array<string> = [];

  async login(): Promise<void> {
    this.errorMsg = [];

    authenticate(this.http, 
      this.apiConfig.rootUrl, 
      {body: this.authRequest})
      .subscribe({
      next: async (result) => {

        let body = result.body;

        if(body instanceof Blob){

          const text = await body.text();
          body = JSON.parse(text);
        }

        if(body.token){

          this.tokenService.token = body.token;
          this.router.navigate(['books']);
        }
        else{

          console.error("token is missing");
        }
      },

      error: async (err) => {

        let errorObj: any = err.error;

        //  Handle Blob response (Spring returns Blob when status=400/401)
        if (err.error instanceof Blob) {
          const text = await err.error.text();
          try {
            errorObj = JSON.parse(text); // Convert Blob → real JSON
          } catch (e) {
            this.errorMsg.push('Something went wrong');
            return;
          }
        }
        //  Validation errors
        if (errorObj.validationErrors) {
          this.errorMsg = errorObj.validationErrors;
          return;
        }

        //  Business error (Bad credentials)
        if (errorObj.businessErrorDescription) {
          this.errorMsg.push(errorObj.businessErrorDescription);
          return;
        }

        this.errorMsg.push('Something went wrong');
      },
    });
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
