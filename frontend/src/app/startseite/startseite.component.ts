import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit{

  constructor(private route: Router) {  }

  buttonClicked(){
    this.route.navigate(['/login'])
  }
  ngOnInit() {

  }

}
