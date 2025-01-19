import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../model/auth-response-data';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public idToken: string = '';
  constructor(private http: HttpClient) { this.initializeIdToken(); }
  private initializeIdToken() {
    const savedToken = localStorage.getItem('idToken');
    if (savedToken != null && savedToken != '') {
      this.idToken = savedToken;
    }
  }
  public login(email: string, password: string, isLogin: boolean) {
    const authType = isLogin ? "signInWithPassword" : "signUp";
    console.log(authType);
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:' + authType + '?key=AIzaSyAvJQ9-LLDJu4-jyQO5mwfnkMqcNmuCpY4', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap((response) => {
      this.idToken = response.idToken;
      localStorage.setItem('idToken', response.idToken);
    }));

  }
  public logOut() {
    localStorage.removeItem('idToken');
    this.idToken = '';
  }
}
