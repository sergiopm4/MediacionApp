import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';



@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  index: string = "";

  constructor(public _rute: ActivatedRoute, public _mainService: MainService) {
    this.index = _rute.snapshot.params["id"];

  }

  ngOnInit(): void {
  }

}
