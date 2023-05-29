import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-addinvoice-dialog',
  templateUrl: './addinvoice-dialog.component.html',
  styleUrls: ['./addinvoice-dialog.component.css']
})
export class AddinvoiceDialogComponent implements OnInit {
  invoiceForm!:FormGroup
  spinner:boolean=false
  constructor(private userservice:UsermanagementService,
    private toastr:ToastrService,
    private dialogRef: MatDialogRef<AddinvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {
    this.invoiceForm=new FormGroup({
      projectName:new FormControl(''),
      clientName:new FormControl(''),
      invoiceNumber:new FormControl('',[Validators.required]),
      invoiceDate:new FormControl('',Validators.required),
      paymentterm:new FormControl('',Validators.required),
      invoiceAmount:new FormControl('',Validators.required),
      ProjectId:new FormControl('',Validators.required),
    })
    if (this.editData) {
      this.invoiceForm.controls['ProjectId'].setValue(this.editData._id);
  }
   }

  ngOnInit(): void {
    this.getInvoice();
  }


  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");

  invoiceDetails:any
  getInvoice() {
    this.userservice.getInvoice().subscribe((res) => {
      if (res) {
        this.invoiceDetails = res.invoice;
      }
    })
  }
  onSubmit(){
    this.spinner=true
    this.invoiceForm.get('invoiceDate')?.setValue( this.userservice.createDateAsUTC(this.invoiceForm.get('invoiceDate')?.value));
    this.userservice.addInvoice(this.invoiceForm.value).subscribe((res)=>{
       if (!res.error) {
        this.spinner=false
        this.toastr.success(res.message);
        this.invoiceForm.reset();
        this.getInvoice();
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
