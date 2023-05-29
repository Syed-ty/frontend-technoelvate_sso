import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.css']
})
export class AddpaymentComponent implements OnInit {
  PaymentForm!:FormGroup
  spinner:boolean=false
  constructor(private userservice:UsermanagementService,
    private toastr:ToastrService,
    private dialogRef: MatDialogRef<AddpaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {
    this.PaymentForm=new FormGroup({
      recievedDate:new FormControl('',[Validators.required]),
      totalAmount:new FormControl('',Validators.required),
      transactionNumber: new FormControl('',Validators.required),
      projectId: new FormControl('',Validators.required),
    })

    if (this.editData) {
      this.PaymentForm.controls['projectId'].setValue(this.editData._id);
  }
   }

  ngOnInit(): void {
    this.getPayment();
  }

  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");
  paymentDetails:any
  getPayment() {
    this.userservice.getPayment().subscribe((res) => {
      if (res) {
        this.paymentDetails = res.payment;
      }
    })
  }
  onSubmit(){
    this.spinner=true
    this.PaymentForm.get('recievedDate')?.setValue(
      this.userservice.createDateAsUTC(this.PaymentForm.get('recievedDate')?.value)
    );
    this.userservice.addPayment(this.PaymentForm.value).subscribe((res)=>{
       if (!res.error) {
        this.spinner=false
        this.toastr.success(res.message);
        this.PaymentForm.reset();
        this.getPayment();
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
