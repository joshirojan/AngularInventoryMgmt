import { Injectable } from '@angular/core';
import { loginModel } from 'src/app/Models/loginModel';
import { registerModel } from 'src/app/Models/registerModel';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { jwtAuth } from 'src/app/Models/jwtAuth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { userModel } from 'src/app/Models/userModel';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loginUrl = 'Auth/Login';
  registerUrl = 'Auth/Register';
  constructor(private http: HttpClient) {}

  public register(user: registerModel): Observable<userModel> {
    return this.http.post<userModel>(
      `${environment.apiUrl}/${this.registerUrl}`,
      user
    );
  }

  public login(user: loginModel): Observable<jwtAuth> {
    return this.http.post<jwtAuth>(
      `${environment.apiUrl}/${this.loginUrl}`,
      user
    );
  }
}
