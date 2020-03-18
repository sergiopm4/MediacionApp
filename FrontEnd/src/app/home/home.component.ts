import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _userService: UserService) { }

  closeSession() {
    this._userService.isLogged = false;
    location.reload();
  }

  ngOnInit(): void {
  }

}
