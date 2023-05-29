import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-add-viewresource',
  templateUrl: './add-viewresource.component.html',
  styleUrls: ['./add-viewresource.component.css']
})
export class AddViewresourceComponent implements OnInit {
  resourceForm!:FormGroup
  spinner:boolean=false
  constructor(private userservice:UsermanagementService,
    private toastr:ToastrService,
    private dialogRef: MatDialogRef<AddViewresourceComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {
    this.resourceForm=new FormGroup({
      employeeId:new FormControl('',[Validators.required]),
      fullName:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@testyantra\.com|in$/)]),
      payment:new FormControl('',Validators.required),
      ProjectId:new FormControl(''),
    })
   }

  ngOnInit(): void {
    this.getresource();
  }
  invoiceDetails:any
  getresource() {
    this.userservice.getResource().subscribe((res) => {
      if (res) {
        this.invoiceDetails = res.resourcedata;
      }
    })
  }
  data:any
  onSubmit(){
    this.spinner=true
    this.data = localStorage.getItem('projectId')
    this.resourceForm.get('ProjectId')?.setValue(this.data)
    this.userservice.addresource(this.resourceForm.value).subscribe((res)=>{
       if (!res.error) {
        this.spinner=false
        this.toastr.success(res.message);
        this.resourceForm.reset();
        this.getresource();
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

