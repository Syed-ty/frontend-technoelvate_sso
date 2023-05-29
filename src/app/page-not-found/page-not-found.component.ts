import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../dashboard/services/usermanagement.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  designations:string[] = ['Nutrition Manager','Fitness Manager','Medical Manager','Diagnosis Manager']


  constructor(public SharedService:UsermanagementService) { }
  ngOnInit():
   void {
    // if (this.designations.includes(this.SharedService.loginDetails().user.role)) {
    //  this.doctor=true
    // } else if (this.SharedService.loginDetails().user.role == 'Client') {
    //   this.client=true
    // }
  }

}
