import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-add-viewpayment',
  templateUrl: './add-viewpayment.component.html',
  styleUrls: ['./add-viewpayment.component.css'],
})
export class AddViewpaymentComponent implements OnInit {
  PaymentForm!: FormGroup;
  spinner: boolean = false;
  constructor(
    private userservice: UsermanagementService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddViewpaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.PaymentForm = new FormGroup({
      recievedDate: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', Validators.required),
      transactionNumber: new FormControl('', Validators.required),
      projectId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getPayment();
  }

  todayDate: Date = new Date();
  minDate: Date = new Date('1 January 2019');
  paymentDetails: any;
  getPayment() {
    this.userservice.getPayment().subscribe((res) => {
      if (res) {
        this.paymentDetails = res.payment;
      }
    });
  }
  data: any;



  createDateAsUTC(date: any) {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  }

  onSubmit() {
    this.spinner = true;
    this.data = localStorage.getItem('projectId');
    this.PaymentForm.get('projectId')?.setValue(this.data);
    this.PaymentForm.get('recievedDate')?.setValue(
      this.createDateAsUTC(this.PaymentForm.get('recievedDate')?.value)
    );
    this.userservice.addPayment(this.PaymentForm.value).subscribe(
      (res) => {
        if (!res.error) {
          this.spinner = false;
          this.toastr.success(res.message);
          this.PaymentForm.reset();
          this.getPayment();
          this.dialogRef.close('add');
        } else {
          this.toastr.error(res.message);
        }
      },
      (err) => {
        if (err.status) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error('CONNECTION_ERROR');
        }
      }
    );
  }
  cancel() {
    this.dialogRef.close();
  }
}
