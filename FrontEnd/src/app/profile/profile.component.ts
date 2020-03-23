import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public _mainService: MainService, public _userService: UserService, public formBuilder: FormBuilder, public _router: Router) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', Validators.required],
      _id: [localStorage.getItem('id'), Validators.required]
    });

    //Coge el ID para pintar el DOM.
    let id = localStorage.getItem('id');
    this._mainService.getOneUser(id)
      .subscribe((response) => {
        console.log(response);
        this.email = response['email'];
        this.firstName = response['firstName'];
        this.lastName = response['lastName'];
        this.location = response['location'];
      });
  }

  profileForm: FormGroup;
  submitted = false;
  loading = false;
  email: string;
  firstName: string;
  lastName: string;
  location: string;


  get f() { return this.profileForm.controls; }

  updateProfile() {
    this._mainService.updateProfile(this.profileForm.value)
      .subscribe((response) => {
        if (response['Message'] === 'User modified') {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Datos guardados!',
            showConfirmButton: false,
            timer: 1500
          })

          this._router.navigateByUrl("/allCases")

        }
        console.log(response);
        this.loading = true;

      })
  }




  ngOnInit(): void {

  }

}
