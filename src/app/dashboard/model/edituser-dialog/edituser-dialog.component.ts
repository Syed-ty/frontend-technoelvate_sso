import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserResponse } from '../../models/user';
import { UsermanagementService } from '../../services/usermanagement.service';
import { UserManagementComponent } from '../../user-management/user-management.component';

@Component({
  selector: 'app-edituser-dialog',
  templateUrl: './edituser-dialog.component.html',
  styleUrls: ['./edituser-dialog.component.css']
})
export class EdituserDialogComponent implements OnInit {
  userForm!:FormGroup
  spinner:boolean=false
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private userservice:UsermanagementService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UserManagementComponent>,
    private toastr: ToastrService,) {
      this.userForm=new FormGroup({
        fullName:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]),
        email:new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z0-9._%+-]+@testyantra\.com|in$/)]),
        employeeId:new FormControl('',[Validators.required,Validators.maxLength(10)]),
        role:new FormControl('',Validators.required)
      })
      if (this.editData) {
        this.userForm.controls['fullName'].setValue(this.editData.fullName);
        this.userForm.controls['email'].setValue(this.editData.email);
        this.userForm.controls['employeeId'].setValue(this.editData.employeeId);
        this.userForm.controls['role'].setValue(this.editData.role);
    }
  }

  ngOnInit(): void {
    this.getUser()
  }
  userDetails!:UserResponse[]
  getUser() {
    this.userservice.getUser().subscribe((res) => {
      if (res) {
        this.userDetails = res.userData;
      }
    })
  }
  onSubmit(){
    this.spinner=true
   this.userservice.editUser(this.userForm.value,this.editData._id).subscribe((res)=>{
    if (!res.error) {
      this.spinner=false
      this.toast.success(res.message);
      this.userForm.reset();
      this.dialogRef.close('update');
    } else {
      this.toast.error(res.message);
    }
  }, err => {
    if (err.status) {
      this.toast.error(err.error.message);
    } else {
      this.toast.error("CONNECTION_ERROR");
    }
  });
}
cancel(){
  this.dialogRef.close();
}
}
