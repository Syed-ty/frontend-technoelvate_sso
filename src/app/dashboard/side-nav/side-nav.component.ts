import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsermanagementService } from '../services/usermanagement.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
@Input() sideNavStatus:boolean=false
sideBarOpen:boolean=false
// @Output() sendChildValue: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public router:Router,
    private userService:UsermanagementService) {

  }

  AdminView:Boolean = false;
  ManagerView:Boolean = false
  ngOnInit(): void {
    this.getUserByEmail()
  }

  // sendValueToParent() {
  //   this.sendChildValue.emit(this.sideBarOpen);
  // }
  getUserByEmail(){
    let subjectData = JSON.parse(
      localStorage.getItem('UserDetails') as string
    );
    this.userService.getUserByEmailId(subjectData.email).subscribe((res)=>{
      if(res.response.role === 'Admin'){
        this.AdminView = true;
        this.ManagerView = true;
        // this.router.navigateByUrl('dashboard/user-management')
      }
      if(res.response.role === 'Manager'){
        this.ManagerView = true;
        this.AdminView = false
        this.router.navigateByUrl('dashboard/project-management')
      }
    })

  }

}
