import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  login(infoLogin:any): Observable<boolean>{

    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json' );

    const url = 'https://reserva-e5a01.firebaseio.com/users.json';
    return this.http.get<boolean>(url,{headers: headers}).pipe(
      map(users=>{
        const user = _.find(users, u=> u.user === infoLogin.user && u.pass == infoLogin.pass);

        if (user) {
          return true;
        }

        return false;
      })
    )
  }
  isAuthenticated(){
    return localStorage.getItem("logged");
  }
}
