import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {LoginResultModel} from '../../Model/LoginResultModel/login-result-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient) { }


  login(userName:string, password:string) 
  {
    // var data = "username="+userName+"&password="+password + "&grant_type=password";
    // var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-urlencoded'});
    // return this.httpClient.post("https://localhost:5001/api/login/login" + "/token", data,{headers: reqHeader});

    var reqHeader = new HttpHeaders({'No-Auth' : 'True'});
    return this.httpClient.post<any>('https://localhost:5001/api/login/login',  {
      "username": userName
     }, {headers: reqHeader})
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('TokenInfo', JSON.stringify(user));
        }

        return user;
    }));
 
  }
}
