import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';


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




}
