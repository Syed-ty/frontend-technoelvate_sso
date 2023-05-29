import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceResponse } from '../../models/invoice';
import { UsermanagementService } from '../../services/usermanagement.service';
import { UserManagementComponent } from '../../user-management/user-management.component';

@Component({
  selector: 'app-edit-milestone',
  templateUrl: './edit-milestone.component.html',
  styleUrls: ['./edit-milestone.component.css']
})
export class EditMilestoneComponent implements OnInit {
  MileStoneForm!:FormGroup;
  spinner:boolean=false
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private userservice:UsermanagementService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UserManagementComponent>,
    ) {
      this.MileStoneForm = new FormGroup({
      milestone:new FormControl(''),
      paymentPercent:new FormControl(''),
      milestonedetails:new FormControl(''),
      startMileStoneDate:new FormControl(''),
      endMileStoneDate:new FormControl('',[Validators.required]),
      mileStoneAmount:new FormControl(''),
      actualEndDate:new FormControl(''),
      ProjectId:new FormControl(''),
      })
      if (this.editData) {
        this.MileStoneForm.controls['milestone'].setValue(this.editData.milestone);
        this.MileStoneForm.controls['paymentPercent'].setValue(this.editData.paymentPercent);
        this.MileStoneForm.controls['milestonedetails'].setValue(this.editData.milestonedetails);
        this.MileStoneForm.controls['startMileStoneDate'].setValue(this.editData.startMileStoneDate);
        this.MileStoneForm.controls['endMileStoneDate'].setValue(this.editData.endMileStoneDate);
        this.MileStoneForm.controls['mileStoneAmount'].setValue(this.editData.mileStoneAmount);
    }
  }
  data:any
  ngOnInit(): void {
    this.data = localStorage.getItem('projectId')

  }
  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");
  onSubmit(){
    this.spinner=true
    this.MileStoneForm.get('ProjectId')?.setValue(this.data)
   this.userservice.editMileStone(this.MileStoneForm.value,this.editData._id).subscribe((res)=>{
    if (!res.error) {
      this.spinner=false
      this.toast.success(res.message);
      this.MileStoneForm.reset();
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



