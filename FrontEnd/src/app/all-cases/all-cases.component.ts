import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.component.html',
  styleUrls: ['./all-cases.component.css']
})
export class AllCasesComponent implements OnInit {

  constructor(public _userService: UserService, public _router: Router, public _mainService: MainService) {

    this._mainService.getAllCases().subscribe((response) => {
      this.dataCasesApi = response;
      console.log(this.dataCasesApi);
    })


  }
  categories: string[] = ["Familiar", "Empresarial", "Escolar", "Social", "Sanitaria", "Penal", "Penitenciaria"];
  dataCasesApi: any;
  dataCasesFilteredApi: any;

  closeSession() {
    this._userService.isLogged = false;
    this._router.navigateByUrl('/home');
  }

  // filterCategory(category: string) {
  //   this._mainService.getAllCases().subscribe((response) => {
  //     for (let i = 0; i < response.length; i++) {
  //       if (this.response[i]['category'] === category) {
  //         this.dataCasesApi = this.dataCasesFilteredApi;
  //       }
  //     }
  //   })
  // }

  filterByWord(word: string) {
    word = word.toLowerCase().trim(); //el trim() te quita los espacios del principio de la palabra.
    this.dataCasesFilteredApi = []; //esto es para vaciar la busqueda cada vez que buscas.

    for (let obj of this.dataCasesApi) {
      let categoryData = obj["category"].toLowerCase();
      if (categoryData.indexOf(word) >= 0) {
        this.dataCasesFilteredApi.push(obj);
        this.dataCasesApi = this.dataCasesFilteredApi;
      }
    }
    return this.dataCasesFilteredApi;
  }


  ngOnInit(): void {

  }

}
