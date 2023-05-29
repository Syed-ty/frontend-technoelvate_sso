import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/guard/admin.guard';
import { MangagerGuard } from './auth/guard/mangager.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard',
  canActivate: [MangagerGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path:'404',component:PageNotFoundComponent},
  {
    path: '**',
    redirectTo: "/404"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
