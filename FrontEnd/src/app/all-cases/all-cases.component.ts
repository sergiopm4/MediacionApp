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

  constructor(public _userService: UserService, public _router: Router, public _mainService: MainService) { }

  // categories: string[] = ["Familiar", "Empresarial", "Escolar", "Social", "Sanitaria", "Penal", "Penitenciaria"];


  closeSession() {
    this._userService.isLogged = false;
    this._router.navigateByUrl('/home');
  }
  refresh() {
    location.reload();
  }

  filterCategory(category: string) {
    this._mainService.dataCasesFilteredApi = [];
    for (let i = 0; i < this._mainService.dataCasesApi.length; i++) {
      if (this._mainService.dataCasesApi[i]['category'] === category) {
        this._mainService.dataCasesFilteredApi.push(this._mainService.dataCasesApi[i])
      }
    }


  }

  filterByWord(word: string) {
    word = word.toLowerCase().trim(); //el trim() te quita los espacios del principio de la palabra.
    this._mainService.dataCasesFilteredApi = []; //esto es para vaciar la busqueda cada vez que buscas.

    for (let obj of this._mainService.dataCasesApi) {
      let categoryData = obj["author"].toLowerCase();
      if (categoryData.indexOf(word) >= 0) {
        this._mainService.dataCasesFilteredApi.push(obj);
      }
    }

    return this._mainService.dataCasesFilteredApi;
  }


  ngOnInit(): void {

  }

}
