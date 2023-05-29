import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserResponse } from '../../models/user';
import { UsermanagementService } from '../../services/usermanagement.service';
import { UserManagementComponent } from '../../user-management/user-management.component';

@Component({
  selector: 'app-edit-payment-details',
  templateUrl: './edit-payment-details.component.html',
  styleUrls: ['./edit-payment-details.component.css']
})
export class EditPaymentDetailsComponent implements OnInit {
  PaymentForm!:FormGroup;
  spinner:boolean=false
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private userservice:UsermanagementService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UserManagementComponent>,
    private toastr: ToastrService,) {
      this.PaymentForm=new FormGroup({
        transactionNumber:new FormControl('',[Validators.required]),
        recievedDate:new FormControl('',[Validators.required]),
        totalAmount:new FormControl('',Validators.required)
      })
      if (this.editData) {
        this.PaymentForm.controls['transactionNumber'].setValue(this.editData.transactionNumber);
        this.PaymentForm.controls['recievedDate'].setValue(this.editData.recievedDate);
        this.PaymentForm.controls['totalAmount'].setValue(this.editData.totalAmount);
    }
  }

  ngOnInit(): void {
    this.getPayment()
  }
  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");
  paymentDetails!:PaymentResponse[]
  getPayment() {
    this.userservice.getPayment().subscribe((res) => {
      if (res) {
        this.paymentDetails = res.payment;
      }
    })
  }
  onSubmit(){
    this.spinner=true
   this.userservice.editPayment(this.PaymentForm.value,this.editData._id).subscribe((res)=>{
    if (!res.error) {
      this.spinner=false
      this.toast.success(res.message);
      this.PaymentForm.reset();
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
