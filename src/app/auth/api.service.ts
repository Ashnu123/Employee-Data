import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endPoint:string = "https://zc-angular-api.azurewebsites.net/api/v1/Authorize/Token";
  loginStatus = new BehaviorSubject<boolean>(this.hasToken());


  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router ) {

  }
  /**
   *
   * @param formData as the login form data
   */
  login(formData:any):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.endPoint,formData,  { observe: 'response' })
    .pipe(
      tap((resp: HttpResponse<any>) => {
        const authToken = resp.headers.get('x-auth');
        if (authToken !== null) {
          if(resp.body.token){
            this.cookieService.set("currentUser",authToken);
            this.loginStatus.next(true);
          }
        }

        return resp;
      }),
      catchError(this.handleError)
    );
  }


  /**
   *
   * @param formData as the login form data
   */
  signup(formData:any):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.endPoint,formData,  { observe: 'response' })
    .pipe(
      tap((resp: HttpResponse<any>) => {
        return resp;
      }),
      catchError(this.handleError)
    );
  }
  /**
   *
   * @param error error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  logout(){
    this.loginStatus.next(false);

    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

/**
*
* @returns {Observable<T>}
*/
 isLoggedIn() : Observable<boolean> {
  return this.loginStatus.asObservable();
 }
   /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken() : boolean {
    return this.cookieService.check('currentUser');
  }
}
