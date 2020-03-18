import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.component.html',
  styleUrls: ['./all-cases.component.css']
})
export class AllCasesComponent implements OnInit {

  constructor(public _userService: UserService, public _router: Router) { }

  closeSession() {
    this._userService.isLogged = false;
    this._router.navigateByUrl('/home');
  }

  ngOnInit(): void {
  }

}
