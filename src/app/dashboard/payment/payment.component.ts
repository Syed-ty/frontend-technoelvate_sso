import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddpaymentComponent } from '../model/addpayment/addpayment.component';
import { AdduserDialogComponent } from '../model/adduser-dialog/adduser-dialog.component';
import { EditPaymentDetailsComponent } from '../model/edit-payment-details/edit-payment-details.component';
import { EdituserDialogComponent } from '../model/edituser-dialog/edituser-dialog.component';
import { UsermanagementService } from '../services/usermanagement.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  displayedColumns: string[] = ['ProjectName', 'ClientName','ReceivedDate','TotalAmount','Action'];
  dataSource:MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman',
  ]
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  userservices: any;
  constructor(public dialog: MatDialog,
    private userservice:UsermanagementService,
    public dialogss: MatDialog,) { }

  ngOnInit(): void {
    this.getPayment()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  paymentDetails:any
  getPayment() {
    this.userservice.getPayment().subscribe((res:any) => {
      if (res) {
        this.paymentDetails = res.payment;
      }
      this.dataSource=new MatTableDataSource([
        ...this.paymentDetails
      ])
      // this.dataSource = new MatTableDataSource([
      //   ...this.userDetails
      // ]);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filteredData.forEach((ele:any) => {
      if (ele.fullName.trim().toLowerCase() === filterValue.trim().toLowerCase()) {
        (event.target as HTMLInputElement).value = 'null'
      }
    })
  }
  openDialog() {
    const dialogRef= this.dialog.open(AddpaymentComponent,{
      width:'450px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.getPayment();
      }
    });
  }
  editDialog(element:any){
    const dialogRef= this.dialogss.open(EditPaymentDetailsComponent,{
      width:'450px',
      data:element
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getPayment();
      }
    });
  }
  deletePayment(id:any){
    this.userservice.deletePayment(id).subscribe(res => {
    this.getPayment();
    })
    this.paymentDetails.forEach((ele:any, i:any) => {
      if (ele._id === id) {
        this.paymentDetails.splice(i, 1);
      }
    })

    this.getPayment()

  }

}


