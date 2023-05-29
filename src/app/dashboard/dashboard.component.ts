import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sideBarOpen:any
  constructor( private router: Router,) { }

  ngOnInit(): void {
    if(screen.width>768){
      this.sideBarOpen=true
    }else{
      this.sideBarOpen=false
    }
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  sendValue(event:boolean){
    this.sideBarOpen= event
  }

}
