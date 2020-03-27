import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public _http: HttpClient, public _mainService: MainService, public _userService: UserService, public formBuilder: FormBuilder, public _router: Router) {
    //Coge el ID para pintar el DOM.
    let userID = localStorage.getItem('id');
    this._mainService.getOneUser(userID)
      .subscribe((response) => {
        console.log(response);
        this.email = response['email'];
        this.firstName = response['firstName'];
        this.lastName = response['lastName'];
        this.location = response['location'];
      });

    this._http.get(`${this.url}/getAllCases`)
      .subscribe((response) => {
        this.userCases = [];
        this.allCases = response
        for (let i = 0; i < this.allCases.length; i++) {
          if (this.allCases[i]['userID'] === userID) {
            this.userCases.push(this.allCases[i])
          }
        }
        this.numUserCases = this.userCases.length;
      })


    this.profileForm = this.formBuilder.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', Validators.required],
      _id: [userID, Validators.required],

    });


  }

  profileForm: FormGroup;
  images: any;
  submitted = false;
  loading = false;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  url: string = 'http://localhost:3000';

  //section cases, comments and followers
  allCases: any;
  userCases: any;
  numUserCases: number;


  mm() {
    console.log(this.userCases)
  }



  get f() { return this.profileForm.controls; }

  updateProfile() {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;

    } else {
      this.loading = true;

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

  }

  //Upload Image.
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(event)
    }
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.images);

    this._http.post<any>(`${this.url}/file`, formData)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );

  }







  ngOnInit(): void {

  }

}
