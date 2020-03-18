import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public _mainService: MainService, public formBuilder: FormBuilder, public _router: Router) {

    // this.registerForm = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    //   age: ['', Validators.required]
    // });

    // this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   passwords: this.formBuilder.group({
    //     password: ['', [Validators.required, Validators.minLength(8)]],
    //     confirmPassword: ['', Validators.required],
    //   }, { validator: this.matchValidator }),
    //   acceptTerms: ['', Validators.required]
    // });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: ['', Validators.required]
    }, { validator: this.matchValidator('password', 'confirmPassword') });
  }

  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  //Abreviado para acceder a cada validacion.
  get f() { return this.registerForm.controls; }

  matchValidator(controlName: string, matchControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchControl = formGroup.controls[matchControlName];

      if (matchControl.errors && !matchControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchControl.value) {
        matchControl.setErrors({ mustMatch: true });
      } else {
        matchControl.setErrors(null);
      }
    }
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;

    } else {
      this.loading = true;

      this._mainService.register(this.registerForm.value)
        .subscribe((response) => { console.log(response) })


      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro correcto!',
        showConfirmButton: false,
        timer: 2500
      })

      this._router.navigateByUrl("/profile")

    }
  }
}
