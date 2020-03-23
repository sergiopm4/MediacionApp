import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public _userService: UserService, public _mainService: MainService, public formBuilder: FormBuilder, public _router: Router) {


    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: ['', Validators.required]
    }, { validator: this._userService.matchValidator('password', 'confirmPassword') });
  }

  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  //Abreviación para acceder a cada validacion.
  get f() { return this.registerForm.controls; }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;

    } else {
      this.loading = true;

      this._mainService.register(this.registerForm.value)
        .subscribe((response) => {
          if (response['Message'] === 'USER SAVED') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro correcto, completa tu perfil!',
              showConfirmButton: false,
              timer: 2500
            })
            console.log(response);
            localStorage.setItem('id', response['_id']);
            this._router.navigateByUrl("/profile")
          }

          if (response['Error'] === 'EMAIL_ALREADY_USED') {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Este email ya existe, introduce un nuevo email',
              showConfirmButton: false,
              timer: 2500
            })
            console.log(response);

            setTimeout(() => {
              location.reload();

            }, 1500)
          }
        })
    }
  }
}

