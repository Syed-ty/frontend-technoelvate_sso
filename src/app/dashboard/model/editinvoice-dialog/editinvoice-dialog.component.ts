import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceResponse } from '../../models/invoice';
import { UserResponse } from '../../models/user';
import { UsermanagementService } from '../../services/usermanagement.service';
import { UserManagementComponent } from '../../user-management/user-management.component';

@Component({
  selector: 'app-editinvoice-dialog',
  templateUrl: './editinvoice-dialog.component.html',
  styleUrls: ['./editinvoice-dialog.component.css']
})
export class EditinvoiceDialogComponent implements OnInit {
  invoiceForm!:FormGroup;
  spinner:boolean=false
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private userservice:UsermanagementService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UserManagementComponent>,
    private toastr: ToastrService,) {
      this.invoiceForm=new FormGroup({
        invoiceNumber:new FormControl('',[Validators.required]),
        invoiceDate:new FormControl('',Validators.required),
        paymentterm:new FormControl('',Validators.required),
        invoiceAmount:new FormControl('',Validators.required),
        selectedMileStone:new FormControl(''),
        ProjectId: new FormControl(''),
      })
      if (this.editData) {
        this.invoiceForm.controls['invoiceNumber'].setValue(this.editData.invoiceNumber);
        this.invoiceForm.controls['invoiceDate'].setValue(this.editData.invoiceDate);
        this.invoiceForm.controls['paymentterm'].setValue(this.editData.paymentterm);
        this.invoiceForm.controls['invoiceAmount'].setValue(this.editData.invoiceAmount);
        this.invoiceForm.controls['selectedMileStone'].setValue(this.editData.selectedMileStone);
    }
  }

  projId:any
  ngOnInit(): void {
    this.getInvoice()
    this.projId = localStorage.getItem('projectId')
    this.getMileStoneById()

  }
  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");
  invoiceDetails!:InvoiceResponse[]
  getInvoice() {
    this.userservice.getInvoice().subscribe((res) => {
      if (res) {
        this.invoiceDetails = res.invoice;
      }
    })
  }


  SelectMileStone:any[] = []
  getMileStoneById(){
    this.spinner = true
    this.userservice.getMileStoneByProjectId(this.projId).subscribe((res)=>{
      if(res){
        this.spinner = false
       res.response.forEach((ele:any)=>{
         this.SelectMileStone.push(ele.milestone)
       })
      }
    })
  }
  onSubmit(){
    this.spinner=true
    this.invoiceForm.get('ProjectId')?.setValue(this.projId)
   this.userservice.editInvoice(this.invoiceForm.value,this.editData._id).subscribe((res)=>{
    if (!res.error) {
      this.spinner=false
      this.toast.success(res.message);
      this.invoiceForm.reset();
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
