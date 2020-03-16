import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public _mainService: MainService, public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;


    if (this.loginForm.invalid) {
      return;
    } else {
      alert('Login correcto!')
    }

    this.loading = true;

  }




}
