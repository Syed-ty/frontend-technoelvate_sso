import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AdduserDialogComponent } from '../model/adduser-dialog/adduser-dialog.component';
import { EdituserDialogComponent } from '../model/edituser-dialog/edituser-dialog.component';
import { UsermanagementService } from '../services/usermanagement.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

const ELEMENT_DATA: any[] = [];
export interface PeriodicElement {
  FullName: string;
  EmailID: string;
  EmployeeID: string;
  Role:string;
  action: string;
}
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['fullName', 'email', 'employeeId','designation','action'];
  // dataSource:MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  dataSource:any;

  spinner:boolean=true
  // @ViewChild(MatPaginator)
  @ViewChild(MatSort) sort!: MatSort;

  paginator!: MatPaginator;
  searchText: any
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

  paginate: any = {
    length: 0,
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 1
  }
  length = 0;
  pageIndex = 1;
  pageSize = 5;
  startIndex = 0;
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  constructor(
    public dialog: MatDialog,
    private userservice:UsermanagementService,
    public dialogss: MatDialog,
    private spinnerService: NgxSpinnerService,
    private _liveAnnouncer: LiveAnnouncer,
    private toaster:ToastrService) {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA),
      this.sortedData = this.responseData.slice();
     }


  ngOnInit(): void {
    // this.getUser();
    this.getUserPaginator(this.paginate)
  }

  userDetails:any
  getUser() {
    this.userservice.getUser().subscribe((res) => {
     this.spinner=false;
      if (res) {
        this.userDetails = res.userData;
      }
      // this.dataSource=new MatTableDataSource([
      //   ...this.userDetails
      // ])
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortedData!: PeriodicElement[];
  responseData:any[] = []
  getUserPaginator(event: PageEvent) {
    this.paginate = event;
    this.length = +event.length;
    this.pageIndex = +event.pageIndex;
    this.pageSize = +event.pageSize;
    this.startIndex = +event.pageIndex * event.pageSize
    let currentPage = this.pageIndex > 0 ? this.pageIndex + 1 : 1
    this.spinner = true;
    this.userservice.getUserPaginaton(currentPage, this.pageSize).subscribe((res) => {
     if (res.response.length>0) {
      this.responseData = res.response
      let newResponse = res.response.filter((ele: PeriodicElement) => {
        this.spinner = false;
        let keyArray = Object.keys(ele)
        if (keyArray.includes('fullName')) {
          return ele
        } else {
          return null
        }
      });
      this.dataSource = new MatTableDataSource([...newResponse]);
      this.length = res.totalmixed;
      this.dataSource.sort = this.sort
     }else{
      this.spinner = false;
     }
    })
  }

  openDialog() {
    const dialogRef= this.dialog.open(AdduserDialogComponent,{
      width: '900px',
      height: '85%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.spinner=false;
        this.getUser();
        this.getUserPaginator(this.paginate)
      }
    });
  }
  editDialog(row:any){
    const dialogRef= this.dialogss.open(EdituserDialogComponent,{
      width: '900px',
      height: '85%',
      data:row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getUser();
        this.spinner=false;
      }
    });
  }


  deleteId: any;
  deleteData: any;
  ProjectName: any;
  getUserDataToDelete(data: any) {
    this.deleteData = data;
    this.deleteId = data._id;
    this.ProjectName = data.fullName;
  }
  deleteUser(){
    this.userservice.deleteUser(this.deleteId).subscribe(res => {
      if (!res.error) {
        this.toaster.success(res.message);
        this.getUserPaginator(this.paginate)
      } else {
        this.toaster.error(res.message);
      }
    })
    this.responseData.forEach((ele:any, i:any) => {
      if (ele._id === this.deleteId) {
        this.responseData.splice(i, 1);
      }
    })
    this.getUserPaginator(this.paginate)
  }

}


