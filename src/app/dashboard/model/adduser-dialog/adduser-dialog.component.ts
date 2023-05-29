import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-adduser-dialog',
  templateUrl: './adduser-dialog.component.html',
  styleUrls: ['./adduser-dialog.component.css']
})
export class AdduserDialogComponent implements OnInit {
  userForm!:FormGroup
  spinner:boolean=false;
  inputEmpId:any;
  inputValueNo:boolean=false;
  constructor(private userservice:UsermanagementService,
    private toastr:ToastrService,
    private dialogRef: MatDialogRef<AdduserDialogComponent>,) {
    this.userForm=new FormGroup({
      fullName:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]),
      email:new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@testyantra\.com|in$/)]),
      employeeId:new FormControl('',[Validators.required,Validators.maxLength(10) ]),
      role:new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
    this.getUser();
  }

  userDetails:any
  getUser() {
    this.userservice.getUser().subscribe((res) => {
      if (res) {
        this.userDetails = res.userData;
      }
    })
  }
  inputData(event:any) {
    this.inputEmpId = event.target.value;
  if( this.userDetails?.find((x: { employeeId: any; }) => x.employeeId === this.inputEmpId)){
    this.inputValueNo = true
    } else{
    this.inputValueNo = false
   }

 }
  onSubmit(){
    this.spinner=true
    this.userservice.addUser(this.userForm.value).subscribe((res)=>{
       if (!res.error) {
        this.spinner=false
        this.toastr.success(res.message);
        this.userForm.reset();
        this.getUser();
        this.dialogRef.close('add');
      } else {
        this.toastr.error(res.message);
      }
    }, (err) => {
      if (err.status) {
        this.toastr.error(err.error.message);
      } else {
        this.toastr.error('CONNECTION_ERROR');
      }
    })
  }
  cancel() {
    this.dialogRef.close();
  }
}
