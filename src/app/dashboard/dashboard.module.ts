import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SharedModule } from '../shared/shared/shared.module';
import { HomeComponent } from './home/home.component';
 import { FilterPipe } from '../filter.pipe';
import { AdduserDialogComponent } from './model/adduser-dialog/adduser-dialog.component';
import { EdituserDialogComponent } from './model/edituser-dialog/edituser-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserManagementComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    FilterPipe,
    AdduserDialogComponent,
    EdituserDialogComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
