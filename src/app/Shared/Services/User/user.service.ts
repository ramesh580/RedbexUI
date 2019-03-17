import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../Model/UserModel/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<UserModel> {
    var result= this.httpClient.get<UserModel>("https://localhost:5001/api/user/getusers");
    console.log(result);
    return result;
  }
}
