import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';
import { Case } from '../models/Case';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public _http: HttpClient) { }

  url: string = 'http://localhost:3000';


  //CRUD User.
  register(user: User) {
    return this._http.post(`${this.url}/register`, user);
  }

  login(user: User) {
    return this._http.post(`${this.url}/login`, user);
  }

  updateProfile(user: User) {
    return this._http.put(`${this.url}/editOneUser`, user);
  }



  //CRUD Cases.
  postCase(caso: Case) {
    //   const headers = new HttpHeaders({
    //     token: localStorage.getItem('token')
    //   });
    //   return this._http.post(`${this.url}/postCase`, caso, { headers });
    // }
    return this._http.post(`${this.url}/postCase`, caso);
  }

  getAllCases() {
    return this._http.get(`${this.url}/getAllCases`);
  }

}




