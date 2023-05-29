import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceResponse } from '../../models/invoice';
import { UsermanagementService } from '../../services/usermanagement.service';
import { UserManagementComponent } from '../../user-management/user-management.component';

@Component({
  selector: 'app-edit-viewmilestone',
  templateUrl: './edit-viewmilestone.component.html',
  styleUrls: ['./edit-viewmilestone.component.css']
})
export class EditViewmilestoneComponent implements OnInit {
  MileStoneForm!:FormGroup;
  spinner:boolean=false
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private userservice:UsermanagementService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UserManagementComponent>,
    ) {
      this.MileStoneForm = new FormGroup({
      milestone:new FormControl('',[Validators.required]),
      paymentPercent:new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),
      milestonedetails:new FormControl('',[Validators.required]),
      startMileStoneDate:new FormControl('',[Validators.required]),
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
    this.getAllProjectDetails()

  }
  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");

  ProjectCost:any
  getAllProjectDetails(){
    this.userservice.getAllProject().subscribe((res)=>{
      res.visitors.forEach((ele:any)=>{
        if(ele._id === this.data ){
          this.ProjectCost = ele.projectCost
        }
      })
    })
  }



  paymentInputChanged(event:any){
    let Amount = (this.ProjectCost/100)*event.target.value;
     this.MileStoneForm.get('mileStoneAmount')?.setValue(Amount)
  }
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


