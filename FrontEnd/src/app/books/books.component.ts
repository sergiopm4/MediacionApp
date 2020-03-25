import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(public _mainService: MainService) { }

  ngOnInit(): void {
  }

}
