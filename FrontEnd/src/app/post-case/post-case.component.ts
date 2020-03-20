import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-case',
  templateUrl: './post-case.component.html',
  styleUrls: ['./post-case.component.css']
})
export class PostCaseComponent {

  constructor(public _mainService: MainService, public _userService: UserService, public formBuilder: FormBuilder, public _router: Router) {
    this.postCaseForm = this.formBuilder.group({
      title: ['', Validators.required],
      methodology: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required, Validators.maxLength(50)],
      caseText: ['', Validators.required]
    });
  }

  postCaseForm: FormGroup;
  submitted = false;
  loading = false;

  get f() { return this.postCaseForm.controls; }

  postCase() {
    this.submitted = true;

    if (this.postCaseForm.invalid) {
      return;

    } else {
      this.loading = true;

      this._mainService.postCase(this.postCaseForm.value)
        .subscribe((response) => {
          if (response['Message'] === 'CASE_POST_SUCCESS') {
            // document["cookie"] = `sello=${response["token"]}`;
            console.log(response)

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Caso subido!',
              showConfirmButton: false,
              timer: 1500
            })

            this._router.navigateByUrl("/case")

          }
        })
    }
  }
}
