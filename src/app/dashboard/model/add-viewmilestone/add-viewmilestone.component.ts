import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-add-viewmilestone',
  templateUrl: './add-viewmilestone.component.html',
  styleUrls: ['./add-viewmilestone.component.css']
})
export class AddViewmilestoneComponent implements OnInit {
  MileStoneForm!:FormGroup
  spinner:boolean=false
  constructor(private userservice:UsermanagementService,
    private toastr:ToastrService,
    private dialogRef: MatDialogRef<AddViewmilestoneComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {
    this.MileStoneForm=new FormGroup({
      milestone:new FormControl('',[Validators.required]),
      paymentPercent:new FormControl('',[Validators.required,Validators.max(100),
        Validators.min(1)]),
      milestonedetails:new FormControl('',[Validators.required]),
      startMileStoneDate:new FormControl('',[Validators.required]),
      endMileStoneDate:new FormControl('',[Validators.required]),
      mileStoneAmount:new FormControl(''),
      actualEndDate:new FormControl(''),
      ProjectId:new FormControl(''),
    })
   }

  ngOnInit(): void {
    this.getAllProjectDetails()
  }

  ProjectCost:any
  getAllProjectDetails(){
    this.userservice.getAllProject().subscribe((res)=>{
      res.visitors.forEach((ele:any)=>{
        if(ele._id === localStorage.getItem('projectId') ){
          this.ProjectCost = ele.projectCost
        }
      })
    })
  }



  paymentInputChanged(event:any){
    let Amount = (this.ProjectCost/100)*event.target.value;
     this.MileStoneForm.get('mileStoneAmount')?.setValue(Amount)
  }


  data:any
  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");
  onSubmit(){
    this.spinner=true
    this.data = localStorage.getItem('projectId')
    this.MileStoneForm.get('ProjectId')?.setValue(this.data)
    this.userservice.addMileStone(this.MileStoneForm.value).subscribe((res)=>{
       if (!res.error) {
        this.spinner=false
        this.toastr.success(res.message);
        this.MileStoneForm.reset();
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

