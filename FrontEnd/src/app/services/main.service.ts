import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';
import { UserMod } from '../models/UserMod';
import { Case } from '../models/Case';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public _http: HttpClient) {
    _http.get(`${this.url}/getAllCases`).subscribe((response) => {
      this.dataCasesApi = response;
      console.log(this.dataCasesApi)
    })
  }

  url: string = 'http://localhost:3000';
  dataCasesApi: any;
  dataCasesFilteredApi: any;


  //CRUD User.
  register(user: User) {
    return this._http.post(`${this.url}/register`, user);
  }

  login(user: User) {
    return this._http.post(`${this.url}/login`, user);
  }

  updateProfile(userMod: UserMod) {
    return this._http.put(`${this.url}/editOneUser`, userMod)
  }

  getOneUser(id: any) {
    return this._http.get(`${this.url}/getOneUser/${id}`)
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

}


// Functions shared





