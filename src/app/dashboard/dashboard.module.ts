import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SharedModule } from '../shared/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
 import { FilterPipe } from '../filter.pipe';
import { AdduserDialogComponent } from './model/adduser-dialog/adduser-dialog.component';
import { EdituserDialogComponent } from './model/edituser-dialog/edituser-dialog.component';
import { AddprojectDialogComponent } from './model/addproject-dialog/addproject-dialog.component';
import { EditprojectDialogComponent } from './model/editproject-dialog/editproject-dialog.component';
import { PaymentComponent } from './payment/payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AddpaymentComponent } from './model/addpayment/addpayment.component';
import { EditPaymentDetailsComponent } from './model/edit-payment-details/edit-payment-details.component';
import { AddinvoiceDialogComponent } from './model/addinvoice-dialog/addinvoice-dialog.component';
import { EditinvoiceDialogComponent } from './model/editinvoice-dialog/editinvoice-dialog.component';
import { AddInvoiceComponent } from './model/add-invoice/add-invoice.component';
import { AddViewpaymentComponent } from './model/add-viewpayment/add-viewpayment.component';
import { AddResourcesComponent } from './model/add-resources/add-resources.component';
import { EditResourceComponent } from './model/edit-resource/edit-resource.component';
import { AddViewresourceComponent } from './model/add-viewresource/add-viewresource.component';
import { AddViewmilestoneComponent } from './model/add-viewmilestone/add-viewmilestone.component';
import { EditViewmilestoneComponent } from './model/edit-viewmilestone/edit-viewmilestone.component';
import { EditMilestoneComponent } from './model/edit-milestone/edit-milestone.component';
@NgModule({
  declarations: [
    DashboardComponent,
    UserManagementComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    ProjectManagementComponent,
     FilterPipe,
    AdduserDialogComponent,
    EdituserDialogComponent,
    AddprojectDialogComponent,
    EditprojectDialogComponent,
    PaymentComponent,
    InvoiceComponent,
    AddpaymentComponent,
    EditPaymentDetailsComponent,
    AddinvoiceDialogComponent,
    EditinvoiceDialogComponent,
    AddInvoiceComponent,
    AddViewpaymentComponent,
    AddResourcesComponent,
    EditResourceComponent,
    AddViewresourceComponent,
    AddViewmilestoneComponent,
    EditViewmilestoneComponent,
    EditMilestoneComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
