import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'http://localhost:3002';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,public router: Router){}

  register(user: User): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/users/register`, user).pipe(
        catchError(this.handleError)
    )
  }

  login(user: User) {
    console.log('pat')
    return this.httpClient.post<any>(`${this.API_URL}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        // this.getUserProfile(res.id).subscribe((res) => {
        //   this.currentUser = res;
           console.log(res.token,  res.user)
        this.router.navigate(['profile/' + res.user.id]);
        // })
      })
  }
 getUserProfile(id:any): Observable<any> {
  return this.httpClient.get(`${this.API_URL}/profile/${id}`)
  //  return this.httpClient.get(`${this.API_URL}/profile/${id}`, { headers: this.headers }).pipe(
  //    map((res:any) => {
  //      return res || {}
  //    }),
  //    catchError(this.handleError)
  // )
 }
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['users/login']);
    }
  }

  // getUserProfile(id:any): Observable<any> {
  //   return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(
  //     map((res:any) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}