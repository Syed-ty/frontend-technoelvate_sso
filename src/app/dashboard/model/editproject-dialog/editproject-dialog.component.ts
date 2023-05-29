import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserResponse } from '../../models/user';
import { ProjectManagementComponent } from '../../project-management/project-management.component';
import { UsermanagementService } from '../../services/usermanagement.service';
import { UserManagementComponent } from '../../user-management/user-management.component';

@Component({
  selector: 'app-editproject-dialog',
  templateUrl: './editproject-dialog.component.html',
  styleUrls: ['./editproject-dialog.component.css']
})
export class EditprojectDialogComponent implements OnInit {
  projectForm!:FormGroup
  spinner:boolean=false
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private userservice:UsermanagementService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ProjectManagementComponent>,
    private toastr: ToastrService,) {
      this.projectForm=new FormGroup({
        projectName: new FormControl('', [Validators.required]),
        projectCost: new FormControl('', [Validators.required]),
        clientName: new FormControl('', [Validators.required]),
        projectType: new FormControl('', Validators.required),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        projectLead: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        projectManager: new FormControl('', Validators.required),
        teamLead: new FormControl('', Validators.required),
        businessDevelopmentManger: new FormControl('', Validators.required),
        Remarks: new FormControl('', Validators.required),
      })
      if (this.editData) {
        this.projectForm.controls['projectName'].setValue(this.editData.projectName);
        this.projectForm.controls['projectCost'].setValue(this.editData.projectCost);
        this.projectForm.controls['clientName'].setValue(this.editData.clientName);
        this.projectForm.controls['projectType'].setValue(this.editData.projectType);
        this.projectForm.controls['startDate'].setValue(this.editData.startDate);
        this.projectForm.controls['endDate'].setValue(this.editData.endDate);
        this.projectForm.controls['projectLead'].setValue(this.editData.projectLead);
        this.projectForm.controls['status'].setValue(this.editData.status);
        this.projectForm.controls['projectManager'].setValue(this.editData.projectManager);
        this.projectForm.controls['teamLead'].setValue(this.editData.teamLead);
        this.projectForm.controls['businessDevelopmentManger'].setValue(this.editData.businessDevelopmentManger);
        this.projectForm.controls['Remarks'].setValue(this.editData.Remarks);
    }
  }

  ngOnInit(): void {
    this.getAllProjectDetails()
  }
  projectDetails:any
  getAllProjectDetails() {
    this.userservice.getAllProject().subscribe((res) => {
      if (res) {
        this.projectDetails = res.visitors;
      }
    })
  }
  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");
  onSubmit(){
    this.spinner=true
   this.userservice.editProject(this.projectForm.value,this.editData._id).subscribe((res)=>{
    if (!res.error) {
      this.spinner=false
      this.toastr.success(res.message);
      this.projectForm.reset();
      this.dialogRef.close('update');
    } else {
      this.toastr.error(res.message);
    }
  }, err => {
    if (err.status) {
      this.toastr.error(err.error.message);
    } else {
      this.toastr.error("CONNECTION_ERROR");
    }
  });
}
cancel(){
  this.dialogRef.close();
}
}
