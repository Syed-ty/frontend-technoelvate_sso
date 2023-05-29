import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {path:'',redirectTo:'user-management',pathMatch:'full'},
  { path: '', component: DashboardComponent, children: [
    {path:'user-management',component:UserManagementComponent},
  {path:'dashboard',component:HomeComponent,
},
 ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
