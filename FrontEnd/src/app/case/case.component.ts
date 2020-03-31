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

  likeIcon: boolean = false;
  followIcon: boolean = false;


  likeTrue(likeIcon: boolean) {
    if (likeIcon == false) {
      document.querySelector('#likes-icon').className = "fa fa-thumbs-up";
      this.likeIcon = true;
    } else {
      document.querySelector('#likes-icon').className = "fa fa-thumbs-o-up";
      this.likeIcon = false;
    }
  }

  followTrue(followIcon: boolean) {
    if (followIcon == false) {
      document.querySelector('#follow-icon').className = "fa fa-heart";
      this.followIcon = true;
    } else {
      document.querySelector('#follow-icon').className = "fa fa-heart-o";
      this.followIcon = false;
    }
  }





  ngOnInit(): void {
  }

}
