import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  user: User = new User();

  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  //Abreviado para acceder a cada validacion.
  get f() { return this.registerForm.controls; }

  register() {
    this.submitted = true;


    if (this.registerForm.invalid) {
      return;

    } else {
      this.loading = true;

      this._mainService.register(this.registerForm.value)
        .subscribe((response) => { console.log(response) })



      alert('Registro correcto!')
    }

  }
  constructor(public _mainService: MainService, public formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(8)]],
      age: [this.user.age, Validators.required]
    });
  }

}
