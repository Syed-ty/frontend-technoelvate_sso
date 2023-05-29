import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceResponse } from '../../models/invoice';
import { UsermanagementService } from '../../services/usermanagement.service';
import { UserManagementComponent } from '../../user-management/user-management.component';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  resourceForm!:FormGroup;
  spinner:boolean=false
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private userservice:UsermanagementService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UserManagementComponent>,
    ) {
      this.resourceForm = new FormGroup({
        employeeId:new FormControl('',[Validators.required]),
        fullName:new FormControl('',Validators.required),
        email:new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@testyantra\.com|in$/)]),
        payment:new FormControl('',Validators.required),
        ProjectId:new FormControl('')
      })
      if (this.editData) {
        this.resourceForm.controls['employeeId'].setValue(this.editData.employeeId);
        this.resourceForm.controls['fullName'].setValue(this.editData.fullName);
        this.resourceForm.controls['email'].setValue(this.editData.email);
        this.resourceForm.controls['payment'].setValue(this.editData.payment);
    }
  }
  data:any
  ngOnInit(): void {
    this.getInvoice()
    this.data = localStorage.getItem('projectId')

  }
  resourceDetails:any = []
  getInvoice() {
    this.userservice.getResource().subscribe((res) => {
      if (res) {
        this.resourceDetails = res.resourcedata;
      }
    })
  }
  onSubmit(){
    this.spinner=true
    this.resourceForm.get('ProjectId')?.setValue(this.data)
   this.userservice.editresource(this.resourceForm.value,this.editData._id).subscribe((res)=>{
    if (!res.error) {
      this.spinner=false
      this.toast.success(res.message);
      this.resourceForm.reset();
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

