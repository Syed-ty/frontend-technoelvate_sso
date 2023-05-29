import {AfterViewInit,Component, ViewChild,OnInit, ElementRef,Renderer2,} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsermanagementService } from '../services/usermanagement.service';
import { MatDialog } from '@angular/material/dialog';
import { AddprojectDialogComponent } from '../model/addproject-dialog/addproject-dialog.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { EditprojectDialogComponent } from '../model/editproject-dialog/editproject-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { AddpaymentComponent } from '../model/addpayment/addpayment.component';
import { AddinvoiceDialogComponent } from '../model/addinvoice-dialog/addinvoice-dialog.component';
import { Router } from '@angular/router';
import { AddResourcesComponent } from '../model/add-resources/add-resources.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface PeriodicElement {
  ProjectName: string;
  position: number;
  ClientName: number;
  StartDate: string;
  EndDate: string;
  ProjectCost: number;
  ProjectType: string;
  ProjectLead: string;
  ProjectManager: string;
  TeamLead: string;
  BusinessDevelopmentManager: string;
  Remarks: string;
}

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})


export class ProjectManagementComponent implements OnInit, AfterViewInit {
  @ViewChild('toggleButton')
  toggleButton!: ElementRef;
  @ViewChild('menu')
  menu!: ElementRef;
  menuStatus: boolean = false;
  isMenuOpen!: boolean;
  displayedColumns: string[] = [
    'clientName',
    'projectName',
    'startDate',
    'endDate',
    'status',
    'totalResource',
    'Invoice',
    'Payment',
    'Action',
  ];

  shareData: string | undefined;

  spinner: boolean = true;

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
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  searchText = '';
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | any;



  ngAfterViewInit() {
  }
  constructor(
    public userService: UsermanagementService,
    public dialog: MatDialog,
    private shareModule: SharedModule,
    private toastr: ToastrService,
    private router: Router,
    private renderer: Renderer2,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    //   this.renderer.listen('window', 'click',(e:Event)=>{
    //     if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
    //         this.isMenuOpen=false;
    //     }
    // });
  }

  ngOnInit(): void {
    this.getAllProjectDetails();
    this.getPaginator(this.paginate)

  }

  projectDetails: any;
  getAllProjectDetails() {
    this.spinner = true;
    this.userService.getAllProject().subscribe((res) => {
      this.spinner = false;
      if (res) {
        // this.projectDetails = res.visitors;
      }
      // this.dataSource = new MatTableDataSource([...this.projectDetails]);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getPaginator(event: PageEvent) {
    this.paginate = event;
    this.length = +event.length;
    this.pageIndex = +event.pageIndex;
    this.pageSize = +event.pageSize;
    this.startIndex = +event.pageIndex * event.pageSize
    let currentPage = this.pageIndex > 0 ? this.pageIndex + 1 : 1
    this.spinner = true;
    this.userService.getProjectPaginaton(currentPage, this.pageSize).subscribe((res) => {
      if (res.response.length>0) {
        this.projectDetails = res.response
      let newResponse = res.response.filter((ele: PeriodicElement) => {
        this.spinner = false;
        let keyArray = Object.keys(ele)
        if (keyArray.includes('projectName')) {
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




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddprojectDialogComponent, {
      width: '900px',
      height: '85%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.getPaginator(this.paginate)
      }
    });
  }

  paymentDetails: any;
  getPayment() {
    this.userService.getPayment().subscribe((res: any) => {
      if (res) {
        this.paymentDetails = res.payment;
      }
    });
  }
  openPayment(row: any) {
    const dialogRef = this.dialog.open(AddpaymentComponent, {
      width: '500px',
      // height:'85%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.getPayment();
      }
    });
  }

  editDialog(row: any) {
    const dialogRef = this.dialog.open(EditprojectDialogComponent, {
      width: '450px',
      height: '85%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getPaginator(this.paginate)
      }
    });
  }

  openInvoice(row: any) {
    const dialogRef = this.dialog.open(AddinvoiceDialogComponent, {
      width: '450px',
      // height:'75%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.getInvoice();
      }
    });
  }

  openResource(row: any) {
    const dialogRef = this.dialog.open(AddResourcesComponent, {
      width: '450px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.getInvoice();
        this.getPaginator(this.paginate)
      }
    });
  }

  deleteId: any;
  deleteData: any;
  ProjectName: any;
  getProjectDataToDelete(data: any) {
    this.deleteData = data;
    this.deleteId = data._id;
    this.ProjectName = data.projectName;
  }

  clearId(id: any) {
    this.deleteId = null;
  }

  invoiceDetails: any;
  getInvoice() {
    this.userService.getInvoice().subscribe((res) => {
      if (res) {
        this.invoiceDetails = res.invoice;
      }
    });
  }

  deleteProjectData() {
    this.userService.deleteProject(this.deleteId).subscribe((res) => {
      this.getPaginator(this.paginate)
    });
    this.projectDetails.forEach((ele: any, i: any) => {
      if (ele._id === this.deleteId) {
        this.projectDetails.splice(i, 1);
      }
    });
    this.getPaginator(this.paginate)
  }

  async myFunc(row: any, id: any) {
    this.router.navigate(['/dashboard/invoice'], { state: row._id });
    // this.userService.setData(row._id);
    localStorage.setItem('projectId', row._id);
  }
}










