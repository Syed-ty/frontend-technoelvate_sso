import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { UsermanagementService } from '../services/usermanagement.service';
import { FormControl, FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {



  barChart:any;
  spinner:boolean=false
  invoiceForm!:FormGroup
  constructor(
     private userService :UsermanagementService,
     private toastr:ToastrService,
    ) {
    this.invoiceForm=new FormGroup({
      invoiceDate:new FormControl(''),
      paymentDate:new FormControl(''),
      invoiceDateByQuater: new FormControl(''),
      paymentDateByQuater: new FormControl('')

    })
   }


  ngOnInit(): void {

  this.getUserByEmail()
  }



  ngAfterViewInit(): void {
  }

  benchEvent:Boolean = false
  marketEvent:Boolean = false
  resourceEvent:Boolean = false
  ManagementEvent:Boolean = false
  psSystemEvent:Boolean = false
  ClientEvent:Boolean = false





  getUserByEmail(){
    let subjectData = JSON.parse(
      localStorage.getItem('UserDetails') as string
    );
    this.userService.getUserByEmailId(subjectData.email).subscribe((res)=>{
      if(res.response.benchHiring !== ''){
        this.benchEvent = true
      }
      if(res.response.managementSystem !== ''){
        this.ManagementEvent = true
      }
      if(res.response.clientOnBoard !== ''){
        this.ClientEvent = true
      }
      if(res.response.marketHiring !== ''){
        this.marketEvent = true
      }
      if(res.response.pssystem !== ''){
        this.psSystemEvent = true
      }

      if(res.response.resourcePool !== ''){
        this.resourceEvent = true
      }

      // if(res.response.role === 'Admin'){
        // this.AdminView = true;
        // this.ManagerView = true;
        // this.router.navigateByUrl('dashboard/user-management')
      // }
      // if(res.response.role === 'Manager'){
      //   this.ManagerView = true;
      //   this.AdminView = false
      //   this.router.navigateByUrl('dashboard/project-management')
      // }
    })

  }




























}
