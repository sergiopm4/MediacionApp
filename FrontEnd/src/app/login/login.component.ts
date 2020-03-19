import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public _mainService: MainService, public _userService: UserService, public formBuilder: FormBuilder, public _router: Router) {
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
      this.loading = true;

      this._mainService.login(this.loginForm.value)
        .subscribe((response) => {

          if (response['Message'] === 'Welcome') {
            this._userService.isLogged = true;
            document["cookie"] = `sello=${response["token"]}`;
            console.log(response)

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Login correcto!',
              showConfirmButton: false,
              timer: 1500
            })

            this._router.navigateByUrl("/allcases")

          }
          if (response['Error'] === 'Password is not correct.') {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Constraseña incorrecta!',
              showConfirmButton: false,
              timer: 2000
            })
            setTimeout(() => {
              location.reload();

            }, 1000)
          }

          //ESTO NO FUNCIONA, REVISAR
          if (response['Error'] === 'Email does not exist.') {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'El email no es correcto!',
              showConfirmButton: false,
              timer: 2000
            })
            setTimeout(() => {
              location.reload();

            }, 1000)
          }
        })

      this.loading = true;

    }
  }
}