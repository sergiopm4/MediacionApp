import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { Case } from '../models/Case';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public _http: HttpClient) { }

  register(user: User) {
    return this._http.post('http://localhost:3000/register', user);
  }

  login(user: User) {
    return this._http.post('http://localhost:3000/login', user);
  }

  updateProfile(user: User) {
    return this._http.put('http://localhost:3000/editOneUser', user);
  }

  postCase(case: Case){
  return this._http.post('http://localhost:3000/postCase', case);
}
}




